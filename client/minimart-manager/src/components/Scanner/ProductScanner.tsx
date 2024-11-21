import React, { useEffect, useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { Product } from '../../data/Entities/Product'; // Adjust the import path as necessary
import toast from 'react-hot-toast';
import CustomErrorToast from '../Toast/ErrorToast';
import { getAllProducts } from '../../services/api/ProductApi';

interface ProductScannerComponentProps {
    onProductScanned: (product: Product) => void;
    width?: number;
    height?: number;
}

const ProductScannerComponent: React.FC<ProductScannerComponentProps> = ({ onProductScanned, width = 400, height = 300 }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isScanningEnabled, setIsScanningEnabled] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const handleScan = (barcode: string) => {
        if (!isScanningEnabled || isLoading) return;

        const product = products.find((p) => p.barcode === barcode.toString());
        if (product) {
            onProductScanned(product);

            setIsScanningEnabled(false);

            setTimeout(() => {
                setIsScanningEnabled(true);
            }, 3000);
        } else {
            toast.custom((t) => (
                <CustomErrorToast
                    message="Product not found with the barcode!"
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
        }
    };

    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (error) {
            toast.custom((t) => (
                <CustomErrorToast
                    message={`Error fetching products:', ${error}`}
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
        } finally {
            setIsLoading(false); 
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            {isLoading ? (
                <div>Loading products...</div>
            ) : (
                <BarcodeScannerComponent
                    width={width}
                    height={height}
                    onUpdate={(err, result) => {
                        if (result) {
                            handleScan(result.getText());
                        }
                    }}
                />
            )}
        </>
    );
};

export default ProductScannerComponent;
