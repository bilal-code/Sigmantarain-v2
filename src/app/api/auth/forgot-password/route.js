
// import connectDB from "../../../../lib/db";
// import AuthModel from "@/model/Auth.model";

// export const POST = async (req) => {
//   try {
//     await connectDB();
//     const { email } = await req.json();

//     const user = await AuthModel.findOne({ email });
//     if (!user) {
//       return new Response(JSON.stringify({ error: "Email not registered" }), {
//         status: 404,
//       });
//     }

//     // const otp = generateOTP();
//     // const otpExpiry = getOtpExpiry();

   
//     // Send OTP via email
//     // await sendOtpEmail(email, otp);

//     return new Response(JSON.stringify({ message: "OTP sent to your email" }), {
//       status: 200,
//     });
//   } catch (error) {
//     // console.error("Forgot password error:", error);
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//     });
//   }
// };
// import connectDB from "";
// import connectDB from "../../../../lib/db";
import connectDB from "@/lib/db";
import AuthModel from "@/model/Auth.model";
import nodemailer from "nodemailer";

// === Helper: Send Email Function ===
const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sigmantarian5@gmail.com", // your gmail
      pass: "uzwikttrktewgutx", // Gmail App Password (not actual password)
    },
  });

  await transporter.sendMail({
    from: '"Sigma Dashboard" <sigmantarian5@gmail.com>',
    to,
    subject,
    html,
  });
};

// === Main Forgot Password Endpoint ===
export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json();

    if (!body?.email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
      });
    }

    const email = String(body.email).trim().toLowerCase();

    const user = await AuthModel.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "Email not registered" }), {
        status: 404,
      });
    }

    // Generate 4-digit OTP and expiry
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update OTP in the user record
    await AuthModel.findByIdAndUpdate(user._id, {
      $set: {
        resetPasswordOtp: otp,
        resetPasswordOtpExpiry: otpExpiry,
      },
    });

    // === Beautiful HTML Email Template (matching your theme) ===
    const html = `
      <div style="background:#f4f6f8; padding:30px; font-family:'Segoe UI',sans-serif;">
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; box-shadow:0 5px 15px rgba(0,0,0,0.08); overflow:hidden;">
          <div style="background:#0B98AC; color:#fff; padding:20px 25px;">
            <h2 style="margin:0; font-weight:600;">Sigma Dashboard</h2>
          </div>
          <div style="padding:25px;">
            <h3 style="color:#333;">Password Reset Request</h3>
            <p style="color:#555; line-height:1.6;">
              Hello <strong>${user.name}</strong>,
            </p>
            <p style="color:#555; line-height:1.6;">
              You requested a password reset for your Sigma Dashboard account. 
              Please use the OTP below to continue:
            </p>
            <div style="text-align:center; margin:30px 0;">
              <span style="display:inline-block; background:#0B98AC; color:#fff; font-size:22px; font-weight:bold; padding:12px 40px; border-radius:8px;">
                ${otp}
              </span>
            </div>
            <p style="color:#777;">This OTP will expire in <strong>10 minutes</strong>.</p>
            <p style="color:#777;">If you didn’t request this, you can safely ignore this email.</p>
          </div>
          <div style="background:#f0f0f0; padding:15px 25px; text-align:center; font-size:13px; color:#888;">
            &copy; ${new Date().getFullYear()} Sigma Dashboard — All rights reserved.
          </div>
        </div>
      </div>
    `;

    // Send Email
    await sendEmail({
      to: email,
      subject: "Your OTP for Password Reset",
      html,
    });

    return new Response(
      JSON.stringify({ message: "OTP sent to your email", success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
};

