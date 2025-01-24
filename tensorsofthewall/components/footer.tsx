"use client";
import React, { useState, useEffect } from "react";

const Footer = () => {
    const [year, setYear] = useState("");

    useEffect(() => {
        setYear(new Date().getFullYear().toString());
    }, []);

    return (
        <div id="footer" className="bg-black-800 py-8 text-white mt-auto">
            <div className="container mx-auto px-4">
                <p className="text-center text-sm">
                    &copy; {year} Sandesh Bharadwaj. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;


