import Image from 'next/image';
import Link from 'next/link';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => (
  <footer className="bg-thegray">
    <div className="container mx-auto py-12 px-6 sm:px-24 flex flex-wrap flex-col sm:flex-row border-b boder-white">
      <div className="flex-grow sm:flex-grow-0 flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Image width={100} height={100} src="/logoBlog.png" alt="Logo" />
            <span className="font-bold text-2xl text-white">Des-orden</span>
          </div>
        </Link>
      </div>
      <div className="flex-col sm:flex-grow flex items-center justify-center sm:justify-start items-center">
        <ul className="flex justify-center sm:justify-start text-white mb-8 items-center justify-center">
          <li className="mx-5">
            <a href="/">Concept</a>
          </li>
          <li className="mx-5">
            <a href="/">Our story</a>
          </li>
          <li className="mx-5">
            <a href="/">Careers</a>
          </li>
          <li className="mx-5">
            <a href="/">Contact us</a>
          </li>
        </ul>
      </div>
      <div className="sm:flex-grow-0 flex items-center justify-center sm:justify-end">
        <ul className="flex justify-center sm:justify-end text-white">
          <li className="mr-5">
            <a href="/">
              <FontAwesomeIcon className="text-2xl" icon={faFacebookF} />
            </a>
          </li>
          <li className="mr-5">
            <a href="/">
              <FontAwesomeIcon className="text-2xl" icon={faInstagram} />
            </a>
          </li>
          <li className="mr-5">
            <a href="/">
              <FontAwesomeIcon className="text-2xl" icon={faTwitter} />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="flex justify-center w-full">
      <ul className="flex justify-center items-center sm:justify-start text-white h-32">
        <li className="mx-2">
          <a href="/">Privacy policy</a>
        </li>
        <li className="mx-2">
          <a href="/">Terms of service</a>
        </li>
        <li className="mx-2">
          <a href="/">Cookie settings</a>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
