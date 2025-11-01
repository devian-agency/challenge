"use client";
import Heading from "@/components/ui/heading";
import { useState } from "react";
import Button from "@/components/ui/button";
import cn from "@/utils/ClassName";
import axios from "axios";

const emailRegex =
  /^[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)*@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
export default function Home() {
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
    <section className="mt-12 w-full lg:w-3/4 mx-auto">
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
                      `
                w-fit max-w-full text-balance text-background 
                font-instrument-sans text-center rounded-lg font-medium px-3 py-1 shadow-lg
                transition-all duration-300 cursor-pointer
                mt-2 hidden
              `,
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
