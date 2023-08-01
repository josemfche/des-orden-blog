/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { ContactCard, NewsLetterBanner, Companies } from '../components';
import { getAuthors, getPosts } from '../services';

function SobreNosotros({ authors }) {
  useEffect(() => {
    console.log(authors);
  });

  const contacts = [
    {
      id: 1,
      picture: '/oscar_doval2.jpg',
      title: 'Oscar Doval',
      role: 'Socio director de Moore GSF y Rendivalores',
      /* description: 'Experienced full-stack developer with a passion for creating web applications.', */
    },
    {
      id: 2,
      picture: '/leo.jpg',
      title: 'Leonardo Ramírez',
      role: 'Consultor de Moore GSF',
      /* description: 'Results-driven marketer with expertise in digital marketing strategies.', */
    },
    {
      id: 3,
      picture: '/juan_domingo.png',
      title: 'Juan Domingo Cordero',
      role: 'Socio director de Rendivalores',
      /* description: 'Results-driven marketer with expertise in digital marketing strategies.', */
    },
    {
      id: 4,
      picture: '/pablo_quintero.jpg',
      title: 'Pablo Quintero',
      role: 'Socio director de LOG Consultancy',
      /* description: 'Results-driven marketer with expertise in digital marketing strategies.', */
    },
    {
      id: 5,
      picture: '/giulio_cellini.jpg',
      title: 'Giulio Cellini',
      role: 'Socio director de LOG Consultancy',
      /* description: 'Results-driven marketer with expertise in digital marketing strategies.', */
    },
    {
      id: 6,
      picture: '/manuel_oropeza.jpg',
      title: 'Manuel Oropeza',
      role: 'Socio director de Nómadas',
      /* description: 'Results-driven marketer with expertise in digital marketing strategies.', */
    },
    // Add more contacts as needed
  ];
  return (
    <div className="container">
      <div className="flex flex-row my-8 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
        <div className="lg:w-2/3 flex flex-col align-center justify-center px-4 sm:px-8 w-full">
          <div className="flex flex-col">
            <h1 className="text-center lg:text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 text-secondthegray">¿Quiénes somos?</h1>
            <p className="my-4 w-full text-secondthegray">
              Aunque aparece bajo el nombre de una persona, Oscar Doval, quien fue el propulsor de esta iniciativa dedicada a la difusión de información económica, somos un grupo de venezolanos que cree firmemente en el potencial de desarrollo de nuestro país.
            </p>
            <p className="my-4 w-full text-secondthegray">
              La historia y la actualidad geoeconómica y geopolítica de Venezuela y Latinoamérica nos permite comprender el comportamiento y los ciclos económicos de la región con una mirada crítica en lo comprensivo y con una oferta constructiva de soluciones concretas para mejorar la calidad de vida de nuestra gente.
            </p>
          </div>
          <div className="description" />
        </div>
        <div className="hidden lg:flex lg:w-1/3 mt-4 lg:mt-0">
          <img src="/sobre-nosotros.jpg" alt="" />
        </div>
      </div>
      <div className="flex flex-wrap justify-center mx-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-16">
        {contacts.map((contact) => (
          <div key={contact.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 m-1">
            <ContactCard
              picture={contact.picture}
              title={contact.title}
              role={contact.role}
              description={contact?.description}
            />
          </div>
        ))}
      </div>
      <Companies />
      <NewsLetterBanner />
    </div>
  );
}

export default SobreNosotros;

export async function getServerSideProps() {
  const posts = await getPosts();
  const authors = await getAuthors();
  return {
    props: {
      authors,
      posts,
    },
  };
}
