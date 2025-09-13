import { User } from '@/types/user.type';
import NextAuth,{ NextAuthConfig }  from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import { z } from 'zod';

async function FakeGetData (email:string): Promise<User | null> {
    try {

        return null;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user');
    }
}
async function fakeLogin(email: string, password: string) {
  if (email === "closerblade@example.com" && password === "123456") {
    return { 
        id: "1", 
        email, 
        role: "admin",
        emailVerified: null, // 👈 thêm field này
     };
  }
  return null;
}
const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
    credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null;
      }
           const parsedCredentials = z
              .object({
                email: z.string().email(),
                password: z.string().min(6),
              })
              .safeParse(credentials);

            if (!parsedCredentials.success) {
              return null;
            }
            if (!parsedCredentials.success) {
              return null;
            }
            const {email, password} = parsedCredentials.data;
             // 🔑 Gọi API hoặc query DB để check user
            const user = await fakeLogin(email, password);
            if (!user) {
                return null;  
            }
            return user;    
    }
  })
  ],
  session: {
    strategy: "jwt", // sử dụng JWT thay vì database session
  },
  callbacks: {
    async jwt({ token, user }) {
      // Lưu thông tin user vào token JWT
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role || 'user';
      }
      return token;
    },
    async session({ session, token }) {
      // Gắn token vào session
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          role: token.role as string,
          emailVerified: token.emailVerified ? new Date(token.emailVerified as string) : null,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/signIn", // có thể tạo trang login riêng
  },
}
export const { handlers: { GET, POST }, auth } = NextAuth(authOptions);