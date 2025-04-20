# Portfolio Website

A professional portfolio website built with Next.js and Supabase.

## Deployment on Vercel

### Environment Variables

When deploying to Vercel, you need to set the following environment variables:

1. **NEXT_PUBLIC_SUPABASE_URL**: Your Supabase project URL
2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Your Supabase anonymous key (public)
3. **WEBSITE_URL**: The URL of your deployed website (e.g., https://your-domain.com)

### Steps to Deploy

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Create a new project on Vercel and connect it to your repository
3. Configure the environment variables mentioned above
4. Deploy the project

### Troubleshooting Deployment Issues

If you encounter build errors:

1. Check that all environment variables are correctly set in the Vercel dashboard
2. Verify that your Supabase project is active and accessible
3. If TypeScript errors occur, you can temporarily set `ignoreBuildErrors: true` in next.config.mjs

## Local Development

1. Clone the repository
2. Copy `.env.example` to `.env.local` and fill in your Supabase credentials
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the development server
