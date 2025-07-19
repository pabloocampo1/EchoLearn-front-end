import { ArrowDownward } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../Service/Api';
import imageNotFoundImage from "../../../assets/notPhotoFound.webp"
import SectionOfSubcategoriesExams from './SectionOfSubcategoriesExams';

const ExamSummaryHome = () => {
    const [categoriesListFetch, setCategoriesListFetch] = useState([]);
    const [errorFetch, setErrorFetch] = useState(false);
    const [isChooseCategory, setIsChooseCategory] = useState(false);
    const [categoryIdSelect, setCategoryIdSelect] = useState("");
    const [categoryNameSelect, setCategoryNameSelect] = useState("");



    const showSubcategory = (id_category, categoryTitle) => {
        setCategoryIdSelect(id_category)
        setCategoryNameSelect(categoryTitle)
        setIsChooseCategory(true)
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/api/category/public");

                if (response.status != 200) {
                    setErrorFetch(true)
                } else {
                    setErrorFetch(false)
                }
                const dataFetch = response.data;
                setCategoriesListFetch(dataFetch)

            } catch (error) {
                console.error(error);
                setErrorFetch(true)
            }
        }

        fetchData()
    }, []);




    return (
        <Box sx={{
            width: " 100%",
            height: "auto",
            p: { xs: "0px 50px", md: "0px 150px" },
            mb: "20px",
            bgcolor: "background.default"
        }}>
            <Box sx={{
                width: " 100%",
                height: "auto",
                textAlign: "center",
                p: "0px 200px",
                mt: "100px"
            }}>
                <Typography variant='h2' sx={{ paddingBottom: "20px", fontWeight: "500" }}>Test Your Knowledge</Typography>
                <Typography sx={{ pb: "50px", opacity: "0.50" }}> Explore our carefully organized exam categories to help you master each topic. Whether you're just starting or looking to deepen your knowledge, you'll find the right resources here to take your skills to the next level.</Typography>
                <a href="#tests">
                    <ArrowDownward sx={{ color: "text.primary" }} />
                </a>
            </Box>

            <Box sx={{
                width: " 100%",
                height: "auto",
                mt: "70px"
            }}>
                <Typography variant='h3' sx={{ color: "primary.main" }}> Our Categories</Typography>
                <Typography sx={{ pb: "40px", color: "text.primary" }}>Your learning journey starts here.</Typography>

                {errorFetch && (<div>Error with the pages, try more later</div>)}

                {isChooseCategory ? (
                    <SectionOfSubcategoriesExams idCategory={categoryIdSelect} goBackToCategories={() => { setCategoryIdSelect(""), setIsChooseCategory(false), setCategoryNameSelect("") }} categoryTitle={categoryNameSelect} />
                ) : (
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "20px"
                    }} >
                        {categoriesListFetch.map((category) => {
                            return (

                                <Box key={category.id} sx={{ height: "500px", display: "flex", flexDirection: "column", borderRadius: "15px", bgcolor: "background.paper" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "50%", padding: "20px" }}>
                                        {category.imageUrl ? (<img style={{ width: "100%", height: "100%", borderRadius: "15px" }} src={category.imageUrl} alt="image" />)
                                            : (<img style={{ width: "100%", height: "100%", borderRadius: "15px" }} src={imageNotFoundImage} alt="image" />)}
                                    </Box>
                                    <Box sx={{ width: "100%", height: "50%", display: "flex", flexDirection: "column", padding: "20px", position: "relative" }}>
                                        <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>{category.title}</Typography>
                                        <Typography sx={{ opacity: "0.70" }}>{category.description}</Typography>

                                        <Box sx={{ position: "absolute", width: "100%", display: "flex", justifyContent: "space-between", bottom: "5%", left: 0, padding: "20px" }}>
                                            <Typography>Topics available {category.totalSubcategories}</Typography>
                                            <Button
                                                variant='outlined'
                                                sx={{ width: "150px" }}
                                                onClick={() => {showSubcategory(category.id, category.title)}}
                                            >
                                                Show tests
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        })}

                    </Box>
                )}


            </Box>
        </Box >
    );
};

export default ExamSummaryHome;
