`use client`;
import React from 'react';
import { Alert, CircularProgress, Grid} from '@mui/material';
import UserListItem from './userListItem';
import useUserList from '@/hooks/users/useGetListUser';
import { User , UserGetParam} from '@/types/user.type';

type UserListProps = {
  filter: UserGetParam;
  justCreatedUser: User[];
};

function UserList( {filter, justCreatedUser}: UserListProps) {
const [{data, loading, error}]  = useUserList({} as UserGetParam); 

  
  return (
    <Grid container spacing={2} justifyContent="stretch">
      {loading && (
        <Grid size={10} sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Grid>
      )}
      {error && (
        <Grid size={12}>
          <Alert severity="error">{error.message}</Alert>
        </Grid>
      )}

      {!loading && !data?.length && (
        <Grid size={12}>
          <Alert severity="warning">{'No data found'}</Alert>
        </Grid>
      )}

      {justCreatedUser.map((user) => (
        <Grid size={12} key={user.id}>
          <UserListItem user={user} isNew />
        </Grid>
      ))}
      
      {data && data?.map((user:User) => (
        <Grid size={2} spacing={2}  key={user?.id}>
          <UserListItem user={user} isNew />
        </Grid>
      ))}
    </Grid>
  );
}

export default UserList;
