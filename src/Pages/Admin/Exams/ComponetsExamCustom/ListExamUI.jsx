
import { DeleteOutline, EditNoteOutlined, EmojiEventsOutlined, Image, InsertChart, MoreVertOutlined, Photo, PunchClock, QuestionAnswer, QuestionAnswerOutlined, } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import ButtonComponent from '../../../../Components/ButtonComponet';
import SimpleBackdrop from '../../../../Components/SimpleBackDrop';
import { useContext } from 'react';
import { AuthContext } from '../../../../Context/AuthContext';
import { TakeExamContext } from '../../../../Context/ExamContext';
import { useNavigate } from 'react-router-dom';



const ListExamUI = ({ test = {}, isTakeExam, editExam }) => {
    const { state } = useContext(AuthContext);
    const {setExamSelected} = useContext(TakeExamContext);
    const naviagate = useNavigate();

    function capitalizeFirstWord(text) {
        if (!text) return "";
        const words = text.split(" ");
        words[0] = words[0][0].toUpperCase() + words[0].slice(1);
        return words.join(" ");
    }

    if (!test) {
        return <SimpleBackdrop />
    }

    return (
        <Box key={test.id_exam}
            sx={{
                width: "100%",
                height: "50px",
                bgcolor: "background.paper",
                mb: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
            <Box sx={{ width: "50%", height: "80%", display: "flex", justifyContent: "start", alignItems: "center" }}>
                <MoreVertOutlined />
                {test.level === "easy" && (<Box sx={{ width: "20px", height: "20px", bgcolor: "green" }}></Box>)}
                {test.level === "intermediate" && (<Box sx={{ width: "20px", height: "20px", bgcolor: "yellow" }}></Box>)}
                {test.level === "hard" && (<Box sx={{ width: "20px", height: "20px", bgcolor: "red" }}></Box>)}
                <Typography sx={{ pl: "10px" }}>{capitalizeFirstWord(test.level)}</Typography>
                <Box sx={{ width: "1px", height: "70%", bgcolor: "#2A8A7A", ml: "10px", mr: "10px" }}></Box>
                <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>{test.title}</Typography>

            </Box>

            <Box sx={{ width: "50%", display: "flex", justifyContent: "end", alignItems: "center" }}>
                <Box sx={{ width: { xs: "20%", mb: "30%" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <EmojiEventsOutlined />
                    <Typography sx={{ ml: "5px", opacity: "0.60" }}>{test.points}</Typography>
                </Box>
                <Box sx={{ width: { xs: "20%", mb: "30%" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <QuestionAnswerOutlined />
                    <Typography sx={{ ml: "5px", opacity: "0.60" }}>{test.totalQuestion}</Typography>
                </Box>
                <Box sx={{ width: { xs: "20%", mb: "30%" }, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <PunchClock />
                    <Typography sx={{ ml: "5px", opacity: "0.60" }}>{test.duration}</Typography>
                </Box>
                <Box sx={{ width: { xs: "30%", mb: "30%" }, display: "flex", justifyContent: "center", alignItems: "center", borderLeft: "1px solid  #2A8A7A" }}>
                    {isTakeExam ? (
                        <> <ButtonComponent text={"Show more"} width='100px' height='20px' onClick={() => {setExamSelected(test), naviagate("/exam") }} />
                        </>
                    ) : (
                        <>
                            {state.isAuthenticated && state.role == "ROLE_ADMIN" || state.role == "ROLE_SUPERADMIN" ? (
                                <>
                                    <DeleteOutline sx={{ mr: "10px" }} />
                                    <EditNoteOutlined onClick={() => editExam(test.id)} />
                                </>
                            ) : (
                                ""
                            )}
                        </>
                    )}
                </Box>
            </Box>


        </Box>
    );
};

export default ListExamUI;