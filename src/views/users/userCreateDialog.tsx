import { UserCreatePayload } from "@/types/user.type";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentProps, DialogTitle, FormControl, FormHelperText, LinearProgress, TextField } from "@mui/material";
import createNewUser from "@/hooks/users/createNewUser";
import { useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from "react";
type props = {
    open: boolean;
    onClose: () => void;
    onUserCreated: (data: UserCreatePayload) => void;
}

const defaultValues: UserCreatePayload = {
    email: "NguyenVanA@gmail.com",
    first_name: "Nguyen Van",
    last_name: "A",
    avatar: ""
}
const schema = yup.object().shape({
  first_name: yup.string().min(1).max(40).required(),
  last_name: yup.string().min(1).max(40).required(),
  email: yup.string().min(1).max(1000).email().required(),
});

function UserCreateDialog({open, onClose, onUserCreated}: props) {
    // khai báo state form
    const {reset,control,handleSubmit,formState: { errors },} = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    // Tạo data mock
    const [{loading, error}, doCreate] = createNewUser({
        email: "NguyenVanA@gmail.com",
        first_name: "Nguyen Van",
        last_name: "A",
        avatar: 'https://loremflickr.com/500/500/animals'
    });

    const onSubmit = async (data: UserCreatePayload) => {
        doCreate({data}).then((res) => {
            if (res.status == 201) {
                onClose();
                onUserCreated({ ...res.data, ...data });
                reset(defaultValues);
            }
        });
    };
    useEffect(() => {
        reset();
    }, [open, reset]);
    // Function implementation goes here
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>create new user</DialogTitle>
            {loading && <LinearProgress/>}

            <DialogContent>
                <Box>
                    <FormControl>
                        <Controller 
                            name="first_name"
                            control={control}
                            rules={{ required: true }}
                            render = {({field: {value, onChange}})=>(
                                <TextField
                                    value = {value}
                                    label="First Name"
                                    onChange={onChange}
                                    placeholder="Enter your first name"
                                    error={Boolean(errors.first_name)}
                                />                                      
                            )}
                        />
                        {
                            errors.first_name && (
                                <FormHelperText sx={{color: 'error.main'}}>{errors.first_name.message}</FormHelperText>
                            )
                        }

                    </FormControl>
                    <FormControl>
                        <Controller 
                            name="last_name"
                            control={control}
                            rules={{ required: true }}
                            render = {({field: {value, onChange}})=>(
                                <TextField
                                    value = {value}
                                    label="Last_name"
                                    onChange={onChange}
                                    placeholder="Enter your last name"
                                    error={Boolean(errors.last_name)}
                                />                                      
                            )}
                        />
                        {
                            errors.last_name && (
                                <FormHelperText sx={{color: 'error.main'}}>{errors.last_name.message}</FormHelperText>
                            )
                        }
                        
                    </FormControl>
                    <FormControl>
                        <Controller 
                            name="email"
                            control={control}
                            rules={{ required: true }}
                            render = {({field: {value, onChange}})=>(
                                <TextField
                                    value = {value}
                                    label="First Name"
                                    onChange={onChange}
                                    placeholder="Enter your first name"
                                    error={Boolean(errors.email)}
                                />                                      
                            )}
                        />
                        {
                            errors.email && (
                                <FormHelperText sx={{color: 'error.main'}}>
                                    {errors.email.message}
                                </FormHelperText>
                            )
                        }
                    </FormControl>
                </Box>
                {error && (
                    <DialogContent>
                        Error: {error.message}
                    </DialogContent>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Close
                </Button>
                <Button
                    type="submit"
                    form = "user-create-form"
                    disabled={loading}
                    color="success">
                    Save
                </Button>
            </DialogActions>

        </Dialog>

        
    )
}

export default UserCreateDialog;