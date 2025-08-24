"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const UpdateForms = ({ booking }) => {
    const router = useRouter();
    const session = useSession();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const number = form.number.value;
        const date = form.date.value;
        const address = form.address.value;
        const payload = {
            number,
            date,
            address
        };

        // console.log(payload);
        try {
            const res = await fetch(`http://localhost:3000/api/my-bookings/${booking._id}`, {
                method: "PATCH",
                body: JSON.stringify(payload)
            })
            const resData = await res.json();
            if (resData.acknowledged == true) {
                toast.success(`Booking Information Updated Successfully`)
                setLoading(false);
                router.push("/my-bookings")
                form.reset();
            }
        } catch (error) {
            console.log(error);
            toast.error("Somethings Want Wrong!!");
            setLoading(false);
        }
    };

    return (
        <div className="text-center rounded-xl shadow-xl p-8 bg-white">
            <h1 className="font-semibold text-3xl my-6">Update Form</h1>
            <p>Service Name: <span className="font-bold">{booking?.service_title}</span></p>
            <div className="divider before:bg-black after:bg-black"></div>
            <form onSubmit={handleSubmit}>
                <section className="flex justify-between items-center gap-6">
                    <div className="w-1/2 space-y-5">
                        <div className="text-start">
                            <label className="font-semibold text-lg">Name</label>
                            <input
                                required
                                defaultValue={session?.data?.user?.name}
                                disabled
                                type="text"
                                name="name"
                                placeholder="Enter your Full Name"
                                className="w-full px-4 py-2 rounded-md border border-gray-400 mt-3 cursor-not-allowed"
                            />
                        </div>
                        <div className="text-start">
                            <label className="font-semibold text-lg">Email</label>
                            <input
                                required
                                defaultValue={session?.data?.user?.email}
                                disabled
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-md border border-gray-400 mt-3 cursor-not-allowed"
                            />
                        </div>
                        <div className="text-start">
                            <label className="font-semibold text-lg">Due Amount</label>
                            <input
                                required
                                type="number"
                                name="amount"
                                disabled
                                defaultValue={booking?.service_price}
                                className="w-full px-4 py-2 rounded-md border border-gray-400 mt-3 cursor-not-allowed"
                                placeholder="Enter Amount"
                            />
                        </div>
                    </div>
                    <div className="w-1/2 space-y-5">
                        <div className="text-start">
                            <label className="font-semibold text-lg">Date</label>
                            <input
                                required
                                defaultValue={booking?.date}
                                type="date"
                                name="date"
                                className="w-full px-4 py-2 rounded-md border border-gray-400 mt-3"
                                placeholder="Enter Date"
                            />
                        </div>
                        <div className="text-start">
                            <label className="font-semibold text-lg">Phone</label>
                            <input
                                required
                                defaultValue={booking.number}
                                type="number"
                                name="number"
                                placeholder="Enter your phone"
                                className="w-full px-4 py-2 rounded-md border border-gray-400 mt-3"
                            />
                        </div>
                        <div className="text-start">
                            <label className="font-semibold text-lg">Present Address</label>
                            <input
                                required
                                defaultValue={booking?.address}
                                type="text"
                                name="address"
                                className="w-full px-4 py-2 rounded-md border border-gray-400 mt-3"
                                placeholder="Enter Full Address"
                            />
                        </div>
                    </div>
                </section>
                <div className="text-white">
                    {loading ?
                        <button
                            disabled
                            className="font-bold text-2xl inline-flex justify-center items-center gap-6 py-3 rounded-md bg-[#FF3811] w-full my-8"
                            type="button">
                            <span className="loading loading-spinner loading-xl"></span>
                        </button>
                        :
                        <button
                            className="font-bold text-2xl inline-flex justify-center items-center gap-6 py-3 rounded-md bg-[#FF3811] w-full my-8 cursor-pointer"
                            type="submit">
                            Update Booking <FaArrowRight />
                        </button>}
                </div>
            </form>
        </div>
    );
};

export default UpdateForms;