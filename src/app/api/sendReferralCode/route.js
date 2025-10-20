import AuthModel from "@/model/Auth.model";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create transporter (use real credentials in production)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "sigmantarian5@gmail.com",
    pass: "uzwikttrktewgutx",
  },
});

export async function POST(request) {
  const body = await request.json();
  // Contact form: name, email, message
  if (body.name && body.email && body.message && !body.referralCode) {
    try {
     await transporter.sendMail({
  to: email,
  subject: `🎁 You've Been Invited to Join Sigmentarian by ${senderEmail}!`,
  html: `
  <div style="max-width: 600px; margin: auto; background: #f4f7fb; border-radius: 10px; padding: 30px; font-family: 'Segoe UI', Arial, sans-serif; border: 1px solid #e0e0e0;">
    
    <!-- Header -->
    <div style="text-align: center; padding-bottom: 20px;">
      <img src="https://www.svgrepo.com/show/473768/community.svg" alt="Sigmentarian Logo" width="80" style="margin-bottom: 10px;" />
      <h2 style="color: #2e7dff; margin: 0;">Welcome to <span style="color: #111;">Sigmentarian</span> 🚀</h2>
      <p style="color: #555; font-size: 15px;">You’ve been invited to join our growing community by <strong>${senderEmail}</strong>.</p>
    </div>

    <!-- Main Card -->
    <div style="background: white; border-radius: 8px; padding: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <h3 style="text-align: center; color: #333; margin-bottom: 10px;">Your Exclusive Referral Code</h3>
      <div style="text-align: center; background: #e8f0ff; padding: 15px; border-radius: 8px; margin: 10px 0;">
        <h1 style="color: #2e7dff; margin: 0; font-size: 32px; letter-spacing: 2px;">${referralCode}</h1>
      </div>
      <p style="text-align: center; color: #666; font-size: 15px; margin-top: 10px;">
        Share this code with your friends and earn exclusive rewards when they join!
      </p>
    </div>

    <!-- CTA Button -->
    <div style="text-align: center; margin-top: 25px;">
      <a href="${website}" target="_blank" style="text-decoration: none;">
        <button style="background: linear-gradient(90deg, #2e7dff, #4ab3ff); color: white; border: none; padding: 12px 28px; font-size: 16px; border-radius: 6px; cursor: pointer; font-weight: 500;">
          Join Sigmentarian Now
        </button>
      </a>
    </div>

    <!-- Divider -->
    <hr style="margin: 35px 0; border: none; border-top: 1px solid #eee;">

    <!-- Footer -->
    <div style="text-align: center; color: #999; font-size: 13px;">
      <p>If you didn’t expect this email, you can safely ignore it.</p>
      <p>&copy; ${new Date().getFullYear()} <strong>Sigmentarian</strong>. All rights reserved.</p>
    </div>
  </div>
  `,
});

      return NextResponse.json(
        { message: "Contact message sent successfully" },
        { status: 200 }
      );
    } catch (error) {
      // console.error("Error sending contact message:", error);
      return NextResponse.json(
        { error: "Failed to send contact message" },
        { status: 500 }
      );
    }
  }

  const { email, referralCode, website, senderEmail } = body;
  // console.log("Received data:", {
  //   senderEmail,
  //   email,
  //   referralCode,
  //   website,
  // });
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // Update walletAddress in AuthModel
    // const updatedUser = await AuthModel.findOneAndUpdate(
    //   { email: senderEmail },
    //   { walletAddress },
    //   { new: true }
    // );

    // if (!updatedUser) {
    //   return NextResponse.json({ error: "User not found" }, { status: 404 });
    // }

    // await transporter.sendMail({
    //   to: email,
    //   subject: "Referral Code",
    //   html: `<p>Your referral code is: <strong>${referralCode}</strong> and website link is <strong>${website}</strong></p>`,
    // });
    await transporter.sendMail({
      to: email,
      subject: `🎁 Your Exclusive Referral Code Which is Given By ${senderEmail}`,
      html: `
    <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
      <div style="text-align: center; padding-bottom: 20px;">
        <h2 style="color: #4a90e2;">Welcome to Our Community!</h2>
        <p style="font-size: 16px; color: #555;">Thanks for joining us. Here's your personal referral code:</p>
      </div>
      
      <div style="background-color: #fff; border-radius: 6px; padding: 20px; text-align: center; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <p style="margin: 0; font-size: 18px; color: #333;">Your Referral Code:</p>
        <h1 style="margin: 10px 0; color: #4CAF50;">${referralCode}</h1>
        <p style="font-size: 16px; color: #777;">Share this code with friends and earn rewards!</p>
      </div>

      <div style="margin-top: 30px; text-align: center;">
        <a href="${website}" target="_blank" style="text-decoration: none;">
          <button style="padding: 12px 24px; background-color: #4a90e2; color: #fff; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
            Visit Our Website
          </button>
        </a>
      </div>

      <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">

      <p style="font-size: 14px; color: #aaa; text-align: center;">
        If you didn't request this email, please ignore it.<br/>
        &copy; ${new Date().getFullYear()} Sigmentarian. All rights reserved.
      </p>
    </div>
  `,
    });

    // Return referral code for testing — in production, don't send referral code back to frontend
    return NextResponse.json(
      { message: "Referral code sent successfully", referralCode },
      { status: 200 }
    );
    // return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    // console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send referral code" },
      { status: 500 }
    );
  }
}
