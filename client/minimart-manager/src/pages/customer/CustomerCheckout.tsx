import React, { useContext } from 'react';
import RadioGroup from '../../components/Radio/RadioGroup';
import RoundedButton from '../../components/Button/RoundedButton';
import { CartContext } from '../../contexts/CartContext';
import { CheckoutItemCard } from '../../components/Card/CheckoutItemCard';
import { useState, useEffect } from 'react';
import { DiscountType, OrderStatus, PaymentMethod, ReceiptStatus, TransactionType } from '../../constant/enum';
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
import { deliveryFee } from '../../constant/fees';
import VoucherSelectionModal from '../../components/Modal/VoucherSelectionModal';
import { Promotion } from '../../data/Entities/Promotion';
import { CalculateUtil } from '../../utils/CalculateUtil';
import { GiftItem } from '../../data/Entities/GiftItem';
import { checkPaymentStatus, createPayment } from '../../services/api/PaymentApi';
import QRCode from 'react-qr-code';

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
    const [totalNetPrice, setTotalNetPrice] = useState(0);
    const [isVoucherModelOpen, setIsVoucherModelOpen] = useState(false);
    const [promotion, setPromotion] = useState<Promotion>();
    const [giftItems, setGiftItems] = useState<GiftItem[]>([]);
    const [qrPaymentCode, setQrPaymentCode] = useState<string>('');

    if (order) {
        order.deliveryFee = deliveryFee;
    }


    const handleCheckOut = async () => {
        try {
            receipt.details = cartItems;
            receipt.paymentMethod = paymentMethod;
            receipt.giftItems = giftItems;

            if (order && order.receipt) {
                setOrder(
                    {
                        ...order,
                        receipt: {
                            ...order.receipt,
                            promotion: promotion,
                        }
                    }
                )
            }

            if (user && order) {
                if (paymentMethod === PaymentMethod.ONLINE) {
                    const orderCode = Math.floor(Math.random() * 90071);

                    order.orderCode = orderCode;
                    order.status = OrderStatus.WAIT_FOR_PAYMENT;

                    const response = await createOrderWithUser(order, user);

                    clearCart();

                    await handleOnlinePayment(orderCode);
                } else {
                    setOrder({
                        ...order,
                        status: OrderStatus.PENDING,
                    });

                    const response = await createOrderWithUser(order, user);

                    clearCart();

                    navigate(Urls.CUSTOMER.BASE);
                }

                toast.custom((t) => (
                    <SuccessToast
                        message='Order placed successfully'
                        onDismiss={() => toast.dismiss(t.id)}
                    />))
                
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

    const handleOnlinePayment = async (orderCode: number) => {
        try {         
            const response = await createPayment({
                orderCode: orderCode,
                amount: 50000,
                description: "VQRIO123",
                buyerName: user?.firstname + ' ' + user?.lastname,
                buyerEmail: user?.email ?? "",
                buyerPhone: user?.phone?.toString() ?? "",
                buyerAddress: user?.address ?? "",
                items: order?.receipt?.details?.map(item => ({ name: item.product.name, quantity: item.quantity, price: item.product.price })) ?? [],
                cancelUrl: "http://localhost:5173/minimartonline/confirm-payment",  
                returnUrl: "http://localhost:5173/minimartonline/confirm-payment",
            })

            window.location.href = `https://pay.payos.vn/web/${response.data.paymentLinkId}`;
            
        } catch (error: any) {
            console.log(error);
        }
    }

    const calculateTotalNetPrice = () => {
        setTotalNetPrice(totalPrice + ((order?.deliveryFee ?? 0) | 0) - (promotion?.discountPercentage ?? 0));
    }

    const handleGiftItems = () => {
        const newGiftItems: GiftItem[] = [];

        if (promotion?.discountType === DiscountType.FREE_GIFT) {
            newGiftItems.push(
                ...(promotion.giftItems?.map(item => ({ product: item, quantity: 1 })) ?? [])
            );
        }

        cartItems.forEach(cartItem => {
            const productPromotion = cartItem.product.promotion;
            if (productPromotion?.discountType === DiscountType.GET_MORE && cartItem.quantity >= productPromotion?.requiredQuantity!) {
                const existingGiftItem = newGiftItems.find(giftItem => giftItem.product._id === cartItem.product._id);
                if (existingGiftItem) {
                    existingGiftItem.quantity += Math.floor(cartItem.quantity / productPromotion.requiredQuantity!) * productPromotion.rewardQuantity!;
                } else {
                    newGiftItems.push({ product: cartItem.product, quantity: Math.floor(cartItem.quantity / productPromotion.requiredQuantity!) * productPromotion.rewardQuantity! });
                }
            }

            if (productPromotion?.discountType === DiscountType.FREE_GIFT) {
                const existingGiftItem = newGiftItems.find(giftItem => giftItem.product._id === cartItem.product._id);
                if (!existingGiftItem) {
                    newGiftItems.push({ product: cartItem.product, quantity: cartItem.quantity });
                } else {
                    existingGiftItem.quantity += cartItem.quantity;
                }
            }
        });

        setGiftItems(newGiftItems);

    }

    useEffect(() => {
        handleGiftItems();
    }, [promotion, cartItems]);

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
    }, [totalPrice, order?.deliveryFee, promotion]);



    return (<>

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
                    <div className='flex flex-col h-full overflow-y-scroll divide-y'>
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
                <div className='border-t border-gray-100' />
                <div className="flex w-full items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-cyan-500">
                    <input value={promotion?.code} type="text" name="price" id="price" className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" placeholder="Enter promotion code" />
                    <RoundedButton label='Select Voucher' onClick={() => setIsVoucherModelOpen(true)} />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <p className='text-gray-500'>You will get:</p>
                    {
                        giftItems.map((item) => (
                            <div className='flex gap-x-4 items-center'>
                                <img src={item.product.image} alt={item.product.name} className='w-10 h-10' />
                                <p className='grow'>{item.product.name}</p>
                                <p>x{item.quantity}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='border-t border-gray-100 my-4' />
                <div className='flex flex-col gap-y-2 grow'>
                    <div className='flex justify-between'>
                        <p className='text-gray-500'>Subtotal</p>
                        <p className='text-cyan-900 font-medium'>{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-gray-500'>Delivery fee</p>
                        <p className='text-cyan-900 font-medium'>{order?.deliveryFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-gray-500'>Coupon discount</p>
                        <p className='text-cyan-900 font-medium'>{CalculateUtil.calculateDiscountAmount(totalPrice, promotion?.discountPercentage ?? 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    </div>
                    <div className='border-t border-gray-100 my-4' />
                    <div className='flex justify-between'>
                        <p className='text-cyan-900 text-xl font-medium'>Total</p>
                        <p>{totalNetPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    </div>

                </div>
                <div className='flex flex-col'>
                    <RoundedButton disable={totalItems <= 0} onClick={handleCheckOut} label="Confirm order" rounded='rounded-full' textColor='text-white' color='bg-cyan-600/60' />
                </div>
            </div>

        </div>
        {
            isVoucherModelOpen && <VoucherSelectionModal onClose={() => setIsVoucherModelOpen(false)} onSelectPromotion={(promotion) => setPromotion(promotion)} />
        }
        {
            qrPaymentCode && <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>

                <div className='bg-white p-6 rounded-lg flex flex-col gap-y-4 '>
                    <div className='flex justify-between'>
                        <p className='text-2xl font-medium'>QR Code Payment</p>
                        <button onClick={() => setQrPaymentCode('')} className='text-red-500'>Close</button>
                    </div>
                    <div className='flex flex-col items-center gap-y-4'>

                        <QRCode className='w-32 h-32' value={qrPaymentCode} />
                    </div>
                    <div className=''>

                        <p className='text-center mt-4'>Scan the QR code above to complete your payment.</p>
                    </div>
                </div>

            </div>
        }
    </>
    );
};

export default CustomerCheckout;