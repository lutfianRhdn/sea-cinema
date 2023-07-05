import configs from '@/configs';
import { fetchData } from '@/utils';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
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
        if (!user) throw new Error('No user found');
        return user;
      },
    }),
    // ...add more providers here
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
      // Send properties to the client, like an access_token from a provider.
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
