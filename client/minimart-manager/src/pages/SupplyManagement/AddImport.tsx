import { useEffect, useState } from "react";
import RoundedButton from "../../components/Button/RoundedButton";
import ImportProductHorizontalCard from "../../components/Card/ImportProductHorizontalCard";
import SelectField from "../../components/InputField/SelectField";
import TextField from "../../components/InputField/TextField";
import ProductSelectionModal from "../../components/Modal/ProductSelectionModal";
import { getAllProducts } from "../../services/api/ProductApi";
import { getAllSuppliers } from "../../services/api/SupplierApi";
import { addImport } from "../../services/api/ImportApi";
import toast from "react-hot-toast";
import SuccessToast from "../../components/Toast/SuccessToast";
import CustomErrorToast from "../../components/Toast/ErrorToast";
import { ImportStatus } from "../../constant/enum";
import { useNavigate } from "react-router-dom";

interface Product {
    _id: string;
    name: string;
    price: number;
    barcode: string;
    stock: number;
    detail: string;
    imageUrl: string;
}

interface ImportData {
    supplier: string;
    invoiceNumber: string;
    deliveryMan: string;
    description?: string; 
    staff: string; 
    totalQuantity: number;
    totalImportPrice: number;
    status: ImportStatus;
    importDetails: { 
        product: string;
        quantity: number;
        importPrice: number;
        totalImportPrice: number;
    }[];
}

function AddImport() {
    const navigate = useNavigate();
    const [importProducts, setImportProducts] = useState<
        (Product & { quantity: number; importPrice: number, totalImportPrice: number })[]
    >([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState();
    const [suppliers, setSuppliers] = useState();
    const [loading, setLoading] = useState(true)
    const [supplierOptions, setSupplierOptions] = useState([])

    const [selectedSupplierId, setSelectedSupplierId] = useState<string>("");
    const [invoiceNumber, setInvoiceNumber] = useState<string>("");
    const [deliveryMan, setDeliveryMan] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);

        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSuppliers = async () => {
        try {
            const data = await getAllSuppliers();

            setSuppliers(data);

            const newSupplierOptions = data.map((supplier: any) => ({
                value: supplier._id,
                label: supplier.name,
            }));

            setSupplierOptions(newSupplierOptions);

        } catch (error) {
            console.error('Error fetching suppliers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchSuppliers();
    }, []);

    useEffect(() => {
        const newTotalQuantity = importProducts.reduce((acc, product) => acc + product.quantity, 0);
        const newTotalPrice = importProducts.reduce((acc, product) => acc + product.totalImportPrice, 0);
        setTotalQuantity(newTotalQuantity);
        setTotalPrice(newTotalPrice);
    }, [importProducts]);

    const handleTotalQuantityChange = (id: string, quantity: number) => {
        setImportProducts(prev =>
            prev.map(product =>
                product._id === id ? { ...product, quantity } : product
            )
        );
    };

    const handleSelectProduct = (product: any) => {
        setImportProducts(prev => [...prev, { ...product, quantity: 1, totalImportPrice: product.price }]);
        console.log(importProducts)
    }

    const handleTotalPriceChange = (id: string, totalPrice: number) => {
        setImportProducts(prev =>
            prev.map(product =>
                product._id === id ? { ...product, totalImportPrice: totalPrice } : product
            )
        );
    };

    const handlePriceChange = (id: string, price: number) => {
        setImportProducts(prev =>
            prev.map(product =>
                product._id === id ? { ...product, importPrice: price } : product
            )
        );
    }

    const handleSaveImport = async () => {
        const userData = localStorage.getItem('user');
        let staffId = null;

        if (userData) {
            const user = JSON.parse(userData);
            staffId = user._id;
        }


        const importData: ImportData = {
            supplier: selectedSupplierId,
            invoiceNumber,
            deliveryMan,
            description,
            staff: staffId,
            totalQuantity: totalQuantity,
            totalImportPrice: totalPrice,
            status: ImportStatus.PENDING,
            importDetails: importProducts.map(product => ({
                product: product._id,
                quantity: product.quantity,
                importPrice: product.importPrice,
                totalImportPrice: product.totalImportPrice,
            })),
        };

        navigate('/supplies/imports');

        try {
            await addImport(importData);

            toast.custom((t) => (
                <SuccessToast
                    message="Add import success!"
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));

            
        } catch (error) {
            toast.custom((t) => (
                <CustomErrorToast
                    message="Error adding new import!"
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-2xl font-bold flex-auto text-gray-800 mb-8">
                New Import
            </h1>
            <div className="h-[calc(100vh-180px)] w-full flex gap-x-4">
                <div className="shadow-lg bg-white p-4 flex flex-col gap-4 w-1/2 rounded-lg">
                    <h2 className="text-lg font-medium">Basic Information</h2>
                    <SelectField label="Supplier" placeholder="Choose supplier..." options={supplierOptions} onChange={value => {
                        setSelectedSupplierId(value ? value.value : '');
                    }} />
                    <TextField label="Invoice number" placeholder="Enter invoice number..." onChange={(e) => setInvoiceNumber(e.target.value)} />
                    <TextField label="Delivery man" placeholder="Enter delivery man name..." onChange={(e) => setDeliveryMan(e.target.value)} />
                    <TextField label="Description" placeholder="Enter import description" height="150px" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="shadow-lg bg-white p-4 flex flex-col gap-y-4 w-2/3 rounded-lg divide-y">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-medium">Products Information</h2>
                        <div>
                            <RoundedButton
                                label="Add products"
                                color="hover:bg-cyan-400"
                                onClick={() => setShowModal(true)}
                                suffixIcon={
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                                    </svg>
                                }
                            />
                        </div>
                    </div>

                    <div className="flex flex-col flex-auto gap-y-2 overflow-y-auto max-h-full py-4">
                        {importProducts.map(product => (
                            <ImportProductHorizontalCard
                                key={product._id}
                                product={product}
                                onPriceChange={(price) => handlePriceChange(product._id, price)}
                                onTotalQuantityChange={(quantity) => handleTotalQuantityChange(product._id, quantity)}
                                onTotalPriceChange={(totalPrice) => handleTotalPriceChange(product._id, totalPrice)}
                            />
                        ))}
                    </div>

                    <div className="flex flex-col px-8 mt-4">
                        <div className="flex justify-between mt-4">
                            <p>Total products:</p>
                            <p className="font-medium">{totalQuantity}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Total import price:</p>
                            <p className="font-medium">${totalPrice.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="flex gap-y-2 justify-end py-4">
                        <div className="w-20">
                            <RoundedButton label="Save" onClick={handleSaveImport} />
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <ProductSelectionModal
                    products={products}
                    onSelectProduct={handleSelectProduct}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}

export default AddImport;
