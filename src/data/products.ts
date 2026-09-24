export type Category =
  | "hombre"
  | "mujer"
  | "zapatos-dama"
  | "zapatos-caballero";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  brand: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: string[];
  description: string;
};

export const categoryLabels: Record<Category, string> = {
  hombre: "Hombre",
  mujer: "Mujer",
  "zapatos-dama": "Zapatos Dama",
  "zapatos-caballero": "Zapatos Caballero",
};

const ropaSizes = ["S", "M", "L", "XL", "XXL"];
const shoeSizesDama = ["36", "37", "38", "39", "40"];
const shoeSizesCaballero = ["40", "41", "42", "43", "44", "45"];

export const products: Product[] = [
  {
    id: "p01",
    slug: "hoodie-training-negro",
    name: "Hoodie Training",
    category: "hombre",
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
    category: "hombre",
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
    category: "hombre",
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
    category: "hombre",
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
    category: "hombre",
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
    category: "hombre",
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
    category: "mujer",
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
    category: "mujer",
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
    category: "mujer",
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
    category: "mujer",
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
    category: "mujer",
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
    category: "mujer",
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
    category: "zapatos-dama",
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
    category: "zapatos-dama",
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
    category: "zapatos-dama",
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
    category: "zapatos-dama",
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
    category: "zapatos-caballero",
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
    category: "zapatos-caballero",
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
    category: "zapatos-caballero",
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
    category: "zapatos-caballero",
    brand: "TOTAL LOOKS",
    price: 70,
    sizes: shoeSizesCaballero,
    colors: ["Negro", "Gris"],
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80",
    ],
    description: "Bota resistente línea propia TOTAL LOOKS, suela reforzada.",
  },
];
