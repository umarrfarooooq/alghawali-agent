import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { VerifyAgentToken } from '@/lib/VerifyAgentToken'
import Loading from '@/app/[locale]/loading';

const AuthRedirect = ({ children, requireAuth, redirectTo }) => {
    const router = useRouter();
    const pathname = usePathname()
    const currentLocale = pathname.split('/')[1];

    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const { valid } = await VerifyAgentToken();
            setIsAuthenticated(valid);

            if (requireAuth && !valid) {
                router.push(`/${currentLocale}/login`);
            } else if (!requireAuth && valid) {
                router.push(redirectTo || '/');
            }
        };

        checkAuth();
    }, [router, requireAuth, redirectTo]);

    if (isAuthenticated === null) {
        return <div><Loading /></div>;
    }

    return (requireAuth === isAuthenticated) ? children : null;
}

export default AuthRedirect;