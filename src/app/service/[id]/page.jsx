import dbConnect, { collectionsNames } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import React from 'react';
import checkoutBanner from '../../../../public/assets/images/checkout/checkout.png';

const ServiceDetails = async ({ params }) => {
    const id = await params;
    const servicesData = dbConnect(collectionsNames.servicesCollection);
    const service = await servicesData.findOne({ _id: new ObjectId(id) });

    const { _id, img, title, price, description, facility } = service;


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
                        src={img}
                        alt={title}
                        width={752}
                        height={400}
                        loading='lazy'
                        className='w-full h-[400px] rounded-xl'
                    />
                    <h1 className='font-bold text-2xl'>{title}</h1>
                    <p className='text-sm text-[#737373] font-medium'>{description}</p>
                </div>
                <div className='w-2/6 h-fit p-6 rounded-lg shadow-lg'>
                    <h1 className='text-3xl font-extrabold'>Services</h1>
                    <ul className='py-4'>
                        {
                            facility.map((fs, idx) => <li
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
            </section>
        </div>
    );
};

export default ServiceDetails;