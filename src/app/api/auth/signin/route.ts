import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signinSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
    try{
        await connectDB();

        const body = await req.json();
        const validation = signinSchema.safeParse(body);

        if (!validation.success) {
          return NextResponse.json(
            { 
              success: false, 
              error: validation.error.issues[0].message 
            },
            { status: 400 }
          );
        }

        const { email, password } = validation.data;
        const user = await User.findOne({ email });
        if(!user){
            return NextResponse.json(
                { success: false, error: "Invalid credentials" },
                { status: 400 }
              );
        }
         if (!user.password) {
      return NextResponse.json(
        { success: false, error: "Account uses Google sign-in only" },
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
            { userId: user._id, email: user.email,name: user.name },
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