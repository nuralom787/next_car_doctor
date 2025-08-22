import Image from "next/image";
import DeleteBookingBtn from "./DeleteBookingBtn";

const BookingsTables = ({ bookings, loading }) => {

    return (
        <div>
            {loading ?
                <div className="flex justify-center items-center p-28">
                    <span className="loading loading-ring loading-xl"></span>
                </div>
                :
                <table className="table p-6">
                    <thead className="text-black p-4 border-b-2 border-black text-center">
                        <tr>
                            <th>Actions</th>
                            <th>Image</th>
                            <th>Details</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="p-4 text-center">
                        {
                            bookings?.map(booking => <tr key={booking._id}>
                                <td>
                                    <DeleteBookingBtn id={booking._id} />
                                </td>
                                <td>
                                    <Image src={booking.service_image} alt="booking image" width={80} height={80} loading="lazy" className="rounded mx-auto" /></td>
                                <td>
                                    {booking.service_title}
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
                </table>}
        </div>
    );
};

export default BookingsTables;