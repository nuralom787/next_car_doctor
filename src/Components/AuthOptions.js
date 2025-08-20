"use client";

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaSignOutAlt } from 'react-icons/fa';

const AuthOptions = () => {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                <button type='button' className='btn btn-ghost rounded-md' onClick={() => signOut()}>
                    Logout <FaSignOutAlt />
                </button>
                <Image
                    src={session?.user?.image}
                    alt='user Image'
                    height={40}
                    width={40}
                    loading='lazy'
                    className='rounded-full'
                />
            </>
        )
    }

    return (
        <>
            <Link className="btn btn-ghost rounded-md" href={`/login`}>Login</Link>
        </>
    );
};

export default AuthOptions;