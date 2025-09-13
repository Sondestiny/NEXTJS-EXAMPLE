'use client';
import { signIn, SignInResponse, signOut} from "next-auth/react";
import { AuthError } from "next-auth";
import { LoginState } from "@/types/nextAuth";

export async function login (
    state: LoginState, 
    payload: FormData
): Promise<LoginState> {
        const email = payload.get("email") as string;
        const password = payload.get("password") as string;
        const res: SignInResponse = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: "/",
        });
        console.log('res', res);
        if (!res) return { error: "Không nhận được phản hồi từ server" };
        if (res.error) return { error: res.error };
        return { error: null, success: true, url: res.url ?? "/" };
}