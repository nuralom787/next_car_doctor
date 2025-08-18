'use server';

import bcrypt from "bcrypt";
import dbConnect, { collectionsNames } from "@/lib/dbConnect";

const RegisterUser = async (payload) => {
    const usersCollections = dbConnect(collectionsNames.usersCollections);

    try {
        const user = await usersCollections.findOne({ email: payload.email });
        if (user) {
            return { message: "user already exist" };
        }
        const hashedPassword = await bcrypt.hash(payload.password, 10);
        payload.password = hashedPassword;
        const res = await usersCollections.insertOne(payload);
        res.insertedId = res.insertedId.toString();
        return res
    } catch (error) {
        console.log(error)
        return error
    }
};

export default RegisterUser;