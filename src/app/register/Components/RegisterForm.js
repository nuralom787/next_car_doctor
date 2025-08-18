'use client';

import RegisterUser from "@/app/actions/auth/RegisterUser";

const RegisterForm = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const payload = { name, email, password };

        const res = await RegisterUser(payload);
        alert(JSON.stringify(res));
    };



    return (
        <div>
            <form onSubmit={handleSubmit} className='shadow-xl rounded-xl p-16 w-full h-full space-y-8'>
                <h1 className='text-center font-bold text-3xl my-6'>Register User</h1>
                <div>
                    <label className='font-semibold text-lg ps-1.5'>Full Name</label>
                    <br />
                    <input className='w-full px-3 py-2.5 rounded-md outline-0 bg-white border border-gray-400'
                        type="text"
                        name="name"
                        required
                    />
                </div>
                <div>
                    <label className='font-semibold text-lg ps-1.5'>Email</label>
                    <br />
                    <input className='w-full px-3 py-2.5 rounded-md outline-0 bg-white border border-gray-400'
                        type="email"
                        name="email"
                        required
                    />
                </div>
                <div>
                    <label className='font-semibold text-lg ps-1.5'>Password</label>
                    <br />
                    <input className='w-full px-3 py-2.5 rounded-md outline-0 bg-white border border-gray-400'
                        type="password"
                        name="password"
                        required
                    />
                </div>
                <div className='my-3'>
                    <button type="submit" className='text-white font-semibold text-2xl bg-[#FF3811] rounded-md w-full p-2.5 cursor-pointer'>
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;