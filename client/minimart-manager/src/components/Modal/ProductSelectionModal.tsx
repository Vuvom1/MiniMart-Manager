import React, { useEffect, useState } from 'react';
import TextField from '../InputField/TextField';
import useSearch from '../../utils/SearchUtil';
import { Product } from '../../data/Entities/Product';
import RoundedButton from '../Button/RoundedButton';
import { ProductByCategory } from '../../data/Entities/ProductByCategories';
import { getAllProductByCategories } from '../../services/api/ProductApi';
import toast from 'react-hot-toast';
import ErrorToast from '../Toast/ErrorToast';

interface ProductSelectionModalProps {
    categoryWithProducts: ProductByCategory[];
    selectedProducts: Product[];
    onSelectProducts: (products: Product[]) => void; // Accept multiple products
    onClose: () => void;
}

const ProductSelectionModal: React.FC<ProductSelectionModalProps> = ({
    selectedProducts = [],
    onSelectProducts,
    onClose,
}) => {
    const [categoryWithProducts, setCategoryWithProducts] = useState<ProductByCategory[]>([])
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [currentProducts, setCurrentProducts] = useState<Product[]>(allProducts);
    const { searchTerm, handleSearchChange, filteredData } = useSearch(currentProducts || []);
    const [currentTab, setCurrentTab] = useState(0);
    const [localSelectedProducts, setLocalSelectedProducts] = useState<Product[]>([...selectedProducts]);
    const [loading, setLoading] = useState(false);

    const isSelected = (product: Product) =>
        localSelectedProducts.some((selected) => selected._id === product._id);

    const toggleProductSelection = (product: Product) => {
        if (isSelected(product)) {
            setLocalSelectedProducts((prev) =>
                prev.filter((selected) => selected._id !== product._id)
            );
        } else {
            setLocalSelectedProducts((prev) => [...prev, product]);
        }
    };

    

    const fetchProducts = async () => {
        try {
            const categoryWithProducts = await getAllProductByCategories();

            setCategoryWithProducts(categoryWithProducts);
        } catch (error) {
            toast.custom((t) => (
                <ErrorToast
                    message="Error fetching products"
                    onDismiss={() => toast.dismiss(t.id)}
                />))
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        setAllProducts(categoryWithProducts.flatMap((category: ProductByCategory) => category.products))
    }, [categoryWithProducts]);

    const handleSave = () => {
        onSelectProducts(localSelectedProducts); 
        onClose(); 
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col bg-white rounded-lg p-4 max-w-lg min-h-[80%] min-w-[80%] w-full">
                <h2 className="text-lg font-medium mb-4">Select Products</h2>
                <TextField
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Search for product..."
                    prefix={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>
                    }
                />
                <div className="mb-4 border-b border-gray-200">
                    <ul
                        className="flex gap-x-2 -mb-px text-sm text-center max-w-full overflow-x-auto"
                        id="default-tab"
                        data-tabs-toggle="#default-tab-content"
                        role="tablist"
                    >
                        <li role="presentation">
                            <button
                                onClick={() => {
                                    setCurrentProducts(allProducts);
                                    setCurrentTab(0);
                                }}
                                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                    currentTab === 0 ? 'border-cyan-400 text-cyan-400' : ''
                                }`}
                            >
                                All
                            </button>
                        </li>
                        {categoryWithProducts.map((category, index) => (
                            <li key={category.name} role="presentation">
                                <button
                                    onClick={() => {
                                        setCurrentProducts(category.products);
                                        setCurrentTab(index + 1);
                                    }}
                                    className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                        currentTab === index + 1 ? 'border-cyan-400 text-cyan-400' : ''
                                    }`}
                                >
                                    {category.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="grid grid-cols-3 gap-2 grow w-full overflow-y-auto">
                    {filteredData.map((product) => (
                        <div
                            key={product._id}
                            className={`flex h-fit gap-x-8 items-center justify-between rounded-md py-2 px-6 border cursor-pointer ${
                                isSelected(product)
                                    ? 'bg-green-50 border-green-400'
                                    : 'hover:bg-gray-200 border-gray-400'
                            }`}
                            onClick={() => toggleProductSelection(product)}
                        >
                            <div>
                                <h3 className="font-normal text-ellipsis">{product.name}</h3>
                                <p className="font-light">{product.barcode}</p>
                            </div>
                            {product.image && product.image.startsWith('data:image/') ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                            ) : (
                                <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-md">
                                    <span className="text-gray-500 text-sm">No Image</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-4 gap-2">
                    <RoundedButton label="Cancel" onClick={onClose} />
                    <RoundedButton color='bg-cyan-500 text-white' label="Save" onClick={handleSave} />
                </div>
            </div>
        </div>
    );
};

export default ProductSelectionModal;
