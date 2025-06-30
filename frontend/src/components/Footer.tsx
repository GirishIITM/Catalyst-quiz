import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { smartclasshub, book, hat } from "@/assets";

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-footer-bg dark:bg-gradient-to-b dark:from-background dark:via-background dark:to-gray-900 text-footer-text dark:text-foreground pt-12" id="contact">
      <div className="bg-footer-callout dark:bg-gray-800 p-6 md:p-10 rounded-[31px] relative mx-4 md:mx-auto max-w-6xl border border-footer-border dark:border-gray-700 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="max-w-full md:max-w-[60%]">
            <div className="flex items-center gap-4 mb-4">
              <img src={book} alt="icon" className="w-16" />
              <h2 className="text-3xl font-bold text-footer-text dark:text-foreground">Let's Connect Creating<br />Community</h2>
            </div>
            <p className="text-base mb-6 text-footer-text/80 dark:text-muted-foreground">
              In today's fast-changing world, it's more important than ever to build a learning space that's inclusive, supportive, and empowering for every student and teacher.
            </p>
            <Button className="bg-primary hover:bg-primary-hover text-black font-bold">
              Sign up
            </Button>
          </div>
          <img src={hat} alt="graduation hat" className="w-24 md:w-38 md:absolute md:-top-12 md:-right-15" />
        </div>
      </div>

      <div className="bg-footer-bg dark:bg-gray-900 pt-8">
        <div className="flex flex-wrap justify-between px-4 md:px-8 lg:px-16 max-w-7xl mx-auto gap-8 mb-8">
          <div className="flex-1 min-w-[200px]">
            <img src={smartclasshub} alt="QuizCatalyst AI Logo" className="w-25 mb-4" />
            <p className="text-sm text-footer-text/70 dark:text-muted-foreground leading-relaxed mb-4">
              Building a Learning Space That Feels Like Home.
              Creating a classroom—online or offline—is more than just sharing content. It's about years of dedication, dreams, and thoughtful choices coming together to support every learner's journey.
            </p>
          </div>

          <div className="flex-1 min-w-[200px]">
            <h4 className="text-xl mb-4 text-footer-text dark:text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Services', 'Our Works', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-footer-text/70 dark:text-muted-foreground hover:text-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 min-w-[200px]">
            <h4 className="text-xl mb-4 text-footer-text dark:text-foreground">Contact</h4>
            <div className="space-y-2 text-sm text-footer-text/70 dark:text-muted-foreground">
              <p>11903 31st CT N, St. Petersburg, FL 33716</p>
              <p className="flex items-center gap-2">
                <img src="https://i.pinimg.com/originals/22/52/5e/22525e1af533b224bd2314e1126ead4f.jpg" alt="Phone" className="w-4" />
                123-456-789
              </p>
              <p className="flex items-center gap-2">
                <img src="https://static.vecteezy.com/system/resources/previews/000/581/545/original/email-icon-vector-illustration.jpg" alt="Email" className="w-4" />
                hello@mail.com
              </p>
            </div>
          </div>

          <div className="flex-1 min-w-[200px]">
            <h4 className="text-xl mb-4 text-footer-text dark:text-foreground">Sign Up for Our Newsletter</h4>
            <p className="text-sm text-footer-text/70 dark:text-muted-foreground mb-4">Leave your email to get hot deals & news which benefit you most!</p>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2 bg-white dark:bg-gray-800 border-footer-border dark:border-gray-600"
            />
            <Button className="bg-primary hover:bg-primary-hover text-black font-bold w-full">
              Subscribe Now
            </Button>
          </div>
        </div>

        <div className="text-center py-4 border-t border-footer-border dark:border-gray-600 text-sm text-footer-text/70 dark:text-muted-foreground bg-footer-bg dark:bg-gray-900">
          <p>Copyright © 2025 QuizCatalyst AI. All Rights Reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-primary mx-1">Terms & Conditions</a> ·
            <a href="#" className="text-primary mx-1">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
