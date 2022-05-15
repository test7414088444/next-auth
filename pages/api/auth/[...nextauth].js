import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from '../../../components/mongodb'
 
export default (req, res) => NextAuth(req, res,{
    providers: [
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
        }
      }),
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log('SignIn', user, account, profile, email, credentials);
            return true
        },
        async redirect({ url, baseUrl }) {
            console.log('redirect', url, baseUrl);
            return baseUrl
        },
        async session({ session, user, token }) {
            console.log('session', session);
            console.log('user', user);
            console.log('token', token);
            session.accessToken = token.accessToken
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            console.log('jwt', token, user, account, profile, isNewUser);
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        }
    },
    secret: process.env.JWT_SECRET,
    jwt: true,
    pages: {
        signIn: '/signin',
    },
    // adapter: MongoDBAdapter(clientPromise)
   
    // useSecureCookies: true,
    // debug: true,
    // session: {
    //     strategy: "database",
 
    //     // Seconds - How long until an idle session expires and is no longer valid.
    //     maxAge: 30 * 24 * 60 * 60, // 30 days
 
    //     // Seconds - Throttle how frequently to write to database to extend a session.
    //     // Use it to limit write operations. Set to 0 to always update the database.
    //     // Note: This option is ignored if using JSON Web Tokens
    //     updateAge: 24 * 60 * 60, // 24 hours
    // },
    // logger: {
    //     error(code, metadata) {
    //     console.log('error', code, metadata)
    //     },
    //     warn(code) {
    //     console.log('warn', code)
    //     },
    //     debug(code, metadata) {
    //     console.log('debug', code, metadata)
    //     }
    // },
    // cookies: {
    //     sessionToken: {
    //         name: "next-auth.session-token1",
    //         options: {
    //         domain: ".localhost",
    //         path: "/",
    //         httpOnly: true,
    //         sameSite: "lax",
    //         secure: false
    //         }
    //     }
    // },
})
