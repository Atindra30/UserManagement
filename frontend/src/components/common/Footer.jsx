import React from "react";

const FooterComponent = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-6 lg:space-y-0">
        {/* Footer Branding */}
        <div className="text-center lg:text-left">
          <h1 className="text-2xl font-bold text-white">Atindra Dev</h1>
          <p className="text-sm text-gray-400 mt-2">
            All Rights Reserved &copy; {new Date().getFullYear()}
          </p>
        </div>

        {/* Contact Information */}
        <div className="text-center lg:text-left">
          <ul className="space-y-2">
            <li>
              <span className="font-semibold">Phone: </span>
              <a
                href="tel:+1234567890"
                className="text-blue-400 hover:underline"
              >
                +91 6265080922
              </a>
            </li>
            <li>
              <span className="font-semibold">Email: </span>
              <a
                href="mailto:atindragupta30@gmail.com"
                className="text-blue-400 hover:underline"
              >
                atindragupta30@gmail.com
              </a>
            </li>
            <li>
              <span className="font-semibold">LinkedIn: </span>
              <a
                href="https://www.linkedin.com/in/atindra-gupta-2751431a4/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                LinkedIn Profile
              </a>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/in/atindra-gupta-2751431a4/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/linkedin.png"
              alt="LinkedIn"
              className="h-10 w-10 rounded-full hover:opacity-80 transition duration-200"
            />
          </a>
          <a href="mailto:atindragupta30@gmail.com">
            <img
              src="/gmail.png"
              alt="Email"
              className="h-10 w-10 rounded-full hover:opacity-80 transition duration-200"
            />
          </a>
          <a
            href="https://x.com/Atindra30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/twitter.png"
              alt="Twitter"
              className="h-10 w-10 rounded-full hover:opacity-40 transition duration-200"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
