import dbConnect, { collectionsNames } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import React from 'react';
import checkoutBanner from '../../../../public/assets/images/checkout/checkout.png';
import Link from 'next/link';

const ServiceDetails = async ({ params }) => {
    const id = await params.id;
    // const servicesData = dbConnect(collectionsNames.servicesCollection);
    // const service = await servicesData.findOne({ _id: new ObjectId(id) });
    const res = await fetch(`https://nextcardoctor.vercel.app/api/service/${id}`, { cache: "no-store" });
    const service = await res.json();


    return (
        <div className='container-width px-3 md:px-6 pt-12 space-y-12'>
            <section className='relative'>
                <figure>
                    <Image
                        src={checkoutBanner}
                        alt={"checkout banner"}
                        height={300}
                        loading='lazy'
                        className='w-full'
                    />
                </figure>
                <div className='absolute w-full h-full top-0 bg-gradient-to-r from-[#151515] to-transparent rounded-lg'>
                    <div className='w-full h-full flex items-center ps-22'>
                        <h1 className='text-3xl font-bold text-white'>Service Details</h1>
                    </div>
                </div>
            </section>
            <section className='w-full flex gap-12 justify-start'>
                <div className='w-4/6 space-y-10'>
                    <Image
                        src={service?.img}
                        alt={service?.title}
                        width={752}
                        height={400}
                        loading='lazy'
                        className='w-full h-[400px] rounded-xl'
                    />
                    <h1 className='font-bold text-2xl'>{service?.title}</h1>
                    <p className='text-sm text-[#737373] font-medium'>{service?.description}</p>
                </div>
                <div className='w-2/6 space-y-8'>
                    <div className='p-6 rounded-lg shadow-lg'>
                        <h1 className='text-3xl font-extrabold'>Services</h1>
                        <ul className='py-4'>
                            {
                                service?.facility?.map((fs, idx) => <li
                                    key={idx}
                                    className='hover:bg-[#FF3811] hover:text-white p-3.5 group rounded-md w-full inline-flex justify-between items-center cursor-pointer'
                                >
                                    <h3 className='font-extrabold text-lg'>
                                        {fs?.name}
                                    </h3>
                                    <span className='text-xl font-bold text-[#FF3811] group-hover:text-white'>→</span>
                                </li>)
                            }
                        </ul>
                    </div>
                    <div className='bg-[#FF3811] text-white p-6 rounded-lg inline-flex justify-between items-center w-full'>
                        <h2 className='text-xl font-semibold'>Price: ${service?.price}</h2>
                        <Link className='px-4 py-2 rounded-md hover:bg-white hover:text-[#FF3811] font-bold' href={`/checkout/${service?._id}`}>Checkout</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetails;