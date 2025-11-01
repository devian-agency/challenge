import type { LucideIcon } from "lucide-react";
import cn from "@/utils/ClassName";
import { Zap, UsersRound, CalendarCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function ListScrolling() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prevActive) => (prevActive + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  
  }, []);
  
  return (
    <div>
      
      {/* Top Menu */}
      <ul className="flex gap-4 w-fit mx-auto mt-8 p-3 border border-white shadow-soft rounded-xl">
        <TopMenu onClick={() => setActive(0)} active={active === 0}>
          Nexus Focus
        </TopMenu>
        <TopMenu onClick={() => setActive(1)} active={active === 1}>
          Collaboration
        </TopMenu>
        <TopMenu onClick={() => setActive(2)} active={active === 2}>
          Task Flow
        </TopMenu>
      </ul>

      {/* Content */}
      <div className="flex border border-white shadow-soft rounded-2xl p-2 mt-12">

        {/* Bottom Menu */}
        <div className="w-1/2 h-full pr-4">
          <ul className="flex md:flex-col gap-4">
            <MenuCard
              onClick={() => setActive(0)}
              active={active === 0}
              icon={Zap}
              h="AI Assistance"
              p="Automate tasks and get instant smart suggestions."
            />
            <MenuCard
              onClick={() => setActive(1)}
              active={active === 1}
              icon={UsersRound}
              h="Team Hub"
              p="Assign tasks and share updates in one simple view."
            />
            <MenuCard
              onClick={() => setActive(2)}
              active={active === 2}
              icon={CalendarCheck}
              h="Track Progress"
              p="See how every action moves you forward."
            />
          </ul>
        </div>

        <div className="w-1/2 h-128 overflow-hidden relative border border-white shadow-soft rounded-xl">
          <div
            className="transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateY(-${active * 100}%)` }}
          >
            <div className="h-full flex items-center justify-center">
              <img
                src="/images/inside-section/image1.avif"
                className="w-4/5 object-contain rounded-lg"
                alt="AI Assistance"
              />
            </div>
            <div className="h-full flex items-center justify-center">
              <img
                src="/images/inside-section/image2.avif"
                className="w-4/5 object-contain rounded-lg"
                alt="Team Hub"
              />
            </div>
            <div className="h-full flex items-center justify-center">
              <img
                src="/images/inside-section/image3.avif"
                className="w-4/5 object-contain rounded-lg"
                alt="Track Progress"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MenuCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  h: string;
  p: string;
  active?: boolean;
}
function MenuCard({ icon, h, p, active, ...props }: MenuCardProps) {
  const Icon = icon as LucideIcon;
  return (
    <div
      className={cn(
        "w-full cursor-pointer p-6 rounded-xl flex flex-col gap-3 border border-transparent transition-all duration-700",
        active && "shadow-soft border-white"
      )}
      {...props}
    >
      <span>
        <Icon className="text-foreground" size={35} />
      </span>
      <h3 className="text-foreground font-instrument-sans font-medium text-xl">
        {h}
      </h3>
      <p className="text-foreground font-inter text-">{p}</p>
    </div>
  );
}

interface TopMenuProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  active?: boolean;
}

function TopMenu({ children, active, ...props }: TopMenuProps) {
  return (
    <li
      {...props}
      className={cn(
        "px-3 cursor-pointer py-1 text-base font-instrument-sans border border-transparent rounded-lg transition-all duration-700",
        active && "shadow-soft border-white font-medium"
      )}
    >
      {children}
    </li>
  );
}
