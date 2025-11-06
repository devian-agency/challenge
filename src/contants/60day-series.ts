const url = "/challenge/series/60-days/";
const imgurl = "/images/challenge/series/60-days/";

export interface Code {
  filename: string;
  path: string;
  showPath?: boolean;
  lang: string;
  heading?:string;
  before?: string;
  after?: string;
  code: string;
}

export interface Series {
  title: string;
  slug: string;
  image?: string;
  "sub-title": string;
  description: string;
  by: {
    name: string;
    profile?: string;
    github?: string;
    twitter?: string;
  };
  challengedOn: string;
  completedOn?: string;
  code?: Code | Code[];
}

export const series: Series[] = [
  {
    title: "Day 1",
    slug: url + "day-1",
    image: imgurl + "day-1/image.png",
    "sub-title": "Contact Form",
    description:
      "Build a working contact form, which contains first name, family name, email, subject, and message. It also have it's own error handling and message logs.",
    by: {
      name: "Farhan Ahmad Khan",
      profile: imgurl + "day-1/profile.jpg",
      github: "https://github.com/farhankhan197",
      twitter: "https://x.com/FarhanKhan_twt",
    },
    challengedOn: "30-10-2025",
    completedOn: "01-11-2025",
    code:[
      {
        filename: "page.tsx",
        path: "src/app/contact/page.tsx",
        lang: "typescript",
        before: "This program contains main visual page and contact form. It also contains error handling and message logs. The main logic of whole contact form is written in this file from form visualization to form submission.",
        code:`"use client";
import Heading from "@/components/ui/heading";
import { useState } from "react";
import Button from "@/components/ui/button";
import cn from "@/utils/ClassName";
import axios from "axios";

const emailRegex = /^[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)*@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;

export function Day1() {
  const [contact, setContact] = useState({
    name: "",
    family_name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState({
    name: "",
    family_name: "",
    email: "",
    subject: "",
    message: "",
    success: "",
    error: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setContact((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validate = () => {
    let valid = true;
    setError({
      name: "",
      family_name: "",
      email: "",
      subject: "",
      message: "",
      success: "",
      error: "",
    });
    const { name, family_name, email, subject, message } = contact;
    if (!name) {
      setError((prev) => {
        return {
          ...prev,
          name: "Name is required.",
        };
      });
      valid = false;
    }
    if (!emailRegex.test(email)) {
      setError((prev) => {
        return {
          ...prev,
          email: "Invalid email.",
        };
      });
      valid = false;
    }
    if (!subject) {
      setError((prev) => {
        return {
          ...prev,
          subject: "Subject is required.",
        };
      });
      valid = false;
    }
    if (!message) {
      setError((prev) => {
        return {
          ...prev,
          message: "Message is required.",
        };
      });
      valid = false;
    }
    if (family_name && family_name.length < 3) {
      setError((prev) => {
        return {
          ...prev,
          family_name: "Please enter at least 3 characters.",
        };
      });
      valid = false;
    }
    if (name && name.length < 3) {
      setError((prev) => {
        return {
          ...prev,
          name: "Please enter at least 3 characters.",
        };
      });
      valid = false;
    }
    if (subject && subject.length < 3) {
      setError((prev) => {
        return {
          ...prev,
          subject: "Please enter at least 3 characters.",
        };
      });
      valid = false;
    }
    if (message && message.length < 3) {
      setError((prev) => {
        return {
          ...prev,
          message: "Please enter at least 3 characters.",
        };
      });
      valid = false;
    }
    if (email && email.length < 3) {
      setError((prev) => {
        return {
          ...prev,
          email: "Please enter at least 3 characters.",
        };
      });
      valid = false;
    }

    if (name.length > 100) {
      setError((prev) => {
        return {
          ...prev,
          name: "Please enter at most 100 characters.",
        };
      });
      valid = false;
    }
    if (family_name.length > 100) {
      setError((prev) => {
        return {
          ...prev,
          family_name: "Please enter at most 100 characters.",
        };
      });
      valid = false;
    }
    if (subject.length > 100) {
      setError((prev) => {
        return {
          ...prev,
          subject: "Please enter at most 100 characters.",
        };
      });
      valid = false;
    }
    if (message.length > 500) {
      setError((prev) => {
        return {
          ...prev,
          message: "Please enter at most 1000 characters.",
        };
      });
      valid = false;
    }
    if (email.length > 100) {
      setError((prev) => {
        return {
          ...prev,
          email: "Please enter at most 100 characters.",
        };
      });
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      const response = await axios.post("/api/contact", contact);
      if (response.status === 200) {
        if (response.data.success) {
          document.querySelector("form")?.reset();
          setContact({
            name: "",
            family_name: "",
            email: "",
            subject: "",
            message: "",
          });
          setTimeout(() => {
            setError((prev) => {
              return {
                ...prev,
                success: "",
              };
            });
          }, 5000);
          setError((prev) => {
            return {
              ...prev,
              success: "Message sent successfully.",
            };
          });
        } else {
          
          setError((prev) => {
            return {
              ...prev,
              error: response.data.message,
            };
          });
        }
      }
    } catch (e: any) {
      setError((prev) => {
        return {
          ...prev,
          error: e.message,
        };
      })
    } finally {
      setLoading(false);
      const timer = setTimeout(() => {
        setError((prev) => {
          return {
            ...prev,
            error: "",
          };
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  };

  return (
    <section className="mt-12 w-full max-w-3xl lg:w-3/4 mx-auto">
      <div className="shadow-card border border-white p-6 rounded-xl font-instrument-sans text-foreground antialiased">
        <Heading className="mb-10" as="h1">
          {" "}
          Contact Form{" "}
        </Heading>
        <form className="border-t-2 border-border py-12">
          <div className="fixed top-6 right-0 z-50">
            <div className="relative w-96 h-40 flex flex-col items-center">
              {Object.keys(error).map((key, i) => {
                return (
                  <p
                    key={i}
                    className={cn(
                      \`
                w-fit max-w-full text-balance text-background 
                font-instrument-sans text-center rounded-lg font-medium px-3 py-1 shadow-lg
                transition-all duration-300 cursor-pointer
                mt-2 hidden
              \`,
                      key === "success" ? "bg-green-500/80" : "bg-red-500/80",
                      error[key as keyof typeof error] && "block"
                    )}
                  >
                    {error[key as keyof typeof error]}
                  </p>
                );
              })}
            </div>
          </div>
          <fieldset>
            <div className="md:flex-row flex flex-col gap-6 flex-wrap">
              <div className="flex flex-1 flex-col gap-4">
                <label htmlFor="name" className="text-xl ml-4">
                  First Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter First Name"
                  title="Enter First Name"
                  required
                  onChange={handleChange}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e)
                  }
                  className={cn(
                    "shadow-soft rounded-lg h-12 hover:outline-none focus-within:outline-none px-4 border border-white",
                    error.name && "text-red-500 border-red-500"
                  )}
                />
              </div>
              <div className="flex flex-1 flex-col gap-4">
                <label htmlFor="family_name" className="text-xl ml-4">
                  Family Name
                </label>
                <input
                  type="text"
                  id="family_name"
                  name="family_name"
                  placeholder="Enter Family Name"
                  title="Enter Family Name"
                  onChange={handleChange}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e)
                  }
                  className={cn(
                    "shadow-soft rounded-lg h-12 hover:outline-none focus-within:outline-none px-4 border border-white",
                    error.family_name && "text-red-500 border-red-500"
                  )}
                />
              </div>
            </div>
            <div className="md:flex-row flex flex-col gap-6">
              <div className="flex flex-1 flex-col gap-4 mt-12">
                <label htmlFor="email" className="text-xl ml-4">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Enter Email Address"
                  title="Enter Email Address"
                  id="email"
                  name="email"
                  required
                  onChange={handleChange}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e)
                  }
                  className={cn(
                    "shadow-soft rounded-lg h-12 hover:outline-none focus-within:outline-none px-4 border border-white",
                    error.email && "text-red-500 border-red-500"
                  )}
                />
              </div>

              <div className="flex flex-1 flex-col gap-4 mt-12">
                <label htmlFor="email" className="text-xl ml-4">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Enter Purpose of Contact"
                  title="Enter Purpose of Contact"
                  id="subject"
                  required
                  onChange={handleChange}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e)
                  }
                  className={cn(
                    "shadow-soft rounded-lg h-12 hover:outline-none focus-within:outline-none px-4 border border-white",
                    error.subject && "text-red-500 border-red-500"
                  )}
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4 mt-12 relative">
              <label htmlFor="email" className="text-xl ml-4">
                Message
              </label>
              <textarea
                placeholder="Enter your message here..."
                name="message"
                id="message"
                className={cn(
                  "shadow-soft rounded-lg h-48 text-lg hover:outline-none focus-within:outline-none p-4 border border-white resize-none",
                  error.message && "text-red-500 border-red-500"
                )}
                required
                onChange={handleChange}
                onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleChange(e)
                }
                title="Enter your message here..."
              ></textarea>
              <span className="absolute bottom-0 right-2 text-sm text-icon">
                {contact.message.length} / 500
              </span>
            </div>
            <div className="mt-12 flex justify-center">
              <Button
                onClick={handleSubmit}
                className="max-w-1/2 w-full flex-1 border-none"
                disabled={loading}
                text={loading ? "Sending..." : "Submit"}
              />
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

`,
      },
      {
        filename: "ClassName.ts",
        path: "src/utils/ClassName.ts",
        lang: "typescript",
        before: "The cn function is used to merge tailwind class string. In this function we take tailwind classes as an array and using tailwind-merge package we compare and merge similar classes. Classes which are written later will override classes which are written earlier.",
        code:`import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export default function cn(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}`,
      },
      {
        filename: "Button.tsx",
        path: "src/components/ui/Button.tsx",
        lang: "typescript",
        before: "",
        code:`import cn from "@/utils/ClassName";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "dark" | "light" | "primary";
  type?: "submit" | "reset" | "button";
  text: string;
}

export default function Button({
  className,
  text,
  variant = "dark",
  type = "button",
  ...rest
}: Props) {
  const variants = {
    dark: "bg-button text-background shadow-button-dark hover:bg-primary hover:shadow-button-primary",
    light:
      "bg-background text-foreground hover:text-primary shadow-button-light border border-white",
    primary: "bg-primary text-white shadow-button-primary",
  };

  return (
      <button
        className={cn(
          "font-instrument-sans font-medium relative bg-button text-background py-1.5 px-6 rounded-2xl w-fit h-fit overflow-hidden transition-colors cursor-pointer",
          "group",
          variants[variant],
          className
        )}
        type={type}
        {...rest}
      >
        <span className="flex flex-col py-2 relative overflow-hidden">
          <span className="group-hover:-translate-y-2/1 transition-transform">
            {text}
          </span>
          <span className="absolute left-1/2 text-nowrap -translate-x-1/2 translate-y-2/1 group-hover: group-hover:translate-y-0 transition-transform">
            {text}
          </span>
        </span>
      </button>
  );
}`,
      },
      {
        filename: "Heading.tsx",
        path: "src/components/ui/Heading.tsx",
        lang: "typescript",
        code:`import cn from "@/utils/ClassName";
interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

export default function Heading({ as, className, children, ...props }: Props) {
  const Component = as || "h2";
  return (
    <Component
      className={cn(
        "xl:text-[58px] mt-6 md:text-[51px] text-[40px] first-letter:capitalize font-semibold text-center max-w-[400px] md:max-w-[600px] xl:max-w-[700px] mx-auto text-heading tracking-tight leading-16",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
`,
      },
      {
        filename: "route.ts",
        path: "src/app/api/contact/route.ts",
        lang: "Node",
        before: "This is the backend logic of contact form. This file is responsible for sending email to the admin. It uses nodemailer package to send email using gmail service. It also handles errors and returns appropriate response to the frontend.",
        code:`import { type NextRequest, NextResponse } from "next/server";
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
      pass: process.env.PASSWORD,
    },
  });

   const admin: Mail.Options = {
    from: process.env.EMAIL,
    to: email,
    subject: \`New Contact Form Submission: `+"${name}"+`\`,
    replyTo: email,
    html: \`
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
            <p><strong>Name:</strong> `+"${name} ${family_name ? "+"\` ${family_name}\` : "+'""'+`}</p>
            <p><strong>Email:</strong> `+"${email}"+`</p>
            <p><strong>Purpose:</strong> `+"${subject}"+`</p>
            <p><strong>Message:</strong></p>
            <blockquote>`+"${message}"+`</blockquote>

            <p><strong>Please review and respond if needed.</strong></p>
          </div>

          <div class="footer">
            <p>Best Regards,</p>
            <p><strong>Your Automated System</strong></p>
          </div>
        </div>

      </body>
      </html>
\`,
    text: \`Hello Sir,

You have received a new contact form submission from your portfolio. Here are the details:

- Name: `+"${name} ${family_name ? " + '" ${family_name}"' + ` : ""}
- Email: `+"${email}"+`
- Purpose: `+"${subject}"+`
- Message: 

"`+"${message}"+`"

Please review the message and respond if needed.

Best Regards,
Your Automated System
\`,
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
}`
      },
      {
        filename: ".env",
        path: ".env",
        lang: "Variables",
        before: ".env file contains email and password for sending email to admin. It is used in route.ts file for sending email to admin.",
        after: " ",
        code:`EMAIL = "devian.agency@gmail.com"
PASSWORD = "Your Gmail App Password"`,
      }
    ]
  },
  {
    title: "Day 2",
    slug: url + "day-2",
    image: imgurl + "day-2/image.png",
    "sub-title": "Theme Switcher with smooth transition",
    description:
      "Build a Theme Switcher, which have smooth transitions between sun and moon svg icons. You can also control animation duration.",
    by: {
      name: "Ayush Sharma",
      profile: imgurl + "day-2/profile.jpg",
      github: "https://github.com/ayushsharma74",
      twitter: "https://x.com/ayshtwt",
    },
    challengedOn: "02-11-2025",
    completedOn: "04-11-2025",
    code:{
      filename: "page.tsx",
      path: "src/components/ui/ThemeSwitcher.tsx",
      after: " ",
      lang: "Typescript",
      code:`"use client";
import { useState } from "react";
export function Day2() {
  const [isDark, setIsDark] = useState<boolean>(false)
  return (
    <div className="flex flex-col text-center gap-6 transition-colors duration-500">
      <div className="size-fit mx-auto bg-icon p-2 rounded-full cursor-pointer"  onClick={() => setIsDark(!isDark)}>
        {
          isDark &&
          <SunToMoon duration={0.5} shadow="#b9b9b9" className="size-10"/>
        }
        {
          !isDark && 
          <MoonToSun duration={0.5} shadow="#b9b9b9" className="size-10" />
        }
      </div>
    </div>
  );
}

interface IconProps extends React.HTMLAttributes<SVGElement> {
  className?: string;
  shadow?: string;
  duration?: number
}

function SunToMoon({className, shadow = "white", duration = 1, ...props}: IconProps) {
  return(
    <svg width="120" height="120" viewBox="0 0 24 24">
        <g
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          {...props}
        >
          
          <path d="M12 12v2">
            <animate
              attributeName="d"
              values="M12 2v2;M12 12v2"
              begin="0s"
              dur={duration + "s"}
              fill="freeze"
            />
          </path>
          <path d="M12 12v2">
             <animate
              attributeName="d"
              values="M12 20v2;M12 12v2"
              begin="0s"
              dur={duration + "s"}
              fill="freeze"
            />
          </path>
          <path d="M9.53 10.93l1.41 1.41">
            <animate
              attributeName="d"
              values="M4.93 4.93l1.41 1.41; M9.53 10.93l1.41 1.41"
              begin="0s"
              dur={duration + "s"}
              fill="freeze"
            />
          </path>
          <path d="M13.06 13.06l1.41 1.41">
            <animate
              attributeName="d"
              values="M17.66 17.66l1.41 1.41; M13.06 13.06l1.41 1.41"
              begin="0s"
              dur={duration + "s"}
              fill="freeze"
            />
          </path>
          <path d="M12 12h2">
            <animate
              attributeName="d"
              values="M2 12h2;M12 12h2"
              begin="0s"
              dur={duration + "s"}
              fill="freeze"
            />
          </path>
          <path d="M12 12h2">
            <animate
              attributeName="d"
              values="M20 12h2;M12 12h2"
              begin="0s"
              dur={duration + "s"}
              fill="freeze"
            />
          </path>
          <path d="M12.93 12.07l1.41-1.41">
            <animate
              attributeName="d"
              values="M4.93 19.07l1.41-1.41;M12.93 12.07l1.41-1.41"
              begin="0s"
              dur={duration + "s"}
              fill="freeze"
            />
          </path>
          <path d="M12.66 12.34l1.41-1.41">
            <animate
              attributeName="d"
              values="M17.66 6.34l1.41-1.41;M12.66 12.34l1.41-1.41"
              begin="0s"
              dur={duration + "s"}
              fill="freeze"
            />
          </path>
          <circle cx="12" cy="12" r="4">
            <animate
              attributeName="r"
              values="4;6"
              begin={ duration + (duration / 3) + "s"}
              dur={duration + "s"}
              fill="freeze"
            />
          </circle>
          <circle cx="18" stroke={shadow} cy="10" fill={shadow} r="0">
            <animate
              attributeName="cx"
              values="22;17"
              begin={ duration + (duration / 2) + "s"}
              dur={duration + "s"}
              fill="freeze"
            />
            <animate
            attributeName="cy"
              values="14;8"
              begin={ duration + (duration / 2) + "s"}
              dur={duration + "s"}
              fill="freeze" />
            <animate
              attributeName="r"
              values="0;6"
              begin={ duration + (duration / 2) + "s"}
              dur={duration + "s"}
              fill="freeze"
            />
          </circle>
          
        </g>
      </svg>
  )
}

function MoonToSun({className, shadow="white", duration = 1, ...props}:IconProps) {
  return(
    <svg width="120" height="120" viewBox="0 0 24 24">
        <g
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          {...props}
        >
          
          <path d="M12 12v2">
            <animate
              attributeName="d"
              values="M12 12v2;M12 2v2"
              begin={duration + (duration / 2) + "s"}
              dur={duration + "s"}
              fill="freeze"
            />
          </path>
          <path d="M12 12v2">
             <animate
              attributeName="d"
              values="M12 12v2;M12 20v2"
              begin={duration + (duration / 2) + "s"}
              dur={duration + "s"}
              fill="freeze"
            />
          </path>
          <path d="M9.53 10.93l1.41 1.41">
            <animate
              attributeName="d"
              values="M9.53 10.93l1.41 1.41; M4.93 4.93l1.41 1.41"
              begin={duration + (duration / 2) + "s"}
              dur={duration + "s"}
              fill="freeze"
            />
          </path>
          <path d="M13.06 13.06l1.41 1.41">
            <animate
              attributeName="d"
              values="M13.06 13.06l1.41 1.41; M17.66 17.66l1.41 1.41"
              begin={duration + (duration / 2) + "s"}
              dur={duration + "s"}
              fill="freeze"
            />
          </path>
          <path d="M12 12h2">
            <animate
              attributeName="d"
              values="M12 12h2;M2 12h2"
              begin={duration + (duration / 2) + "s"}
              dur={duration + "s"}
              fill="freeze"
            />
          </path>
          <path d="M12 12h2">
            <animate
              attributeName="d"
              values="M12 12h2;M20 12h2"
              begin={duration + (duration / 2) + "s"}
              dur={duration + "s"}
              fill="freeze"
            />
          </path>
          <path d="M12.93 12.07l1.41-1.41">
            <animate
              attributeName="d"
              values="M12.93 12.07l1.41-1.41; M4.93 19.07l1.41-1.41"
              begin={duration + (duration / 2) + "s"}
              dur={duration + "s"}
              fill="freeze"
            />
          </path>
          <path d="M12.66 12.34l1.41-1.41">
            <animate
              attributeName="d"
              values="M12.66 12.34l1.41-1.41; M17.66 6.34l1.41-1.41"
              begin={duration + (duration / 2) + "s"}
              dur={duration + "s"}
              fill="freeze"
            />
          </path>
          <circle cx="12" cy="12" r="6">
            <animate
              attributeName="r"
              values="6;4"
              begin={duration + (duration / 3) + "s"}
              dur={duration + "s"}
              fill="freeze"
            />
          </circle>
          <circle cx="17" stroke={shadow} cy="8" fill={shadow} r="6">
            <animate
              attributeName="cx"
              values="17;22"
              begin="0s"
              dur={duration + "s"}
              fill="freeze"
            />
            <animate
            attributeName="cy"
              values="8;14"
              begin="0s"
              dur={duration + "s"}
              fill="freeze" />
            <animate
              attributeName="r"
              values="6;0"
              begin="0s"
              dur={duration + "s"}
              fill="freeze"
            />
          </circle>
          
        </g>
      </svg>
  )
}`
    }
  },
  {
    title: "Day 3",
    slug: url + "day-3",
    image: imgurl + "day-3/image.png",
    "sub-title": "Code Block",
    description:
      "This is a fast and fully customizable code block component with copy to clipboard functionality. You can even modify colors for any language's syntax.",
    by: {
      name: "Gajender",
      profile: imgurl + "day-3/profile.jpg",
      github: "https://github.com/Gajendrasuman",
      twitter: "https://x.com/Averrraagggeeee",
    },
    challengedOn: "05-11-2025",
    completedOn: "06-11-2025",
    code:[
      {
        filename: "CodeBlock.tsx",
        path: "src/components/ui/CodeBlock.tsx",
        lang: "Typescript",
        code:`"use client";
import cn from "@/utils/ClassName";
import { Code as CodeIcon, File } from "lucide-react";
import codeCompiler, { Color } from "@/components/ui/code-compiler";
import toast from "react-hot-toast";
import { useState } from "react";
import P from "./p";

interface CodeType {
  filename: string;
  path: string;
  showPath?: boolean;
  lang: string;
  before?: string;
  after?: string;
  code: string;
}

export default function Code({
  code,
  colors,
  className,
  ...props
}: {
  code: CodeType | CodeType[];
  colors?: Color;
  className?: string;
} & React.ComponentProps<"div">) {
  const [copied, setCopied] = useState<Record<string, boolean>>({});
  const handleCopy = (code: string, index: number) => {
    const result = navigator.clipboard.writeText(code);
    result
      .then(() => {
        setCopied((prev) => ({ ...prev, [index]: true }));
        toast.success("Code copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy code!");
      });
  };

  const { color } = codeCompiler({});

  return (
    <section className="w-full mt-12">
      {Array.isArray(code) ? (
        code?.map((c, i) => (
          <div key={i} className="md:max-w-7xl mx-auto">
            {c?.before && (
              <P className="md:max-w-7xl text-left mb-4 mt-10">{c.before}</P>
            )}
            <div
              style={{ backgroundColor: color.background, color: color.text }}
              className={cn(
                "w-full min-w-96 max-w-6xl border rounded-xl pt-12 pb-2 relative overflow-hidden mt-2",
                !c?.before && "mt-10",
                className
              )}
              {...props}
            >
              <div
                className={cn(
                  "p-4 pl-2 mx-2 max-h-200 overflow-auto scrollbar-transparent "
                )}
              >
                {/* Title Bar */}
                <div
                  style={{ backgroundColor: color.title }}
                  className="absolute top-0 left-0 w-full h-10 flex items-center justify-between gap-2 px-4"
                >
                  <h3 className="text-lg flex items-center gap-2">
                    <span>
                      <File size={20} />
                    </span>{" "}
                    {c.filename}
                  </h3>
                  <p
                    style={{
                      color: color.path,
                      display: new String(c?.showPath) == "false" ? "none" : "block",
                    }}
                    className="text-lg hidden md:inline-block"
                  >
                    ../{c.path}
                  </p>
                  <p className="text-lg flex items-center gap-2">
                    <span>
                      <CodeIcon size={20} />
                    </span>
                    {c.lang}
                  </p>
                </div>

                {/* Code Block */}
                <code className={cn("[counter-reset:list] list-none")}>
                  <span
                    style={{ color: color.text }}
                    className="opacity-50 md:hidden"
                  >
                    // {c.path}
                  </span>
                  {c.code.split(/\\r?\\n/g).map((line, n) => (
                    <li key={n} className={cn("whitespace-pre")}>
                      <span className="[counter-increment:list] before:content-[counter(list)] relative before:mr-2 before:text-right before:inline-block opacity-50 mr-2"></span>
                      {codeCompiler({ text: n === 0 ? line.trim(): line, color: colors }).nodes}
                    </li>
                  ))}
                  <div
                    onClick={() => handleCopy(c.code, i)}
                    style={{
                      backgroundColor: color.text,
                      color: color.background,
                    }}
                    className="absolute top-12 right-4 w-fit px-2 rounded-md font-medium opacity-60 cursor-pointer"
                  >
                    <span className="font-instrument-sans">
                      {copied[i] ? "Copied" : "Copy"}
                    </span>
                  </div>
                </code>
              </div>
            </div>
            {c?.after && (
              <P className="md:max-w-7xl text-left mb-10">{c?.after}</P>
            )}
          </div>
        ))
      ) : (
        <div className="">
          {code?.before && (
            <P className="md:max-w-7xl text-left mb-4 mt-10">{code.before}</P>
          )}
          <div
            style={{ backgroundColor: color.background, color: color.text }}
            className={cn(
              "w-full min-w-96 mx-auto max-w-6xl border rounded-xl pt-12 pb-2 relative overflow-hidden mt-2",
              className
            )}
            {...props}
          >
            <div
              className={cn(
                "p-4 pl-2 mx-2 max-h-200 overflow-auto scrollbar-transparent "
              )}
            >
              {/* Title Bar */}
              <div
                style={{ backgroundColor: color.title }}
                className="absolute top-0 left-0 w-full h-10 flex items-center justify-between gap-2 px-4"
              >
                <h3 className="text-lg flex items-center gap-2">
                  <span>
                    <File size={20} />
                  </span>{" "}
                  {code.filename}
                </h3>
                <p
                  style={{
                    color: color.path,
                    display: new String(code?.showPath) == "false" ? "none" : "block",
                  }}
                  className="text-lg hidden md:inline-block"
                >
                  ../{code.path}
                </p>
                <p className="text-lg flex items-center gap-2">
                  <span>
                    <CodeIcon size={20} />
                  </span>
                  {code.lang}
                </p>
              </div>

              {/* Code Block */}
              <code className={cn("[counter-reset:list] list-none")}>
                <span
                  style={{ color: color.text }}
                  className="opacity-50 md:hidden"
                >
                  // {code.path}
                </span>
                {code.code.split(/\\r?\\n/g).map((line, n) => (
                  <li key={n} className={cn("whitespace-pre")}>
                    <span className="[counter-increment:list] before:content-[counter(list)] relative before:mr-2 before:text-right before:inline-block opacity-50 mr-2"></span>
                    {codeCompiler({ text: n === 0 ? line.trim(): line, color: colors }).nodes}
                  </li>
                ))}
                <div
                  onClick={() => handleCopy(code.code, 0)}
                  style={{
                    backgroundColor: color.text,
                    color: color.background,
                  }}
                  className="absolute top-12 right-4 w-fit px-2 rounded-md font-medium opacity-60 cursor-pointer"
                >
                  <span className="font-instrument-sans">
                    {copied[0] ? "Copied" : "Copy"}
                  </span>
                </div>
              </code>
            </div>
          </div>
          {code.after && (
            <P className="md:max-w-7xl text-left mb-10">{code?.after}</P>
          )}
        </div>
      )}
    </section>
  );
}`
      },
      {
        filename: "code-compiler.tsx",
        path: "src/components/ui/code-compiler.tsx",
        lang: "Typescript",
        code: `export interface Color {
  background: string;
  title: string;
  path: string;
  text: string;
  comment: string;
  tagBracket: string;
  tagName: string;
  attribute: string;
  equal: string;
  string: string;
  jsxBrace: string;
  number: string;
  boolean: string;
  keyword: string;
  type: string;
  fn: string;
  operator: string;
}

const defaultColors: Color = {
  background: "#0A0C10",
  title: "#222",
  path: "#ccc",
  text: "#E5E9F0",
  comment: "#5B6178",
  tagBracket: "#FF6B81",
  tagName: "#9B7CFF",
  attribute: "#7DCEFF",
  equal: "#FF4F6E",
  string: "#A6E57A",
  jsxBrace: "#FF6B9A",
  number: "#FF9668",
  boolean: "#FF9668",
  keyword: "#9B7CFF",
  type: "#7DCEFF",
  fn: "#5CA9FF",
  operator: "#FF6B81",
};

const pattern = /(\/\/[^\\n]*)|\/\*([\s\S]*?)\*\/|(<\/?([\w-]+))|\/>|>|(([\w-]+)(?==))|(=)|"([^"]*)"|'([^']*)'|\{([^{}]*)\}|(\b\d+(?:\.\d+)?\b)|\b(true|false|null|undefined)\b|\b(const|let|var|return|if|else|for|while|import|from|default|export|extends|interface|type|class|new|function|async|await|try|catch|finally|switch|case|break|continue)\b|(\b[A-Z][a-zA-Z0-9_]*\b)|([a-zA-Z_][a-zA-Z0-9_]*)(?=\()|(=>|\+|-|\*|\$|[A-Za-z0-9_-]*\:|[A-Za-z0-9_-]*\?\:|\/|%|&&|\|\|)/g;

const codeCompiler = ({
  text,
  color = defaultColors,
}: {
  text?: string;
  color?: Color;
}): { nodes: React.ReactNode[]; color: Color } => {
  if (!text) return { nodes: [], color };

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;

  const push = (content: React.ReactNode, col: string) =>
    nodes.push(
      <span key={nodes.length} style={{ color: col, whiteSpace: "pre" }}>
        {content}
      </span>
    );

  text.replace(
    pattern,
    (
      match,
      gCommentSingle,
      gCommentMulti,
      gTagOpen,
      gTagName,
      _gAttrOuter,
      gAttrName,
      gEqual,
      gStrDouble,
      gStrSingle,
      gJsxInner,
      gNumber,
      gBoolean,
      gKeyword,
      gType,
      gFn,
      gOperator,
      offset
    ) => {
      if (lastIndex < offset) {
        const raw = text.slice(lastIndex, offset);
        nodes.push(
          <span key={nodes.length} style={{ whiteSpace: "pre" }}>
            {raw}
          </span>
        );
      }
      if (gCommentSingle) {
        push(gCommentSingle, color.comment);
      } else if (gCommentMulti) {
        push(\`/*`+"${gCommentMulti}"+`*/\`, color.comment);
      } else if (gTagOpen) {
        push("<", color.tagBracket);
        if (gTagOpen.startsWith("</")) push("/", color.tagBracket);
        if (gTagName) push(gTagName, color.tagName);
      } else if (match === "/>") {
        push("/", color.tagBracket);
        push(">", color.tagBracket);
      } else if (match === ">") {
        push(">", color.tagBracket);
      } else if (gAttrName) {
        push(gAttrName, color.attribute);
      } else if (gEqual) {
        push("=", color.equal);
      } else if (gStrDouble !== undefined) {
        push(\`"\`, color.string);
        push(gStrDouble, color.string);
        push(\`"\`, color.string);
      } else if (gStrSingle !== undefined) {
        push(\`'\`, color.string);
        push(gStrSingle, color.string);
        push(\`'\`, color.string);
      } else if (gJsxInner !== undefined) {
        push("{", color.jsxBrace);
        const inner = codeCompiler({ text: gJsxInner, color }).nodes;
        nodes.push(...inner);
        push("}", color.jsxBrace);
      } else if (gNumber) {
        push(gNumber, color.number);
      } else if (gBoolean) {
        push(gBoolean, color.boolean);
      } else if (gKeyword) {
        push(gKeyword, color.keyword);
      } else if (gType) {
        push(gType, color.type);
      } else if (gFn) {
        push(gFn, color.fn);
      } else if (gOperator) {
        push(gOperator, color.operator);
      } else {
        push(match, color.text);
      }

      lastIndex = offset + match.length;
      return match;
    }
  );

  if (lastIndex < text.length) {
    const rest = text.slice(lastIndex);
    nodes.push(
      <span key={nodes.length} style={{ whiteSpace: "pre" }}>
        {rest}
      </span>
    );
  }

  return { nodes, color };
};

export default codeCompiler;
`,
      },
      {
        filename: "P.tsx",
        path: "src/components/ui/P.tsx",
        lang: "Typescript",
        code:`import cn from "@/utils/ClassName"

interface Props extends React.HTMLAttributes<HTMLParagraphElement>{
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
}


export default function P({
  className,
  size,
  children,
  ...rest
}: Props
){
  return (
    <p className={cn("font-inter sm:text-lg text-base text-center text-foreground md:max-w-100 mx-auto mt-6", className, size && sizeClasses[size])} {...rest}>
  {children}
</p>
  )
}`
      },
      {
        filename: "ClassName.ts",
        path: "src/utils/ClassName.ts",
        lang: "typescript",
        heading: "CN Function",
        before: "The cn function is used to merge tailwind class string. In this function we take tailwind classes as an array and using tailwind-merge package we compare and merge similar classes. Classes which are written later will override classes which are written earlier.",
        after: " ",
        code:`import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export default function cn(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}`,
      },
    ]
  },
];
