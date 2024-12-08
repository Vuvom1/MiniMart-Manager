import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../data/Entities/Product';
import { getProductDetailsWithPromotion, getSimilarProductsWithPromotions } from '../../services/api/ProductApi';
import { CalculateUtil } from '../../utils/CalculateUtil';
import ProductCard from '../../components/Card/ProductCard';
import CountdownTimer from '../../components/TimeInterval/CountdownTimer';
import {CartContext} from '../../contexts/CartContext'; 

const CustomerProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product>();
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const {addToCart} = useContext(CartContext);

    const fetchProductDetail = async () => {
        try {
            if (id) {
                const data = await getProductDetailsWithPromotion(id);
                setProduct(data);
            } else {
                console.error('Product ID is undefined');
            }
        } catch (error) {
            console.log('Fetch product detail failed', error);
        }
    }

    const fetchSilimarProducts = async () => {
        try {
            if (product?.subCategory._id) {
                const data = await getSimilarProductsWithPromotions(product.subCategory._id);
                setSimilarProducts(data);
            } else {
                console.error('Product is undefined');
            }
        } catch (error) {
            console.log('Fetch similar products failed', error);
        }
    }

    useEffect(() => {
        fetchProductDetail();
    })

    useEffect(() => {
        fetchSilimarProducts();
    }, [product]);

    return (
        <> {
            product && (
                <div className='mt-10 flex flex-col h-full gap-y-4 text-cyan-900'>
                    <div className='flex gap-x-20'>
                        <div className='w-1/2'>

                            <img src={product.image} alt={product.name} className='w-full h-3/4 object-cover mx-auto rounded-lg' />

                        </div>
                        <div className='h-full w-1/2 gap-y-4 flex flex-col'>

                            {product.promotion &&
                                <div className='flex w-full items-center justify-between border p-4 rounded-lg'>
                                    <p className='text-xl'>{product.promotion.name}</p>
                                    <CountdownTimer endTime={new Date(product.promotion.endTime)} />
                                </div>

                            }

                            <div className='flex flex-col gap-y-2'>
                                <p className='text-xl text-gray-500'>{product.subCategory.name}</p>
                                <p className='text-3xl font-medium'>{product.name}</p>
                                <div className='flex gap-x-2 text-yellow-500 items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                    </svg>
                                    <p className='text-xl text-black'>5.0</p>


                                </div>
                                <p className='text-3xl font-medium'>${CalculateUtil.calculateDiscountPrice(product.price || 0, product.promotion?.discountPercentage ?? 0)}
                                    {product.promotion?.discountPercentage && <span className='line-through text-gray-500 ml-2'>${product.price}</span>}
                                </p>
                            </div>

                            <hr className='my-4' />
                            <div className='flex gap-x-4'>
                                <button className='bg-cyan-200/70 px-8 py-3 rounded-full flex gap-x-2 transform transition-transform duration-300 hover:scale-105'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                                    </svg>
                                    Add to Cart
                                </button>
                                <button className='bg-cyan-600/80 px-16 py-3 rounded-full flex gap-x-2 transform transition-transform duration-300 hover:scale-105'>
                                    Buy now
                                </button>
                            </div>
                            <div className='flex mt-2 gap-x-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                                <p className='underline cursor-pointer '>Add to Wishlist</p>

                            </div>
                            <div className='flex gap-x-2 font-medium'>
                                <p>BARCODE:</p>
                                <p>{product.barcode}</p>
                            </div>
                            <div>
                                <p className='text-gray-500'>{product?.description}</p>
                            </div>
                        </div>
                    </div>


                    <div className='flex flex-col gap-y-4'>
                        <p className='text-2xl'>Similar products</p>
                        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 gap-y-6'>
                            {similarProducts.map((product: Product) => (
                                <ProductCard key={product._id} product={product} onAddToCart={() => { }} />
                            ))}
                        </div>
                    </div>

                </div>
            )
        }
        </>

    );
};

export default CustomerProductDetail;
