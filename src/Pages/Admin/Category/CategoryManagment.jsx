// CategoryManagment.jsx
import React, { useEffect, useState } from 'react';
import { Box, Input, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import ButtonComponent from '../../../Components/ButtonComponet';
import { getAll, getByName } from '../../../Service/CategoryService';
import GenericModal from '../../../Components/GenericModal';
import CategoryForm from '../../../Components/forms/CategoryForm';
import TableCategory from './TableCategory';
import Subcategories from './Subcategories/Subcategories';

const CategoryManagment = () => {
    const [inputSearch, setInputSearch] = useState('');
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const loadCategories = async () => {
        const categories = inputSearch.trim()
            ? await getByName(inputSearch)
            : await getAll();
        setData(categories);
    };

    const handleInputSearch = async (e) => {
        setInputSearch(e.target.value);
    };

    
   useEffect(() => {
        loadCategories();
    }, [inputSearch]);

    return (
        <Box>
            <GenericModal
                open={openModal}
                handleClose={() => setOpenModal(false)}
                compo={
                    <CategoryForm
                        handleClose={() => {
                            setOpenModal(false);
                            loadCategories(); 
                        }}
                    />
                }
            />
            <Box sx={{ width: "100%" }}>
                 <Box sx={{display:"flex", justifyContent:"space-between", gap:"10px", mb:"40px"}}>
                        <Box sx={{width:"20%", height:"100px" , bgcolor:"background.paper"}}>
                            <Typography>cantidad de quien sabe</Typography>
                        </Box>
                        <Box sx={{width:"20%", height:"100px" , bgcolor:"background.paper"}}>Total Categories: 23</Box>
                        <Box sx={{width:"20%", height:"100px" , bgcolor:"background.paper"}}>created today categories: 12 </Box>
                        <Box sx={{width:"20%", height:"100px" , bgcolor:"background.paper"}}>Total Categories: 23</Box>

                    </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: "20px" }}>
                    
                    <Typography sx={{ fontSize: "25px" }}>Category Managment</Typography>
                   
                    <Box sx={{ display: "flex" }}>
                        <Input
                            placeholder="Search"
                            onChange={handleInputSearch}
                            value={inputSearch}
                            type="text"
                            sx={{ mr: "20px" }}
                        />
                        <ButtonComponent
                            text={"Add"}
                            width="100px"
                            height="20px"
                            icon={<Add />}
                            onClick={() => setOpenModal(true)}
                        />
                    </Box>
                </Box>
                <TableCategory data={data} onChange={() => loadCategories()} />
                <Subcategories  />
            </Box>
        </Box>
    );
};

export default CategoryManagment;
