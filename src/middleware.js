import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'my', 'ne', 'in', 'id'],
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/', '/(en|my|ne|in|id)/:path*'],
};
