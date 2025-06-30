import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toogle";
import { logo } from "@/assets";
import { routes } from "@/types/routes";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-[998]"
          onClick={closeMobileMenu}
        />
      )}

      <header className="fixed top-0 left-0 right-0 bg-black dark:bg-gray-900 text-white z-[1000]">
        <div className="flex items-center justify-between px-8">
          <div className="w-auto">
            <Link to={routes.home} className="flex items-center">
              <img src={logo} alt="QuizCatalyst AI" className="h-20 w-auto" />
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="/#" className="text-white hover:text-primary transition-colors">Home</a>
            <a href="/#features" className="text-white hover:text-primary transition-colors">Features</a>
            <a href="/#contact" className="text-white hover:text-primary transition-colors">Contact</a>
          </nav>

          <div className="hidden md:flex gap-2 items-center">
            <ModeToggle />
            <Button asChild className="bg-primary hover:bg-primary-hover text-black font-bold">
              <Link to={routes.register}>Sign Up</Link>
            </Button>
            <Button asChild variant="secondary" className="bg-white text-black hover:bg-gray-100 font-bold">
              <Link to={routes.login}>Sign In</Link>
            </Button>
          </div>

          <button
            className="md:hidden text-2xl cursor-pointer text-white"
            onClick={toggleMobileMenu}
          >
            &#9776;
          </button>
        </div>

        <div className={`md:hidden absolute top-full right-0 w-full bg-black dark:bg-gray-900 p-8 shadow-lg flex flex-col gap-6 transition-transform duration-300 z-[999] ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
          <button
            className="text-white text-2xl self-end cursor-pointer mb-4"
            onClick={closeMobileMenu}
          >
            &times;
          </button>

          <nav className="flex flex-col gap-4 items-center">
            <a href="#" className="text-white text-lg py-2 border-b border-gray-700" onClick={closeMobileMenu}>Home</a>
            <a href="#features" className="text-white text-lg py-2 border-b border-gray-700" onClick={closeMobileMenu}>Features</a>
            <a href="#contact" className="text-white text-lg py-2 border-b border-gray-700" onClick={closeMobileMenu}>Contact</a>
          </nav>

          <div className="flex flex-col gap-3 mt-6 items-center">
            <ModeToggle />
            <Button asChild className="bg-primary hover:bg-primary-hover text-black font-bold w-full">
              <Link to={routes.register}>Sign Up</Link>
            </Button>
            <Button asChild variant="secondary" className="bg-white text-black hover:bg-gray-100 font-bold w-full">
              <Link to={routes.login}>Sign In</Link>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
