import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Extraer el rol del usuario desde la cookie 'userRole' (creada en LoginForm)
  const role = request.cookies.get('userRole')?.value;
  
  // Proteger la ruta de administración
  if (path.startsWith('/admin-dashboard')) {
    if (!role) {
      // Si no hay rol (no logueado), enviar al login
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (role !== 'admin') {
      // Si el rol es cliente, enviarlo a su workspace
      return NextResponse.redirect(new URL('/workspace', request.url));
    }
  }

  // Proteger la ruta del cliente
  if (path.startsWith('/workspace')) {
    if (!role) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin-dashboard/:path*', '/workspace/:path*']
};
