import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { getSubCategoriesWithProduct } from '../../services/api/CategoryApi';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/Card/ProductCard';
import { Product } from '../../data/Entities/Product';
import { getProductsAndPromotionsBySubCategory } from '../../services/api/ProductApi';

interface CustomerCategoryProps { }

const CustomerCategory: React.FC<CustomerCategoryProps> = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [subCategories, setSubCategories] = React.useState<any[]>([]);
    const [selectedSubCategoryTab, setSelectedSubCategoryTab] = React.useState<number>(0);
    const [products, setProducts] = React.useState<Product[]>([]);

    const fetchSubCategoriesWithProducts = async (id: string) => {
        try {
            if (id) {
                const data = await getSubCategoriesWithProduct(id);
                setSubCategories(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchProductAndPromotionsBySubCategory = async (id: string) => {
        try {
            const data = await getProductsAndPromotionsBySubCategory(id);
            setProducts(data);
            console.log(products);
        } catch (error) {
            console.log(error);
        } 
    }

    const handleSelectSubCategory = async (index: number, id: string) => {
        setSelectedSubCategoryTab(index);
        fetchProductAndPromotionsBySubCategory(id);
    };

    useEffect(() => {
        console.log(id)
        if (id) {
            fetchSubCategoriesWithProducts(id);
        }
    }, [id]);

    useEffect(() => {
        if (subCategories.length > 0) {
            fetchProductAndPromotionsBySubCategory(subCategories[0]._id);
        }
    }, [subCategories]);

    return (
        <>
            {loading == false && <div className='flex flex-col gap-y-8 pt-4'>
                <Carousel showThumbs={false} dynamicHeight={false} swipeable={true}>
                    <div>
                        <img src="/src/assets/images/carousel/carousel02.jpg" className='rounded-lg' alt="Image 1" />
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
                        <img src="/src/assets/images/carousel/carousel01.jpg" alt="Image 1" />
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

                <div className='flex flex-col gap-y-8 px-8'>
                    <div className='flex gap-x-4'>
                        {subCategories.map((subCategory, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelectSubCategory(index, subCategory._id)}
                                className={`rounded-full  w-32 py-2 border font-semibold ${selectedSubCategoryTab == index ? 'bg-yellow-500/80 text-white' : 'text-gray-500 bg-white border-black/20'} `}>{subCategory.name}</button>
                        ))}
                    </div>

                    <div className='flex flex-col gap-y-4'>
                        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 gap-y-6'>
                            {products.map((product: Product) => (
                                <ProductCard key={product._id} product={product} onAddToCart={() => { }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default CustomerCategory;