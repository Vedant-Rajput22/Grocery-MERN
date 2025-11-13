import React from "react";
import { assets, footerLinks } from "../assets/assets";
import { Link } from 'react-router-dom';

const Footer = () => {

  return (
    <div className="mt-24 bg-green-50 px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
            {/* Logo + About */}
            <div className="md:w-1/2">
            {/* Logo + Company Name */}
            <div className="flex items-center gap-3">
                <img
                className="w-12 md:w-14"
                src={assets.logo}
                alt="logo"
                />
                <span className="text-2xl md:text-3xl font-bold text-green-700 logo-text">
                EcoGrocery
                </span>
            </div>

            {/* Tagline / About text */}
            <p className="max-w-[410px] mt-6 text-gray-700">
                We deliver fresh groceries and snacks straight to your door. 
                Trusted by thousands, we aim to make your shopping experience 
                simple and affordable.
            </p>
        </div>


        {/* Link Sections */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full md:w-1/2">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    {String(link.url || '').startsWith('/') ? (
                      <Link to={link.url} className="hover:underline transition">
                        {link.text}
                      </Link>
                    ) : (
                      <a href={link.url || '#'} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined} className="hover:underline transition">
                        {link.text}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright {new Date().getFullYear()} © Eco-Grocery.dev All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
