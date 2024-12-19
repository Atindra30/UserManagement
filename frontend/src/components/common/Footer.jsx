import React from 'react';

const FooterComponent = () => {
    return (
        <footer className="bg-gray-800 text-gray-200 py-6">
            <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row justify-between items-center">
                {/* Footer Branding */}
                <div className="mb-4 lg:mb-0">
                    <span className="text-lg font-semibold">Atindra Dev</span>
                    <p className="text-sm">All Rights Reserved &copy; {new Date().getFullYear()}</p>
                </div>

                {/* Contact Information */}
                <div className="text-center lg:text-right">
                    <p className="text-sm">Phone: <a href="tel:+1234567890" className="text-blue-400 hover:underline">+91 6265080922</a></p>
                    <p className="text-sm">Email: <a href="mailto:info@phegondev.com" className="text-blue-400 hover:underline">info@phegondev.com</a></p>
                    <p className="text-sm">
                        LinkedIn: 
                        <a 
                            href="https://www.linkedin.com/in/phegondev" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline ml-1"
                        >
                            linkedin.com/in/phegondev
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default FooterComponent;
