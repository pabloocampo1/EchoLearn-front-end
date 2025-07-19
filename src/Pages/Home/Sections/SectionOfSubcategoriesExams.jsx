import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../Service/Api';
import imageNotFoundImage from "../../../assets/notPhotoFound.webp"


const SectionOfSubcategoriesExams = ({ idCategory, goBackToCategories, categoryTitle }) => {
    const [fetchData, setFetchData] = useState([]);

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
    return (
        <Box sx={{
            width: "100%",
            height: "100vh",

        }}>

            <Box sx={{ width: "100%", display: "flex", justifyContent: "start", mb: "20px" }}>

                <Button onClick={goBackToCategories} variant='text'> <ArrowBack></ArrowBack>  go back</Button>
               
            </Box>

            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", mb: "50px" }}>
                 <Typography sx={{ fontSize: "30px" }} variant='h3'>{categoryTitle}</Typography>
               <Box sx={{display: "flex", justifyContent: "space-between",}}>
                 <Typography sx={{ fontSize: "30px" }} variant='h3'>action</Typography>
                 <Typography sx={{ fontSize: "30px" }} variant='h3'>action</Typography>
                 <Typography sx={{ fontSize: "30px" }} variant='h3'>action</Typography>
               </Box>
            </Box>
            <Box>
                {fetchData.length <= 0
                    && ("No There are results...")}

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

                                    <Typography variant="body2"  sx={{ mb: 1 }}>
                                       {subcategory.description}
                                    </Typography>

                                    <Box textAlign="center">
                                        <Button variant="outlined" size="small">
                                            Show tests
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>


            </Box>
        </Box>
    );
};

export default SectionOfSubcategoriesExams;