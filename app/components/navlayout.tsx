import Link from 'next/link';
import Image from 'next/image';
import linkedin_logo from "../assets/linkedin_logo.png";
import github_logo from "../assets/github_logo.png";
import twitter_logo from "../assets/twitter_logo.png";
import React from 'react';
import Footer from "./footer";

type NavLayoutProps = {
    children: React.ReactNode
}

const NavLayout: React.FC<NavLayoutProps> = ({ children }) => {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <header className="flex flex-col justify-center items-center row-start-1 py-12">
          <Link href="/">
            <img src="https://github.com/tensorsofthewall.png" alt="Tensors Of The Wall" className="w-80 h-80" />
          </Link>
          <nav className="flex gap-4 justify-end z-10">
            <Link href="/" className="text-sm sm:text-base">Home</Link>
            <Link href="/projects" className="text-sm sm:text-base">Projects</Link>
            <Link href="#" className="text-sm sm:text-base">Resume</Link>
            <Link href="#" className="text-sm sm:text-base">Blog</Link>
            <Link href="#" className="text-sm sm:text-base">Contact</Link>
          </nav>
          <div className="flex flex-col fixed left-0 top-0 h-screen p-8 justify-center">
            <a href="https://www.linkedin.com/in/sandesh-bharadwaj/" target="_blank" rel="noopener noreferrer">
              <Image src={linkedin_logo} alt="LinkedIn" width={45} height={45}/>
            </a>
            <a href="https://github.com/tensorsofthewall" target="_blank" rel="noopener noreferrer">
              <Image src={github_logo} alt="GitHub" width={45} height={45}/>
            </a>
            <a href="https://twitter.com/tensorsofthewall" target="_blank" rel="noopener noreferrer">
              <Image src={twitter_logo} alt="Twitter" width={45} height={45}/>
            </a>
          </div>
        </header>
        <main>{children}</main>
        <Footer />
      </div>
    );
  };

  export default NavLayout;