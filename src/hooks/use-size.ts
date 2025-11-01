"use client"

import { useEffect, useState } from "react";

export default function useSize() {
    const [size, setSize] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            setSize(window.innerWidth);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return size;
}