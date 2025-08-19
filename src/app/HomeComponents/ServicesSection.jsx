import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";

const ServicesSection = async () => {
    const ServicesData = dbConnect(collectionsNames.servicesCollection);
    const services = await ServicesData.find({}).toArray();

    return (
        <div className="grid grid-cols-12 gap-8">
            {
                services?.map(service => <div key={service._id} className="card w-full shadow-sm col-span-12 md:col-span-6 lg:col-span-4">
                    <figure className="w-full h-full flex justify-center items-center">
                        <Image
                            src={service.img}
                            alt={service.title}
                            height={208}
                            width={314}
                            className="h-full w-full"
                            loading="lazy"
                        />
                    </figure>
                    <div className="p-6">
                        <h2 className="card-title mb-2">{service.title}</h2>
                        <div className="flex justify-between items-center">
                            <p className="text-[#FF3811] font-semibold">Price : ${service.price}</p>
                            <Link href={`/service/${service._id}`} className="text-black text-2xl font-extrabold">→</Link>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default ServicesSection;