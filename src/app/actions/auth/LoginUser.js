"use server";
import bcrypt from "bcrypt";
import dbConnect, { collectionsNames } from "@/lib/dbConnect";


const LoginUser = async (payload) => {
    const { email, password } = payload;
    const usersCollections = dbConnect(collectionsNames.usersCollections);

    try {
        const user = await usersCollections.findOne({ email: email });
        const isPasswordOk = bcrypt.compare(user.password, password);
        if (user && isPasswordOk) {
            const userData = { _id: user._id.toString(), name: user.name, email: user.email }
            return userData;
        }
        return { message: "Wrong email or password!" }
    } catch (error) {
        // console.log(error)
        return error
    }
};

export default LoginUser;