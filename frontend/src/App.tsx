import  { useState } from 'react';
import OrderForm from './components/OrderForm';
import OrderDetails from './components/OrderDetails';
import { getOrder } from './services/api';
import type { IOrder } from './types/order';
import Header from './components/Header';
import WhatsAppButton from './components/WhatsappButton';
import Footer from './components/Footer';

function App() {
  const [order, setOrder] = useState<IOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showWhatsAppMessage, setShowWhatsAppMessage] = useState(true); 

  const handleSearch = async (orderNumber: string) => {
    setIsLoading(true);
    setOrder(null);
    setError(null);
    setShowMessage(false);
    setShowWhatsAppMessage(false); 

    try {
      const data = await getOrder(orderNumber);
      setOrder(data);
      setError(null);
      setShowMessage(false);
      setShowWhatsAppMessage(false);
    } catch (e: any) {
      setOrder(null);
      setError(e.message || 'Erro ao buscar pedido.');
      setShowMessage(true);
      setShowWhatsAppMessage(true); 
    } finally {
      setIsLoading(false);
    }
  };

    const handleRequestCode = () => {
        window.open(
            "https://wa.me/5531971856224?text=Olá,%20gostaria%20de%20solicitar%20o%20código%20do%20meu%20pedido.",
            "_blank"
        );
    };

  return (
    <div className="min-h-screen">
      <Header />
      <div className='flex justify-between flex-col h-[100vh]'>
        <div className="container mx-auto my-10 p-4 min-h[100%]" style={{ maxWidth: '700px' }}>
          <h1 className="text-2xl font-bold mb-4">Rastreamento de Pedidos</h1>
          <OrderForm onSearch={handleSearch} showWhatsAppMessage={showWhatsAppMessage} onRequestCode={handleRequestCode} />
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <OrderDetails order={order} isLoading={isLoading} showMessage={!order && !error && !isLoading && showMessage} />
        </div>
        <WhatsAppButton phoneNumber="5531971856224" />
        <Footer />
      </div>
    </div>
  );
}

export default App;