export interface User {
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

export interface UserGetParam {
    keyword: string,
    per_page? : number,
    page? : number
}