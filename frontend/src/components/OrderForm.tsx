import React, { useState } from 'react';
import { FaSearch, FaWhatsapp } from 'react-icons/fa';

interface OrderFormProps {
  onSearch: (orderNumber: string) => void;
    showWhatsAppMessage: boolean;
    onRequestCode: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSearch, showWhatsAppMessage, onRequestCode }) => {
  const [orderNumber, setOrderNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(orderNumber);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative rounded-md shadow-sm">
          <input
            type="text"
            placeholder="Digite o código do seu pedido"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
          />
          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <button
              type="submit"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FaSearch className="mr-2" />
              Buscar
            </button>
          </div>
        </div>
      </form>

      {showWhatsAppMessage && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center text-sm text-green-700">
          <p className="mb-2">Não tem o código do seu pedido?</p>
          <button
            onClick={onRequestCode}
            className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
           <FaWhatsapp className="mr-2" /> Solicitar via WhatsApp
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderForm;