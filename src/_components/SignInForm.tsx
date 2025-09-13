"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ đúng cho App Router
import { signIn, SignInResponse } from "next-auth/react";
const SignInForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res : SignInResponse = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });
    console.log(email, password,res);
    setLoading(false);

    if (res?.error) {
      console.log("Login failed:", res.error);
      setError(res.error);
    } else {
      // Redirect to the callback URL or home page
      router.push(res?.url || "/");
    } 
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <div className='bg-gray-100 p-5 rounded-lg flex flex-col justify-center items-center'>
        <h1 className='text-2xl'>Please login to continue</h1>
        <div className='w-full'>
          <div className='relative'>
            <label 
              htmlFor="email" 
              className='mb-3 mt-5 block font-medium text-gray-900'>
              Email
            </label>
            <input 
              className='border border-gap-3 rounded-lg p-2 w-full'
              id='email'name='email'type="email" placeholder='Email'required
            />
            <label 
              htmlFor="password" 
              className='mb-3 mt-5 block font-medium text-gray-900'>
              password
            </label>
            <input 
              className='border border-gap-3 rounded-lg p-2 w-full'
              id='password' name='password' type="password"  placeholder='password' required
            />
          </div>
        </div>
        {/* {error message} */}
        <div className='text-red-500'>
          {error && <p className="text-sm text-red-500">xảy ra lỗi đăng nhập</p>}
        </div>
        {/* {submit button} */}
        <div className='flex flex-row gap-4 mt-5'>
          <button 
            type="submit"
            className=' mt-5 px-5 py-2 border rounded-lg'
            disabled = {loading ? loading : false}
          >
            {loading ? "SignIn..." : "SignIn"}
          </button>
          <button
          type="button"
            className='mt-5 px-5 py-2 border rounded-lg'
          >
            Forgot Password?
          </button>
        </div>
      </div>

    </form>
  )
}

export default SignInForm
