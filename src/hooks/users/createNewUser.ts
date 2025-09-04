import { UserCreatePayload } from "@/types/user.type";
import useAxiosWrapper from "../shared/useAxiosWrapper";

function createNewUser  (mockData: UserCreatePayload) {

    const result = useAxiosWrapper
    (
        {
            method: 'POST',
            url: '/users',
        },
        {
            manual: true,
            mockData,
            
        } 
    )
    return result;
}
export default createNewUser;