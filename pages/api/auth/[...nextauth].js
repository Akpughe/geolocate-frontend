import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: '1100330467251979',
      clientSecret: 'bde426f94daa87c6dd1a29f80462b0fa',
    }),
  ],
});
