import { Box, Typography } from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';
import { useContext } from 'react';
import { ThemeContext } from '../../../Context/ThemeContext';




const HeroSection = () => {
    const { darkMode } = useContext(ThemeContext); 


    return (
        <Box
            sx={{
                width: "100%",
                height: "50vh",
                textAlign: "center",
                p: "0px 200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                overflow: "hidden",
                background: darkMode
                    ? "linear-gradient(to right, #434343, #000000)"
                    : "linear-gradient(135deg, #e0f7fa, #f3e5f5)",
                position: "absolute",
                top: "0%",
                left: "0%",
            }}
        >
            <Typography variant='h2' sx={{ paddingBottom: "20px", fontWeight: 500, }}>
                Test Your Knowledge
            </Typography>

            <Typography sx={{ pb: "50px", opacity: 0.5 }}>
                Explore our carefully organized exam categories to help you master each topic. Whether you're just starting or looking to deepen your knowledge, you'll find the right resources here to take your skills to the next level.
            </Typography>

            <a href="#tests">
                <ArrowDownward sx={{ color: "text.primary" }} />
            </a>

          
            <Box
                sx={{
                    width: "120px",
                    height: "120px",
                    bgcolor: "red",
                    borderRadius: "20px",
                    position: "absolute",
                    top: "60%",
                    left: "40%",
                    transform: "rotate(25deg)",

                    opacity: 0.3
                }}
            />
            <Box
                sx={{
                    width: 0,
                    height: 0,
                    borderLeft: "60px solid transparent",
                    borderRight: "60px solid transparent",
                    borderBottom: "120px solid green",
                    position: "absolute",
                    top: "20%",
                    left: "0%",
                    transform: "rotate(25deg)",
                    opacity: 0.3,
                }}
            />

            <Box
                sx={{
                    width: "80px",
                    height: "80px",
                    bgcolor: "blue",
                    borderRadius: "50%",
                    position: "absolute",
                    bottom: "-20px",
                    right: "50px",
                    transform: "rotate(-15deg)",

                    opacity: 0.2
                }}
            />
            <Box
                sx={{
                    width: "80px",
                    height: "80px",
                    bgcolor: "violet",
                    borderRadius: "50%",
                    position: "absolute",
                    bottom: "40%",
                    right: "80%",
                    transform: "rotate(-15deg)",

                    opacity: 0.2
                }}
            />
            <Box
                sx={{
                    width: "80px",
                    height: "80px",
                    bgcolor: "blue",
                    borderRadius: "50%",
                    position: "absolute",
                    bottom: "-20px",
                    right: "50px",
                    transform: "rotate(-15deg)",

                    opacity: 0.2
                }}
            />
            <Box
                sx={{
                    width: "100px",
                    height: "100px",
                    bgcolor: "green",
                    position: "absolute",
                    top: "25%",
                    left: "70%",
                    transform: "translate(-50%, -50%) rotate(45deg)",

                    opacity: 0.15
                }}
            />
            <Box
                sx={{
                    width: "100px",
                    height: "100px",
                    bgcolor: "red",
                    position: "absolute",
                    top: "10%",
                    left: "90%",
                    transform: "translate(-50%, -50%) rotate(45deg)",

                    opacity: 0.15
                }}
            />
        </Box>
    );
};

export default HeroSection;
