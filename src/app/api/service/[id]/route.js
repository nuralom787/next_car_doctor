import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const id = await params.id;
    const collection = dbConnect(collectionsNames.servicesCollection);
    const res = await collection.findOne({ _id: new ObjectId(id) });
    return NextResponse.json(res);
};
