import React, { useState, useEffect } from 'react';
import IncrementalInput from '../InputField/IncrementalInput';
import MoneyField from '../InputField/MoneyField';
import { Product } from '../../data/Entities/Product';
import FormatUtil from '../../utils/FormatUttil';

interface UneditableImportProductHorizontalCardProps {
    product: Product;
    showImage?: Boolean;
    price?: string,
    quantity?: number,
}

const UneditableImportProductHorizontalCard: React.FC<UneditableImportProductHorizontalCardProps> = ({
    product,
    showImage= false,
    price = '',
    quantity = 0,
}) => {

    return (
        <div className="border rounded-lg gap-x-4 p-4 flex">
            {showImage && <div className='h-full flex justify-center'>
                <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-md" />
            </div>}

            <div className='flex flex-col flex-1'>
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p>{product.barcode}</p>
            </div>

            <div className='flex flex-col justify-between gap-y-4'>
                <div className='flex gap-x-4 justify-between'>
                <label htmlFor="quantity-input" className="block text-sm font-medium mb-2">
                       Import price:
                    </label>
                    <div className='flex gap-x-1'>
                        <p>{FormatUtil.moneyFormat(price)}</p>
                        <p>/product</p>
                    </div>
                </div>
             
                    
           <div className='flex gap-x-7'> 
           <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium">
                Quantity:
            </label>
            <p>{quantity}</p>
           </div>
              
            </div>
        </div>
    );
}; 

export default  UneditableImportProductHorizontalCard;
