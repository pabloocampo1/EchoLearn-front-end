import { ArrowBack, CancelOutlined } from '@mui/icons-material';
import {
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormHelperText,
    FormControlLabel,
    Checkbox,
    Button,
    Divider
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { allSubcategories } from '../../../Service/SubcategoryService';
import axiosInstance from '../../../Service/Api';



const ExamCreateSection = ({ cancelCreate, examData = {} }) => {
    const [subcategories, setSubcategories] = useState([]);
    const [errorFetch, setErrorFetch] = useState({
        "state": false,
        "messageError": ""
    });
    const { register, handleSubmit, formState: { errors }, reset, control, watch } = useForm({
        defaultValues: examData,
        mode: "onChange"
    });

    const { fields: questionFields, append: appendQuestion, remove } = useFieldArray({
        control,
        name: "questions"

    });

    

    const onSubmit = (data) => {

        console.log("hola");

        // delete the answers that are boolean and no have answerText
        // and then, modifid the questions boolean for return to according the first answerText of the question
        data.questions.map(q => {
            if (q.type == "boolean") {
                let newAnswers = q.answers.filter(a => a.answerText !== "");
            
              if(newAnswers[0].answerText == "true"){
                     q.answers = [
                        {
                            "answerText": "True",
                            "isCorrect": true
                        },
                        {
                             "answerText": "False",
                            "isCorrect": false
                        }] 
                }else{
                   q.answers = [
                        {
                            "answerText": "True",
                            "isCorrect": false
                        },
                        {
                             "answerText": "False",
                            "isCorrect": true
                        }] 
                }
                
            };

        });

        const saveExam = async () => {
            try {
                const response = await axiosInstance.post("/api/exam/create", data);
                console.log(response);

                alert("se creo melo")
                reset()
                cancelCreate()


            } catch (error) {
                if (error.response && error.response.status === 400) {
                    setErrorFetch({
                        state: true,
                        messageError: error.response.data.message
                    });
                } else {
                    console.error("Error inesperado:", error);
                }
            }
        }


        saveExam()
        console.log(data);


    };
    const onError = (errors) => {
        console.log("Errores del formulario:", errors);
    };

    useEffect(() => {
        const fetchSubcategories = async () => {
            const subcategories = await allSubcategories();
            setSubcategories(subcategories)
        }

        fetchSubcategories()
    }, [])




    return (
        <Box sx={{ mt: "50px" }}>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <Typography variant='h4' sx={{ opacity: "0.60" }}>Create your exam</Typography>
                <Button
                    onClick={() => { cancelCreate(), reset() }}
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

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit, onError)}
                sx={{
                    maxWidth: '100%',
                    margin: 'auto',
                    mt: 4,
                    p: 4,
                    border: '1px solid #e0e0e0',
                    borderRadius: 3,
                    boxShadow: 3,
                    backgroundColor: '#fff'
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Main information of the test
                </Typography>

                <TextField
                    fullWidth
                    label="Title of the test"
                    margin="normal"
                    {...register('title', { required: true })}
                    error={!!errors.title}
                    helperText={errors.title && 'This field is required'}
                />

                <TextField
                    fullWidth
                    label="Description"
                    margin="normal"
                    {...register('description', { required: true })}
                    error={!!errors.description}
                    helperText={errors.description && 'This field is required'}
                />

                <FormControl fullWidth margin="normal" error={!!errors.subcategory}>
                    <InputLabel>Subcategories</InputLabel>
                    <Select
                        multiple
                        defaultValue={[]}
                        {...register('subcategories', { required: true })}
                    >
                        <MenuItem value="" disabled>
                            Select the subcategories for this test
                        </MenuItem>

                        {subcategories.map((subcategory) => (
                            <MenuItem
                                key={subcategory.id_subcategory}
                                value={subcategory.id_subcategory}
                            >
                                {subcategory.title}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.subcategories && (
                        <FormHelperText>This field is required</FormHelperText>
                    )}
                </FormControl>


                <FormControl fullWidth margin="normal" error={!!errors.level}>
                    <InputLabel>Level</InputLabel>
                    <Select defaultValue="" {...register('level', { required: true })}>
                        <MenuItem value="" disabled>
                            Select the level of the test
                        </MenuItem>
                        <MenuItem value="easy">Easy</MenuItem>
                        <MenuItem value="intermedio">Intermediate</MenuItem>
                        <MenuItem value="hard">Hard</MenuItem>
                    </Select>
                    {errors.level && <FormHelperText>This field is required</FormHelperText>}
                </FormControl>



                <TextField
                    fullWidth
                    type="number"
                    label="Points if win"
                    margin="normal"
                    {...register('points', { required: true })}
                    error={!!errors.points}
                    helperText={errors.points && 'This field is required'}
                />

                <TextField
                    fullWidth
                    type="number"
                    label="Duration in minutes"
                    margin="normal"
                    {...register('duration', { required: true })}
                    error={!!errors.duration}
                    helperText={errors.duration && 'This field is required'}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                      
                            {...register('available', { required: true })}
                            defaultChecked={true}
                        />
                    }
                    label="Available"
                />
                {errors.available && (
                    <Typography color="error" variant="caption">
                        This field is required
                    </Typography>
                )}

                <Divider sx={{ my: 4 }} />

                <Typography variant="h6" gutterBottom>
                    Questions
                </Typography>

                {questionFields.map((q, questionIndex) => (
                    <Box
                        key={q.id}
                        sx={{
                            border: '1px solid #ccc',
                            borderRadius: 2,
                            p: 2,
                            mb: 3,
                            backgroundColor: '#f9f9f9'
                        }}
                    >
                        <TextField
                            label="Question"
                            fullWidth
                            {...register(`questions.${questionIndex}.question`, {
                                required: true,
                            })}
                            error={!!errors?.questions?.[questionIndex]?.questionText}
                            helperText={
                                errors?.questions?.[questionIndex]?.questionText &&
                                'This field is required'
                            }
                        />



                        <FormControlLabel
                            control={
                                <Checkbox {...register(`questions.${questionIndex}.available`)}  defaultChecked={true} />
                            }
                            label="Available"
                        />

                        <Typography variant="subtitle1" sx={{ mt: 2 }}>
                            Answers
                        </Typography>



                        <FormControl fullWidth margin="normal">
                            <InputLabel>Type</InputLabel>
                            <Select
                                defaultValue="multiple"
                                {...register(`questions.${questionIndex}.type`, { required: true })}
                            >
                                <MenuItem value="multiple">Multiple Choice</MenuItem>
                                <MenuItem value="boolean">True / False</MenuItem>
                            </Select>
                        </FormControl>

                        {watch(`questions.${questionIndex}.type`) === 'boolean' ? (
                            <>
                                <FormControl fullWidth margin="normal" error={!!errors.level}>
                                    <InputLabel>Select if the question is true or false</InputLabel>
                                    <Select defaultValue="" {...register(`questions.${questionIndex}.answers.0.answerText`, { required: true })}>
                                        <MenuItem value="" disabled>
                                            Select if the question is correct or not
                                        </MenuItem>
                                        <MenuItem value="true">True</MenuItem>
                                        <MenuItem value="false">False</MenuItem>
                                       
                                    </Select>
                                    {errors.level && <FormHelperText>This field is required</FormHelperText>}
                                </FormControl>
                            </>

                        ) : (
                            <>
                                {[0, 1, 2, 3].map((i) => (
                                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                                        <TextField
                                            label={`Answer ${i + 1}`}
                                            fullWidth
                                            {...register(`questions.${questionIndex}.answers.${i}.answerText`, {
                                                required: true
                                            })}
                                            error={!!errors?.questions?.[questionIndex]?.answers?.[i]?.answerText}
                                            helperText={
                                                errors?.questions?.[questionIndex]?.answers?.[i]?.answerText &&
                                                'Required'
                                            }
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    {...register(`questions.${questionIndex}.answers.${i}.isCorrect`)}
                                                />
                                            }
                                            label="Correct"
                                        />
                                    </Box>
                                ))}
                            </>
                        )}
                        <Button sx={{
                            color: "red",
                            borderColor: "red",
                            "&:hover": {
                                borderColor: "darkred",
                                backgroundColor: "rgba(255, 0, 0, 0.04)",
                            },
                        }} type="button" onClick={() => remove(questionIndex)}>Remove question</Button>
                    </Box>
                ))}

                <Button
                    type="button"
                    variant="outlined"
                    onClick={() =>
                        appendQuestion({
                            question: '',
                            type: 'multiple',
                            available: true,
                            answers: [
                                { answerText: '', isCorrect: false },
                                { answerText: '', isCorrect: false },
                                { answerText: '', isCorrect: false },
                                { answerText: '', isCorrect: false }
                            ]
                        })
                    }
                    sx={{ mb: 4 }}
                >
                    Add another question
                </Button>
                {errorFetch.state && <Typography sx={{ color: "red" }}>{errorFetch.messageError}</Typography>}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                    <Button
                        onClick={() => {
                            cancelCreate();
                            reset();
                        }}
                        variant="outlined"
                        color="error"
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>

        </Box>
    );
};

export default ExamCreateSection;


