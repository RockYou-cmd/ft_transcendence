import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from "../../../../public/logo.png"
import Image from 'next/image';
import Link from 'next/link';


const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-8 rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: Logo and About */}
            <div className="mb-8 md:mb-0">
            <Image src={logo.src} alt={"logo"} priority={true} width={160} height={54} />              
            <h2 className="text-xl font-bold mb-4"></h2>
              <p className="text-sm">
                PONGY is a real time Game platform that allow user to play and chat and many more features
              </p>
            </div>
  
            {/* Column 2: Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="text-sm">
                <li><Link href="#home">Home</Link></li>
                <li><Link href="#about">About Us</Link></li>
                <li><Link href="#services">Services</Link></li>
             
              </ul>
            </div>
  
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-sm">
                Address: 1337, khouribga, Morocco
                <br />
                Phone: +1234567890
                <br />
                Email: admin@Pongy.com
              </p>
            </div>
  
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {/* <Link href="#" className="text-white hover:text-gray-400 transition duration-300">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link href="#" className="text-white hover:text-gray-400 transition duration-300">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link href="#" className="text-white hover:text-gray-400 transition duration-300">
                  <i className="fab fa-instagram"></i>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  