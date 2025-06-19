import { Label } from '@mui/icons-material';
import { Box, FormControl, Input, Switch, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SimpleBackdrop from '../SimpleBackDrop';
import ButtonComponent from '../ButtonComponet';
import { getAllAvailable } from '../../Service/CategoryService';
import { save, updateSubcategory } from '../../Service/SubcategoryService';
import MultipleSelectPlaceholder from './MultipleSelectCategories';

const SubcategoryForm = ({ title = "Add New Subcategory", data = {}, onChange, handleClose, isUpdate = false }) => {
    const [dataForm, setDataForm] = useState({
        id: null,
        title: '',
        description: '',
        available: true,
        image: null,
        categories: []
    })
    const [isLoanding, setIsLoanding] = useState(false);
    const [categoriesListToSelect, setCategoriesListToSelect] = useState([]);

    const [selectedForSubmit, setSelectedForSubmit] = useState([]);

    useEffect(() => {
        const fetchCategoriesList = async () => {
            const response = await getAllAvailable();
            setCategoriesListToSelect(response["data"]);
        };

        fetchCategoriesList();

        if (data) {
            setDataForm({
                id: data.id_subcategory || null,
                title: data.title || '',
                description: data.description || '',
                available: data.available ?? true,
                image: null,
                categories: data.categories
            });


            if (isUpdate && data.categories) {

                setSelectedForSubmit(
                    data.categories.map(title => ({ title }))
                );
            }
        }

    }, []);


    const handleSubmit = async (e) => {
        try {
            setIsLoanding(true)
            e.preventDefault();
            const formData = new FormData();

            if (dataForm.id) {
                formData.append('id', dataForm.id)
            }
            formData.append('title', dataForm.title);
            formData.append('description', dataForm.description);
            formData.append('available', dataForm.available);


            if (dataForm.image) {
                formData.append('image', dataForm.image);
            }

            selectedForSubmit.forEach(category => {
                formData.append('categories', category.id);
            });

            if (isUpdate) {
                await updateSubcategory(formData)
            } else {
                await save(formData);
            }
            setIsLoanding(false)
            setDataForm(
                {
                    id: null,
                    title: '',
                    description: '',
                    available: true,
                    image: null,
                    categories: []
                }
            )
            onChange()
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

    const handleSelectedNames = (categories) => {
        setSelectedForSubmit(categories);
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
            }}>{title}</Typography>

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
                    {data.imageUrl && (
                       <Box>
                            <img width={100} src={data.imageUrl} alt="pre lower" />
                       </Box>
                    )}
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
                <MultipleSelectPlaceholder
                    onSelect={handleSelectedNames}
                    dataList={categoriesListToSelect}
                    categoriesSelected={isUpdate ? data.categories : []} // 🔥 Si estás editando, mándale los nombres; si no, mándale un array vacío
                />


                {/* {selectedCategories.map(item => {
                    <li key={item.id}>{item.title}</li>
                   })} */}
                <ButtonComponent text={title} type={"submit"} />
            </Box>
        </Box>
    );
};

export default SubcategoryForm;