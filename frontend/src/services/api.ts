import CryptoJS from 'crypto-js';
import type { IOrder } from '../types/order';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

if (!SECRET_KEY) {
    throw new Error("A variável de ambiente REACT_APP_SECRET_KEY não está definida.");
}

const generateHmacSignature = async (data: any, secretKey: string): Promise<string> => {
    try {
        const message = JSON.stringify(data);
        const hmac = CryptoJS.HmacSHA256(message, secretKey);
        const signature = hmac.toString(CryptoJS.enc.Hex);
        return signature;
    } catch (error: any) {
        console.error('Erro ao gerar assinatura HMAC:', error);
        return '';
    }
};

const makeHmacRequest = async (url: string, method: string, data: any = null): Promise<any> => {
    try {
        let headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        let modifiedUrl = url;
        let body: string | null = null;

        if (data) {
            const hmacSignature = await generateHmacSignature(data, SECRET_KEY);
            headers = {
                ...headers,
                'X-HMAC-Signature': hmacSignature,
            };

            if (method === 'GET') {
                const params = new URLSearchParams(data);
                modifiedUrl = `${url}?${params.toString()}`;
            } else {
                body = JSON.stringify(data);
            }
        }

        const response = await fetch(modifiedUrl, {
            method,
            headers,
            body: method === 'GET' ? null : body,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Request failed: ${response.statusText}`);
        }

        if (response.status !== 204) {
            const responseData = await response.json();
            return responseData;
        } else {
            return null;
        }
    } catch (error: any) {
        console.error('Erro na requisição:', error);
        throw new Error(error.message || 'An unexpected error occurred');
    }
};

const getOrder = async (orderNumber: string): Promise<IOrder & { clientName: string }> => {
    console.log('🌐 Fazendo requisição para:', `${API_BASE_URL}/orders/${orderNumber}`);
    const order = await makeHmacRequest(`${API_BASE_URL}/orders/${orderNumber}`, 'GET', {});
    console.log('📥 Resposta da API recebida:', order);
    console.log('📋 queuePosition na resposta:', order.queuePosition);
    console.log('👤 Cliente na resposta:', order.client);
   
    // O backend já retorna o cliente populado, então pegamos o nome diretamente
    const clientName = order.client?.name || 'Cliente não encontrado';
    
    const finalOrder = { ...order, clientName };
    console.log('📦 Pedido final com cliente:', finalOrder);
    return finalOrder;
};

const getClient = async (clientId: string): Promise<{ name: string }> => {
    return makeHmacRequest(`${API_BASE_URL}/clients/${clientId}`, 'GET', {});
};


export { getOrder };