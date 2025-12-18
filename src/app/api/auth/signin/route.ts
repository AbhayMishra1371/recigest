import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try{
        await connectDB();

        const {name,email, password} = await req.json();
        const user = await User.findOne({ email });
        if(!user){
            return NextResponse.json(
                { success: false, error: "Invalid credentials" },
                { status: 400 }
              );
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return NextResponse.json(
                {success: false, error: "Invalid credentials" },
                { status: 400 }
              );
        }
         const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
          );
          const res = NextResponse.json({ success: true, message: "Login successful" });
          

          res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
            return res;
        }
        catch(err){
        console.log(err);
        return NextResponse.json(
          { success: false, error: "Server error" },
          { status: 500 }
        );

    }
}