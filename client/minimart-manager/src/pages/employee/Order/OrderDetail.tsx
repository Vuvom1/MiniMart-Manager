import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Order } from '../../../data/Entities/Order';
import { getOrderById, updateOrderStatus } from '../../../services/api/OrderApi';
import { TimeUtil } from '../../../utils/TimeUtil';
import StatusPickerModal from '../../../components/Picker/StatusPicker';
import { OrderStatus } from '../../../constant/enum';
import { orderStatusColorMapping } from '../../../constant/mapping';
import { MAP_PIN_IMAGE } from '../../../constant/strings';
import SuccessToast from '../../../components/Toast/SuccessToast';
import toast from 'react-hot-toast';
import { LoadingScreen } from '../../../components/Loading/LoadingScreen';
import { CalculateUtil } from '../../../utils/CalculateUtil';

const OrderDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order>();
    const timeUtil = new TimeUtil();

    const fetchOrder = async () => {
        try {
            if (id) {
                const data = await getOrderById(id);
                setOrder(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleUdpateOrderStatus = async (id: string, status: OrderStatus) => {
        try {
            const response = await updateOrderStatus(id, status);

            toast.custom((t) => (
                <SuccessToast
                    message={response}
                    onDismiss={() => toast.dismiss(t.id)}
                />))
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchOrder();
    }, []);

    if (order === undefined) {
        return <LoadingScreen />;
    }

    return (
        <div className='flex flex-col px-4 pb-4 gap-y-2'>
            <p className='text-2xl font-medium'>Order information</p>
            <div className='flex text-cyan-900 gap-x-4 bg-gray-100'>

                <div className='rounded-lg flex p-6 gap-y-6 flex-col w-1/2 shadow-md bg-white'>
                    <p className='text-2xl font-medium'>Ordered items</p>
                    <div className='flex flex-col h-[70%] overflow-y-scroll divide-y'>
                        {order?.receipt.details.map((detail) => (
                            <div>
                                <li key={detail.product._id} className="flex py-6 w-full">
                                    <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img alt={detail.product.image} src={detail.product.image} className="size-full object-cover" />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col w-full">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <a className='text-2xl font-light' href={"#"}>{detail.product.name}</a>
                                                </h3>
                                                <p className="ml-4 text-xl text-cyan-800">${detail.product.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{detail.product.subCategory.name}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">


                                            <div className="flex items-center">
                                                <p className="text-gray-500">Quantity:</p>
                                                <p className="ml-1 m text-xl text-gray-900">{detail.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </div>
                        ))}
                        
                    </div>

                    <div className='border-t border-gray-100 my-4' />
                    {order?.receipt.giftItems && order.receipt.giftItems.length > 0 && 
                        <div className='flex flex-col gap-y-2'>
                            <p className='text-xl'>Gift items</p>
                            {order?.receipt.giftItems.map((giftItem) => (
                                <div className='flex gap-x-4'>
                                    <img src={giftItem.product.image} alt='gift item' className='w-20 h-20 rounded-lg object-cover' />
                                    <p className='text-xl grow'>{giftItem.product.name}</p>
                                    <p className='text-xl'>x{giftItem.quantity}</p>
                                </div>
                            ))}
                        </div>

                    }

                    

                </div>

                <div className=' flex flex-col w-1/2 gap-y-4'>
                    <div className='rounded-lg flex p-6 gap-y-6 flex-col shadow-md bg-white'>
                        <p className='text-2xl font-medium'>Delivery information</p>
                        <div className='flex gap-x-4'>

                            <img src={MAP_PIN_IMAGE} alt='map pin' className='w-40 h-40 rounded-lg object-cover' />

                            <div className='flex flex-col'>
                                <p className='text-xl'>Receipient</p>
                                <p className='font-light text-gray-800'>Name: {order?.receipientName}</p>
                                <p className='text-xl mt-4'>Deliver to</p>
                                <p className='font-light text-gray-800'>Phone number: {order?.phone}</p>
                                <p className='font-light text-gray-800'>Address: {order?.address}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col p-6 gap-y-4 rounded-lg shadow-md bg-white'>
                        <div className='flex justify-between'>
                            <p className='text-2xl font-medium'>Order summary</p>
                            <StatusPickerModal statusEnum={OrderStatus} initialValue={order?.status} colorMapping={orderStatusColorMapping} onSelect={(status: OrderStatus) => { if (id) handleUdpateOrderStatus(id, status) }} />
                        </div>

                        <div className='flex gap-x-4'>
                            <p className='text-gray-500'>Order Time:</p>
                            <p>{timeUtil.convertIsoDateToTimeAndDate(order?.receipt.time ?? new Date())}</p>
                        </div>
                        <div className='flex gap-x-4'>
                            <p className='text-gray-500'>Payment method:</p>
                            <p>{order?.receipt.paymentMethod}</p>
                        </div>
                        <div className='border-t border-gray-100 my-10' />
                        <div className="flex gap-x-4 items-center">
                            <p className='text-gray-500'>Promotion used:</p>
                            {order?.receipt.promotion ? <p className='text-xl'>{order.receipt.promotion.code}</p> : <p className='text-xl'>No voucher</p>}
                        </div>
                        <div className='border-t border-gray-100 my-4' />
                        <div className='flex flex-col gap-y-2 grow'>
                            <div className='flex justify-between'>
                                <p className='text-gray-500'>Subtotal</p>
                                <p>{(order?.receipt.totalPrice ?? 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-500'>Delivery fee</p>
                                <p className='text-cyan-900 font-medium'>${order?.deliveryFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-500'>Coupon discount</p>    
                                <p className='text-cyan-900 font-medium'>${CalculateUtil.calculateDiscountPriceByAmount(order?.receipt.totalPrice ?? 0, order?.receipt.totalNetPrice ?? 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                            <div className='border-t border-gray-100 my-4' />
                            <div className='flex justify-between'>
                                <p className='text-cyan-900 text-xl font-medium'>Total</p>
                                <p className='text-cyan-900 text-xl font-medium'>${((order?.receipt.totalNetPrice ?? 0) + order.deliveryFee).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            </div>

                        </div>
                    </div>


                </div>



            </div>

        </div>


    );
};

export default OrderDetail;