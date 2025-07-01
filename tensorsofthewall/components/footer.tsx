import React from "react";

const Footer = () => {
    // Get the year once at render time, no need for state/effect
    const year = new Date().getFullYear();

    return (
        <footer className="bg-black-800 py-8 text-white mt-auto">
            <div className="container mx-auto px-4">
                <p className="text-center text-sm">
                    This site was handcrafted with care (and mild frustration). Bugs are features, right?
                    <br />
                    &copy; {year} Sandesh Bharadwaj. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;


