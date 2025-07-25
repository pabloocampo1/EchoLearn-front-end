import React from 'react';
import { DeleteOutline, EditNoteOutlined, EmojiEventsOutlined, MoreVertOutlined, PunchClock, QuestionAnswer, QuestionAnswerOutlined, } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import ButtonComponent from '../../../../Components/ButtonComponet';

const ListExamUI = ({ test = {}, isTakeExam, editExam }) => {
    return (
        <Box key={test.id}
            sx={{
                width: "100%",
                height: "50px",
                bgcolor: "background.paper",
                mb: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
            <Box sx={{ width: "50%", height:"80%", display: "flex", justifyContent: "start", alignItems: "center" }}>
                <MoreVertOutlined />
                <img style={{width:"9%", height:"100%", borderRadius:"15%"}} src="https://th.bing.com/th/id/OIP.hTohJITrIVziX8BF7QmwCAHaHa?w=148&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="image" />
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "start", flexDirection: "column", ml:"20px" }}>

                    <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>{test.titleExam}</Typography>
                    <Typography sx={{ fontSize: "14px" }}>{test.subcategoryTitle}</Typography>

                </Box>
            </Box>

            <Box sx={{ width: "50%", display: "flex", justifyContent: "end", alignItems: "center" }}>
                <Box sx={{ width: { xs: "20%", mb: "30%" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <EmojiEventsOutlined />
                    <Typography sx={{ ml: "5px", opacity: "0.60" }}>{test.points}</Typography>
                </Box>
                <Box sx={{ width: { xs: "20%", mb: "30%" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <QuestionAnswerOutlined />
                    <Typography sx={{ ml: "5px", opacity: "0.60" }}>{test.numberOfQuestions}</Typography>
                </Box>
                <Box sx={{ width: { xs: "20%", mb: "30%" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <PunchClock />
                    <Typography sx={{ ml: "5px", opacity: "0.60" }}>{test.time}</Typography>
                </Box>
                <Box sx={{ width: { xs: "20%", mb: "30%" }, display: "flex", justifyContent: "center", alignItems: "center", borderLeft: "1px solid  #2A8A7A" }}>
                    {isTakeExam ? (
                        <> <ButtonComponent />
                            </>
                    ) : (
                        <> <DeleteOutline sx={{ mr: "10px" }} />
                            <EditNoteOutlined onClick={() => editExam(test.id)} /></>
                    )}
                </Box>
            </Box>


        </Box>
    );
};

export default ListExamUI;