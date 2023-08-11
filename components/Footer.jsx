/* import Image from 'next/image'; */
import Link from 'next/link';
import { /* faFacebookF, */ faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => (
  <footer className="bg-thegray">
    <div className="container mx-auto py-12 px-8 sm:px-24 flex md:flex-row flex-col justify-between sm:flex-row lg:border-b boder-white items-center h-44 mb-4">
      <div className="flex-grow sm:flex-grow-0 flex justify-center sm:justify-start mb-4 sm:mb-0">
        <Link href="/">
          <div className="flex cursor-pointer items-center">
            {/*             <Image width={100} height={100} src="/logoBlog.png" alt="Logo" /> */}
            <span className="font-bold text-2xl text-white">Des-orden</span>
          </div>
        </Link>
      </div>
      <div className="flex sm:flex-row flex-col h-full justify-center">
        <ul className="flex justify-center items-center text-white mb-8 md:mb-0">
          <li className="mx-4">
            <a href="/blog">Artículos</a>
          </li>
          <li className="mx-4">
            <a href="/podcast-videos">Podcast</a>
          </li>
          <li className="mx-4">
            <a href="/sobre-nosotros">Sobre Nosotros</a>
          </li>
          <li className="mx-4">
            <a href="/contacto">Contacto</a>
          </li>
        </ul>
      </div>
      <div className="flex flex-col lg:justify-center lg:align-center sm:justify-end h-full">
        <ul className="flex flex-row justify-center align-center text-white">
          {/*           <li className="mr-5 flex">
            <a target="_blank" href="/">
              <FontAwesomeIcon className="text-2xl" icon={faFacebookF} />
            </a>
          </li> */}
          <li className="mr-5">
            <a target="_blank" href="https://instagram.com/oscardovalve?igshid=Y2I2MzMwZWM3ZA==" rel="noreferrer">
              <FontAwesomeIcon className="text-2xl" icon={faInstagram} />
            </a>
          </li>
          <li className="mr-5">
            <a target="_blank" href="https://twitter.com/oscardovalve?s=21&t=OhnkCcR0ZqITGcPXLu1Pfg" rel="noreferrer">
              <FontAwesomeIcon className="text-2xl" icon={faTwitter} />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="flex justify-center w-full">
      <ul className="flex justify-center items-center text-center text-white h-32">
        <li className="mx-5 underline">
          <a href="/">Politicas de Privacidad</a>
        </li>
        <li className="mx-5 underline">
          <a href="/">Terminos de Servicio</a>
        </li>
        <li className="mx-5 underline">
          <a href="/">Configuraciones de Cookies</a>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
