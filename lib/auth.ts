import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { sql } from './db'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const users = await sql`SELECT id, email, name, password_hash FROM users WHERE email = ${credentials.email}`
        if (users.length === 0) return null
        const user = users[0]
        const isValid = await compare(credentials.password, user.password_hash)
        if (!isValid) return null
        return { id: String(user.id), email: user.email, name: user.name }
      }
    })
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  callbacks: {
    async jwt({ token, user }) { if (user) token.id = user.id; return token },
    async session({ session, token }) { if (session.user) (session.user as any).id = token.id; return session }
  },
}
