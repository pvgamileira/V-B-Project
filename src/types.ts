export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  tag?: string; // Ex: "Mais Vendido", "Lançamento"
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 
  | "Todos"
  | "Feminino"
  | "Masculino"
  | "Anéis"
  | "Berloques"
  | "Pandoras"
  | "Pulseiras"
  | "Correntes"
  | "Colares"
  | "Ponto de Luz"
  | "Brincos"
  | "Alianças";
