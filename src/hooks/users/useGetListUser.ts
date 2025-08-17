import { mockUsers } from "@/types/user.mocks";
import { User, UserGetParam } from "@/types/user.type";
import useAxios from "axios-hooks";

function useUserList (params: UserGetParam) {
    const {page = 0, per_page= 10, keyword= ''} = params ?? {};
    return useAxios<{
        data: User[]
    }>(
        {
            method: 'GET',
            url: '/users',
            params,
        },
        {
        mockData: {
            data: mockUsers
            .filter((user) =>
                user.email.toLowerCase().includes(keyword.toLowerCase())
            )
            .slice(page, per_page),
        }
    } 
    )
}
export default useUserList;