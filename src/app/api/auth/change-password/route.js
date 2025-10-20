// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import AuthModel from "@/model/Auth.model";
// import bcrypt from "bcryptjs";

// export async function POST(req) {
//   try {
//     const { userId, newPassword } = await req.json();
// console.log(userId,newPassword)
//     if (!userId || !newPassword) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     await connectDB();

//     const user = await AuthModel.findById(userId);
//     console.log("user",user)

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // Hash new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update user's password
//     user.password = hashedPassword;
//     await user.save();

//     return NextResponse.json(
//       { message: "Password changed successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     // console.error("Change password error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import AuthModel from "@/model/Auth.model";

export async function POST(req) {
  try {
    const { userId, newPassword } = await req.json();
    console.log("Received:", userId, newPassword);

    if (!userId || !newPassword) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log("Hashed password:", hashedPassword);

    // Update password using findByIdAndUpdate (no validation issues)
    const updatedUser = await AuthModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
