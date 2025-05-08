import { Box, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LogoWeb from '../../Components/logoWeb';
import InputFielEmail from '../../Components/Inputs/InputFielEmail';
import ButtonComponent from '../../Components/ButtonComponet';
import axiosInstance from '../../Service/Api';

import SimpleBackdrop from '../../Components/SimpleBackDrop';
import { Navigate } from 'react-router-dom';
import ChangeCredential from './ChangeCredential';


const ChangePassword = () => {
    const [email, setEmail] = useState();
    const [code, setCode] = useState("");
    const [ErrorCodeLenght, setErrorCodeLenght] = useState(false);
    // validate if the code is send 
    const [tokenSend, setTokenSend] = useState(false);
    // for validate if the code is valid
    const [tokenValid, setTokenValid] = useState(false);
    // code that send to changeCredential as parameter
    const [verifiedCode, setVerifiedCode] = useState("");

    const [errorToSendEmail, setErrorToSendEmail] = useState(false);
    const [isLoanding, setIsloanding] = useState(false);

    const changePasswordRequest = async () => {
        try {
            const response = await axiosInstance.get("/api/auth/generateTokenResetPassword/" + email);
            console.log(response);
            if (response.status == 200) {
                setTokenSend(true)
                setErrorToSendEmail(false)

            }

        } catch (error) {
            console.error(error);
            setTokenSend(false)
            setTokenValid(false)
            setErrorToSendEmail(true)
        }

    };

    const changePassword = async (code) => {
        try {
            const response = await axiosInstance.get("/api/auth/codeValid/" + code);
            console.log(response);
            if (response.data) {
                setTokenValid(true)
            }else{
                setTokenValid(false)
            }

        } catch (error) {
            console.error(error);
            setTokenValid(false)

        }
    }

    // function for get the token to change the password
    const handleFormEmail = async (e) => {
        e.preventDefault();
        setIsloanding(true);
        await changePasswordRequest()

        setIsloanding(false);
        setEmail("")
    }

    // function for change de password
    const handleFormCode = async (e) => {
        e.preventDefault();

        const codee = code.toString().trim();

        const isValid = /^\d{4}$/.test(codee);

        if (!isValid) {
            setErrorCodeLenght(true);
            return;
        } else {
            setErrorCodeLenght(false);
        }

        setIsloanding(true);
        await changePassword(code);
        setVerifiedCode(code);
        setCode("");
        setIsloanding(false);
    };


    const hanldleInputEmail = (e) => {
        setEmail(e.target.value);
    }

    const hanldleInputCode = (e) => {
        if (code.length < 1) {
            setErrorCodeLenght(false)

        }
        setCode(e.target.value);
    }
    useEffect(() => {

    }, [tokenSend])

    return (
        <>
            <Box sx={{ width: "100vw", height: "100vh", bgcolor: "background.default", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {isLoanding && <SimpleBackdrop />}

                
                {tokenValid ? (
                    <ChangeCredential code={verifiedCode} />
                ) : tokenSend ? (
                    // show form to send the code
                    <Box sx={{ width: "50%", height: "60%", bgcolor: "background.paper", display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column", borderRadius: "15px", p: "20px" }}>
                        <Box sx={{ position: "absolute", top: "5%", left: "5%" }}>
                            <LogoWeb />
                        </Box>
                        <Typography variant='h6' sx={{ color: "primary.main" }}>Change Password</Typography>
                        <Typography sx={{ opacity: 0.5, textAlign: "center" }}>
                            Please enter the 4-digit code we sent to your email ({email}) to continue with the password reset.
                        </Typography>
                        {ErrorCodeLenght && (
                            <Typography sx={{ color: "red" }}>
                                The code must be exactly 4 numeric digits.
                            </Typography>
                        )}
                        {tokenSend && (
                            <Typography sx={{ color: "red" }}>
                                The token is invalid. Please check that you entered it correctly or request a new one
                            </Typography>
                        )}
                        <form onSubmit={handleFormCode}>
                            <TextField
                                id="outlined-number"
                                label="Verification Code"
                                type="number"
                                required
                                onChange={hanldleInputCode}
                                value={code}
                                sx={{ mb: "20px" }}
                                slotProps={{
                                    inputLabel: {
                                        shrink: false,
                                    },
                                }}
                            />
                            <br />
                            <ButtonComponent text={"Verify Code"} type={"submit"} />
                        </form>
                    </Box>
                ) : (
                    // form to verification the email
                    <Box sx={{ width: "50%", height: "60%", bgcolor: "background.paper", display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column", borderRadius: "15px", p: "20px" }}>
                        <Box sx={{ position: "absolute", top: "5%", left: "5%" }}>
                            <LogoWeb />
                        </Box>
                        <Typography variant='h6' sx={{ color: "primary.main" }}>Account Verification</Typography>
                        <Typography sx={{ opacity: 0.5, textAlign: "center" }}>
                            Please enter your email address to receive a verification code and reset your password.
                        </Typography>
                        {errorToSendEmail && (
                            <Typography sx={{ color: "red", textAlign: "center" }}>
                                Something went wrong. Please try again or make sure your email is correct.
                            </Typography>
                        )}
                        <form onSubmit={handleFormEmail}>
                            <InputFielEmail value={email} onChange={hanldleInputEmail} />
                            <br />
                            <ButtonComponent text={"Send Code"} type={"submit"} />
                        </form>
                    </Box>
                )}
            </Box>
        </>
    );

};

export default ChangePassword;