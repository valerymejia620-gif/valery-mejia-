export interface Perfume {
  id: string;
  name: string;
  category: 'Femenino' | 'Masculino' | 'Unisex';
  subtitle: string;
  olfactoryFamily: string;
  description: string;
  volume: string;
  concentration: string;
  isNewCollection: boolean;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  recommendedOccasion: string[];
  intensity: 'Moderada' | 'Intensa' | 'Extrema';
  longevity: string;
  image: string;
  defaultPrice: string;
}

export const PERFUMES_DATA: Perfume[] = [
  {
    id: 'berry-on-top',
    name: 'Berry On Top',
    category: 'Unisex',
    subtitle: 'Extracto Niche Gourmand',
    olfactoryFamily: 'Frutal Ambarado Gourmand',
    description: 'Una creación artesanal cautivadora donde los frutos rojos maduros, la grosella negra y las moras silvestres se encuentran con una base opulenta de ámbar licoroso, vainilla de Madagascar y maderas nobles. Dulce, envolvente y magnético.',
    volume: '50 ml / 1.7 FL. OZ',
    concentration: 'Extrait de Parfum',
    isNewCollection: true,
    topNotes: ['Grosella Negra', 'Moras Silvestres', 'Frambuesa Glaseada'],
    heartNotes: ['Flor de Azahar', 'Miel Dorada', 'Orquídea Silvestre'],
    baseNotes: ['Ámbar Cálido', 'Vainilla Bourbon', 'Madera de Cedro'],
    recommendedOccasion: ['Noche & Seducción', 'Citas Románticas', 'Clima Frío / Templado'],
    intensity: 'Intensa',
    longevity: '12+ Horas',
    image: '/images/perfume_berry_on_top.jpg',
    defaultPrice: 'Consultar precio'
  },
  {
    id: 'donna-born-in-roma',
    name: 'Donna Born in Roma',
    category: 'Femenino',
    subtitle: 'Haute Couture Eau de Parfum',
    olfactoryFamily: 'Oriental Floral Cálido',
    description: 'La máxima expresión de la feminidad contemporánea y la sofisticación romana. Una sobredosis de jazmín grandiflorum infusionado con notas de grosella negra vibrante y el calor sublime de tres tipos de vainilla bourbon amaderada.',
    volume: '100 ml / 3.4 FL. OZ',
    concentration: 'Eau de Parfum',
    isNewCollection: true,
    topNotes: ['Grosella Negra', 'Pimienta Rosa', 'Bergamota'],
    heartNotes: ['Jazmín Grandiflorum', 'Jazmín Sambac', 'Té de Jazmín'],
    baseNotes: ['Vainilla Bourbon', 'Cashmeran', 'Madera de Guayaco'],
    recommendedOccasion: ['Elegancia & Eventos', 'Citas Especiales', 'Todo el año'],
    intensity: 'Intensa',
    longevity: '10-12 Horas',
    image: '/images/perfume_donna_roma.jpg',
    defaultPrice: 'Consultar precio'
  },
  {
    id: 'sauvage',
    name: 'Sauvage',
    category: 'Masculino',
    subtitle: 'El icono de la masculinidad audaz',
    olfactoryFamily: 'Cítrico Aromático Amaderado',
    description: 'Un torbellino de frescura extrema dictado por la bergamota de Calabria, salpicado de pimienta de Sichuan electrizante y asentado sobre una estela ambarada y magnética de ambroxan puro. Un clásico atemporal y conquistador.',
    volume: '100 ml / 3.4 FL. OZ',
    concentration: 'Eau de Parfum',
    isNewCollection: true,
    topNotes: ['Bergamota de Calabria', 'Pimienta de Sichuan', 'Elemí'],
    heartNotes: ['Lavanda de Provenza', 'Pimienta Rosa', 'Geranio', 'Vetiver'],
    baseNotes: ['Ambroxan', 'Cedro del Atlas', 'Ládano'],
    recommendedOccasion: ['Uso Diario & Oficina', 'Eventos Nocturnos', 'Firma Personal'],
    intensity: 'Intensa',
    longevity: '10-14 Horas',
    image: '/images/perfume_sauvage.jpg',
    defaultPrice: 'Consultar precio'
  },
  {
    id: 'd-lina-exclusive',
    name: 'D. Lina Exclusive',
    category: 'Femenino',
    subtitle: 'La reina de las rosas imperiales',
    olfactoryFamily: 'Floral Oriental Encantador',
    description: 'Una sinfonía aterciopelada y majestuosa inspirada en las cortes reales francesas. Abre con lichi exótico y bergamota, desplegando un corazón triunfal de rosa turca e incienso ahumado sobre un fondo balsámico de vainilla y ámbar.',
    volume: '75 ml / 2.5 FL. OZ',
    concentration: 'Extrait de Parfum',
    isNewCollection: false,
    topNotes: ['Lichi Exótico', 'Pera Dulce', 'Bergamota'],
    heartNotes: ['Rosa Turca Damascena', 'Incienso Místico', 'Oud Suave'],
    baseNotes: ['Vainilla de Tahití', 'Ámbar Gris', 'Maderas Preciosas'],
    recommendedOccasion: ['Galas & Bodas', 'Cenas Románticas', 'Momentos Inolvidables'],
    intensity: 'Extrema',
    longevity: '14+ Horas',
    image: '/images/perfume_dlina_exclusive.jpg',
    defaultPrice: 'Consultar precio'
  },
  {
    id: 'good-girl',
    name: 'Good Girl',
    category: 'Femenino',
    subtitle: 'Poder, sensualidad y misterio',
    olfactoryFamily: 'Oriental Floral Gourmand',
    description: 'La dualidad femenina encarnada: la luminosidad del nardo y jazmín sambac frente a la profunda sensualidad del cacao tostado y el haba tonka seductora. Un aroma diseñado para dejar una huella imborrable al caminar.',
    volume: '80 ml / 2.7 FL. OZ',
    concentration: 'Eau de Parfum',
    isNewCollection: false,
    topNotes: ['Almendra Dulce', 'Café Tostado', 'Limón Italiano'],
    heartNotes: ['Nardo de la India', 'Jazmín Sambac', 'Flor de Naranjo'],
    baseNotes: ['Haba Tonka', 'Cacao Puro', 'Vainilla', 'Praliné'],
    recommendedOccasion: ['Noche & Seducción', 'Fiestas Exclusivas', 'Clima Frío'],
    intensity: 'Intensa',
    longevity: '10-12 Horas',
    image: '/images/perfume_good_girl.jpg',
    defaultPrice: 'Consultar precio'
  },
  {
    id: 'eros',
    name: 'Eros',
    category: 'Masculino',
    subtitle: 'La pasión ardiente de la mitología',
    olfactoryFamily: 'Amaderado Aromático Oriental',
    description: 'Inspirado en la mitología griega y la pasión desbordante. Combina la frescura chispeante de la menta verde con manzana crujiente italiana, antes de envolver los sentidos en un cálido manto de haba tonka venezolana y cedro del Atlas.',
    volume: '100 ml / 3.4 FL. OZ',
    concentration: 'Eau de Parfum',
    isNewCollection: false,
    topNotes: ['Menta Glacial', 'Manzana Verde Italiana', 'Cáscara de Limón'],
    heartNotes: ['Haba Tonka', 'Ambroxan', 'Flor de Geranio'],
    baseNotes: ['Vainilla de Madagascar', 'Cedro del Atlas', 'Vetiver de Haití'],
    recommendedOccasion: ['Fiestas & Vida Nocturna', 'Citas y Conquista', 'Tardes Enérgicas'],
    intensity: 'Intensa',
    longevity: '10-12 Horas',
    image: '/images/perfume_eros.jpg',
    defaultPrice: 'Consultar precio'
  },
  {
    id: 'invictus',
    name: 'Invictus',
    category: 'Masculino',
    subtitle: 'El trofeo del hombre victorioso',
    olfactoryFamily: 'Acuático Amaderado Vibrante',
    description: 'El choque épico entre la frescura marina estimulante y la sensualidad arrolladora de las maderas oscuras. Una explosión de pomelo vigorizante y laurel heroico sobre un fondo irresistible de ámbar gris y madera de guayaco.',
    volume: '100 ml / 3.4 FL. OZ',
    concentration: 'Eau de Parfum',
    isNewCollection: false,
    topNotes: ['Pomelo Fresco', 'Acorde Marino Oceánico', 'Mandarina'],
    heartNotes: ['Hoja de Laurel', 'Jazmín Hedione'],
    baseNotes: ['Madera de Guayaco', 'Musgo de Roble', 'Pachulí', 'Ámbar Gris'],
    recommendedOccasion: ['Uso Diario & Deportivo', 'Reuniones de Día', 'Clima Cálido'],
    intensity: 'Moderada',
    longevity: '8-10 Horas',
    image: '/images/perfume_invictus.jpg',
    defaultPrice: 'Consultar precio'
  },
  {
    id: 'acqua-di-gio',
    name: 'Acqua di Giò',
    category: 'Masculino',
    subtitle: 'La esencia pura del Mediterráneo',
    olfactoryFamily: 'Cítrico Acuático Marino',
    description: 'Una oda celestial al mar, el sol y la brisa mediterránea de la isla de Pantelleria. Combina la transparencia de las olas marinas salinas con bergamota de Calabria, romero fresco y la nobleza del pachulí terroso.',
    volume: '100 ml / 3.4 FL. OZ',
    concentration: 'Eau de Parfum',
    isNewCollection: false,
    topNotes: ['Bergamota Italiana', 'Notas Marinas', 'Mandarina Verde'],
    heartNotes: ['Romero Aromático', 'Lavanda', 'Ciprés'],
    baseNotes: ['Pachulí de Guatemala', 'Ámbar Mineral', 'Almizcle'],
    recommendedOccasion: ['Días Soleados & Playa', 'Oficina & Elegancia Serena', 'Uso Cotidiano'],
    intensity: 'Moderada',
    longevity: '8-10 Horas',
    image: '/images/perfume_acqua_gio.jpg',
    defaultPrice: 'Consultar precio'
  }
];

export const WHATSAPP_CONFIG = {
  phoneNumber: '3242996643',
  countryCode: '57',
  fullNumber: '573242996643',
  generalMessage: 'Hola, Premium Quality. Quiero información sobre sus perfumes y fragancias',
  getProductMessage: (perfumeName: string) =>
    `Hola, Premium Quality. Quiero consultar por la fragancia ${perfumeName}`,
  getGuideMessage: (perfumeName: string, preference: string, occasion: string) =>
    `Hola, Premium Quality. Usé su Guía de Fragancias (Preferencia: ${preference}, Ocasión: ${occasion}) y me interesa la fragancia ${perfumeName}. ¿Tienen disponibilidad y precio?`,
  getWhatsAppUrl: (message?: string) => {
    const text = message ? encodeURIComponent(message) : encodeURIComponent('Hola, Premium Quality. Quiero información sobre sus perfumes y fragancias');
    return `https://wa.me/573242996643?text=${text}`;
  }
};
