import Image from 'next/image';
import loginImg from '../../../public/assets/images/login/login.svg';
import Login from './Components/Login';

const LoginPage = () => {
    return (
        <div className='bg-gray-100'>
            <div className='container-width px-3 md:px-6 py-12 flex justify-between items-center gap-4 h-screen'>
                <section className='w-1/2 flex justify-center items-center'>
                    <Image src={loginImg} alt={loginImg} loading='lazy' />
                </section>
                <section className='w-1/2'>
                    <Login />
                </section>
            </div>
        </div>
    );
};

export default LoginPage;