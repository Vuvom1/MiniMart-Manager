import React, { useEffect } from 'react';
import { OrderStatus } from '../../constant/enum';
import { Order } from '../../data/Entities/Order';
import { getOrdersGroupByStatusByUserId, updateOrderStatus } from '../../services/api/OrderApi';
import RoundedButton from '../../components/Button/RoundedButton';
import { useAuth } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import { TimeUtil } from '../../utils/TimeUtil';

const OrderTracking: React.FC = () => {
    const auth = useAuth();
    const timeUtil = new TimeUtil();
    const [currentTab, setCurrentTab] = React.useState(0);
    const orderStatuses = Object.values(OrderStatus);
    const [sortedOrders, setSortedOrders] = React.useState<{ [key: string]: Order[] }>();
    const [displayedOrders, setDisplayedOrders] = React.useState<Order[]>();
    const [userId, setUserId] = React.useState<string | undefined>(auth.user?._id);

    const fetchOrders = async () => {
        try {
            const data = await getOrdersGroupByStatusByUserId(auth.user?._id! || '67593246ca852cda04e17235');
            setSortedOrders(data);
            setDisplayedOrders(Object.values(sortedOrders || {}).flat());
        } catch (error) {
            console.log(error);
        }
    }

    const handelUpdateStatus = async (id: string | undefined, status: OrderStatus) => {
        try {
            if (!id) {
               toast.error("Order id is invalid");

                return;
            }

            const response = await updateOrderStatus(id, status);
            toast.success(response);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
            fetchOrders();
    }, []);

    return (
        <div className='flex flex-col w-full min-h-full 2xl:px-80 xl:px-50 lg:px-30 md:px-10 bg-gray-50'>
            <div className="mb-4 border-b border-gray-200 w-full">
                <ul
                    className="flex gap-x-2 -mb-px text-sm text-center max-w-full"
                    id="default-tab"
                    data-tabs-toggle="#default-tab-content"
                    role="tablist"
                >
                    <li role="presentation" className='w-1/6'>
                        <button
                            onClick={() => {
                                setDisplayedOrders(Object.values(sortedOrders || {}).flat());
                                setCurrentTab(0);
                            }}
                            className={`inline-block w-full p-4 border-b-2 rounded-t-lg ${currentTab === 0 ? 'border-cyan-400 text-cyan-400' : ''
                                }`}
                        >
                            All
                        </button>
                    </li>
                    {orderStatuses.map((orderStatus, index) => (
                        <li key={`${index}-status`} role="presentation" className='w-1/6'>
                            <button
                                onClick={() => {
                                    setDisplayedOrders(sortedOrders ? sortedOrders[orderStatus] || [] : []);
                                    setCurrentTab(index + 1);
                                }}
                                className={`inline-block w-full p-4 border-b-2 rounded-t-lg ${currentTab === index + 1 ? 'border-cyan-400 text-cyan-400' : ''
                                    }`}
                            >
                                {orderStatus}
                            </button>
                        </li>
                    ))}
                </ul>

            </div>

            <div className='flex flex-col gap-4 min-h-vh'>
                {
                    displayedOrders && displayedOrders?.length !== 0 ? displayedOrders.map((order) => (
                        <div key={`${order._id}-displayOrder`} className='flex flex-col  h-fit bg-white rounded-lg p-4'>
                            <div className='flex justify-between py-2'>
                                <p className='text-gray-600'>{timeUtil.convertIsoDateToTimeAndDate(order.receipt.time)}</p>
                                <p className='font-medium text-cyan-600'>{order.status.toUpperCase()}</p>
                            </div>
                            <div className='flex flex-col py-1'>
                                {order.receipt.details.map((detail) => (
                                    <div key={detail.product._id} className='flex border-t gap-x-6 border-1 py-2'>
                                        <img className='w-20 h-20' src={detail.product.image} alt='' />
                                        <div className='flex flex-col justify-between grow'>
                                            <p>{detail.product.name}</p>
                                            <p className='text-gray-500 font-light'>x{detail.quantity}</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <p>{detail.netPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                        </div>

                                    </div>

                                ))}



                            </div>
                            <div className='border-t border-gray-200 my-2'></div>
                            <div className='flex gap-x-2 justify-end items-center'>
                                <p className='text-gray-500'>Delivery Fee:</p>
                                <p className='text-cyan-700'>{order.deliveryFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                            <div className='flex gap-x-2 justify-end items-center'>
                                <p className='text-gray-500'>Total product price:</p>
                                <p className='text-cyan-700'>{((order.receipt.totalNetPrice ?? 0) - (order.deliveryFee ?? 0)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                            <div className='flex gap-x-2 justify-end items-center'>
                                <p className='text-gray-500'>Total:</p>
                                <p className='text-cyan-700 text-2xl'>{((order.receipt.totalNetPrice ?? 0) + (order.deliveryFee ?? 0)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                            {
                                (order.status === OrderStatus.PENDING || order.status ===  OrderStatus.WAIT_FOR_PAYMENT || order.status === OrderStatus.CONFIRM) && <div className='flex justify-end mt-2'>
                                    {order._id && <RoundedButton label='Cancel' onClick={() => handelUpdateStatus(order._id, OrderStatus.CANCELLED)} />}
                                </div>
                                
                            }

                            {
                                order.status === OrderStatus.CANCELLED && <div className='flex justify-end mt-2'>
                                    <RoundedButton onClick={() => handelUpdateStatus(order._id, OrderStatus.PENDING)} label='Order again'/>
                                </div>
                            }

                        </div>
                    )) : (<div className='flex justify-center'>No orders</div>)
                }
            </div>
        </div>

    );
};

export default OrderTracking;