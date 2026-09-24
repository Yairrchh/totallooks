export type Category = "zapatos" | "ropa" | "perfumes" | "accesorios";
export type Gender = "dama" | "caballero" | "unisex";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  gender: Gender;
  brand: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: string[];
  description: string;
};

export const categoryLabels: Record<Category, string> = {
  zapatos: "Zapatos",
  ropa: "Ropa",
  perfumes: "Perfumes",
  accesorios: "Accesorios",
};

export const genderLabels: Record<Gender, string> = {
  dama: "Dama",
  caballero: "Caballero",
  unisex: "Unisex",
};

const ropaSizes = ["S", "M", "L", "XL", "XXL"];
const shoeSizesDama = ["36", "37", "38", "39", "40"];
const shoeSizesCaballero = ["40", "41", "42", "43", "44", "45"];

export const products: Product[] = [
  {
    id: "p01",
    slug: "hoodie-training-negro",
    name: "Hoodie Training",
    category: "ropa",
    gender: "caballero",
    brand: "Nike",
    price: 42,
    sizes: ropaSizes,
    colors: ["Negro", "Gris"],
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80",
    ],
    description:
      "Buzo con capucha de algodón perchado, ajuste relajado, ideal para entrenar o para la calle.",
  },
  {
    id: "p02",
    slug: "camiseta-dry-fit-blanca",
    name: "Camiseta Dry-Fit",
    category: "ropa",
    gender: "caballero",
    brand: "Adidas",
    price: 24,
    sizes: ropaSizes,
    colors: ["Blanco", "Negro", "Azul"],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    ],
    description:
      "Camiseta técnica transpirable, tejido ligero que se seca rápido.",
  },
  {
    id: "p03",
    slug: "short-basketball-rojo",
    name: "Short Basketball",
    category: "ropa",
    gender: "caballero",
    brand: "Puma",
    price: 22,
    sizes: ropaSizes,
    colors: ["Rojo", "Negro"],
    images: [
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=80",
    ],
    description:
      "Short deportivo suelto con bolsillos laterales, tela ligera anti-roce.",
  },
  {
    id: "p04",
    slug: "chaqueta-cortavientos-gris",
    name: "Chaqueta Cortavientos",
    category: "ropa",
    gender: "caballero",
    brand: "New Balance",
    price: 55,
    sizes: ropaSizes,
    colors: ["Gris", "Negro"],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    ],
    description:
      "Chaqueta liviana resistente al viento, corte deportivo entallado.",
  },
  {
    id: "p05",
    slug: "jogger-fleece-negro",
    name: "Jogger Fleece",
    category: "ropa",
    gender: "caballero",
    brand: "Under Armour",
    price: 38,
    sizes: ropaSizes,
    colors: ["Negro", "Gris"],
    images: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80",
    ],
    description:
      "Pantalón jogger con puños ajustados, bolsillos con cierre, tela fleece cálida.",
  },
  {
    id: "p06",
    slug: "conjunto-deportivo-negro",
    name: "Conjunto Deportivo Total",
    category: "ropa",
    gender: "caballero",
    brand: "TOTAL LOOKS",
    price: 65,
    sizes: ropaSizes,
    colors: ["Negro", "Rojo"],
    images: [
      "https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&q=80",
    ],
    description: "Conjunto buzo + jogger a juego, línea propia TOTAL LOOKS.",
  },
  {
    id: "p07",
    slug: "top-deportivo-negro",
    name: "Top Deportivo Estampado",
    category: "ropa",
    gender: "dama",
    brand: "Nike",
    price: 28,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Negro", "Rojo"],
    images: [
      "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=800&q=80",
    ],
    description:
      "Top deportivo de soporte medio, tela compresiva, ideal para entrenar.",
  },
  {
    id: "p08",
    slug: "legging-alto-negro",
    name: "Legging Cintura Alta",
    category: "ropa",
    gender: "dama",
    brand: "Puma",
    price: 34,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Negro", "Gris"],
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
    ],
    description:
      "Legging de cintura alta, tela con compresión suave y control de abdomen.",
  },
  {
    id: "p09",
    slug: "hoodie-crop-gris",
    name: "Hoodie Crop",
    category: "ropa",
    gender: "dama",
    brand: "Adidas",
    price: 40,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Gris", "Rosa", "Negro"],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    ],
    description: "Buzo corto con capucha, corte moderno, algodón suave.",
  },
  {
    id: "p10",
    slug: "chaqueta-bomber-mujer",
    name: "Chaqueta Bomber",
    category: "ropa",
    gender: "dama",
    brand: "New Balance",
    price: 58,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Negro", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    ],
    description:
      "Chaqueta estilo bomber, forro interior liviano, cierre frontal.",
  },
  {
    id: "p11",
    slug: "conjunto-yoga-negro",
    name: "Conjunto Yoga Total",
    category: "ropa",
    gender: "dama",
    brand: "TOTAL LOOKS",
    price: 52,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Negro", "Rojo"],
    images: [
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80",
    ],
    description:
      "Conjunto top + legging línea propia TOTAL LOOKS, tela suave de alta compresión.",
  },
  {
    id: "p12",
    slug: "short-running-mujer",
    name: "Short Running",
    category: "ropa",
    gender: "dama",
    brand: "Under Armour",
    price: 26,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Negro", "Azul"],
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
    ],
    description:
      "Short running con malla interior, tela ligera de secado rápido.",
  },
  {
    id: "p13",
    slug: "tenis-runner-blanco-dama",
    name: "Tenis Runner",
    category: "zapatos",
    gender: "dama",
    brand: "Nike",
    price: 78,
    sizes: shoeSizesDama,
    colors: ["Blanco", "Rosa"],
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    ],
    description:
      "Zapatilla running con amortiguación ligera y malla transpirable.",
  },
  {
    id: "p14",
    slug: "tenis-lifestyle-negro-dama",
    name: "Tenis Lifestyle",
    category: "zapatos",
    gender: "dama",
    brand: "Puma",
    price: 65,
    sizes: shoeSizesDama,
    colors: ["Negro", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
    ],
    description:
      "Zapatilla urbana de uso diario, suela flexible, diseño minimalista.",
  },
  {
    id: "p15",
    slug: "botas-training-dama",
    name: "Botas Training",
    category: "zapatos",
    gender: "dama",
    brand: "New Balance",
    price: 72,
    sizes: shoeSizesDama,
    colors: ["Negro"],
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
    ],
    description:
      "Bota deportiva de caña baja, agarre firme para entrenamiento funcional.",
  },
  {
    id: "p16",
    slug: "sandalias-deportivas-dama",
    name: "Sandalias Deportivas",
    category: "zapatos",
    gender: "dama",
    brand: "Adidas",
    price: 35,
    sizes: shoeSizesDama,
    colors: ["Negro", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=800&q=80",
    ],
    description:
      "Sandalia deportiva con velcro ajustable, suela con buen agarre.",
  },
  {
    id: "p17",
    slug: "tenis-runner-negro-caballero",
    name: "Tenis Runner Pro",
    category: "zapatos",
    gender: "caballero",
    brand: "Nike",
    price: 85,
    sizes: shoeSizesCaballero,
    colors: ["Negro", "Rojo"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    ],
    description:
      "Zapatilla de running con entresuela con retorno de energía.",
  },
  {
    id: "p18",
    slug: "tenis-basketball-caballero",
    name: "Tenis Basketball",
    category: "zapatos",
    gender: "caballero",
    brand: "Under Armour",
    price: 92,
    sizes: shoeSizesCaballero,
    colors: ["Negro", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80",
    ],
    description:
      "Zapatilla de basketball con soporte en tobillo y suela de alta tracción.",
  },
  {
    id: "p19",
    slug: "tenis-casual-caballero",
    name: "Tenis Casual",
    category: "zapatos",
    gender: "caballero",
    brand: "Puma",
    price: 60,
    sizes: shoeSizesCaballero,
    colors: ["Gris", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80",
    ],
    description: "Zapatilla casual todo terreno, cómoda para uso diario.",
  },
  {
    id: "p20",
    slug: "botas-outdoor-caballero",
    name: "Botas Outdoor",
    category: "zapatos",
    gender: "caballero",
    brand: "TOTAL LOOKS",
    price: 70,
    sizes: shoeSizesCaballero,
    colors: ["Negro", "Gris"],
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80",
    ],
    description: "Bota resistente línea propia TOTAL LOOKS, suela reforzada.",
  },
  {
    id: "p21",
    slug: "perfume-total-energy-100ml",
    name: "Perfume Total Energy",
    category: "perfumes",
    gender: "caballero",
    brand: "TOTAL LOOKS",
    price: 32,
    sizes: ["50ml", "100ml"],
    colors: ["Original"],
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80",
    ],
    description:
      "Fragancia intensa y fresca, línea propia TOTAL LOOKS, ideal para uso diario.",
  },
  {
    id: "p22",
    slug: "perfume-adidas-team-force",
    name: "Perfume Team Force",
    category: "perfumes",
    gender: "caballero",
    brand: "Adidas",
    price: 28,
    sizes: ["100ml"],
    colors: ["Original"],
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    ],
    description: "Fragancia deportiva amaderada, larga duración.",
  },
  {
    id: "p23",
    slug: "perfume-puma-flex",
    name: "Perfume Puma Flex",
    category: "perfumes",
    gender: "unisex",
    brand: "Puma",
    price: 26,
    sizes: ["100ml"],
    colors: ["Original"],
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80",
    ],
    description: "Fragancia cítrica ligera, ideal para después de entrenar.",
  },
  {
    id: "p24",
    slug: "perfume-total-bloom-50ml",
    name: "Perfume Total Bloom",
    category: "perfumes",
    gender: "dama",
    brand: "TOTAL LOOKS",
    price: 30,
    sizes: ["50ml"],
    colors: ["Original"],
    images: [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=80",
    ],
    description: "Fragancia floral suave, línea propia TOTAL LOOKS.",
  },
  {
    id: "p25",
    slug: "perfume-nike-victory",
    name: "Perfume Victory",
    category: "perfumes",
    gender: "dama",
    brand: "Nike",
    price: 34,
    sizes: ["100ml"],
    colors: ["Original"],
    images: [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&q=80",
    ],
    description: "Fragancia energizante, notas cítricas y amaderadas.",
  },
  {
    id: "p26",
    slug: "gorra-deportiva-negra",
    name: "Gorra Deportiva",
    category: "accesorios",
    gender: "unisex",
    brand: "Nike",
    price: 18,
    sizes: ["Único"],
    colors: ["Negro", "Blanco", "Rojo"],
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    ],
    description: "Gorra ajustable con visera curva, bordado frontal.",
  },
  {
    id: "p27",
    slug: "mochila-training-total",
    name: "Mochila Training",
    category: "accesorios",
    gender: "unisex",
    brand: "TOTAL LOOKS",
    price: 45,
    sizes: ["Único"],
    colors: ["Negro"],
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    ],
    description:
      "Mochila deportiva resistente al agua, compartimento para laptop, línea propia TOTAL LOOKS.",
  },
  {
    id: "p28",
    slug: "gafas-sol-deportivas",
    name: "Gafas de Sol Deportivas",
    category: "accesorios",
    gender: "unisex",
    brand: "Puma",
    price: 22,
    sizes: ["Único"],
    colors: ["Negro", "Gris"],
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    ],
    description: "Lentes deportivos livianos, protección UV400.",
  },
  {
    id: "p29",
    slug: "guantes-entrenamiento",
    name: "Guantes de Entrenamiento",
    category: "accesorios",
    gender: "unisex",
    brand: "Under Armour",
    price: 20,
    sizes: ["S", "M", "L"],
    colors: ["Negro"],
    images: [
      "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&q=80",
    ],
    description: "Guantes con agarre reforzado para pesas y funcional.",
  },
  {
    id: "p30",
    slug: "medias-deportivas-pack3",
    name: "Medias Deportivas (Pack x3)",
    category: "accesorios",
    gender: "unisex",
    brand: "Adidas",
    price: 15,
    sizes: ["36-40", "41-45"],
    colors: ["Negro", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&q=80",
    ],
    description: "Pack de 3 pares de medias deportivas acolchadas.",
  },
];
