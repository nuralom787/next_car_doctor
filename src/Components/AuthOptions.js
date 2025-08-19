"use client";

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const AuthOptions = () => {
    const { data: session } = useSession();

    if (session) {
        return (
            <button type='button' className='btn btn-ghost' onClick={() => signOut()}>
                Logout
            </button>
        )
    }

    return (
        <>
            <Link className="btn btn-ghost" href={`/login`}>Login</Link>
        </>
    );
};

export default AuthOptions;