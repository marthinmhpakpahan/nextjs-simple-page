import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("callback signIn");
      console.log(user)
      const isAllowedToSignIn = true
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/authenticate`, {
        method: "POST",
        body: JSON.stringify(user),
      });
      return !response.error
    }
  }
});
