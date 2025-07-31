import { Box, Button, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { TakeExamContext } from '../../../Context/ExamContext';
import { ArrowBack, DarkModeOutlined, EmojiEventsOutlined, PunchClock, QuestionAnswerOutlined, WbSunny } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ThemeContext, ThemeContextProvider } from '../../../Context/ThemeContext';
import LogoWeb from '../../../Components/logoWeb';


const PreviuwSummaryExam = () => {

    const { examSelected } = useContext(TakeExamContext);
    const navigate = useNavigate();
    const { subCategoryImageSelect } = useContext(TakeExamContext);
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    if (!examSelected) {
        return (
            <Box>
                The exa is no loanding.
                <Button
                    onClick={() => navigate("/ExamsHome")}
                    sx={{
                        position: "absolute",
                        top: "5%",
                        left: "2%"
                    }}
                >
                    <ArrowBack />  Home</Button>
            </Box>
        )
    }
    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                background: "linear-gradient(135deg, #0f2925, #3BB09D)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative"
            }}>
            <Button
                variant='contained'
                onClick={() => navigate("/ExamsHome")}

                sx={{
                    position: "absolute",
                    top: "5%",
                    left: "5%"
                }}
            >
                <ArrowBack />  Home
            </Button>



            <Box
                sx={{
                    mr: "15px", position: "absolute",
                    top: "5%",

                }}
            >
                <LogoWeb />

            </Box>
            <Box
                sx={{
                    mr: "15px", position: "absolute",
                    top: "5%",
                    right: "5%"
                }}
                onClick={() => toggleDarkMode()}>
                {darkMode ? <WbSunny sx={{ color: "black", width: "25px", height: "30px" }} /> : <DarkModeOutlined sx={{ color: "black", width: "30px", height: "30px" }} />}

            </Box>
            <Box sx={{
                width: "50%",
                height: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.paper",
                borderRadius: "20px",
            }}>
                <Box sx={{
                    width: "50%",
                    height: "50%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    pl: "20px"
                }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "end",
                        mb: "20px"

                    }}>
                        <img width="100px" style={{ border: "1px solid #A9E6DB" }} src={subCategoryImageSelect} alt="image" />  <Typography sx={{ fontWeight: "bold", fontSize: "18px", pl: "10px" }}>{examSelected.title}</Typography>
                    </Box>

                    <Box sx={{ width: { xs: "20%", mb: "30%" }, display: "flex", color: "primary.main", mb: "10px" }}>
                        <EmojiEventsOutlined />
                        points:
                        <Typography sx={{ ml: "5px", opacity: "0.60", fontWeight: "bold", color: "text.primary" }}>{examSelected.points}</Typography>
                    </Box>
                    <Box sx={{ width: { xs: "100%", mb: "100%" }, display: "flex", color: "primary.main", mb: "10px" }}>
                        <QuestionAnswerOutlined />
                        Questions:
                        <Typography sx={{ ml: "5px", opacity: "0.60", fontWeight: "bold", color: "text.primary" }}>{examSelected.totalQuestion}</Typography>
                    </Box>
                    <Box sx={{ width: { xs: "100%", mb: "100%" }, display: "flex", color: "primary.main", mb: "10px" }}>

                        <PunchClock />
                        Time of duration:
                        <Typography sx={{ ml: "5px", opacity: "0.60", fontWeight: "bold", color: "text.primary" }}>{examSelected.duration}</Typography>
                    </Box>
                    <Box sx={{ width: { xs: "100%", mb: "100%" }, display: "flex", color: "primary.main", mb: "10px" }} >
                        {examSelected.level === "easy" && (<Box sx={{ width: "20px", height: "20px", bgcolor: "green" }}></Box>)}
                        {examSelected.level === "intermediate" && (<Box sx={{ width: "20px", height: "20px", bgcolor: "yellow" }}></Box>)}
                        {examSelected.level === "hard" && (<Box sx={{ width: "20px", height: "20px", bgcolor: "red" }}></Box>)}
                        Level :  <Typography sx={{ ml: "5px", opacity: "0.60", fontWeight: "bold", color: "text.primary" }}>{examSelected.level}</Typography>
                    </Box>

                </Box>
                <Box sx={{ width: "1px", height: "50%", bgcolor: "background.default", }}>

                </Box>
                <Box sx={{
                    width: "50%",
                    height: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "column"
                }}>
                    <Box sx={{
                        maxHeight: '150px',
                        overflowY: 'auto',
                        p: 1,


                    }}>
                        <Typography variant="body2">
                            {examSelected.description}
                        </Typography>
                    </Box>
                    <Button variant='contained'>Take exam</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default PreviuwSummaryExam;