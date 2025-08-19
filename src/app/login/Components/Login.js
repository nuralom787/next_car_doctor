"use client"
import { signIn } from "next-auth/react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";


const Login = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        try {
            const res = await signIn("credentials", { email, password, callbackUrl: "/", redirect: false });

            if (res.ok) {
                router.push("/");
                form.reset();
                toast.success("Login Successfully", {
                    position: "top-center",
                    autoClose: 3500
                })
                setLoading(false);
            } else {
                toast.error("Authentications Failed!! Please Try Again..", {
                    position: "top-center",
                    autoClose: 3500
                })
                setLoading(false);
            }
        } catch (error) {
            // console.log(error)
            toast.error("Authentication Failed!!");
            setLoading(false);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className='shadow-xl rounded-xl p-16 w-full h-full space-y-8'>
                <h1 className='text-center font-bold text-3xl my-6'>Login User</h1>
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
                <span className='text-base font-medium hover:underline cursor-pointer'>Forget Password</span>
                <div className='my-3'>
                    {loading ?
                        <button type="button" disabled className='text-white font-semibold text-2xl bg-[#FF3811] rounded-md w-full p-2.5 inline-flex justify-center items-center gap-6'>
                            <span className="loading loading-spinner loading-xl"></span>
                        </button>
                        :
                        <button type="submit" className='text-white font-semibold text-2xl bg-[#FF3811] rounded-md w-full p-2.5 cursor-pointer inline-flex justify-center items-center gap-6'>
                            Login <FaArrowRight />
                        </button>
                    }
                </div>
                <br />
                <div className="text-center">
                    <span className="text-sm font-semibold">New Hare? Please <Link className="hover:underline text-[#FF3811]" href={"/register"}>Register</Link></span>
                </div>
            </form>
        </div>
    );
};

export default Login;