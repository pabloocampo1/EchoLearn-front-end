import { ArrowBack, CancelOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';


const ExamCreateSection = ({ cancelCreate, examData = {} }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: examData
    });

    const onSubmit = (data) => {
        console.log(data); 
    };


    return (
        <Box sx={{ mt: "50px" }}>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <Typography variant='h4' sx={{ opacity: "0.60" }}>Create your exam</Typography>
                <Button
                    onClick={cancelCreate}
                    variant="outlined"
                    sx={{
                        width: "120px",
                        height: "50px",
                        color: "red",
                        borderColor: "red",
                        "&:hover": {
                            borderColor: "darkred",
                            backgroundColor: "rgba(255, 0, 0, 0.04)",
                        },
                    }}
                >
                    <CancelOutlined sx={{ mr: "10px" }} />
                    Cancel
                </Button>

            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("title", { required: true })} placeholder="Name" />
                {errors.name && <span>This field is required</span>}

                <input {...register("questions.question", { required: true })} placeholder="Email" />
                {errors.email && <span>Email is required</span>}

                <button type="submit">Enviar</button>
            </form>

        </Box>
    );
};

export default ExamCreateSection;


