
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ListExamUI from './ComponetsExamCustom/ListExamUI';
import ExamCreateSection from './ExamCreateSection';
import axiosInstance from '../../../Service/Api';

const Exams = () => {
    const [tests, setTests] = useState([
        {
            "id": 23,
            "categoryImageUrl": "url",
            "subcategoryTitle": "JavaScript",
            "examTitle": "JS Basic Syntax",
            "points": 3000,
            "durationMinutes": 10,
            "questionCount": 15
        }

    ])

    const [createExamOption, setCreateExamOption] = useState(false);
    const [dataExamEdit, setDataExamEdit] = useState({});


    const editExam = (id_exam) => {

        // fetch de data about what is the exam for edit and show the information
        setDataExamEdit({
            "id_exam": "2",
            "title": "Título del examen.",
            "description": " Breve descripción opcional.,",
            "level": "hard",
            "duration": 10,
            "points": 999,
            // add subcategories relation
            "available": true,
            "questions": [
                {
                    "id_question": "2",
                    "question": "melena pues vengo de uno",
                    "available": true,
                    "answers": [
                        {
                            "id_answer": "3",
                            "answerText": "no se mano",
                            "isCorrect": false
                        },
                        {
                            "id_answer": "3",
                            "answerText": "no se mano x2",
                            "isCorrect": false
                        },
                        {
                            "id_answer": "3",
                            "answerText": "no se mano x3",
                            "isCorrect": true
                        }
                    ]
                }
            ]
        })
        console.log(id_exam);
        setCreateExamOption(true)

    }

    useEffect(() => {
        const fetchDataExams = async () => {
            try {
                const response  = await axiosInstance.get("/api/exam/getAll/home");
                setTests(response.data)
                
            } catch (error) {
                console.log(error
                );
                
            }
        }

        fetchDataExams()
    }, [])



    return (  
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
                <Box>
                    <Typography variant='h3'>Custom tests</Typography>
                    <Typography>Add up to 10 custom questions, Create a new test or import existing one.</Typography>
                </Box>

                {!createExamOption && (<Button onClick={() => setCreateExamOption(true)} variant='contained' sx={{ width: "100px", height: "50px", color: "white" }}>Add test</Button>)}
            </Box>

            {createExamOption ? (
                <ExamCreateSection cancelCreate={() => { setCreateExamOption(false), setDataExamEdit({}) }} examData={dataExamEdit} />
            ) : (
                <>
                    <Box sx={{
                        width: "100%",
                        height: "auto",
                        mt: "50px",
                        mb: "50px",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "20px"
                    }}>
                        <Box sx={{ height: "100px", bgcolor: "background.paper", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>1</Box>
                        <Box sx={{ height: "100px", bgcolor: "background.paper", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }} >2</Box>
                        <Box sx={{ height: "100px", bgcolor: "background.paper", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>3</Box>
                        <Box sx={{ height: "100px", bgcolor: "background.paper", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>4</Box>
                    </Box>

                    <Typography>All Tests</Typography>

                    <Box sx={{ width: "100%" }}>
                        {tests.map((test) => {
                            return (
                                <ListExamUI test={test} isTakeExam={false} editExam={editExam} />
                            )
                        })}
                    </Box>
                </>
            )}

        </Box>
    );
};

export default Exams;



