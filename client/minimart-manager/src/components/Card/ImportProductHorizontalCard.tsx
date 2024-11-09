import React, { useState, useEffect } from 'react';
import IncrementalInput from '../InputField/IncrementalInput';
import MoneyField from '../InputField/MoneyField';
import { Product } from '../../data/Entities/ProductData';

interface ImportProductHorizontalCardProps {
    product: Product;
    showImage?: Boolean;
    initialPrice?: string,
    initialQuantity?: number,
    onDeleteClick?: () => void;
    onTotalQuantityChange: (quantity: number) => void;
    onTotalPriceChange: (price: number) => void;
    onPriceChange: (price: number) => void;
}

const ImportProductHorizontalCard: React.FC<ImportProductHorizontalCardProps> = ({
    product,
    showImage = false,
    initialPrice = '',
    initialQuantity = 1,
    onTotalQuantityChange,
    onTotalPriceChange,
    onPriceChange,
}) => {
    const [importPrice, setImportPrice] = useState(initialPrice);
    const [totalPrice, setTotalPrice] = useState(initialQuantity *  parseFloat(initialPrice.replace(/[^0-9.]/g, '')));
    const [totalQuantity, setTotalQuantity] = useState(initialQuantity);

    useEffect(() => {
        calculateTotalPrice(totalQuantity, importPrice);
    }, [totalQuantity, importPrice]);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 0) {
            setTotalQuantity(value);
            onTotalQuantityChange(value);
        }
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setImportPrice(value);
    };

    

    const calculateTotalPrice = (quantity: number, price: string) => {
        const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
        const newTotalPrice = numericPrice ? quantity * numericPrice : 0;
        onPriceChange(numericPrice)
        onTotalPriceChange(newTotalPrice);
        setTotalPrice(newTotalPrice)
    };

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
                        Enter import price:
                    </label>
                    <div className='flex gap-x-1'>
                        <MoneyField
                            height='25px'
                            initialValue={initialPrice}
                            value={importPrice}
                            onChange={handlePriceChange}
                            placeholder="$0.00"
                        />
                        <p>/product</p>
                    </div>
                </div>


                <div className='flex gap-x-7'>
                    <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium">
                        Choose quantity:
                    </label>
                    <IncrementalInput initialValue={initialQuantity} onQuantityChange={handleQuantityChange} />
                </div>

            </div>
        </div>
    );
};

export default ImportProductHorizontalCard;
