import { BellOff, EllipsisVertical } from "lucide-react";
import cn from "@/utils/ClassName";
import { useState, useEffect } from "react";
import { CheckCheck, Settings } from "lucide-react";

interface Text {
  id: string;
  type: "text";
  title: string;
  message: string;
  read: boolean;
  date: string;
}

interface Image {
  id: string;
  type: "image";
  title: string;
  message: string;
  image: string;
  link?: string;
  read: boolean;
  date: string;
}

interface ButtonImage {
  id: string;
  type: "button_image";
  title: string;
  message: string;
  image: string;
  button: string;
  link: string;
  read: boolean;
  date: string;
}

interface Button {
  id: string;
  type: "button";
  title: string;
  message: string;
  button: string;
  link: string;
  read: boolean;
  date: string;
}

export type Notification = Text | Image | ButtonImage | Button;

const notifications: Notification[] = [
  {
    id: "1",
    type: "text",
    title: "Welcome!",
    message: "Welcome to Nexus.",
    read: false,
    date: new Date().toLocaleString(),
  },
  {
    id: "2",
    type: "button",
    title: "You've got a new message",
    message: "Click the button below to view it.",
    button: "View Notification",
    link: "#",
    read: true,
    date: new Date().toLocaleString(),
  },
  {
    id: "3",
    type: "image",
    title: "Diwali: Discount Available",
    message: "Get 50% off on all products. Limited time offer.",
    image:
      "https://img.freepik.com/free-vector/modern-outlet-composition-with-flat-design_23-2147967972.jpg?t=st=1760171083~exp=1760174683~hmac=0ada10e1f69a6d4bb75444fd9e222016f277dc3459510ebc696da6de3cd20aab&w=1480",
    link: "#",
    read: false,
    date: new Date().toLocaleString(),
  },
  {
    id: "4",
    type: "button_image",
    title: "You're out of credits",
    message:
      "Purchase more credits to continue using our services. Limited time offer. Click the button below to buy.",
    image:
      "https://img.freepik.com/premium-vector/rebate-program-consumer-benefit-selling-discount-concept-money-saving-cash-back-service-cost-transfer-vector-illustration-flat_186332-774.jpg?w=1480",
    link: "#",
    button: "Buy Credits",
    read: false,
    date: new Date().toLocaleString(),
  },
];

const timeFormat = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days === 1) {
    return `yesterday`;
  } else if (days > 7 && days < 30 && days / 7 === 1) {
    return `a week ago`;
  } else if (days >= 30 && days < 365 && Math.floor(days / 30) === 1) {
    return `a month ago`;
  } else if (days >= 365 && Math.floor(days / 365) === 1) {
    return `a year ago`;
  } else if (days > 7 && days < 30) {
    return `${Math.floor(days / 7)} weeks ago`;
  } else if (days >= 30 && days < 365) {
    return `${Math.floor(days / 30)} months ago`;
  } else if (days >= 365) {
    return `${Math.floor(days / 365)} years ago`;
  } else {
    return `${days} days ago`;
  }
};

export default function Notifications({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (!open) {
      setMenuOpen(false);
    }
  }, [open]);
  return (
    <div
      className={cn(
        "absolute top-[150%] right-0 border rounded py-0 -z-10 opacity-0 min-h-0 h-0 overflow-hidden max-h-96 min-w-64 max-w-72 overcflow-y-auto bg-background text-foreground shadow-lg transition-all duration-300",
        open &&
          "min-h-96 py-2 top-[250%] opacity-100 z-998 overflow-auto scrollbar-none"
      )}
    >
      {/* Notification Header */}
      <div className="w-full h-9 flex items-center px-2 justify-between border-b border-border">
        <h3 className="font-medium mb-2 ">Notifications</h3>
        <div className="relative">
          <span className="cursor-pointer">
            <EllipsisVertical onClick={toggleMenu} className={menuOpen ? "text-primary" : ""} size={20} />
          </span>

          {/* Menu */}
          <ul
            className={cn(
              "absolute bg-background text-foreground py-0 top-0 right-0 rounded border shadow-md mt-2 w-fit  h-0 flex flex-col overflow-y-hidden opacity-0 transition-all duration-300 -z-10",
              menuOpen && "h-28 top-[150%] opacity-100 z-999"
            )}
          >
            <li
              className={cn(
                "flex gap-2 items-center hover:text-primary px-2 py-2 hover:bg-card-hover text-foreground transition-colors duration-300 cursor-pointer capitalize whitespace-nowrap text-sm"
              )}
            >
              <span><CheckCheck className="text-primary" size={18} /></span>
              <span>Mark all as read</span>
            </li>
            <li
              className={cn(
                "flex gap-2 items-center hover:text-primary px-2 py-2 hover:bg-card-hover text-foreground transition-colors duration-300 cursor-pointer capitalize whitespace-nowrap text-sm"
              )}
              onClick={() => window.location.href = "/settings/notifications/off"}
            >
              <span><BellOff className="text-primary" size={18} /></span>
              <span>Turn off notifications</span>
            </li>
            <li
              className={cn(
                "flex gap-2 items-center hover:text-primary px-2 py-2 hover:bg-card-hover text-foreground transition-colors duration-300 cursor-pointer capitalize whitespace-nowrap text-sm"
              )}
              onClick={() => window.location.href = "/settings"}
            >
              <span><Settings className="text-primary" size={18} /></span>
              <span>Settings</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Notifications */}
      <div className="">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={cn(
              "border-b px-2 border-border last:border-0 py-2 hover:bg-card-hover transition-colors duration-300",
              notification.read && "bg-card-hover"
            )}
          >
            <div className=" flex gap-2 justify-between items-start w-full">
              <h3 className="text-sm text-wrap break-all font-medium text-foreground">
                {notification.title}
              </h3>
              {!notification.read && (
                <span className="min-w-2 min-h-2 translate-y-1 rounded-full bg-primary"></span>
              )}
            </div>

            <div
              className={cn(
                notification.type === "button_image" && "flex gap-2"
              )}
            >
              {notification.type === "button_image" && (
                <div className="mt-2 size-15 rounded overflow-hidden">
                  <img
                    src={notification.image}
                    alt={notification.title}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              )}
              <p className="text-xs mt-2 text-muted-foreground w-full text-wrap ">
                {notification.message}
              </p>
            </div>
            {notification.type === "image" && (
              <div className="mt-2 w-full h-32 rounded overflow-hidden">
                <img
                  src={notification.image}
                  alt={notification.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            )}
            <div
              className={cn(
                notification.type === "button_image" && "flex justify-end"
              )}
            >
              {(notification.type === "button" ||
                notification.type === "button_image") && (
                <button
                  className="mt-2 text-xs bg-button text-button-foreground px-2 py-1 rounded hover:bg-button-hover cursor-pointer "
                  onClick={() => (window.location.href = notification.link)}
                >
                  {notification.button}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
