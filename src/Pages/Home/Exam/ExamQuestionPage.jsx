import { Box, Button, LinearProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../Service/Api';
import Timer from '../../../Components/Timer';
import GenericModal from '../../../Components/GenericModal';
import FinishedTimeExamCompo from '../../../Components/CompoModules/Exam/FinishedTimeExamCompo';

const ExamQuestionPage = () => {
    const navigate = useNavigate()
    const { examId } = useParams();
    const [examQuestions, setExamQuestion] = useState([])
    const [errorFetchQuestion, setErrorFetchQuestion] = useState(false);
    const [messageError, setMessageError] = useState("");
    const [loading, setLoading] = useState(true);
    const [currectIndex, setCurrentIndex] = useState(0);
    // create the logic with currect index,  selected user and more, think in the best solution brouuuuu
    const [examSubmision, setExamSubmision] = useState({
        exam_id: examQuestions.exam_id,
        id_user: 12,
        answers: []
    })
    const [userAnswer, setUserAnswer] = useState("")
    const [noSelectQuestion, setNotSelectQuestion] = useState(true);
    const [finishTimeExam, setFinishTimeExam] = useState(false);


    const handleFetchQuestion = async (examId) => {
        try {
            const response = await axiosInstance.get(`/api/exam/getAllQuestion/${examId}`);
            if (response.status == 200) {
                setExamQuestion(response.data)
                setLoading(false)
                console.log(response.data.questionResponseList);

            } else {
                setMessageError(response.status)
                setExamQuestion([])
                setErrorFetchQuestion(true)
            }
        } catch (error) {
            console.error(error);
            setExamQuestion([])
            setErrorFetchQuestion(true)
        }
    }

    const handleQuestion = (question_id, answerSelected) => {
        const answerSelectedDto = {
            "id_quiestion": question_id,
            "answerSelect": answerSelected
        }

        setUserAnswer(answerSelected)
        console.log(answerSelectedDto);


        setExamSubmision((prev) => ({
            ...prev,
            exam_id: examQuestions.exam_id,
            id_user: 12,
            answers: [...prev.answers, answerSelectedDto]
        }))
    }

    const changeQuestion = () => {
        if (currectIndex >= examQuestions.questionResponseList.length - 1) {
            console.log(examSubmision);

        }
        setUserAnswer("")


        setCurrentIndex(currectIndex + 1);


    }


    useEffect(() => {
        if (examId) {
            handleFetchQuestion(examId);
        }
    }, []);



    if (loading) return <p>Cargando preguntas...</p>;
    if (examQuestions.length <= 0) {
        return (
            <Box sx={{ width: "100%", height: "100vh", backgroundColor: "background.paper", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <Typography sx={{ mb: "20px" }}>Something broke the server, please try again </Typography>
                <Button variant='outlined' onClick={() => navigate("/ExamsHome")}>Home</Button>
            </Box>
        )
    }

    if (examQuestions.questionResponseList.length <= 0) {
        return (
            <Box sx={{ width: "100%", height: "100vh", backgroundColor: "background.paper", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <Typography sx={{ mb: "20px" }}>No There are questions for this exam. Try another one </Typography>
                <Button variant='outlined' onClick={() => navigate("/ExamsHome")}>Home</Button>
            </Box>
        )
    }

    // variants for show every question
    const currentQuestion = examQuestions.questionResponseList[currectIndex];

    if (currectIndex > examQuestions.questionResponseList.length - 1) {
        return (
            <div>
                Hola, ya enviaste todo
            </div>
        )

    }

    ;

    return (
        <>

            {errorFetchQuestion && (
                <Typography>{messageError}</Typography>
            )}


            {finishTimeExam && <GenericModal open={finishTimeExam} handleClose={null} compo={<FinishedTimeExamCompo handleClose={() => navigate("/examsHome")} />} />}
            <Box sx={{
                width: "100%",
                height: "100vh",
                backgroundColor: "background.paper",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                padding: { xs: "50px", md: "100px" }
            }}>
                {/* Panel of title, time and botton cancel */}
                <Box sx={{
                    width: "100%",
                    height: "10vh",

                    position: "absolute",
                    top: "5%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingLeft: { xs: "50px", md: "100px" },
                    paddingRight: { xs: "50px", md: "100px" },
                }}>
                    <Box>
                        <Typography sx={{ fontWeight: "bold" }}>titile of the exam</Typography>
                    </Box>
                    <Box>
                        <Timer initialMinutes={1} onTimeUp={() => setFinishTimeExam(true)}/>
                    </Box>
                    <Box sx={{}}>
                        <Typography sx={{ fontWeight: "500", display: "inline" }}>Question  </Typography>
                        <Typography sx={{ color: "primary.main", fontWeight: "500", display: "inline" }}>{currectIndex + 1} /   </Typography>
                        <Typography sx={{ color: "primary.main", fontWeight: "bold", display: "inline" }}> {examQuestions.questionResponseList.length} </Typography>
                    </Box>

                </Box>
                <Box sx={{
                    p: 1,
                    width: "100%",
                    position: "absolute",
                    top: "15%",
                    paddingLeft: { xs: "50px", md: "100px" },
                    paddingRight: { xs: "50px", md: "100px" },
                }}>
                    <LinearProgress
                        variant="determinate"
                        value={((currectIndex + 1) / examQuestions.questionResponseList.length) * 100}
                    />

                </Box>


                {/* question render */}


                <Box sx={{
                    width: "70%",
                    height: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>


                    <Box sx={{
                        width: "50%",
                        height: "50%",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        {currentQuestion.questionText}
                    </Box>
                    <Box sx={{
                        width: "50%",
                        height: "50%",

                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}>
                        Select the correct answer:

                        <Box key={currentQuestion.question_id} sx={{ mt: "20px", display: "grid", gridTemplateAreas: "repeat(auto-fit, minmax(50px, 20px))", gap: "5px" }}>

                            {currentQuestion.answerResponseList.map((answer, index) => {
                                return (

                                    <Box
                                        key={index}
                                        onClick={() => handleQuestion(currentQuestion.question_id, answer.answerText)}
                                        sx={{
                                            padding: '10px',
                                            margin: '8px 0',
                                            borderRadius: '8px',
                                            border: userAnswer === answer.answerText ? '2px solid green' : '1px solid gray',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {answer.answerText}
                                    </Box>
                                )
                            })}
                            {!noSelectQuestion && (<Typography sx={{ color: "red" }}>You must to select one opcion.</Typography>)}


                            <Box sx={{
                                width: "100%",
                                height: "10vh",
                                position: "absolute",
                                bottom: "5%",
                                left: "0%",
                                display: "flex",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                                paddingLeft: { xs: "50px", md: "100px" },
                                paddingRight: { xs: "50px", md: "100px" },
                            }}>

                                <Box>
                                    <Button variant='contained'>Cancel exam</Button>
                                </Box>


                                <Button onClick={() => {

                                    if (userAnswer == "") {
                                        setNotSelectQuestion(false)

                                    } else {
                                        changeQuestion(currentQuestion)
                                        setNotSelectQuestion(true)
                                    }


                                }} variant='outlined'>
                                    {currectIndex == examQuestions.questionResponseList.length - 1 ? "finish exam" : "next question"}
                                </Button>

                            </Box>
                        </Box>

                    </Box>

                </Box>

            </Box>
        </>
    );
};


{/*  */ }

export default ExamQuestionPage;