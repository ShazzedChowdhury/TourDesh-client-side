import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import LifeDrop from "../../shared/LifeDrop/LifeDrop";
const Footer = () => {
  return (
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 text-[#ffffff]">
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <a className="flex gap-1 items-center">
            <LifeDrop />
          </a>
          <div className="mt-6 lg:max-w-sm">
            <p className="text-sm ">
              Online learning allows students to study anytime, anywhere. It
              offers flexibility, saves time, and supports independent learning.
              With access to digital courses and virtual classes, it's a modern,
              effective way to gain knowledge.
            </p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-base font-bold tracking-wide ">
            Contacts
          </p>
          <div className="flex">
            <p className="mr-1 ">Phone:</p>
            <a
              href="tel:850-123-5021"
              aria-label="Our phone"
              title="Our phone"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              850-123-5021
            </a>
          </div>
          <div className="flex">
            <p className="mr-1 ">Email:</p>
            <a
              href="mailto:info@lorem.mail"
              aria-label="Our email"
              title="Our email"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              info@lorem.mail
            </a>
          </div>
          <div className="flex">
            <p className="mr-1 ">Address:</p>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Our address"
              title="Our address"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              312 Lovely Street, NY
            </a>
          </div>
        </div>
        <div>
          <span className="text-base font-bold tracking-wide ">
            Social
          </span>
          <div className="flex items-center mt-1 space-x-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="btn btn-outline btn-primary"
            >
              <FaFacebookF size={15} />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              className="btn btn-outline btn-primary"
            >
              <FaInstagram size={15} />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              className="btn btn-outline btn-primary"
            >
              <FaXTwitter size={15} />
            </a>
          </div>
          <p className="mt-4 text-sm ">
            Stay connected with us on social media for the latest updates, news,
            and more. Follow us and be part of our online community!
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
        <p className="text-sm ">
          © Copyright 2020 Lorem Inc. All rights reserved.
        </p>
        <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
          <li>
            <a
              href="/"
              className="text-sm  transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              F.A.Q
            </a>
          </li>
          <li>
            <a
              href="/"
              className="text-sm  transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="/"
              className="text-sm  transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              Terms &amp; Conditions
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};


export default Footer;