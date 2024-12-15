import React, { useContext } from 'react';
import RadioGroup from '../../components/Radio/RadioGroup';
import RoundedButton from '../../components/Button/RoundedButton';
import { CartContext } from '../../contexts/CartContext';
import { CheckoutItemCard } from '../../components/Card/CheckoutItemCard';
import { useState, useEffect } from 'react';
import { OrderStatus, PaymentMethod, ReceiptStatus, TransactionType } from '../../constant/enum';
import { useAuth } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import { Receipt } from '../../data/Entities/Receipt';
import SuccessToast from '../../components/Toast/SuccessToast';
import ErrorToast from '../../components/Toast/ErrorToast';
import { Order } from '../../data/Entities/Order';
import { useNavigate } from 'react-router-dom';
import Urls from '../../constant/urls';
import { createOrderWithUser } from '../../services/api/OrderApi';
import { MAP_PIN_IMAGE } from '../../constant/strings';

const CustomerCheckout: React.FC = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const user = auth?.user;
    const paymentOptions = [
        { label: 'Cash on delivery', value: PaymentMethod.CASH },
        { label: 'Online Payment', value: PaymentMethod.ONLINE },
    ];
    const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.CASH);
    const { cartItems, totalPrice, totalItems, changeQuantity, removeFromCart, clearCart } = useContext(CartContext)!;
    const [receipt, setReceipt] = useState<Receipt>({
        paymentMethod: paymentMethod,
        time: new Date(),
        transactionType: TransactionType.DELIVERY,
        details: [],
        status: ReceiptStatus.PENDING,
    } as Receipt);
    const [order, setOrder] = useState<Order>();
    const [couponDiscount, setCoupondiscount] = useState(0);
    const [totalNetPrice, setTotalNetPrice] = useState(0);


    const handleCheckOut = async () => {
        try {
            receipt.details = cartItems;
            receipt.paymentMethod = paymentMethod;

            order!.receipt = receipt;

            if (user && order) {
                const response = await createOrderWithUser(order, user);
                toast.custom((t) => (
                    <SuccessToast
                        message={response}
                        onDismiss={() => toast.dismiss(t.id)}
                    />))

                clearCart();
                navigate(Urls.CUSTOMER.BASE);
            } else {
                toast.custom((t) => (
                    <ErrorToast
                        message='User not found, please login to continue'
                        onDismiss={() => toast.dismiss(t.id)}
                    />))
            }

        } catch (error: any) {
            toast.custom((t) => (
                <ErrorToast
                    message={error || 'Something went wrong'}
                    onDismiss={() => toast.dismiss(t.id)}
                />))
        }
    }

    const calculateTotalNetPrice = () => {
        setTotalNetPrice(totalPrice + ((order?.deliveryFee ?? 0) | 0) - couponDiscount);
    }

    useEffect(() => {
        if (user) {
            setOrder({
                receipt: receipt,
                receipientName: user.firstname + ' ' + user.lastname,
                phone: user.phone,
                address: user.address,
                status: OrderStatus.PENDING,
            } as Order);
        }
    }, [user])

    useEffect(() => {
        if (order)
            calculateTotalNetPrice();
    }, [totalPrice, order?.deliveryFee, couponDiscount]);

    return (
        <div className='flex py-10 text-cyan-900 gap-x-6 bg-gray-100'>
            <div className=' flex flex-col w-1/2 gap-y-4 ms-10'>
                <div className='rounded-lg flex p-6 gap-y-6 flex-col shadow-md bg-white'>
                    <p className='text-2xl font-medium'>Delivery information</p>
                    <div className='flex gap-x-4'>
                        <img src={MAP_PIN_IMAGE} alt='map pin' className='w-40 h-40 rounded-lg object-cover' />
                        <div className='flex flex-col'>
                            <p className='text-xl'>Receipient</p>
                            <p className='font-light text-gray-800'>Name: {user?.firstname + " " + user?.lastname}</p>
                            <p className='text-xl mt-4'>Deliver to</p>
                            <p className='font-light text-gray-800'>Phone number: {user?.phone}</p>
                            <p className='font-light text-gray-800'>Address: {user?.address}</p>
                        </div>
                    </div>
                </div>

                <div className='rounded-lg flex p-6 gap-y-6 flex-col shadow-md bg-white'>
                    <p className='text-2xl font-medium'>Review items</p>
                    <div className='flex flex-col h-96 overflow-y-scroll divide-y'>
                        {cartItems.map((cartItem) => (
                            <CheckoutItemCard key={cartItem.product._id} cartItem={cartItem} onChangeQuantity={(id, quantity) => changeQuantity(id, quantity)} onRemove={(id) => removeFromCart(id)} />
                        ))}
                    </div>

                </div>
            </div>

            <div className='flex flex-col p-6 gap-y-6 rounded-lg shadow-md w-1/2 me-10 bg-white'>
                <p className='text-2xl font-medium'>Order summary</p>
                <div className='flex flex-col'>
                    <RadioGroup selectedValue={paymentMethod} options={paymentOptions} onChange={(value: PaymentMethod) => setPaymentMethod(value)} name={''} />
                </div>
                <div className='border-t border-gray-100 my-10' />
                <div className="flex w-full items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-cyan-500">
                    <input type="text" name="price" id="price" className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" placeholder="Enter promotion code" />
                    <RoundedButton label='Apply' />
                </div>
                <div className='border-t border-gray-100 my-4' />
                <div className='flex flex-col gap-y-2 grow'>
                    <div className='flex justify-between'>
                        <p className='text-gray-500'>Subtotal</p>
                        <p className='text-cyan-900 font-medium'>${totalPrice}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-gray-500'>Delivery fee</p>
                        <p className='text-cyan-900 font-medium'>${order?.deliveryFee}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-gray-500'>Coupon discount</p>
                        <p className='text-cyan-900 font-medium'>${couponDiscount}</p>
                    </div>
                    <div className='border-t border-gray-100 my-4' />
                    <div className='flex justify-between'>
                        <p className='text-cyan-900 text-xl font-medium'>Total</p>
                        <p className='text-cyan-900 text-xl font-medium'>${totalNetPrice}</p>
                    </div>

                </div>
                <div className='flex flex-col'>
                    <RoundedButton disable={totalItems <= 0} onClick={handleCheckOut} label="Confirm order" rounded='rounded-full' textColor='text-white' color='bg-cyan-600/60' />
                </div>
            </div>

        </div>
    );
};

export default CustomerCheckout;