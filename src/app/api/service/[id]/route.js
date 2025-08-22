import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export const GET = async (req, { params }) => {
    const id = await params.id;
    const collection = dbConnect(collectionsNames.servicesCollection);
    const res = await collection.findOne({ _id: new ObjectId(id) });
    return NextResponse.json(res);
};


export const DELETE = async (req, { params }) => {
    const sessions = await getServerSession(authOptions);
    const id = await params.id;

    if (sessions) {
        try {
            const email = sessions?.user?.email;
            const collection = dbConnect(collectionsNames.bookingsCollections);
            const bookingRes = await collection.findOne({ _id: new ObjectId(id) });

            if (bookingRes.email === email) {
                const res = await collection.deleteOne({ _id: new ObjectId(id) });
                revalidatePath("/my-bookings");
                return NextResponse.json(res);
            } else {
                return NextResponse.error({ success: false, message: "Forbidden Action!!" }, { status: 401 })
            }
        } catch (error) {
            console.log(error);
            return NextResponse.error(error);
        }
    }
}
