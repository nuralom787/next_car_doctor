import UpdateForms from "@/Components/forms/UpdateForms";
import { headers } from "next/headers";

const UpdateBookings = async ({ params }) => {
    const id = await params.id;
    const res = await fetch(`https://nextcardoctor.vercel.app/api/my-bookings/${id}`, {
        headers: new Headers(await headers())
    });
    const booking = await res.json();

    return (
        <div className='bg-gray-300'>
            <section className='container-width px-3 md:px-6 py-16 h-screen'>
                <UpdateForms booking={booking} />
            </section>
        </div>
    );
};

export default UpdateBookings;