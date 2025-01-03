import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext.tsx';
import {CartItemCard} from '../Card/CartItemCard.jsx';
import { useAuth } from '../../providers/AuthProvider.tsx';
import Urls from '../../constant/urls.tsx';

interface CartDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function CartDialog({ open, onClose }: CartDialogProps) {
    const cartContext = useContext(CartContext);
    if (!cartContext) {
        return null;
    }
    const { cartItems, totalPrice, totalItems, changeQuantity, removeFromCart } = cartContext;
    const navigate = useNavigate();
    const auth = useAuth();
    const user = auth?.user;

    const handelNavigateCheckout = () => { 
        if (totalItems == 0) {
            alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
            return;
        }
        if (user != null ) {
            navigate(Urls.CUSTOMER.CHECKOUT.Path)
        } else {
            navigate(Urls.CUSTOMER.LOGIN.Path)
        }
    }

    return (
        <Dialog open={open} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                            <div className="flex h-full flex-col  bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                            >
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon aria-hidden="true" className="size-6" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flow-root overflow-y-scroll h-full">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {cartItems.map((cartItem) => (
                                                   <CartItemCard key={cartItem.product._id} cartItem={cartItem} onChangeQuantity={(id, quantity) => changeQuantity(id, quantity)} onRemove={(id) => removeFromCart(id)} id={0}/>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>{totalPrice}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                    <div className="mt-6 w-full">
                                        <button

                                            onClick={() => {handelNavigateCheckout(), onClose()}}
                                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-cyan-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-cyan-700"
                                        >
                                            {user != null ? 'Checkout' : 'Login to Checkout'}
                                        </button>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <p>
                                            or{' '}
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="font-medium text-cyan-600 hover:text-cyan-500"
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
