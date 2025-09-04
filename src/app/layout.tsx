
import Nav from "@/_components/Nav";
import Provider from "@/_components/Provider";
import "@/styles/globals.css";
import {SessionProvider, useSession} from "next-auth/react";
export const metadata = {
  title: "Promptopia",
  description: "Discover and share AI prompts",
}
export default function RootLayout(
  {children}: Readonly<{children: React.ReactNode;}>
) {
  //const {data: isUserLoggedIn} = useSession();
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main"> 
            <div className="gradient"/>
          </div>
          <main className="app">
              <Nav></Nav>
              {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
