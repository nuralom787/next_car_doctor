import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (req) => {
    const sessions = await getServerSession(authOptions);
    // console.log("from get method: ", sessions.user.email);

    if (sessions) {
        try {
            const email = sessions?.user?.email;
            const collection = dbConnect(collectionsNames.bookingsCollections);
            const res = await collection.find({ email }).toArray();

            return NextResponse.json(res);

        } catch (error) {
            console.log(error);
            return NextResponse.error(error);
        }
    }
};

export const POST = async (req) => {
    const body = await req.json();
    const collection = dbConnect(collectionsNames.bookingsCollections);
    const res = await collection.insertOne(body);
    res.insertedId = res.insertedId.toString();

    return NextResponse.json(res);
};