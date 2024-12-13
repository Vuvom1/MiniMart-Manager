import React from 'react';
import { Product } from '../../data/Entities/Product';
import { useNavigate } from 'react-router-dom';
import { CalculateUtil } from '../../utils/CalculateUtil';
import { CartContext } from '../../contexts/CartContext';
import { useContext } from 'react'
import CircleButton from '../Button/CircleButton';


interface ProductCardProps {
    product: Product;
    onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    const navigate = useNavigate();
    const cartContext = useContext(CartContext);
    const { addToCart, itemQuantity, changeQuantity } = cartContext ?? {};
    const quantity = product._id ? cartContext?.itemQuantity(product._id) ?? 0 : 0;

    const onNavigateToProductDetail = (productId: string) => () => {
        navigate(`/minimartonline/product/${productId}`);
    }

    const handleAddToCart = () => {
        if (addToCart) {
            addToCart(product);
        }
        onAddToCart();
    };

    return (
        <div
            onClick={product._id ? onNavigateToProductDetail(product._id) : undefined}
            className="relative group max-w-sm bg-white overflow-hidden p-4 rounded-lg transform transition-transform duration-300 hover:scale-110">
            <div key={product._id} className='flex flex-col text-start gap-y-1 text-cyan-900'>
                <div className="relative rounded-lg">
                    <img src={product.image} alt={product.name} className='w-60 h-48 object-cover mx-auto rounded-lg' />
                    {(product.promotion?.discountPercentage ?? 0) > 0 && <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg rounded-tl-lg">{product.promotion?.discountPercentage}% OFF</span>}
                </div>
                <p className='text-gray-500'>{product.subCategory.name}</p>
                <p className='text-xl font-semibold line-clamp-2'>{product.name}</p>

                <p className='text-lg font-semibold text-yellow-500'>
                    ${CalculateUtil.calculateDiscountPrice(product.price || 0, product.promotion?.discountPercentage ?? 0)}
                    {product.promotion?.discountPercentage && <span className='line-through text-gray-500 ml-2'>${product.price}</span>}
                </p>

                <div className='flex gap-x-2 justify-between' onClick={(e) => e.stopPropagation()}>
                    {product._id && itemQuantity && itemQuantity(product._id) > 0 ? (<div className='flex gap-x-4 items-center text-gray-800'>
                                        <CircleButton
                                        size='30px'
                                         onClick={() => product._id && changeQuantity && changeQuantity(product._id, quantity - 1)}
                                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                        </svg>

                                        }/>
                                        <p className='text-2xl'>{quantity}</p>
                                        <CircleButton
                                        size='30px'
                                         icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        } onClick={
                                            () => product._id && changeQuantity && changeQuantity(product._id, quantity + 1)
                                        } />
                                    </div>) : (
                        <button
                            onClick={() => {handleAddToCart(); }}
                            className="bottom-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            Add to Cart
                        </button>
                    )}

                    <button
                        onClick={(e) => { e.stopPropagation(); console.log('Add to Wishlist'); }}
                        className="mt-2 bg-blue-500 text-black bg-transparent border px-4 py-2 rounded-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>

                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProductCard;
