export interface User {
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string,
    role?: string
}

export interface UserGetParam {
    keyword: string,
    per_page? : number,
    page? : number
}

export interface UserGetResponse {
    data: User[],
    page: number,
    per_page: number,
    total: number,
    total_pages: number
}
export interface UserCreatePayload {
    email: string,
    first_name: string,
    last_name: string,
    avatar?: string
}