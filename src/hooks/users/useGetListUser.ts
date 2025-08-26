'use client';
import { mockUsers } from "@/types/user.mocks";
import { User, UserGetParam } from "@/types/user.type";
import useAxiosWrapper from "../shared/useAxiosWrapper";
function useUserList (params: UserGetParam) {
    const {page = 0, per_page= 10, keyword= ''} = params ?? {};
    const result = useAxiosWrapper
    (
        {
            method: 'GET',
            url: '/users',
            params,
        },
        {
            mockData: mockUsers,
            
        } 
    )
    return result;
}
export default useUserList;