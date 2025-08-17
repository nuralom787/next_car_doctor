import dbConnect, { collectionsNames } from '@/dbConnect';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import React from 'react';
import checkoutBanner from '../../../../public/assets/images/checkout/checkout.png';

const ServiceDetails = async ({ params }) => {
    const id = await params;
    const service = await dbConnect(collectionsNames.servicesCollection).findOne({ _id: new ObjectId(id) });


    return (
        <div className='container-width px-3 md:px-6 py-8'>
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
                <div className='absolute w-full h-full top-0 bg-gradient-to-r from-[#151515E6] to-transparent rounded-lg'>
                    <div className='w-full h-full flex items-center ps-22'>
                        <h1 className='text-3xl font-bold text-white'>Service Details</h1>
                    </div>
                </div>
            </section>
            {JSON.stringify(service)}
        </div>
    );
};

export default ServiceDetails;