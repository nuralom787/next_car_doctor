import Image from "next/image";
import DeleteBookingBtn from "./DeleteBookingBtn";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const BookingsTables = ({ bookings }) => {

    return (
        <div>
            <table className="table p-6">
                <thead className="text-black p-4 border-b-2 border-black text-center">
                    <tr>
                        <th>Actions</th>
                        <th>Image</th>
                        <th className="text-start">Details</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody className="p-4 text-center">
                    {
                        bookings?.map(booking => <tr key={booking._id}>
                            <td>
                                <div className="flex justify-center items-center gap-5">
                                    <DeleteBookingBtn id={booking._id} />
                                    <Link href={`/my-bookings/${booking._id}`}>
                                        <FaEdit className="text-2xl hover:text-green-600 duration-300" />
                                    </Link>
                                </div>
                            </td>
                            <td>
                                <Image src={booking.service_image} alt="booking image" width={80} height={80} loading="lazy" className="rounded mx-auto" /></td>
                            <td className="text-start">
                                <p className="font-semibold">Service: <span className="font-bold text-red-600">{booking.service_title}</span></p>
                                <p className="font-semibold">Contact: <span className="font-bold text-red-600">{booking.number}</span></p>
                                <p className="font-semibold">Address: <span className="font-bold text-red-600">{booking.address}</span></p>
                            </td>
                            <td>
                                ${booking.service_price}
                            </td>
                            <td>
                                {booking.date}
                            </td>
                            <td>
                                <span>Pending</span>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default BookingsTables;