import React, { useCallback, useState } from 'react';
import { User, UserGetParams } from '@/types/users.type';
import UserList from '@/views/users/UserList';
import { Container } from '@mui/material';
import Head from 'next/head';

function UserPage() {
  const [filter, setFilter] = useState<UserGetParams>({});
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
