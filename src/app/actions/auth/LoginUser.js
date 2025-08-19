"use server";
import bcrypt from "bcrypt";
import dbConnect, { collectionsNames } from "@/lib/dbConnect";


const LoginUser = async (payload) => {
    const { email, password } = payload;
    const users = dbConnect(collectionsNames.usersCollections);

    try {
        const user = await users.findOne({ email: email });
        const isPasswordOk = await bcrypt.compare(password, user.password);

        if (user && isPasswordOk) {
            const userData = { _id: user._id.toString(), name: user.name, email: user.email }
            return userData;
        }

        return null
    } catch (error) {
        // console.log(error)
        return error
    }
};

export default LoginUser;