"use client";

import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const DeleteBookingBtn = ({ id }) => {
    const router = useRouter();
    const deleteBooking = async (id) => {
        // console.log(id)
        const res = fetch(`https://nextcardoctor.vercel.app/api/service/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())

        toast.promise(res, { pending: "Deleting Booking...", error: "Something want's wrong!", success: "Booking Deleted Successfully!" }, {
            position: "top-center",
            autoClose: 2000
        });

        const data = await res
        router.refresh();
        if (data.deletedCount === 1) {
            console.log(data);
        }
    };



    return (
        <>
            <button onClick={() => deleteBooking(id)} className="hover:text-red-600 text-2xl duration-300 cursor-pointer" title="Delete">
                <FaTrash />
            </button>
        </>
    );
};

export default DeleteBookingBtn;