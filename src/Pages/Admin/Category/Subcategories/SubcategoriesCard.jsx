import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { deleteSubcategory } from '../../../../Service/SubcategoryService';
import GenericModal from '../../../../Components/GenericModal';
import SubcategoryForm from '../../../../Components/forms/SubcategoryForm';
import imageNotFoundImage from "../../../../assets/notPhotoFound.webp"

const SubcategoriesCard = ({ data = {}, onChangeState, deleteLocal }) => {
    const [isUpdateSubcategory, setIsUpdateCategory] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteSubcategory(data.id_subcategory);
            deleteLocal(data.id_subcategory)
        } catch (error) {
            console.error('Error deleting subcategory', error);
        }


    };

    return (
        <Box sx={{
            width: "300px",
            height:"400px",
            bgcolor: "background.paper",
        }}>
            {isUpdateSubcategory && (
                <GenericModal
                    open={isUpdateSubcategory}
                    handleClose={() => setIsUpdateCategory(false)}
                    compo={<SubcategoryForm title='Update Subcategory' data={data} onChange={onChangeState} handleClose={() => setIsUpdateCategory(false)} isUpdate={true} />}
                />
            )}
          
            <Box>
               {data.imageUrl ? ( <img width={"100%"} height={"150px"} src={data.imageUrl} alt="image" />)
               :  ( <img width={"100%"} height={"150px"} src={imageNotFoundImage} alt="image" />)}
            </Box>
              {data.title}
            <Button onClick={handleDelete}>Eliminar</Button>
            <Button onClick={() => setIsUpdateCategory(true)}>Editar</Button>
        </Box>
    );
};

export default SubcategoriesCard;
