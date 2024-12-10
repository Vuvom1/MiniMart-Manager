import React from 'react';
import RadioGroup from '../../components/Radio/RadioGroup';
import RoundedButton from '../../components/Button/RoundedButton';
import { CartContext } from '../../contexts/CartContext';
import { CheckoutItemCard } from '../../components/Card/CheckoutItemCard';
import {useState, useEffect} from 'react';
import {PaymentMethod} from '../../constant/enum';


// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const CustomerCheckout: React.FC = () => {
    const paymentOptions = [
        { label: 'Cash on delivery', value: PaymentMethod.CASH },
        { label: 'Online Payment', value: PaymentMethod.ONLINE },
    ];
    const [paymentMethod, setPaymentMethod] = React.useState('cash');
    const { cartItems, totalPrice, totalItems, changeQuantity, removeFromCart } = React.useContext(CartContext);
    const {deliveryFee, setDeliveryFee} = useState(2);
    const {couponDiscount, setCoupondiscount} = useState(0);
    const [totalNetPrice, setTotalNetPrice] = useState(0);

    const calculateTotalNetPrice = () => {
        setTotalNetPrice(totalPrice + deliveryFee - couponDiscount);
    }

    useEffect(() => {
        calculateTotalNetPrice();
    }, [totalPrice, deliveryFee, couponDiscount]);
    

    return (
        <div className='flex py-10 text-cyan-900 gap-x-6'>
            <div className=' flex flex-col w-1/2 gap-y-4'>
                <div className='rounded-lg flex p-6 gap-y-6 flex-col shadow-md'>
                    <p className='text-2xl font-medium'>Delivery information</p>
                    <div className='flex gap-x-4'>
                        <div className='h-40 w-40'>
    
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-xl'>Deliver to</p>
                            <p className='font-light text-gray-800'>Phone number</p>
                            <p className='font-light text-gray-800'>Address</p>
                        </div>
                    </div>
                </div>

                <div className='rounded-lg flex p-6 gap-y-6 flex-col shadow-md'>
                    <p className='text-2xl font-medium'>Review items</p>
                    <div className='flex flex-col h-96 overflow-y-scroll'>
                        {cartItems.map((cartItem) => (
                            <CheckoutItemCard key={cartItem.id} cartItem={cartItem} onChangeQuantity={(id, quantity) => changeQuantity(id, quantity)} onRemove={(id) => removeFromCart(id)} />
                        ))}
                    </div>

                </div>

            </div>

            <div className='flex flex-col p-6 gap-y-6 rounded-lg shadow-md w-1/2'>
                <p className='text-2xl font-medium'>Order summary</p>
                <div className='flex flex-col'>
                    <RadioGroup selectedValue={paymentMethod} options={paymentOptions} onChange={(value) => setPaymentMethod(value)} />
                </div>
                <div className='border-t border-gray-100 my-10' />
                        <div class="flex w-full items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-cyan-500">
                            <input type="text" name="price" id="price" class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" placeholder="Enter promotion code"/>
                            <RoundedButton label='Apply'/>
                        </div>
                <div className='border-t border-gray-100 my-4' />
                <div className='flex flex-col gap-y-2 grow'>
                    <div className='flex justify-between'>
                        <p className='text-gray-500'>Subtotal</p>
                        <p className='text-cyan-900 font-medium'>${totalPrice}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-gray-500'>Delivery fee</p>
                        <p className='text-cyan-900 font-medium'>${deliveryFee}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-gray-500'>Coupon discount</p>
                        <p className='text-cyan-900 font-medium'>${couponDiscount}</p>
                    </div>
                    {/* <div className='flex justify-between'>
                        <p className='text-gray-500'>Taxes</p>
                        <p className='text-cyan-900 font-medium'>$100</p>
                    </div> */}
                    <div className='border-t border-gray-100 my-4' />
                    <div className='flex justify-between'>
                        <p className='text-cyan-900 text-xl font-medium'>Total</p>
                        <p className='text-cyan-900 text-xl font-medium'>{totalNetPrice}</p>
                    </div>

                </div>
                <div className='flex flex-col'>
                    <RoundedButton label="Confirm order" rounded='rounded-full' textColor='text-white' color='bg-cyan-600/60' />
                </div>
            </div>

        </div>
    );
};

export default CustomerCheckout;