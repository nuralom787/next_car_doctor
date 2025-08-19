'use client';

import RegisterUser from "@/app/actions/auth/RegisterUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const RegisterForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const payload = { name, email, password };

        try {
            const res = await RegisterUser(payload);
            if (res.insertedId) {
                toast.success("User Created Successfully.", {
                    position: "top-center",
                    autoClose: 3500
                });
                router.push("/login");
                form.reset();
                setLoading(false);
            } else {
                form.reset();
                toast.error(res.message, {
                    position: "top-center",
                    autoClose: 3500
                });
                setLoading(false);
            }
        } catch (error) {
            form.reset();
            toast.error(error, {
                position: "top-center",
                autoClose: 3500
            });
            setLoading(false);
        }
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
                        placeholder="Enter Your Full Name"
                        required
                    />
                </div>
                <div>
                    <label className='font-semibold text-lg ps-1.5'>Email</label>
                    <br />
                    <input className='w-full px-3 py-2.5 rounded-md outline-0 bg-white border border-gray-400'
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        required
                    />
                </div>
                <div>
                    <label className='font-semibold text-lg ps-1.5'>Password</label>
                    <br />
                    <input className='w-full px-3 py-2.5 rounded-md outline-0 bg-white border border-gray-400'
                        type="password"
                        name="password"
                        placeholder="Enter Your Password"
                        required
                    />
                </div>
                <div className='my-3'>
                    {loading ?
                        <button type="button" disabled className='text-white font-semibold text-2xl bg-[#FF3811] rounded-md w-full p-2.5'>
                            <span className="loading loading-spinner loading-xl"></span>
                        </button>
                        :
                        <button type="submit" className='text-white font-semibold text-2xl bg-[#FF3811] rounded-md w-full p-2.5 cursor-pointer inline-flex justify-center items-center gap-6'>
                            Register <FaArrowRight />
                        </button>
                    }
                </div>
                <br />
                <div className="text-center">
                    <span className="text-sm font-semibold">Already Have an account? Please <Link className="hover:underline text-[#FF3811]" href={"/login"}>Login</Link></span>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;