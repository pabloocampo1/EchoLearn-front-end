import { EmojiEventsOutlined, LockClockOutlined, MoreVertOutlined, PointOfSale, PunchClock } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import ListExamUI from './ComponetsExamCustom/ListExamUI';
import ExamCreateSection from './ExamCreateSection';

const Exams = () => {
    const [tests, setTests] = useState([
        {
            "imageCategory": "url",
            "subcategoryTitle": "javascript",
            "titleExam": "JS basic sintax",
            "id": "23",
            "points": "3000",
            "time": "10 min",
            "numberOfQuestions": "15"
        },
        {
            "imageCategory": "url",
            "subcategoryTitle": "javascript",
            "titleExam": "JS basic sintax",
            "id": "23",
            "points": "3000",
            "time": "10 min",
            "numberOfQuestions": "15"
        }, {
            "imageCategory": "url",
            "subcategoryTitle": "javascript",
            "titleExam": "JS basic sintax",
            "id": "23",
            "points": "3000",
            "time": "10 min",
            "numberOfQuestions": "15"
        }, {
            "imageCategory": "url",
            "subcategoryTitle": "javascript",
            "titleExam": "JS basic sintax",
            "id": "23",
            "points": "3000",
            "time": "10 min",
            "numberOfQuestions": "15"
        }, {
            "imageCategory": "url",
            "subcategoryTitle": "javascript",
            "titleExam": "JS basic sintax",
            "id": "23",
            "points": "3000",
            "time": "10 min",
            "numberOfQuestions": "15"
        }, {
            "imageCategory": "url",
            "subcategoryTitle": "javascript",
            "titleExam": "JS basic sintax",
            "id": "23",
            "points": "3000",
            "time": "10 min",
            "numberOfQuestions": "15"
        }, {
            "imageCategory": "url",
            "subcategoryTitle": "javascript",
            "titleExam": "JS basic sintax",
            "id": "23",
            "points": "3000",
            "time": "10 min",
            "numberOfQuestions": "15"
        },
    ])

    const [createExamOption, setCreateExamOption] = useState(false);
    const [dataExamEdit, setDataExamEdit] = useState({});


    const editExam = (id_exam) => {

        // fetch de data about what is the exam for edit and show the information
        setDataExamEdit({
            "title": "Título del examen.",
            "description": " Breve descripción opcional.,",
            "level": "hard",
            "duration": 10,
            "points": 999,
            "available": true,
            "questions": [
                {
                    "question": "melena pues vengo de uno",
                    "available": true,
                    "answers": [
                        {
                            "answerText": "no se mano",
                            "isCorrect": false
                        },
                        {
                            "answerText": "no se mano x2",
                            "isCorrect": false
                        },
                        {
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
                <ExamCreateSection cancelCreate={() => setCreateExamOption(false)} examData={dataExamEdit} />
            ) : (
                <>
                    <Box sx={{
                        width: "100%",
                        height: "10vh",
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

