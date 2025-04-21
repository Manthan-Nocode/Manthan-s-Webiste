import 'next'

declare module 'next' {
  // The key change here is making the type exactly match what Next.js 15 expects
  export interface PageProps {
    params: Promise<any> | undefined;
    searchParams?: Record<string, string | string[]>;
  }
}