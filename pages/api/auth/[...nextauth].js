import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    // FacebookProvider({
    //   clientId: '1100330467251979',
    //   clientSecret: 'bde426f94daa87c6dd1a29f80462b0fa',
    // }),
    GoogleProvider({
      clientId: '714125491832-lpqc6hlqad18cf4p3fes7jirhas8clc3.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
});
