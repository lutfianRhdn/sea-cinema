import configs from '@/configs';
import { fetchData } from '@/utils';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password }: any = credentials;
        const user = await fetchData('/auth/login', 'POST', {
          username,
          password,
        });
        console.log({user})
        if (user.status !== 200) {
          throw new Error(user.message)
        };
        
        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 days
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },

  secret: configs.JWT_SECRET,
};

export default NextAuth(authOptions);
