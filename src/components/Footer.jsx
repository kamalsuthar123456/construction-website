import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Send,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          
          {/* BRAND */}
          <div>
            <h3 className="text-3xl font-extrabold mb-6 tracking-wide">
              <span className="text-primary">Con</span>struct
            </h3>

            <p className="text-gray-400 leading-relaxed mb-6">
              Building excellence with innovation, precision, and unmatched
              quality. Transforming your dreams into reality.
            </p>

            <div className="flex gap-4">
              {/* Social Icons */}
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.15, y: -4 }}
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition-all"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-gray-300">
              {[
                "General Construction",
                "Property Maintenance",
                "Architecture Design",
                "Interior Design",
                "Exterior Design",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              {["About Us", "Projects", "Our Team", "Careers", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-5">
              Subscribe to receive the latest updates and news from us.
            </p>

            <div className="flex gap-2">
              <div className="flex items-center bg-gray-800 rounded-full flex-1 px-3 border border-gray-700 focus-within:border-primary transition-all">
                <Mail size={20} className="text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent py-3 px-2 focus:outline-none text-gray-200"
                />
              </div>

              <button className="bg-primary px-6 py-3 flex items-center justify-center rounded-full hover:bg-orange-600 transition-all">
                <Send size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          <p>© 2025 Construct. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
