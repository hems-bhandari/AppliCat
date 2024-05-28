import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'

// Limit the middleware to paths starting with `/api/`
export const config = {
    matcher: '/api/:path*',
}

export async function middleware(request: NextRequest) {
    // Call our authentication function to check the request
    const userSession = await getServerSession(authOptions);

    if (!userSession?.user) {
        return Response.json(
            { message: 'authentication failed' },
            { status: 401 }
        )
    }
}
