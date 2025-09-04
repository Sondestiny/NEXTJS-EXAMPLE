"use client";
import React, { useCallback, useState } from 'react';
import { Container } from '@mui/material';
import Head from 'next/head';
import UserList from '@/views/users/userList';
import { User, UserGetParam } from '@/types/user.type';
import UserFilter from '@/views/users/userFilter';

type UserListProps = {
  filter: UserGetParam;
  justCreatedUser: User[];
};
function UserPage() {
  const [filter, setFilter] = useState<UserGetParam>({} as UserGetParam);
  const [justCreatedUser, setJustCreatedUser] = useState<User[]>([]);

  const handleChangeFilter = useCallback((newFilter: UserGetParam) => {
    setFilter(newFilter);
  }, []);

  const handleCreatedUser = useCallback((data: User) => {
    setJustCreatedUser((prev) => [data, ...prev]);
  }, []);
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Container maxWidth="xl">
        <UserFilter 
          filter={filter}
          onChange={handleChangeFilter}
          onCreatedUser={handleCreatedUser}/>
          <br></br>
        <UserList filter={filter} justCreatedUser={justCreatedUser} />
        
      </Container>
    </>
  );
}

export default UserPage;
