import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black-800 py-8 text-white">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Sandesh Bharadwaj. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;