import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, MessageCircle, Menu, Trash2, Plus, Minus, Search, Instagram, Facebook, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products, categories } from './data/mockData';
import { Product, CartItem, Category } from './types';

// Ícone do WhatsApp (SVG Oficial)
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// ==========================================
// COMPONENTE PRINCIPAL (APP)
// ==========================================
export default function App() {
  // --- ESTADOS (Hooks) ---

  // Estado para armazenar os itens do carrinho
  const [cart, setCart] = useState<CartItem[]>([]);

  // Estado para controlar a visibilidade do carrinho
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Estado para a categoria selecionada no filtro
  const [selectedCategory, setSelectedCategory] = useState<Category>("Todos");

  // Estado para a cor de destaque (Tema)
  const [themeColor, setThemeColor] = useState<'rose' | 'blue'>('rose');

  // Constante do Telefone
  const PHONE_NUMBER = "5511911221921";
  const DISPLAY_PHONE = "(11) 91122-1921";

  // --- EFEITOS (useEffect) ---

  // Efeito para mudar a cor do tema quando a categoria mudar
  useEffect(() => {
    if (selectedCategory === 'Masculino') {
      setThemeColor('blue');
    } else {
      setThemeColor('rose');
    }
  }, [selectedCategory]);

  // --- FUNÇÕES AUXILIARES ---

  // Filtra os produtos com base na categoria selecionada
  const filteredProducts = products.filter(product => {
    if (selectedCategory === "Todos") return true;
    if (selectedCategory === "Feminino") {
      return product.category !== "Masculino";
    }
    return product.category === selectedCategory;
  });

  // Adiciona um produto ao carrinho
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Remove um item do carrinho
  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Atualiza a quantidade de um item
  const updateQuantity = (productId: number, delta: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      });
    });
  };

  // Calcula o total do carrinho
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Gera a mensagem e o link para o WhatsApp
  const handleCheckout = () => {
    let message = "*Olá! Gostaria de finalizar meu pedido na V&B Accessories:*\n\n";

    cart.forEach(item => {
      message += `• ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Total: R$ ${cartTotal.toFixed(2)}*`;
    message += "\n\nAguardo confirmação!";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  // Função para contato geral
  const handleContact = () => {
    const message = encodeURIComponent("Olá! Gostaria de tirar algumas dúvidas sobre os produtos da V&B Accessories.");
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${message}`, '_blank');
  };

  // Classes dinâmicas baseadas no tema
  const themeClasses = {
    primary: themeColor === 'rose' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-blue-900 hover:bg-blue-800',
    text: themeColor === 'rose' ? 'text-rose-500' : 'text-blue-900',
    border: themeColor === 'rose' ? 'border-rose-200' : 'border-blue-200',
    lightBg: themeColor === 'rose' ? 'bg-rose-50' : 'bg-blue-50',
    ring: themeColor === 'rose' ? 'focus:ring-rose-500' : 'focus:ring-blue-900',
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-rose-100">

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-40 w-full bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between relative">

          {/* Lado Esquerdo - Menu Mobile (Placeholder) */}
          <div className="flex-1 flex justify-start">
            <button className="p-2 hover:bg-stone-100 rounded-full lg:hidden">
              <Menu className="w-6 h-6 text-slate-600" />
            </button>
          </div>

          {/* Logo / Nome da Marca (Centralizado) */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* Recriação Visual do Logo "V&B ACCESSORIES" */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <h1 className="font-serif text-5xl tracking-tighter font-medium text-slate-900 leading-none group-hover:opacity-80 transition-opacity">
                  V<span className="text-4xl italic font-light mx-0.5">&</span>B
                </h1>
              </div>
              <span className="text-[0.65rem] tracking-[0.35em] uppercase mt-1.5 font-sans font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                Accessories
              </span>
            </div>
          </div>

          {/* Ações do Header (Lado Direito) */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-stone-100 rounded-full transition-colors group"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag className="w-6 h-6 text-slate-600 group-hover:text-slate-900" />
              {cart.length > 0 && (
                <span className={`absolute -top-1 -right-1 w-5 h-5 ${themeClasses.primary} text-white text-xs font-bold flex items-center justify-center rounded-full transition-colors duration-500 shadow-sm`}>
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO BANNER --- */}
      <section className="relative w-full h-[500px] bg-stone-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-70">
          <img
            src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1920"
            alt="Banner Joias"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className={`inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-[0.2em] uppercase mb-6`}>
              Nova Coleção 2024
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight tracking-tight">
              Elegância que <br /> <span className="italic font-light">transcende</span> o tempo.
            </h2>
            <p className="text-stone-200 text-lg md:text-xl mb-10 max-w-xl mx-auto font-light leading-relaxed">
              Descubra nossa seleção exclusiva de joias em Prata 925.
              Peças desenhadas para contar a sua história.
            </p>
            <button
              onClick={() => document.getElementById('vitrine')?.scrollIntoView({ behavior: 'smooth' })}
              className={`px-8 py-4 bg-white text-slate-900 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-stone-100 transition-all transform hover:scale-105 shadow-xl`}
            >
              Ver Coleção
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- FILTROS DE CATEGORIA --- */}
      <div className="sticky top-24 z-30 bg-[#FDFBF7]/95 backdrop-blur border-b border-stone-100 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex space-x-3 min-w-max px-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as Category)}
                className={`
                  px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border
                  ${selectedCategory === cat
                    ? `${themeClasses.primary} border-transparent text-white shadow-md transform scale-105`
                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400 hover:bg-stone-50'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- VITRINE DE PRODUTOS --- */}
      <main id="vitrine" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h3 className="text-3xl font-serif text-slate-800 mb-2">
              {selectedCategory === "Todos" ? "Destaques da Coleção" : selectedCategory}
            </h3>
            <div className={`h-1 w-20 ${themeColor === 'rose' ? 'bg-rose-400' : 'bg-blue-800'} rounded-full`}></div>
          </div>
          <span className="text-sm text-stone-500 font-medium bg-stone-100 px-4 py-2 rounded-full self-start md:self-auto">
            {filteredProducts.length} produtos encontrados
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
              >
                {/* Imagem do Card */}
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {product.tag && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider text-slate-800">
                      {product.tag}
                    </div>
                  )}
                  {/* Overlay ao passar o mouse */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                  {/* Botão Rápido (Aparece no Hover) */}
                  <div className="absolute bottom-4 left-0 right-0 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus size={16} /> Adicionar
                    </button>
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="text-xs text-stone-500 uppercase tracking-wider mb-1 font-medium">
                    {product.category}
                  </div>
                  <h4 className="text-lg font-medium text-slate-800 mb-2 line-clamp-2 group-hover:text-slate-600 transition-colors">
                    {product.name}
                  </h4>
                  <div className="mt-auto pt-2 border-t border-stone-50 flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-900">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-stone-50 rounded-3xl">
            <p className="text-stone-500 text-lg mb-4">Nenhum produto encontrado nesta categoria.</p>
            <button
              onClick={() => setSelectedCategory("Todos")}
              className={`text-sm font-bold uppercase tracking-wider ${themeClasses.text} hover:underline`}
            >
              Ver todos os produtos
            </button>
          </div>
        )}
      </main>

      {/* --- SEÇÃO DE CONTATO (CTA) --- */}
      <section className="bg-stone-900 text-white py-20 px-4 relative overflow-hidden">
        {/* Elementos decorativos de fundo */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif mb-6">Atendimento Personalizado</h2>
          <p className="text-stone-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Tem dúvidas sobre alguma peça ou precisa de ajuda para escolher o presente perfeito?
            Nossa equipe de especialistas está pronta para te atender via WhatsApp.
          </p>
          <button
            onClick={handleContact}
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-green-500/20"
          >
            <WhatsAppIcon className="w-6 h-6" />
            Entrar em Contato
          </button>
        </div>
      </section>

      {/* --- CARRINHO LATERAL (SIDEBAR) --- */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop Escuro */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />

            {/* Painel do Carrinho */}
            <motion.div
              key="cart-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Cabeçalho do Carrinho */}
              <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-[#FDFBF7]">
                <h2 className="text-xl font-bold text-slate-800 font-serif">Seu Carrinho</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Lista de Itens */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <ShoppingBag size={48} className="text-stone-300" />
                    <p className="text-stone-500">Seu carrinho está vazio.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className={`px-6 py-2 rounded-full border ${themeClasses.border} ${themeClasses.text} font-medium hover:bg-stone-50 transition-colors`}
                    >
                      Continuar Comprando
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0 border border-stone-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-medium text-slate-800 line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-stone-500 uppercase tracking-wide mt-1">{item.category}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 bg-stone-50 rounded-full px-3 py-1 border border-stone-100">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-stone-400 hover:text-stone-600 disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-stone-400 hover:text-stone-600"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-slate-800">
                              R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-stone-400 hover:text-red-500 transition-colors"
                              title="Remover item"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Rodapé do Carrinho (Total e Checkout) */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-stone-100 bg-[#FDFBF7]">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-stone-500">Subtotal</span>
                    <span className="text-2xl font-bold text-slate-900">
                      R$ {cartTotal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className={`w-full py-4 rounded-xl ${themeClasses.primary} text-white font-bold text-lg shadow-lg hover:shadow-xl transform active:scale-[0.98] transition-all flex items-center justify-center gap-2`}
                  >
                    <WhatsAppIcon className="w-6 h-6" />
                    Finalizar no WhatsApp
                  </button>
                  <p className="text-xs text-center text-stone-400 mt-4">
                    Ao clicar, você será redirecionado para o WhatsApp com o resumo do seu pedido.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- BOTÃO FLUTUANTE WHATSAPP --- */}
      <a
        href={`https://wa.me/${PHONE_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        aria-label="Falar no WhatsApp"
      >
        <WhatsAppIcon className="w-8 h-8" />
      </a>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-stone-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

            {/* Coluna 1: Marca */}
            <div className="text-center md:text-left">
              <div className="inline-block mb-6">
                <div className="flex flex-col items-center md:items-start">
                  <h2 className="font-serif text-3xl font-bold text-slate-900 leading-none">V&B</h2>
                  <span className="text-[0.5rem] tracking-[0.3em] uppercase mt-1 font-sans text-slate-500">Accessories</span>
                </div>
              </div>
              <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                Joias em Prata 925 selecionadas com carinho para realçar sua beleza e estilo único.
              </p>
            </div>

            {/* Coluna 2: Links Rápidos */}
            <div className="text-center">
              <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Navegação</h3>
              <ul className="space-y-3 text-sm text-stone-500">
                <li><button onClick={() => setSelectedCategory("Todos")} className="hover:text-rose-500 transition-colors">Início</button></li>
                <li><button onClick={() => setSelectedCategory("Lançamentos" as Category)} className="hover:text-rose-500 transition-colors">Lançamentos</button></li>
                <li><button onClick={() => setSelectedCategory("Mais Vendidos" as Category)} className="hover:text-rose-500 transition-colors">Mais Vendidos</button></li>
                <li><button onClick={handleContact} className="hover:text-rose-500 transition-colors">Fale Conosco</button></li>
              </ul>
            </div>

            {/* Coluna 3: Contato e Social */}
            <div className="text-center md:text-right">
              <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Contato</h3>
              <div className="flex flex-col items-center md:items-end gap-3 text-stone-500 text-sm">
                <a href={`https://wa.me/${PHONE_NUMBER}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-green-600 transition-colors">
                  <Phone size={16} />
                  {DISPLAY_PHONE}
                </a>
                <div className="flex items-center gap-4 mt-4">
                  <a href="#" className="p-2 bg-stone-100 rounded-full hover:bg-rose-100 hover:text-rose-500 transition-colors">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="p-2 bg-stone-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors">
                    <Facebook size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-100 pt-8 text-center">
            <p className="text-xs text-stone-400">
              &copy; {new Date().getFullYear()} V&B Accessories. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
