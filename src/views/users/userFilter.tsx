import { FormControl, IconButton, InputAdornment, MenuItem, Select, TextField, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import UserCreateDialog from "./userCreateDialog";
import createNewUser from "@/hooks/users/createNewUser";
import SearchIcon from '@mui/icons-material/Search';
import { User, UserGetParam } from "@/types/user.type";
type Props = {
  filter: UserGetParam;
  onChange: (newFilter: UserGetParam) => void;
  onCreatedUser: (data: User) => void;
};
function UserFilter({ filter, onChange, onCreatedUser }: Props) {
    const [per_page, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [openCreate, setOpenCreate] = useState(false);

    const toggleCreate = () => {
        setOpenCreate(!openCreate);
    }

    const handleChangePageSize = (e: any) => {
        setLimit(e.target.value);
    }

    const handleChangeKeyword = (e: any) => {
        setKeyword(e.target.value);
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            if (keyword != filter.keyword) {onChange({ ...filter, keyword })};
        }, 500);
        
        return () => clearTimeout(timer);  
    }, [per_page, keyword]);
    useEffect(() => {
        if (filter.per_page != per_page) {
            onChange({ ...filter, per_page: per_page });
        }
    }, [filter, per_page, onChange]);
    return (
        <Toolbar disableGutters>
            <Typography   
                sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
                variant="h5">
                All Users
                <IconButton
                    sx={{ marginLeft: 2 }}
                    color="primary"
                    onClick={toggleCreate}>
                <AddIcon />
                </IconButton>
            </Typography>
            <UserCreateDialog
                open={openCreate}
                onClose={toggleCreate}
                onUserCreated={createNewUser}
            />
            <TextField
                sx={{ marginRight: 2 }}
                size="small"
                placeholder="Search term..."
                value={keyword}
                onChange={handleChangeKeyword}
                inputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <FormControl>
                <Select
                    value={per_page}
                    onChange={handleChangePageSize}
                    startAdornment={<InputAdornment position="start">Page size: </InputAdornment>}
                >
                    <MenuItem value={10} >10</MenuItem>
                    <MenuItem value={20} >20</MenuItem>
                    <MenuItem value={30} >30</MenuItem>
                </Select>
            </FormControl>
        </Toolbar>
    );
}
export default UserFilter;