import React from 'react';
import type { IOrder } from '../types/order';
import { FaBoxOpen, FaCheckCircle, FaTruck } from 'react-icons/fa';
import { GiSewingMachine } from "react-icons/gi";

interface OrderDetailsProps {
    order: IOrder & { clientName?: string } | null;
    isLoading: boolean;
    showMessage: boolean; 
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, isLoading, showMessage }) => {

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600"></span>
            </div>
        );
    }

    if (!order) {
        return showMessage ? <div className="text-gray-600 italic mt-4">Nenhum pedido encontrado.</div> : null;
    }

    const completionDate = new Date(order.estimatedCompletionDate);

    let progress = 0;
    let statusMessage = '';
    let statusColor = 'text-gray-500';

    if (order.status === 'em confeccao') {
        progress = 33;
        statusMessage = 'Em confecção';
        statusColor = 'text-yellow-500';
    } else if (order.status === 'finalizado') {
        progress = 66;
        statusMessage = 'Finalizado';
        statusColor = 'text-blue-500';
    } else if (order.status === 'enviado') {
        progress = 100;
        statusMessage = 'Enviado';
        statusColor = 'text-green-500';
    }


    return (
        <div className="bg-white shadow-md rounded-lg p-4 md:p-6 flex flex-col gap-4 z-50">
            <div className="flex items-center space-x-3 border-b pb-3 border-gray-200">
                <FaBoxOpen className="text-xl text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-800">Detalhes do Pedido</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-gray-600">
                        <strong className="font-medium text-gray-700">Pedido:</strong> {order.orderNumber}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">
                        <strong className="font-medium text-gray-700">Produto:</strong> {order.productName}
                    </p>
                </div>
                  <div>
                    <p className="text-sm text-gray-600">
                        <strong className="font-medium text-gray-700">Cliente:</strong> {order.clientName || "Cliente não encontrado"}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">
                        <strong className="font-medium text-gray-700">Data limite:</strong> {completionDate.toLocaleDateString()}
                    </p>
                </div>
              
            </div>


            <div>
                <div className="flex items-center mb-1">
                    <strong className="font-medium text-gray-700 mr-2">Status:</strong>
                    <span className={`${statusColor} text-sm font-bold`}>{statusMessage}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span className="flex items-center"><GiSewingMachine className="mr-1" /> Confecção</span>
                    <span className="flex items-center"><FaCheckCircle className="mr-1" /> Finalizado</span>
                    <span className="flex items-center"><FaTruck className="mr-1" /> Enviado</span>
                </div>
            </div>

            {order.status !== 'enviado' && (
                <div className="bg-blue-50 text-blue-800 p-3 rounded-md text-sm flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <span>Quando seu pedido for enviado, o código de rastreamento será disponibilizado aqui para você acompanhar a entrega!</span>
                </div>
            )}


            {order.trackingNumber && (
                <div>
                    <p className="text-sm text-gray-600">
                        <strong className="font-medium text-gray-700">Rastreamento:</strong> {order.trackingNumber}
                    </p>
                </div>
            )}

            {order.trackingLink && (
                <div>
                    <p className="text-sm text-gray-600">
                        <strong className="font-medium text-gray-700">Link de Rastreamento:</strong>
                        <a href={order.trackingLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 underline">
                            Acompanhe seu pedido
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;