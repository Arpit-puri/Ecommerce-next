import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const Footer = () => {
  return (
    <>
      <div>
        <footer>
          <div className="footer" suppressHydrationWarning>
            <h4 className="text-center">All rights reserved &copy; A.P</h4>
            <div className="text-center mt-3" suppressHydrationWarning>
              <Link href="/contact">Contact us</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Footer), { ssr: false });
