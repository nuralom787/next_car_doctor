import BookingsTables from "@/Components/tables/BookingsTables";
import { headers } from "next/headers";

const loadBookings = async () => {
    const res = await fetch(`http://localhost:3000/api/service`, {
        headers: await headers()
    })
    const data = await res.json();
    return data;
};

const MyBookings = async () => {
    const bookings = await loadBookings();

    return (
        <div className="container-width px-3 md:px-6 py-16 h-screen">
            <div className="overflow-x-auto rounded-box border border-gray-400 bg-white">
                <BookingsTables bookings={bookings} />
            </div>
        </div>
    );
};

export default MyBookings;