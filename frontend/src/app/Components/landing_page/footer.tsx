import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from "../../../../public/logo.png"


const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-8 rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: Logo and About */}
            <div className="mb-8 md:mb-0">
            <img src={logo} alt={"logo"} width={32} height={32} />              
            <h2 className="text-xl font-bold mb-4">Company Logo</h2>
              <p className="text-sm">
                A brief description of the company or footer section.
              </p>
            </div>
  
            {/* Column 2: Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="text-sm">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
             
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
                <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  