import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  isSeasonal: boolean;
  isFresh: boolean;
  category: string;
};

type CartItem = Product & { quantity: number };

const products: Product[] = [
  {
    id: 1,
    name: 'Авокадо Хасс',
    price: 450,
    image: 'https://cdn.poehali.dev/projects/2e16a370-d921-4deb-affb-11d587fc8bd8/files/c69b9bcb-a3ab-4dec-a0e9-ff4e89257cd9.jpg',
    isSeasonal: true,
    isFresh: true,
    category: 'Фрукты'
  },
  {
    id: 2,
    name: 'Томаты Черри',
    price: 380,
    image: 'https://cdn.poehali.dev/projects/2e16a370-d921-4deb-affb-11d587fc8bd8/files/0ed2ec32-8967-4bee-850c-39f8f41dcc42.jpg',
    isSeasonal: false,
    isFresh: true,
    category: 'Овощи'
  },
  {
    id: 3,
    name: 'Манго',
    price: 520,
    image: 'https://cdn.poehali.dev/projects/2e16a370-d921-4deb-affb-11d587fc8bd8/files/58678b3b-b879-46fc-b8ea-e0ee3984fc52.jpg',
    isSeasonal: true,
    isFresh: true,
    category: 'Фрукты'
  },
  {
    id: 4,
    name: 'Спаржа Зеленая',
    price: 680,
    image: 'https://cdn.poehali.dev/projects/2e16a370-d921-4deb-affb-11d587fc8bd8/files/b6aa6a38-6d40-4063-a8d3-f6700202550b.jpg',
    isSeasonal: true,
    isFresh: true,
    category: 'Овощи'
  },
  {
    id: 5,
    name: 'Инжир',
    price: 890,
    image: 'https://cdn.poehali.dev/projects/2e16a370-d921-4deb-affb-11d587fc8bd8/files/82c9d717-f0e3-473b-95e2-0d77c11b0754.jpg',
    isSeasonal: true,
    isFresh: true,
    category: 'Фрукты'
  },
  {
    id: 6,
    name: 'Артишоки',
    price: 750,
    image: 'https://cdn.poehali.dev/projects/2e16a370-d921-4deb-affb-11d587fc8bd8/files/fca2f8fd-f552-4598-be49-6cd775e0db86.jpg',
    isSeasonal: false,
    isFresh: true,
    category: 'Овощи'
  },
  {
    id: 7,
    name: 'Апельсины Валенсия',
    price: 320,
    image: 'https://cdn.poehali.dev/projects/2e16a370-d921-4deb-affb-11d587fc8bd8/files/e404214e-4812-429b-b6a7-d9260b1e97bb.jpg',
    isSeasonal: true,
    isFresh: true,
    category: 'Фрукты'
  },
  {
    id: 8,
    name: 'Маракуйя',
    price: 650,
    image: 'https://cdn.poehali.dev/projects/2e16a370-d921-4deb-affb-11d587fc8bd8/files/9876bf70-8c8d-40be-bf60-f26120595725.jpg',
    isSeasonal: true,
    isFresh: true,
    category: 'Фрукты'
  },
  {
    id: 9,
    name: 'Перец Разноцветный',
    price: 420,
    image: 'https://cdn.poehali.dev/projects/2e16a370-d921-4deb-affb-11d587fc8bd8/files/623aee0b-dc62-4a57-9dce-d3fba73a4094.jpg',
    isSeasonal: false,
    isFresh: true,
    category: 'Овощи'
  },
  {
    id: 10,
    name: 'Голубика',
    price: 980,
    image: 'https://cdn.poehali.dev/projects/2e16a370-d921-4deb-affb-11d587fc8bd8/files/95986922-5808-42d7-8724-bdd9587e5544.jpg',
    isSeasonal: true,
    isFresh: true,
    category: 'Ягоды'
  },
  {
    id: 11,
    name: 'Руккола',
    price: 280,
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop',
    isSeasonal: false,
    isFresh: true,
    category: 'Зелень'
  },
  {
    id: 12,
    name: 'Киви Золотой',
    price: 590,
    image: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=400&h=300&fit=crop',
    isSeasonal: false,
    isFresh: true,
    category: 'Фрукты'
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('главная');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filterSeasonal, setFilterSeasonal] = useState(false);
  const [filterFresh, setFilterFresh] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filterSeasonal && !product.isSeasonal) return false;
      if (filterFresh && !product.isFresh) return false;
      return true;
    });
  }, [filterSeasonal, filterFresh]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast({
      title: "Добавлено в корзину",
      description: `${product.name} — ${product.price}₽`,
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSeasonalFilter = () => {
    setFilterSeasonal(!filterSeasonal);
    scrollToCatalog();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/projects/2e16a370-d921-4deb-affb-11d587fc8bd8/files/8921846c-9d70-41fb-8e05-07d8e1272adc.jpg" 
                alt="Зеленый медведь" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-primary">GreenBear</h1>
                <p className="text-xs text-muted-foreground">Премиальные овощи и фрукты</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {['Главная', 'Каталог', 'О магазине', 'Доставка', 'Блог', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.toLowerCase() ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            <Button size="sm" className="hidden md:flex gap-2 relative">
              <Icon name="ShoppingCart" size={18} />
              Корзина
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 rounded-full">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            <Button size="icon" variant="ghost" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                Свежесть премиум-класса
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Отборные овощи и фрукты с лучших ферм мира. Доставка свежести к вашему столу каждый день.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button size="lg" className="gap-2" onClick={scrollToCatalog}>
                  <Icon name="ShoppingBag" size={20} />
                  Смотреть каталог
                </Button>
                <Button size="lg" variant="outline" className="gap-2" onClick={handleSeasonalFilter}>
                  <Icon name="Leaf" size={20} />
                  Сезонные продукты
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="catalog" className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
              <div>
                <h3 className="text-3xl font-bold mb-2">Наш каталог</h3>
                <p className="text-muted-foreground">Премиальные продукты для вашего здоровья</p>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant={filterSeasonal ? "default" : "outline"} 
                  size="sm" 
                  className="gap-2"
                  onClick={() => setFilterSeasonal(!filterSeasonal)}
                >
                  <Icon name="Leaf" size={16} />
                  Сезонное
                </Button>
                <Button 
                  variant={filterFresh ? "default" : "outline"} 
                  size="sm" 
                  className="gap-2"
                  onClick={() => setFilterFresh(!filterFresh)}
                >
                  <Icon name="Sparkles" size={16} />
                  Свежее
                </Button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="PackageX" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Нет товаров по выбранным фильтрам</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <Card 
                    key={product.id} 
                    className="group overflow-hidden hover:shadow-lg transition-all duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        {product.isSeasonal && (
                          <Badge className="bg-primary text-primary-foreground shadow-md gap-1">
                            <Icon name="Leaf" size={12} />
                            Сезонное
                          </Badge>
                        )}
                        {product.isFresh && (
                          <Badge className="bg-emerald-500 text-white shadow-md gap-1">
                            <Icon name="Sparkles" size={12} />
                            Свежее
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                          <h4 className="font-semibold text-lg">{product.name}</h4>
                        </div>
                        <p className="text-xl font-bold text-primary">{product.price}₽</p>
                      </div>
                      <Button 
                        className="w-full mt-4 gap-2" 
                        variant="outline"
                        onClick={() => addToCart(product)}
                      >
                        <Icon name="Plus" size={16} />
                        В корзину
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {cartItemsCount > 0 && (
          <section className="py-8 bg-primary/10 border-y border-border">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between max-w-4xl mx-auto">
                <div>
                  <p className="text-sm text-muted-foreground">В корзине товаров: {cartItemsCount}</p>
                  <p className="text-2xl font-bold text-foreground">Итого: {cartTotal}₽</p>
                </div>
                <Button size="lg" className="gap-2">
                  <Icon name="ShoppingCart" size={20} />
                  Оформить заказ
                </Button>
              </div>
            </div>
          </section>
        )}

        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-center mb-12">Почему выбирают нас</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center animate-fade-in">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Leaf" size={32} className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">100% Органика</h4>
                  <p className="text-sm text-muted-foreground">
                    Только натуральные продукты без пестицидов и химикатов
                  </p>
                </div>
                <div className="text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Truck" size={32} className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Быстрая доставка</h4>
                  <p className="text-sm text-muted-foreground">
                    Доставим свежие продукты в течение 2 часов
                  </p>
                </div>
                <div className="text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Award" size={32} className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Премиум качество</h4>
                  <p className="text-sm text-muted-foreground">
                    Тщательный отбор от лучших фермеров мира
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">Готовы попробовать?</h3>
              <p className="text-muted-foreground mb-8">
                Присоединяйтесь к тысячам довольных клиентов, выбравших премиальное качество
              </p>
              <Button size="lg" className="gap-2" onClick={scrollToCatalog}>
                <Icon name="ShoppingBag" size={20} />
                Начать покупки
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="https://cdn.poehali.dev/projects/2e16a370-d921-4deb-affb-11d587fc8bd8/files/8921846c-9d70-41fb-8e05-07d8e1272adc.jpg" 
                  alt="GreenBear" 
                  className="w-10 h-10 object-contain brightness-0 invert"
                />
                <span className="font-bold text-xl">GreenBear</span>
              </div>
              <p className="text-sm opacity-80">
                Премиальные овощи и фрукты для вашего здоровья
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Магазин</h5>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100 transition-opacity">Каталог</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Сезонные товары</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Акции</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Информация</h5>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100 transition-opacity">О магазине</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Доставка</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Блог</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Контакты</h5>
              <ul className="space-y-2 text-sm opacity-80">
                <li>+7 (495) 123-45-67</li>
                <li>info@greenbear.ru</li>
                <li>Москва, ул. Примерная, 1</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-6 text-center text-sm opacity-60">
            © 2024 GreenBear. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;