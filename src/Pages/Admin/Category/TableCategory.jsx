import { Box, Typography } from '@mui/material';

import StateActiveOrInactive from '../../../Components/StateActiveOrInactive';
import { DeleteOutline, EditNoteOutlined, InfoOutlined, } from '@mui/icons-material';
import { useState } from 'react';
import GenericModal from '../../../Components/GenericModal';
import CategoryForm from '../../../Components/forms/CategoryForm';
import { deleteCategory } from '../../../Service/CategoryService';


const TableCategory = ({ data = [], onChange }) => {
    const [openModal, setOpenModal] = useState(false);
    const [dataCategoryToEdit, setDataCategoryToEdit] = useState({});
    const [visibleItems, setVisibleItems] = useState(5); 


    const edit = (item) => {
        setOpenModal(true)
        setDataCategoryToEdit(item)

    }

    const remove = async (id) => {
        await deleteCategory(id);
        onChange();
       
        
    };
    const info = () => { }

    const columnStyle = (width = "20%") => ({
        width,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    });


    if (data.length === 0) {
        return <Typography>No categories found.</Typography>
    }


    return (
        <Box sx={{
            width: "100%",
            height: "auto",
            bgcolor: "",
        }}>
            <GenericModal open={openModal} handleClose={() => setOpenModal(false)} compo={<CategoryForm data={dataCategoryToEdit} text='Edit Category' handleClose={() => {
                setOpenModal(false);
                onChange();
            }} />} />
            <Box sx={{ display: "flex", bgcolor: "background.paper", justifyContent: "space-between", alignItems: "center", mb: "10px", p: "10px", borderRadius: "20px 20px 0px 0px" }}>
                <Box sx={columnStyle("5%")}>
                    <Typography sx={{ fontWeight: "bold" }}>Id</Typography>
                </Box>
                <Box sx={columnStyle()}>
                    <Typography sx={{ fontWeight: "bold" }}>Title</Typography>
                </Box>
                <Box sx={columnStyle()}>

                    <Typography sx={{ fontWeight: "bold" }}>Status</Typography>
                </Box>
                <Box sx={columnStyle()}>

                    <Typography sx={{ fontWeight: "bold" }}>Description</Typography>
                </Box>
                <Box sx={columnStyle()}>

                    <Typography sx={{ fontWeight: "bold" }}>Create date</Typography>
                </Box>
                <Box sx={columnStyle()}>
                    <Typography sx={{ fontWeight: "bold" }}>Options</Typography>
                </Box>
            </Box>
            <Box>
              {data.slice(0, visibleItems).map((item, index) => (
                    <Box key={index} sx={{ height: "50px", display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "background.paper", mb: "5px", p: "10px" }}>
                        <Box sx={columnStyle("5%")}>
                            <Typography>{item.id}</Typography>
                        </Box>
                        <Box sx={columnStyle()}>
                            <Typography>{item.title}</Typography>
                        </Box>
                        <Box sx={{
                            width: "20%",
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 1
                        }}>
                            <Typography>{item.description}</Typography>
                        </Box>
                        <Box sx={columnStyle()}>
                            <StateActiveOrInactive text={item.available ? "Active" : "Inactive"} state={item.available} />
                        </Box>
                        <Box sx={columnStyle()}>
                            <Typography>{item.title}</Typography>
                        </Box>
                        <Box sx={columnStyle()}>
                            <EditNoteOutlined sx={{ color: "primary.main", width: "30px", cursor: "pointer" }} onClick={() => edit(item)} />
                            <DeleteOutline sx={{ color: "primary.main", width: "30px" }} onClick={() => remove(item.id)} />
                            <InfoOutlined sx={{ color: "primary.main", width: "30px" }} onClick={() => info()} />

                        </Box>

                    </Box>
                ))}
                

            </Box>
          
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap:"20px" }}>
        <Typography
            sx={{
                cursor: 'pointer',
                color: 'primary.main',
                fontWeight: 'bold',
                textDecoration: 'underline'
            }}
            onClick={() => setVisibleItems(visibleItems + 5)}
        >
            Show More
        </Typography>
        <Typography
            sx={{
                cursor: 'pointer',
                color: 'primary.main',
                fontWeight: 'bold',
                textDecoration: 'underline'
            }}
            onClick={() => {
                if(visibleItems > 5){
                    setVisibleItems(visibleItems - 5);
                }
            }} 
        >
            Show less
        </Typography>
    </Box>


        </Box>
    );
};

export default TableCategory;