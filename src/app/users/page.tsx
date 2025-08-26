"use client";
import React, { useCallback, useState } from 'react';
import { Container } from '@mui/material';
import Head from 'next/head';
import UserList from '@/views/users/userList';
import { User, UserGetParam } from '@/types/user.type';
import useUserList from '@/hooks/users/useGetListUser';

type UserListProps = {
  filter: UserGetParam;
  justCreatedUser: User[];
};
function UserPage() {
  const [filter, setFilter] = useState<UserGetParam>({} as UserGetParam);
  const [justCreatedUser, setJustCreatedUser] = useState<User[]>([]);

  const handleCreatedUser = useCallback((data: User) => {
    setJustCreatedUser((prev) => [data, ...prev]);
  }, []);

  
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Container maxWidth="xl">
        <UserList filter={filter} justCreatedUser={justCreatedUser} />
      </Container>
    </>
  );
}

export default UserPage;
