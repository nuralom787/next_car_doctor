"use client";

import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";

const DeleteBookingBtn = ({ id }) => {
    const router = useRouter();
    const deleteBooking = async (id) => {
        // console.log(id)
        const res = await fetch(`http://localhost:3000/api/service/${id}`, {
            method: "DELETE"
        })
        const data = await res.json();
        router.refresh();
        console.log(data);
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