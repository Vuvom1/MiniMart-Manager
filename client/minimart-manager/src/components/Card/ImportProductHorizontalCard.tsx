import React, { useState, useEffect } from 'react';
import IncrementalInput from '../InputField/IncrementalInput';
import MoneyField from '../InputField/MoneyField';
import { ImportDetail } from '../../data/Entities/ImportDetail';

interface ImportProductHorizontalCardProps {
    importDetail: ImportDetail;
    showImage?: Boolean;
    initialQuantity?: number,
    onPriceChange?: (newPrice: number) => void;
    onQuantityChange?: (newQuantity: number) => void;
    onDeleteClick?: () => void;
}

const ImportProductHorizontalCard: React.FC<ImportProductHorizontalCardProps> = ({
    importDetail,
    showImage = false,
    onPriceChange,
    onQuantityChange,
    onDeleteClick,
}) => {

    const handlePriceChange = (newPrice: number) => {
        onPriceChange?.(newPrice);
        importDetail.importPrice = newPrice;
    };

    const handleQuantityChange = (newQuantity: number) => {
        onQuantityChange?.(newQuantity);
        importDetail.quantity = newQuantity;
    };

    return (
        <div className="border rounded-lg gap-x-4 p-4 flex">
            {showImage && <div className='h-full flex justify-center'>
                <img src={importDetail.product.image} alt={importDetail.product.name} className="w-24 h-24 object-cover rounded-md" />
            </div>}

            <div className='flex flex-col flex-1'>
                <h2 className="text-xl font-bold">{importDetail.product.name}</h2>
                <p>{importDetail.product.barcode}</p>
            </div>

            <div className='flex flex-col justify-between gap-y-4'>
                <div className='flex gap-x-4 justify-between'>
                    <label htmlFor="quantity-input" className="block text-sm font-medium mb-2">
                        Enter import price:
                    </label>
                    <div className='flex gap-x-1'>
                        <MoneyField
                            height='25px'
                            value={importDetail.importPrice}
                            onChange={handlePriceChange}
                            placeholder="0.00 VND"
                        />
                        <p>/product</p>
                    </div>
                </div>

                <div className='flex gap-x-7'>
                    <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium">
                        Choose quantity:
                    </label>
                    <IncrementalInput initialValue={importDetail.quantity} onQuantityChange={handleQuantityChange} />
                </div>
            </div>
        </div>
    );
};

export default ImportProductHorizontalCard;
