import React from 'react';
import IncrementalField from '../InputField/IncrementalInput.tsx';
import { CartItem } from '../../data/Entities/CartItem.tsx';

interface CheckoutItemProps {
    cartItem: CartItem;
    onRemove?: (id: string) => void;
    onChangeQuantity?: (id: string, quantity: number) => void;
}

export const CheckoutItemCard: React.FC<CheckoutItemProps> = ({ cartItem, onChangeQuantity, onRemove }) => {
    return (
        <li key={cartItem.product._id} className="flex py-6 w-full">
            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img alt={cartItem.product.image} src={cartItem.product.image} className="size-full object-cover" />
            </div>

            <div className="ml-4 flex flex-1 flex-col w-full">
            <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>
                    <a href={"#"}>{cartItem.product.name}</a>
                </h3>
                <p className="ml-4">${cartItem.product.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{cartItem.product.subCategory.name}</p>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
                <div className="flex gap-x-2">
                <IncrementalField initialValue={cartItem.quantity} onQuantityChange={(value) => { onChangeQuantity && cartItem.product._id && onChangeQuantity(cartItem.product._id, value) }} />
                </div>

                <div className="flex">
                <button onClick={() => onRemove && cartItem.product._id && onRemove(cartItem.product._id)} type="button" className="font-medium text-cyan-600 hover:text-cyan-500">
                    Remove
                </button>
                </div>
            </div>
            </div>
        </li>
    );
};
