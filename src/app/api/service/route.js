import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const body = await req.json();
    const collection = dbConnect(collectionsNames.bookingsCollections);
    const res = await collection.insertOne(body);
    res.insertedId = res.insertedId.toString();

    return NextResponse.json(res);
};