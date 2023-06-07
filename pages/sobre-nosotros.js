import React, { useEffect } from 'react';
import { Banner, ContactCard, PostWidgetHorizontal } from '../components';
import { getAuthors, getPosts } from '../services';

function SobreNosotros({ authors }) {
  useEffect(() => {
    console.log(authors);
  });

  const bannerText = {
    title: 'Quienes somos',
    subTitle: 'Blog dedicado al estudio de las finanzas, la economia y la politica. Un espacio donde hablaremos sobre pasión, poder y dinero en Venezuela y en toda la región. Temas y elementos que mueven al mundo.',
  };
  const bannerText1 = {
    title: 'Quienes somos',
    // eslint-disable-next-line max-len
    subTitle: 'Podemos ver empresas deprimidas, apagadas, tristes, frustradas, con poca energía, voluntad y con mucha dificultad de plantearse retos nuevos y mirar al futuro. Asimismo, hay empresas paralizadas por el miedo, con poca capacidad de accionar y resolver los problemas que se presentan. También, podemos encontrarnos con organizaciones tomadas por un déficit de atención, en las cuales, la inquietud sin clara orientación a objetivos, la falta de foco y la dificultad ejecutiva, son el pan nuestro de cada día.',
  };

  const contacts = [
    {
      id: 1,
      picture: '/oscar.jpg',
      title: 'John Doe',
      role: 'Software Engineer',
      description: 'Experienced full-stack developer with a passion for creating web applications.',
    },
    {
      id: 2,
      picture: '/oscar.jpg',
      title: 'Jane Smith',
      role: 'Marketing Manager',
      description: 'Results-driven marketer with expertise in digital marketing strategies.',
    },
    {
      id: 3,
      picture: '/oscar.jpg',
      title: 'Jane Smith',
      role: 'Marketing Manager',
      description: 'Results-driven marketer with expertise in digital marketing strategies.',
    },
    {
      id: 4,
      picture: '/oscar.jpg',
      title: 'Jane Smith',
      role: 'Marketing Manager',
      description: 'Results-driven marketer with expertise in digital marketing strategies.',
    },
    {
      id: 5,
      picture: '/oscar.jpg',
      title: 'Jane Smith',
      role: 'Marketing Manager',
      description: 'Results-driven marketer with expertise in digital marketing strategies.',
    },
    {
      id: 6,
      picture: '/oscar.jpg',
      title: 'Jane Smith',
      role: 'Marketing Manager',
      description: 'Results-driven marketer with expertise in digital marketing strategies.',
    },
    // Add more contacts as needed
  ];
  return (
    <div className="container">
      <Banner bannerText={bannerText} isSearch={false} />
      <div className="flex flex-wrap justify-center mb-8">
        {contacts.map((contact) => (
          <div key={contact.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 m-1">
            <ContactCard
              picture={contact.picture}
              title={contact.title}
              role={contact.role}
              description={contact.description}
            />
          </div>
        ))}
      </div>
      <Banner bannerText={bannerText1} isSearch={false} imageUrl="/banner.jpg" />
      <PostWidgetHorizontal />
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
