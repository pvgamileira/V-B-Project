import { Product } from '../types';

// Simulação de Banco de Dados (Array Local)
// Imagens do Unsplash para representar joias
export const products: Product[] = [
  {
    id: 1,
    name: "Brinco Ponto de Luz Zircônia",
    price: 30.00,
    category: "Ponto de Luz",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=500",
    tag: "Mais Vendido"
  },
  {
    id: 2,
    name: "Corrente Grumet Prata 925",
    price: 120.00,
    category: "Masculino",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500",
    tag: "Lançamento"
  },
  {
    id: 3,
    name: "Anel Solitário Clássico",
    price: 89.90,
    category: "Anéis",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: 4,
    name: "Pulseira Berloques Life",
    price: 150.00,
    category: "Pulseiras",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500" // Placeholder, difficult to find exact Pandora style on unsplash sometimes
  },
  {
    id: 5,
    name: "Colar Coração Cravejado",
    price: 110.00,
    category: "Colares",
    image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: 6,
    name: "Aliança Prata Diamantada (Par)",
    price: 220.00,
    category: "Alianças",
    image: "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: 7,
    name: "Brinco Argola Pequena",
    price: 45.00,
    category: "Brincos",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a51?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: 8,
    name: "Pulseira Masculina Elo Português",
    price: 140.00,
    category: "Masculino",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: 9,
    name: "Berloque Coração",
    price: 35.00,
    category: "Berloques",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=500"
  }
];

export const categories = [
  "Todos",
  "Feminino",
  "Masculino",
  "Anéis",
  "Berloques",
  "Pandoras",
  "Pulseiras",
  "Correntes",
  "Colares",
  "Ponto de Luz",
  "Brincos",
  "Alianças"
];
