const config = {
  NEXT_PUBLIC_BASE_URL:
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  MOVIE_API:
    process.env.MOVIE_API || 'https://seleksi-sea-2023.vercel.app/api/movies',
  DATABASE_URL:
    process.env.DATABASE_URL || 'mongodb://localhost:27017/sea-movie',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'secret',
}
export default config;
