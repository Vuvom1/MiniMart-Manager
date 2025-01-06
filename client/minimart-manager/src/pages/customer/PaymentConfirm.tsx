import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateStatusByOrderCode } from '../../services/api/OrderApi';
import toast from 'react-hot-toast';
import { OrderStatus } from '../../constant/enum';
import Urls from '../../constant/urls';

const PaymentConfirm: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const status = params.get('status');
        const orderId = params.get('orderCode');
        if (status && orderId) {
            updateOrderStatus(orderId, status);
        }
    }, [location.search]);

    const updateOrderStatus = async (orderId: string, status: string) => {

        let orderStatus = '';

        if (status === 'PAID') {
            orderStatus = OrderStatus.PAID;
        } else {
            orderStatus = OrderStatus.WAIT_FOR_PAYMENT;
        }
        try {
            const response = await updateStatusByOrderCode(orderId, orderStatus);
            toast.success("Payment success");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            navigate(Urls.CUSTOMER.BASE);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold'>Payment Confirmation</h1>
                <p>Please wait...</p>
            </div>  
        </div>
    );
};

export default PaymentConfirm;