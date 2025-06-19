import { Box, Input, Switch, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { save } from '../../Service/CategoryService';
import ButtonComponent from '../ButtonComponet';
import SimpleBackdrop from '../SimpleBackDrop';

const CategoryForm = ({ data = {}, text = "Add New Category", handleClose }) => {
    const [dataForm, setDataForm] = useState({
        id: null,
        title: '',
        description: '',
        available: true,
        image: null,
    })
    const [isLoanding, setIsLoanding] = useState(false);

    useEffect(() => {
        if (data) {
            setDataForm({
                id: data.id || null,
                title: data.title || '',
                description: data.description || '',
                available: data.available ?? true,
                image: null,
            });
        }
    }, []);

    const handleSubmit = async (e) => {
        try {
            setIsLoanding(true)
            e.preventDefault();
            const formData = new FormData();

            Object.entries(dataForm).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formData.append(key, value);
                }
            });


            await save(formData);
            setIsLoanding(false)
            setDataForm(
                {
                    id: null,
                    title: '',
                    description: '',
                    available: true,
                    image: null,
                }
            )
            handleClose()

        } catch (error) {
            console.log(error);

        }
    }
    const handleInput = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value,
        })

    }
    const handleChecked = (e) => {
        setDataForm({
            ...dataForm,
            available: e.target.checked,
        })
    };
    const handleImage = (e) => {
        setDataForm(prev => ({
            ...prev,
            image: e.target.files[0],
        }));
    };

    const styleBoxInputs = {
        width: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pb: "30px"
    }

    return (
        <Box sx={{
            width: "400px",
            height: " auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            {isLoanding && <SimpleBackdrop />}
            <Typography sx={{
                mb: "30px",
                fontWeight: "bold"
            }}>{text}</Typography>

            <Box component="form" sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }} onSubmit={handleSubmit}>
                <Box sx={styleBoxInputs}>
                    <label htmlFor="title">Title</label>
                    <Input placeholder='Title' onChange={handleInput} value={dataForm.title} id='title' name='title' type='text' required />
                </Box>
                <Box sx={styleBoxInputs}>
                    <label htmlFor="description">Description</label>
                    <Input placeholder='Description' onChange={handleInput} value={dataForm.description} id='description' name='description' type='text' required />
                </Box>
                <Box sx={styleBoxInputs}>
                    <label htmlFor="image">Image</label>
                    <Input onChange={handleImage} name='image' type='file' />
                </Box>
                <Box sx={styleBoxInputs}>
                    <label htmlFor="State">State</label>
                    <Switch
                        checked={dataForm.available}
                        onChange={handleChecked}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Box>
                <ButtonComponent text={text} type={"submit"} />
            </Box>
        </Box>
    );
};

export default CategoryForm;