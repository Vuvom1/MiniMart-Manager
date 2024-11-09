import React, { useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { Product } from '../../data/Entities/ProductData'; // Adjust the import path as necessary
import toast from 'react-hot-toast';
import CustomErrorToast from '../Toast/ErrorToast';

interface ProductScannerComponentProps {
    products: Product[];
    onProductScanned: (product: Product) => void;
    width?: number;
    height?: number;
}

const ProductScannerComponent: React.FC<ProductScannerComponentProps> = ({ products, onProductScanned, width = 400, height = 300 }) => {
    const [isScanningEnabled, setIsScanningEnabled] = useState(true);

    const handleScan = (barcode: string) => {
        if (!isScanningEnabled) return;

        const product = products.find((p) => p.barcode === barcode);
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
                />))
        }
    };
    

    return (

        <BarcodeScannerComponent
            width={width}
            height={height}
            onUpdate={(err, result) => {
                if (result) {
                    handleScan(result.getText());
                }
            }}
        />

    );
};

export default ProductScannerComponent;
