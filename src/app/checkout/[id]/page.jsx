import CheckoutForms from '@/Components/forms/CheckoutForms';
import React from 'react';

const Checkout = async ({ params }) => {
    const id = await params.id;
    const res = await fetch(`https://nextcardoctor.vercel.app/api/service/${id}`, { cache: "no-store" });
    const service = await res.json();


    return (
        <div className='bg-gray-300'>
            <section className='container-width px-3 md:px-6 py-16 h-screen'>
                <CheckoutForms service={service} />
            </section>
        </div>
    );
};

export default Checkout;