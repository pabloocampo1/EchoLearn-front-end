import { Box, Button, Input, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAll } from '../../../../Service/SubcategoryService';
import SubcategoriesCard from './SubcategoriesCard';
import { Add, ArrowLeft, ArrowRight, ForkLeft } from '@mui/icons-material';
import GenericModal from '../../../../Components/GenericModal';
import SubcategoryForm from '../../../../Components/forms/SubcategoryForm';
import axiosInstance from '../../../../Service/Api';

const Subcategories = () => {
    const [data, setData] = useState([]);
    const [errorFetchData, setErrorFetchData] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [page, setPage] = useState(0);
    const [limitOfPages, setLimitOfPages] = useState(0);
    const [inputSearch, setInputSearch] = useState('');

    const fetchData = async () => {

        const response = await getAll(page);

        if (response == null || response.status === 401 || response.status === 403) {
            setErrorFetchData(true);
        } else {
            setErrorFetchData(false);
            if (inputSearch.trim()) {
                const fetchDataByTitle = async (title) => {
                    try {
                        const response = await axiosInstance.get(`/api/subcategory/findByTitle/${title}`);
                         setData(response.data)
                    } catch (error) {
                        console.error(error);

                    }
                }

                fetchDataByTitle(inputSearch)
            }else{
                  setData(response.data.content);
            }
          
            setLimitOfPages(response.data.totalPages)
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, inputSearch]);



    const changeState = () => {
        fetchData()
    };

    const handleDeleteLocal = (id) => {
        setData(prev => prev.filter(item => item.id_subcategory !== id))
    };

    const handleInputSearch = (e) => {
        setInputSearch(e.target.value)
    }

    if (errorFetchData) {
        return <div>Error pulling the data.</div>;
    }

    return (
        <Box sx={{ mt: "70px" }}>
            {openModal && (
                <GenericModal
                    open={openModal}
                    handleClose={() => setOpenModal(false)}
                    compo={<SubcategoryForm onChange={fetchData} handleClose={() => setOpenModal(false)} />}
                />
            )}
            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", mb: "30px" }}>
                <Typography sx={{ fontSize: "25px" }}>Subcategory Management</Typography>
                <Box>
                    <Input
                        placeholder="Search"
                        onChange={handleInputSearch}
                        value={inputSearch}
                        type="text"
                        sx={{ mr: "20px" }}
                    />
                    <Button sx={{ color: "white" }} variant='contained' onClick={() => setOpenModal(true)}>
                        <Add />new Subcategory
                    </Button>
                </Box>
            </Box>
            <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                {data.length <= 0 && (<Box>No there are subcategories to show</Box>)}
                {data.map(item => (

                    <SubcategoriesCard key={item.id_subcategory} data={item} onChangeState={changeState} deleteLocal={handleDeleteLocal} />

                ))}
            </Box>
            <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
                <Button onClick={() => {
                    if (page <= 0) {
                        return;
                    } else {
                        setPage(page - 1)
                    }
                }} sx={{ mr: "10px" }}> <ArrowLeft />  Back  </Button>
                -
                <Button onClick={() => {
                    if (page < limitOfPages) {
                        setPage(page + 1)
                    }
                }} sx={{ ml: "10px" }}>next <ArrowRight />  </Button>
            </Box>
        </Box>
    );
};

export default Subcategories;
