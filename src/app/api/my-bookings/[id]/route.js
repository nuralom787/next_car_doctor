import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async (req, { params }) => {
    try {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;

        if (!email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const id = await params.id;
        const collection = dbConnect(collectionsNames.bookingsCollections);

        const res = await collection.findOne({
            $and: [
                { _id: new ObjectId(id) },
                { email: email }
            ]
        });

        if (!res) {
            return NextResponse.json({ message: "Forbidden Access!!" }, { status: 403 });
        }

        return NextResponse.json(res);
    } catch (error) {
        console.error("GET error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};


export const PATCH = async (req, { params }) => {
    try {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;

        if (!email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const id = params.id;
        const collection = dbConnect(collectionsNames.bookingsCollections);

        const bookingData = await collection.findOne({
            $and: [
                { _id: new ObjectId(id) },
                { email: email }
            ]
        });

        if (!bookingData) {
            return NextResponse.json({ message: "Forbidden Access!!" }, { status: 403 });
        }

        if (bookingData) {
            const query = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    date: body.date,
                    number: body.number,
                    address: body.address
                }
            };

            const res = await collection.updateOne(query, updatedDoc);
            return NextResponse.json(res);
        }
    } catch (error) {
        console.error("PATCH error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};