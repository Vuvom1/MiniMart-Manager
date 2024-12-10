import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ProductCard from '../../components/Card/ProductCard';
import { Product } from '../../data/Entities/Product';
import { getPopularProducts, getTop10DiscountProducts } from '../../services/api/ProductApi';

const Home: React.FC = () => {
    const [popularProducts, setPopularProducts] = React.useState<Product[]>([]);
    const [top10DiscountProducts, setTop10DiscountProducts] = React.useState<Product[]>([]);

    const fetchPopularProducts = async () => {
        try {
            const popularProductsData = await getPopularProducts();


            setPopularProducts(popularProductsData);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchTop10DiscountProducts = async () => {
        try {

            const top10DiscountProductsData = await getTop10DiscountProducts();

            setTop10DiscountProducts(top10DiscountProductsData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPopularProducts();
        fetchTop10DiscountProducts();
    }, []);

    return (
        <div className='flex flex-col gap-y-8 pt-4 text-cyan-900'>
            <Carousel showThumbs={false} dynamicHeight={false} swipeable={true}>
                <div>
                    <img src="src/assets/images/carousel/carousel02.jpg" className='rounded-lg' alt="Image 1" />
                    <div className='absolute inset-0 flex items-center justify-end pr-[5%] w-1/2'>
                        <div className='flex flex-col'>
                            <p className='text-white text-6xl font-semibold uppercase'>
                                You want fresh groceries?
                            </p>
                            <p className='text-white text-3xl'>
                                We got you covered!
                            </p>
                        </div>

                    </div>
                </div>
                <div className='w-full h-28'>
                    <img src="src/assets/images/carousel/carousel01.jpg" alt="Image 1" />
                    <div className='absolute inset-0 flex items-center justify-end pr-[5%]'>
                        <div className='flex flex-col items-end w-1/2'>
                            <p className='text-white text-6xl font-semibold uppercase text-right'>
                                Fresh and Quality Products?
                            </p>
                            <p className='text-white text-3xl text-right'>
                                Enjoy shopping with us!
                            </p>
                        </div>

                    </div>

                </div>

            </Carousel>

            <div className='flex flex-col gap-y-8'>
                <div className='flex flex-col gap-y-4'>
                    <p className='text-3xl'>Top trending</p>
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 gap-y-6'>
                        {popularProducts.map((product) => (
                            <ProductCard key={product._id} product={product} onAddToCart={() => { }} />
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <p className='text-3xl'>On Sale</p>
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 gap-y-6'>
                        {top10DiscountProducts.map((product) => (
                            <ProductCard product={product} onAddToCart={() => { }} />
                        ))}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Home;