"use client";
import Reac from "react";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import RootLayout, { metadata } from "../layout";
import Image from "next/image";
import img from "/public/images/contactus.jpeg";

function ContactUs() {
  return (
    <div className="contact">
      <div className="min-h-screen row contactus pt-2" suppressHydrationWarning>
        <div className="col-md-6" suppressHydrationWarning>
          <Image src={img} alt="not found" width="500" height="300" />
        </div>
        <div className="col-md-4" suppressHydrationWarning>
          <h1 className="bg-dark p-2 text-white text-center">Contact Us</h1>
          <p className="text-justify mt-2">
            Having any issue we are available 24/7
          </p>
          <p className="mt-3">
            <BiMailSend />: abx.help@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall />: 9123456780
          </p>
          <p className="mt-3">
            <BiSupport />: 1900 1900 1900 (toll free)
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
