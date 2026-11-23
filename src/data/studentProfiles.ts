import { ListingItem, UserProfile, StudentProfile } from '../types';

export const MOCK_STUDENT_PROFILES: Record<string, Partial<StudentProfile>> = {
  'Daniel Ospina (Estudiante 8vo sem. Ingeniería)': {
    career: 'Ingeniería de Sistemas',
    semester: '8vo Semestre',
    bio: 'Estudiante enfocado en matemáticas universitarias y algoritmos. Fui monitor oficial de Cálculo I y II durante 3 semestres. Me gusta explicar con ejemplos visuales, resolver dudas puntuales y preparar parciales con exámenes reales anteriores.',
    joinedDate: 'Agosto 2024',
    preferredMeetingLocations: [
      'Campus Meléndez - Salas de Estudio Ed. 320',
      'Biblioteca Mario Carvajal',
      'Virtual por Google Meet',
    ],
    reviews: [
      {
        id: 'rev-1',
        authorName: 'Sofía Martínez',
        authorUniversity: 'Universidad del Valle',
        rating: 5,
        comment: '¡Me salvó el parcial de Cálculo II! Tenía muchas dudas con las integrales por partes y sustitución trigonométrica, y Daniel me explicó con una paciencia increíble.',
        date: 'Hace 3 días',
        itemTitle: 'Tutorías Personalizadas de Cálculo II',
      },
      {
        id: 'rev-2',
        authorName: 'Alejandro Restrepo',
        authorUniversity: 'Universidad del Valle',
        rating: 5,
        comment: 'Excelente tutor, puntual y con ejercicios tipo parcial muy bien seleccionados. Súper recomendado para asegurar el semestre.',
        date: 'Hace 1 semana',
        itemTitle: 'Tutorías Personalizadas de Cálculo II',
      },
    ],
  },
  'Camilo Riascos': {
    career: 'Ingeniería Mecánica',
    semester: '6to Semestre',
    bio: 'Estudiante de ingeniería apasionado por el diseño de máquinas y termofluidos. Vendo libros y herramientas de semestres anteriores en perfecto estado para ayudar a otros compañeros a ahorrar.',
    joinedDate: 'Octubre 2024',
    preferredMeetingLocations: [
      'Campus Meléndez - Plazoleta de Ingeniería',
      'Biblioteca Mario Carvajal',
    ],
    reviews: [
      {
        id: 'rev-3',
        authorName: 'Juan Diego Castro',
        authorUniversity: 'Universidad del Valle',
        rating: 5,
        comment: 'El libro de Stewart estaba impecable, tal como lo describió. Coordinamos la entrega en la biblioteca y todo fue muy rápido y seguro.',
        date: 'Hace 5 días',
        itemTitle: 'Libro Cálculo Trascendentes Tempranas Stewart',
      },
    ],
  },
  'Valentina Gómez': {
    career: 'Ingeniería Industrial',
    semester: '5to Semestre',
    bio: 'Estudiante de Univalle. Me enfoco en optimización y finanzas. Vendo calculadoras y artículos de estudio que ya no requiero pero que están 100% funcionales.',
    joinedDate: 'Noviembre 2024',
    preferredMeetingLocations: [
      'Campus Meléndez - Cafetería Central',
      'Edificio Tulio Ramírez',
    ],
    reviews: [
      {
        id: 'rev-4',
        authorName: 'Laura Rivera',
        authorUniversity: 'Universidad del Valle',
        rating: 5,
        comment: 'La calculadora Casio venía con pila nueva y tapa intacta. Trato muy amable.',
        date: 'Hace 2 semanas',
      },
    ],
  },
  'Mateo Carabalí': {
    career: 'Química Pura',
    semester: '4to Semestre',
    bio: 'Estudiante de la Facultad de Ciencias Naturales y Exactas. Ofrezco batas y materiales de bioseguridad reglamentarios para laboratorios de ciencias.',
    joinedDate: 'Enero 2025',
    preferredMeetingLocations: [
      'Campus San Fernando - Facultad de Salud',
      'Campus Meléndez - Edificio Química',
    ],
    reviews: [
      {
        id: 'rev-5',
        authorName: 'Camila Muñoz',
        authorUniversity: 'Universidad del Valle',
        rating: 5,
        comment: 'La bata antifluidos estaba limpia, planchada y las gafas de protección de excelente calidad.',
        date: 'Hace 1 semana',
      },
    ],
  },
  'Mariana Holguín': {
    career: 'Diseño Gráfico',
    semester: '8vo Semestre',
    bio: 'Diseñadora gráfica en formación con experiencia en comunicación visual científica y académica. Ayudo a estudiantes e investigadores a crear posters y presentaciones memorables.',
    joinedDate: 'Septiembre 2024',
    preferredMeetingLocations: [
      'Campus Meléndez - Escuela de Diseño',
      'Entrega digital en alta resolución',
    ],
    reviews: [
      {
        id: 'rev-6',
        authorName: 'David Henao',
        authorUniversity: 'Universidad del Valle',
        rating: 5,
        comment: 'Diseñó el poster para el semillero de investigación de medicina. Los profesores quedaron impresionados con la claridad visual.',
        date: 'Hace 4 días',
        itemTitle: 'Diseño de Posters Científicos',
      },
    ],
  },
  'Sebastián Mora': {
    career: 'Ciencias de la Computación',
    semester: '7mo Semestre',
    bio: 'Estudiante de la UNAL apasionado por Python, algoritmos competitivos y desarrollo web. Me encanta enseñar a programar desde cero sin frustraciones.',
    joinedDate: 'Julio 2024',
    preferredMeetingLocations: [
      'Sede Bogotá - Edificio de Aulas',
      'Sesiones virtuales por Meet o Discord',
    ],
    reviews: [
      {
        id: 'rev-7',
        authorName: 'Felipe Vargas',
        authorUniversity: 'Universidad Nacional',
        rating: 5,
        comment: 'Me ayudó a resolver un taller de grafos en Python que no entendía para nada. Explica súper bien.',
        date: 'Hace 1 semana',
      },
    ],
  },
  'Catalina Restrepo': {
    career: 'Licenciatura en Literatura',
    semester: '6to Semestre',
    bio: 'Apasionada por la redacción clara, la gramática y las normas APA 7. Te ayudo a que tus ensayos y tesis tengan un tono académico impecable.',
    joinedDate: 'Octubre 2024',
    preferredMeetingLocations: [
      'Campus Javeriana Bogotá - Biblioteca General',
      'Trabajo colaborativo en Google Docs',
    ],
    reviews: [
      {
        id: 'rev-8',
        authorName: 'Esteban Cárdenas',
        authorUniversity: 'Pontificia Universidad Javeriana',
        rating: 5,
        comment: 'La corrección con control de cambios fue súper minuciosa. Corrigió citas y formato de tablas que mi tutor me había pedido corregir.',
        date: 'Hace 6 días',
      },
    ],
  },
  'Juliana Rendón': {
    career: 'Medicina Veterinaria y Zootecnia',
    semester: '7mo Semestre',
    bio: 'Estudiante de la UdeA. Vendo kits quirúrgicos y de disección nuevos en acero inoxidable para estudiantes de primer y segundo año.',
    joinedDate: 'Agosto 2024',
    preferredMeetingLocations: ['Sede Robledo UdeA', 'Ciudad Universitaria Medellín'],
    reviews: [
      {
        id: 'rev-9',
        authorName: 'Andrés Gil',
        authorUniversity: 'Universidad de Antioquia',
        rating: 5,
        comment: 'El kit de disección vino completísimo con todos los mangos y hojas. Excelente precio de estudiante.',
        date: 'Hace 2 semanas',
      },
    ],
  },
};

export function getStudentProfile(
  sellerName: string,
  listings: ListingItem[],
  currentUser?: UserProfile
): StudentProfile {
  // If it's the current user
  if (currentUser && (sellerName === currentUser.name || sellerName === 'Tú' || sellerName === 'Mi perfil')) {
    const userListings = listings.filter((l) => l.sellerName === currentUser.name);
    return {
      id: 'current-user',
      name: currentUser.name,
      university: currentUser.university,
      campus: currentUser.campus || 'Campus Principal',
      email: currentUser.email,
      phone: currentUser.whatsapp || '+57 318 456 7890',
      career: currentUser.career || 'Ingeniería',
      semester: currentUser.semester || '4to Semestre',
      bio: currentUser.bio || 'Estudiante universitario verificado en UniMarket. Compro y vendo productos y servicios académicos en el campus entre compañeros.',
      city: currentUser.city || 'Cali',
      verifiedStudent: true,
      rating: 5.0,
      dealsCount: Math.max(userListings.length * 2, 3),
      joinedDate: 'Octubre 2026',
      preferredMeetingLocations: [
        currentUser.campus || 'Campus Principal',
        'Biblioteca Central del Campus',
        'Cafetería de la Facultad',
      ],
      reviews: [
        {
          id: 'user-rev-1',
          authorName: 'Camilo Riascos',
          authorUniversity: currentUser.university,
          rating: 5,
          comment: 'Compañera muy puntual y confiable para coordinar entregas en el campus. ¡Excelente comunicación y trato amable!',
          date: 'Recientemente',
        },
      ],
    };
  }

  // Find a matching listing to extract university & phone
  const matchingListing = listings.find(
    (l) => l.sellerName.toLowerCase().trim() === sellerName.toLowerCase().trim()
  );

  const matchedName = matchingListing ? matchingListing.sellerName : sellerName;
  const mockInfo = MOCK_STUDENT_PROFILES[matchedName] || {};

  const university = matchingListing ? matchingListing.sellerUniversity : 'Universidad del Valle (Univalle)';
  const campus = matchingListing?.sellerCampus || 'Campus Principal';
  const phone = matchingListing?.sellerPhone || '+57 315 000 0000';
  const rating = matchingListing?.rating || 4.9;
  const dealsCount = matchingListing?.reviewCount || 12;

  // Extract student email domain from university
  const uniDomain = university.includes('UNAL')
    ? 'unal.edu.co'
    : university.includes('Javeriana')
    ? 'javeriana.edu.co'
    : university.includes('Andes')
    ? 'uniandes.edu.co'
    : university.includes('Antioquia') || university.includes('UdeA')
    ? 'udea.edu.co'
    : 'correounivalle.edu.co';

  const normalizedFirstName = sellerName.split(' ')[0].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const secondPart = sellerName.split(' ')[1] ? sellerName.split(' ')[1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : 'estudiante';
  const email = `${normalizedFirstName}.${secondPart}@${uniDomain}`;

  return {
    id: `student-${sellerName.toLowerCase().replace(/\s+/g, '-')}`,
    name: matchedName,
    university,
    campus,
    email,
    phone,
    career: mockInfo.career || 'Estudios Universitarios',
    semester: mockInfo.semester || 'Semestre Avanzado',
    bio: mockInfo.bio || `Estudiante activo de ${university}. Ofrezco productos y servicios académicos garantizados para compañeros del campus.`,
    city: university.includes('Bogotá') ? 'Bogotá' : university.includes('Medellín') ? 'Medellín' : 'Cali',
    verifiedStudent: true,
    rating,
    dealsCount,
    joinedDate: mockInfo.joinedDate || 'Noviembre 2024',
    preferredMeetingLocations: mockInfo.preferredMeetingLocations || [
      campus,
      'Biblioteca Central del Campus',
      'Plazoleta de Estudiantes',
    ],
    reviews: mockInfo.reviews || [
      {
        id: 'generic-rev-1',
        authorName: 'Estudiante Compañero',
        authorUniversity: university,
        rating: 5,
        comment: 'Muy responsable y confiable. El trato se cerró rápido y sin ningún problema en el campus.',
        date: 'Hace 2 semanas',
      },
    ],
  };
}
