import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../../../Service/Api';
import imageNotFoundImage from "../../../assets/notPhotoFound.webp"
import SimpleBackdrop from '../../../Components/SimpleBackDrop';
import ListExamUI from '../../Admin/Exams/ComponetsExamCustom/ListExamUI';
import LoandingText from '../../../Components/LoandingText';
import { TakeExamContext } from '../../../Context/ExamContext';


const SectionOfSubcategoriesExams = ({ idCategory, goBackToCategories, categoryTitle }) => {
    const [fetchData, setFetchData] = useState([]);
    const [showTest, setIsShowTest] = useState(false);
    const [testList, setTestList] = useState([]);
    const {setSubCategoryImageSelect} = useContext(TakeExamContext);

    useEffect(() => {
        const fetchData = async (id_category) => {
            try {
                const response = await axiosInstance.get(`/api/subcategory/getByCategory/${id_category}`);
                setFetchData(response.data.content)

            } catch (error) {
                console.error(error);

            }
        }
        fetchData(idCategory)
    }, [])

    const handleShowTest = async (id_subcategory) => {
        try {
            const response = await axiosInstance.get(`/api/exam/getBySubcategory/${id_subcategory}`);
            setTestList(response.data)


        } catch (error) {
            console.error(error);

        }

        setIsShowTest(true)
    }

    const showSubcategories = () => {
        setIsShowTest(false)
        setTestList([])
    }

    if (fetchData.length <= 0) {
        return <LoandingText />
    }
    return (
        <Box sx={{
            width: "100%",
            height: "100vh",

        }}>

            <Box sx={{ width: "100%", display: "flex", justifyContent: "start", mb: "20px" }}>
                <Button onClick={goBackToCategories} variant='outlined'> <ArrowBack></ArrowBack> Go back to categories</Button>
            </Box>

            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", mb: "50px" }}>
                <Typography sx={{ fontSize: "30px" }} variant='h3'>{categoryTitle}</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", }}>
                    <Typography sx={{ fontSize: "30px" }} variant='h3'>action</Typography>
                    <Typography sx={{ fontSize: "30px" }} variant='h3'>action</Typography>
                    <Typography sx={{ fontSize: "30px" }} variant='h3'>action</Typography>
                </Box>
            </Box>
            {showTest ? (
                <Box>
                    {testList.length >= 1 ? (
                        <Box >
                            <Button sx={{ mb: "20px" }} onClick={() => showSubcategories()}><ArrowBack sx={{ mr: "10px" }}></ArrowBack>  Go back to subcategories</Button>
                            {testList.map(test => {
                                return (
                                    <ListExamUI test={test} isTakeExam={true}/>
                                )
                            })}
                        </Box>
                    ) : (
                        "No there are exam for this subcategory"
                    )}
                </Box>
            ) :
                (
                    <Box>

                        <Grid container spacing={2}>
                            {fetchData.map((subcategory) => (
                                <Grid item xs={12} sm={6} md={4} key={subcategory.id_subcategory}>
                                    <Card sx={{ boxShadow: "none", borderRadius: 3 }}>
                                        {subcategory.image ? (
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={subcategory.image}
                                                alt={subcategory.title}
                                                sx={{ objectFit: 'cover' }}
                                            />
                                        ) : (<CardMedia
                                            component="img"
                                            height="140"
                                            image={imageNotFoundImage}
                                            alt={subcategory.title}
                                            sx={{ objectFit: 'cover' }}
                                        />)}
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                {subcategory.title}
                                            </Typography>

                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                {subcategory.description}
                                            </Typography>

                                            <Box textAlign="center">
                                                <Button variant="outlined" size="small"
                                                    onClick={() => { setSubCategoryImageSelect(subcategory.image),  handleShowTest(subcategory.id_subcategory)}}
                                                >
                                                    Show tests
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>


                    </Box>
                )}
        </Box>
    );
};

export default SectionOfSubcategoriesExams;