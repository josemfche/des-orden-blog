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
      picture: '/oscar.jpg',
      title: 'Oscar Doval',
      role: 'Socio director de Moore GSF y Rendivalores',
      /* description: 'Experienced full-stack developer with a passion for creating web applications.', */
    },
    {
      id: 2,
      picture: '/oscar.jpg',
      title: 'Leonardo Ramírez',
      role: 'Consultor de Moore GSF',
      /* description: 'Results-driven marketer with expertise in digital marketing strategies.', */
    },
    {
      id: 3,
      picture: '/oscar.jpg',
      title: 'Juan Domingo Cordero',
      role: 'Socio director de Rendivalores',
      /* description: 'Results-driven marketer with expertise in digital marketing strategies.', */
    },
    {
      id: 4,
      picture: '/oscar.jpg',
      title: 'Pablo Quintero',
      role: 'Socio director de LOG Consultancy',
      /* description: 'Results-driven marketer with expertise in digital marketing strategies.', */
    },
    {
      id: 5,
      picture: '/oscar.jpg',
      title: 'Giulio Cellini',
      role: 'Socio director de LOG Consultancy',
      /* description: 'Results-driven marketer with expertise in digital marketing strategies.', */
    },
    {
      id: 6,
      picture: '/oscar.jpg',
      title: 'Manuel Oropeza',
      role: 'Socio director de Nómadas',
      /* description: 'Results-driven marketer with expertise in digital marketing strategies.', */
    },
    // Add more contacts as needed
  ];
  return (
    <div className="container">
      <div className="flex flex-row my-8 mx-32">
        <div className="w-2/3 flex flex-col align-center justify-center px-8">
          <div className="flex flex-col align-center">
            <h1 className="text-6xl mb-8">Quienes somos</h1>
            <p className="my-4">
              Aunque aparece bajo el nombre de una persona, Oscar Doval, quien fue el propulsor de esta iniciativa dedicada a la difusión de información económica, somos un grupo de venezolanos que cree firmemente en el potencial de desarrollo de nuestro país.
            </p>
            <p className="my-4">La historia y la actualidad geoeconómica y geopolítica de Venezuela y Latinoamérica nos permite comprender el
              comportamiento y los ciclos económicos de la región con una mirada crítica en lo comprensivo y con una oferta constructiva de soluciones concretas para mejorar la calidad de vida de nuestra gente.
            </p>
          </div>
          <div className="description" />
        </div>
        <div className="w-1/3">
          <img src="/sobre-nosotros.jpg" alt="" />
        </div>
      </div>
      <div className="flex flex-wrap justify-center mb-8">
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
