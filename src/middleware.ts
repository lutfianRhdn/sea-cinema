export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/transactions',
    '/withdraw',
    '/topup',
    '/orders/:title*',
    '/edit-profile',
    '/change-password',
    '/my-orders',
    '/my-tickets',
    '/admin/movies',
  ],
};
