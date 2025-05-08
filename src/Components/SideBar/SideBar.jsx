import { Box } from '@mui/material';
import React, {  useContext, useEffect, useState } from 'react';
import OptionSidebar from './OptionSidebar';
import { useNavigate } from 'react-router-dom';
import LogoWeb from '../logoWeb';
import { AuthContext } from '../../Context/AuthContext';

const SideBar = ({ options }) => {
    const [optionSelect, setOptionSelect] = useState("");
    const navigate = useNavigate();
    const {state} = useContext(AuthContext);

    const handleSelect = (nameOption, path) => {
       
        localStorage.setItem("sectionSidebar", JSON.stringify({
            name: nameOption,
            path: path,
        }));
        setOptionSelect(nameOption);
        navigate(path);
    };

    useEffect(() => {
        const stateSection = localStorage.getItem("sectionSidebar");
        const stateSectionParced = JSON.parse(stateSection);
        if (stateSection) {
            handleSelect(stateSectionParced.name, stateSectionParced.path);
        }else{
            const defaultLayout =
            state.role === "ROLE_USER"
                ? "/user"
                : state.role === "ROLE_ADMIN"
                ? "/app"
                : "/";

        handleSelect("dashboard", `${defaultLayout}`);
        }
    },[])

    

    return (
        <Box sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "20%",
            height: "100vh",
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: "40px 0px",
            borderRight: "1px solid #3BB09D ",
            borderRadius: "0px 15px 15px 0px"
        }}>
            <Box sx={{ width: "100%", mb: "60px" }}>
                <LogoWeb />
            </Box>

            <Box sx={{ width: "100%", height: "auto" }}>
                <Box component="ul" sx={{ listStyle: "none" }}>
                    <Box component="li" sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        {options.map(opt => (
                            <OptionSidebar
                                key={opt.name}
                                title={opt.title}
                                img={React.cloneElement(opt.icon, {
                                    sx: { color: optionSelect === opt.name ? "primary.main" : "" }
                                })}
                                active={optionSelect === opt.name}
                                onClick={() => handleSelect(opt.name, opt.path)}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SideBar;
