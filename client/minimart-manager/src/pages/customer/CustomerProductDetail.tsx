import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../data/Entities/Product';
import { getProductDetailsWithPromotion, getSimilarProductsWithPromotions } from '../../services/api/ProductApi';
import { CalculateUtil } from '../../utils/CalculateUtil';
import ProductCard from '../../components/Card/ProductCard';
import CountdownTimer from '../../components/TimeInterval/CountdownTimer';
import { CartContext } from '../../contexts/CartContext';
import { StatusBadge } from '../../components/Badge/StatusBadge';
import { productStatusColorMapping } from '../../constant/mapping';
import CircleButton from '../../components/Button/CircleButton';
import { TimeUtil } from '../../utils/TimeUtil';

const CustomerProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product>();
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const timeUtil = new TimeUtil();
    const [currentTab, setCurrentTab] = useState(0);
    const cartContext = useContext(CartContext);
    const quantity = id ? cartContext?.itemQuantity(id) ?? 0 : 0;
    const {changeQuantity} = cartContext ?? {changeQuantity: () => {}};
    const {addToCart} = cartContext ?? {addToCart: () => {}};

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
                <div className='flex flex-col gap-y-4 bg-gray-100'>

                    <div className='flex flex-col gap-x-20 m-10 bg-white rounded-lg p-10'>
                        <p className='text-3xl font-medium'>{product.name}</p>

                        <div className='flex gap-x-4 items-center divide-x font-light'>
                            <div className='flex gap-x-2 text-yellow-500 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>
                                <p className='text-xl text-black'>5.0</p>


                            </div>
                            <div className='flex gap-x-2'>
                                <p className='text-gray-500'>BARCODE:</p>
                                <p className=''>{product.barcode}</p>
                            </div>
                        </div>
                        <div className='flex gap-x-10'>
                            <div className='w-2/5'>

                                <img src={product.image} alt={product.name} className='w-full h-3/4 object-cover mx-auto rounded-lg' />

                            </div>

                            <div className='h-full w-2/5 gap-y-4 flex flex-col'>

                                {product.promotion &&
                                    <div className='flex w-full items-center justify-between border p-4 rounded-lg'>
                                        <p className='text-xl'>{product.promotion.name}</p>
                                        <CountdownTimer endTime={new Date(product.promotion.endTime)} />
                                    </div>

                                }

                                <div className='flex flex-col gap-y-2'>
                                    <p className='text-3xl font-medium text-red-700'>${CalculateUtil.calculateDiscountPrice(product.price || 0, product.promotion?.discountPercentage ?? 0)}
                                        {product.promotion?.discountPercentage && <span className='line-through text-gray-500 ml-2'>${product.price}</span>}
                                    </p>
                                </div>

                                <StatusBadge value={product.status ?? 'defaultStatus'} mapping={productStatusColorMapping} />
                                <div className='flex gap-x-10'>
                                    {quantity > 0 && (
                                        <div className='flex gap-x-4 items-center text-gray-800'>
                                        <CircleButton
                                         onClick={() => product._id && changeQuantity(product._id, quantity - 1)}
                                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                        </svg>

                                        }/>
                                        <p className='text-2xl'>{quantity}</p>
                                        <CircleButton
                                         icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        } onClick={
                                            () => product._id && changeQuantity(product._id, quantity + 1)
                                        } />
                                    </div>
                                    )}
                                    
                                    <button 
                                    onClick={()=>addToCart(product)}
                                    className='bg-cyan-700/90 text-white px-12 py-3 rounded-full flex gap-x-2 transform transition-transform duration-300 hover:scale-105'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                                        </svg>
                                        Add to Cart
                                    </button>
                                </div>
                                <div className='flex mt-6 gap-x-2 border border-gray-600 text-gray-600 rounded-full w-fit px-6 py-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                    <p className='cursor-pointer '>Add to Wishlist</p>
                                </div>

                                {/* <div>
                                    <p className='text-gray-500'>{product?.description}</p>
                                </div> */}
                                <p>Day of Manufacture: {product.dateOfManufacture ? `${timeUtil.getDayMonthAndYear(new Date(product.dateOfManufacture)).day} ${timeUtil.getDayMonthAndYear(new Date(product.dateOfManufacture)).month} ${timeUtil.getDayMonthAndYear(new Date(product.dateOfManufacture)).year}` : 'N/A'}</p>
                                <p>Expire in: {product.expiryDate ? `${timeUtil.getDayMonthAndYear(new Date(product.expiryDate)).day} ${timeUtil.getDayMonthAndYear(new Date(product.expiryDate)).month} ${timeUtil.getDayMonthAndYear(new Date(product.expiryDate)).year}` : 'N/A'}</p>

                                <div className='border-t border-gray-300 my-4'></div>
                                <div className='flex gap-x-4'>
                                    <p className='text-gray-500'>Category:</p>
                                    <p className=''>{product?.subCategory.name}</p>
                                </div>
                            </div>

                            <div className='flex flex-col gap-y-2 w-1/5 rounded-lg bg-gray-300/50 p-6 h-fit'>
                                <div className='flex gap-x-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                    </svg>
                                    <p>Free Shipping apply to all orders over $100</p>
                                </div>
                                <div className='flex gap-x-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <p>1 Day Returns if you change your mind</p>
                                </div>



                            </div>


                        </div>





                    </div>

                    <div className='rounded-lg mx-10 bg-white'>
                        <ul
                            className="flex gap-x-2 -mb-px text-sm text-center max-w-full overflow-x-auto"
                            id="default-tab"
                            data-tabs-toggle="#default-tab-content"
                            role="tablist"
                        >
                            <li role="presentation">
                                <button
                                    onClick={() => {
                                        setCurrentTab(0);
                                    }}
                                    className={`inline-block text-xl  p-4 border-b-2 rounded-t-lg ${currentTab === 0 ? 'border-cyan-400 text-cyan-400' : ''
                                        }`}
                                >
                                    DESCRIPTION
                                </button>
                            </li>
                            <li role="presentation">
                                <button
                                    onClick={() => {
                                        setCurrentTab(1);
                                    }}
                                    className={`inline-block text-xl  p-4 border-b-2 rounded-t-lg ${currentTab === 1 ? 'border-cyan-400 text-cyan-400' : ''
                                        }`}
                                >
                                    REVIEW
                                </button>
                            </li>
                        </ul>
                        {currentTab === 0 ? (
                            <div className='m-10 text-lg'>
                                <p>{product.description}</p>
                            </div>
                        ) : (
                            <div className='m-10 text-lg'>
                                <p>{product.description}</p>
                            </div>
                        )}

                    </div>


                    <div className='flex flex-col m-10 gap-y-4'>
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
