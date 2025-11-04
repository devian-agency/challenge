"use client";
import { useState } from "react";

export default function Day2() {
  const [isDark, setIsDark] = useState<boolean>(false)
  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-screen bg-white transition-colors duration-500">
      <h1 className="text-3xl font-bold">Toggle Theme</h1>
      <p className="font-bold text-2xl">Mode: <span className="font-caveat">{isDark ? "Dark" : "Light"}</span></p>
      <div className="size-fit bg-icon p-2 rounded-full cursor-pointer"  onClick={() => setIsDark(!isDark)}>
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
}