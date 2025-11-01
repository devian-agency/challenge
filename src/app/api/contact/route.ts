import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

interface FormData {
  name: string;
  family_name?: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, family_name, email, subject, message }: FormData = body;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD + "0",
    },
  });

   const admin: Mail.Options = {
    from: process.env.EMAIL,
    to: email,
    subject: `New Contact Form Submission: ${name}`,
    replyTo: email,
    html: `
    <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #6366f1;
            color: #ffffff;
            padding: 20px;
          }

          .email-container {
            background: #ffffff;
            color: #6366f1;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .header {
            background: #6366f1;
            padding: 15px;
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            color: #ffffff;
            border-radius: 6px 6px 0 0;
          }

          .content {
            padding: 15px;
            font-size: 16px;
            line-height: 1.6;
          }

          .footer {
            margin-top: 20px;
            font-size: 14px;
            text-align: center;
            color: #6366f1;
          }

          .btn {
            display: inline-block;
            background: #6366f1;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
          }

          .btn:hover {
            background: #6366f1;
          }
        </style>
      </head>
      <body>

        <div class="email-container">
          <div class="header">New Contact Form Submission</div>

          <div class="content">
            <p><strong>Name:</strong> ${name} ${family_name ? ` ${family_name}` : ""}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Purpose:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <blockquote>${message}</blockquote>

            <p><strong>Please review and respond if needed.</strong></p>
          </div>

          <div class="footer">
            <p>Best Regards,</p>
            <p><strong>Your Automated System</strong></p>
          </div>
        </div>

      </body>
      </html>
`,
    text: `Hello Sir,

You have received a new contact form submission from your portfolio. Here are the details:

- Name: ${name} ${family_name ? ` ${family_name}` : ""}
- Email: ${email}
- Purpose: ${subject}
- Message: 

"${message}"

Please review the message and respond if needed.

Best Regards,
Your Automated System
`,
  };
  async function sendEmail(mailOptions: Mail.Options) {
    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info.response);
        }
      });
    });
  }
  try {
    await Promise.all([sendEmail(admin)]);

    return NextResponse.json({ message: "Email sent successfully!", success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err, success: false }, { status: 500 });
  }
}