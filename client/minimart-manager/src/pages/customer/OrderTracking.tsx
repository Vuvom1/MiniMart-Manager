import React, { useEffect } from 'react';
import { OrderStatus } from '../../constant/enum';
import { Order } from '../../data/Entities/Order';
import { getOrdersGroupByStatusByUserId, updateOrderStatus } from '../../services/api/OrderApi';
import RoundedButton from '../../components/Button/RoundedButton';
import { useAuth } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import SuccessToast from '../../components/Toast/SuccessToast';

const OrderTracking: React.FC = () => {
    const auth = useAuth();
    const [currentTab, setCurrentTab] = React.useState(0);
    const orderStatuses = Object.values(OrderStatus);
    const [sortedOrders, setSortedOrders] = React.useState<{ [key: string]: Order[] }>();
    const [displayedOrders, setDisplayedOrders] = React.useState<Order[]>();

    const fetchOrders = async () => {
        try {
            const data = await getOrdersGroupByStatusByUserId(auth.user?._id!);
            setSortedOrders(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handelUpdateStatus = async (id: string | undefined, status: OrderStatus) => {
        try {
            if (!id) {
                toast.custom((t) => (
                    <SuccessToast
                        message={'Order not found'}
                        onDismiss={() => toast.dismiss(t.id)}
                    />))

                return;
            }

            const response = await updateOrderStatus(id, status);
            toast.custom((t) => (
                <SuccessToast
                    message={response}
                    onDismiss={() => toast.dismiss(t.id)}
                />))

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (auth.user)
            fetchOrders();
    }, [auth.user, handelUpdateStatus]);

    useEffect(() => {
        if (sortedOrders) {
            setDisplayedOrders(Object.values(sortedOrders || {}).flat());
        }
    }, [sortedOrders]);

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
                                    setDisplayedOrders(sortedOrders![orderStatus]);
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
                            <div className='flex justify-end'>
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
                                            <p className='text-cyan-700'>${detail.netPrice}</p>

                                        </div>

                                    </div>

                                ))}



                            </div>
                            <div className='border-t border-gray-200 my-2'></div>
                            <div className='flex gap-x-2 justify-end items-center'>
                                <p className='text-gray-500'>Total:</p>
                                <p className='text-cyan-700 text-2xl'>${order.receipt.totalNetPrice}</p>
                            </div>
                            {
                                order.status === (OrderStatus.PENDING || OrderStatus.WAIT_FOR_PAYMENT) && <div className='flex justify-end mt-2'>
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