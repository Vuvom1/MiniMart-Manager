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
import { Product } from "../../data/Entities/Product";
import { Import } from "../../data/Entities/Import";
import DraggableFloatComponent from "../../components/Dragable/DragableComponent";
import ProductScannerComponent from "../../components/Scanner/ProductScanner";
import ValidationUtil from "../../utils/ValidationUtil";
import { ImportDetail } from "../../data/Entities/ImportDetail";
import { ImportFormData } from "../../data/FormData/ImportFormData";


function AddImport() {
    const navigate = useNavigate();
    const [importDetails, setImportDetails] = useState<ImportDetail[]>([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true)
    const [supplierOptions, setSupplierOptions] = useState([])

    const [selectedSupplierId, setSelectedSupplierId] = useState<string>("");
    const [invoiceNumber, setInvoiceNumber] = useState<string>("");
    const [deliveryMan, setDeliveryMan] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isScannerOpened, setIsScannerOpened] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false);

    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (error) {
            toast.custom((t) => (
                <CustomErrorToast
                    message="Error fetching products"
                    onDismiss={() => toast.dismiss(t.id)}
                />))
        }
        finally {
            setLoading(false);
        }
    };

    const fetchSuppliers = async () => {
        try {
            const data = await getAllSuppliers();

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
        const newTotalQuantity = importDetails.reduce((acc, product) => acc + product.quantity, 0);
        const newTotalPrice = importDetails.reduce((acc, product) => acc + product.importPrice * product.quantity, 0);
        setTotalQuantity(newTotalQuantity);
        setTotalPrice(newTotalPrice);
    }, [importDetails]);

    const handleTotalQuantityChange = (id?: string, quantity?: number) => {
        if (id !== undefined && quantity !== undefined) 
            setImportDetails(prev => {
                const updatedDetails = prev.map(detail =>
                    detail.product.id === id ? { ...detail, quantity } : detail
                );

                return updatedDetails.filter(product => product.quantity > 0);
            });
    };


    const handleAddDetail = (product: Product) => {
        setImportDetails((prev) => {
            const exists = prev.some((p) => p.product.id === product.id);
            console.log(importDetails)
            if (exists) return prev;

            return [...prev, { product, quantity: 1, importPrice: 0 }];
        });
    }

    const handleProductScanned = (product: Product) => {
        handleAddDetail(product);
        toast.custom((t) => (
            <SuccessToast
                message="Product added by barcode!"
                onDismiss={() => toast.dismiss(t.id)}
            />
        ));
    };

    const handleTotalPriceChange = (id?: string, totalPrice?: number) => {
        if (id && totalPrice)
            setImportDetails(prev =>
                prev.map(detail =>
                    detail.product.id === id ? { ...detail, totalImportPrice: totalPrice } : detail
                )
            );
    };

    const handlePriceChange = (addedProduct?: Product, importPrice?: number) => {
        
        if (addedProduct && importPrice !== undefined) {

            setImportDetails(prevDetails =>
                prevDetails.map(detail => 
                    detail.product.id === addedProduct.id 
                    ? { ...detail, importPrice, totalImportPrice: importPrice * detail.quantity } 
                    : detail
                )
            );
        }

        console.log(importDetails)
    };
    

    const handleSaveImport = async () => {
        const userData = localStorage.getItem('user');
        let staffId = null;

        if (userData) {
            const user = JSON.parse(userData);
            staffId = user._id;
        }

        if (importDetails.length == 0) {
            toast.custom((t) => (
                <CustomErrorToast
                    message="Please add products to current import!"
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
            return;
        }


        const importData: ImportFormData = {
            supplier: selectedSupplierId,
            invoiceNumber,
            deliveryMan,
            description,
            staff: staffId,
            status: ImportStatus.PENDING,
            importDetails: importDetails.map(detail => ({
                ...detail,
                product: detail.product?.id || '', 
            }))
        
        };

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
            navigate('/supplies/imports');
        }
    };

    const handleValidationChange = (isValid: boolean) => {
        setIsValidForm(isValid);
    };

    return (
        <>
            <h1 className="text-2xl font-bold flex-auto text-gray-800 mb-8">
                New Import
            </h1>
            <div className="h-[calc(100vh-180px)] w-full flex gap-x-4">
                <div className="shadow-lg bg-white p-4 flex flex-col gap-4 w-1/2 rounded-lg">
                    <h2 className="text-lg font-medium">Basic Information</h2>
                    <SelectField
                        label="Supplier"
                        placeholder="Choose supplier..."
                        options={supplierOptions}
                        onChange={value => {
                            setSelectedSupplierId(value ? value.value : '');
                        }} />
                    <TextField
                        validationPassed={handleValidationChange}
                        validations={[ValidationUtil.validateRequired("Invoice number")]}
                        value={invoiceNumber}
                        label="Invoice number" placeholder="Enter invoice number..."
                        onChange={(e) => setInvoiceNumber(e.target.value)} />
                    <TextField
                        value={deliveryMan}
                        validations={[ValidationUtil.validateRequired("Delivery man")]}
                        label="Delivery man" placeholder="Enter delivery man name..."
                        onChange={(e) => setDeliveryMan(e.target.value)} />
                    <TextField
                        value={description}
                        label="Description" placeholder="Enter import description"
                        height="150px"
                        onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className="shadow-lg bg-white p-4 flex flex-col gap-y-4 w-2/3 rounded-lg divide-y">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-medium">Products Information</h2>
                        <div className="flex gap-4">
                            <RoundedButton
                                label={isScannerOpened ? "Close Scanner" : "Open Scanner"}
                                color="hover:bg-cyan-400"
                                onClick={() => setIsScannerOpened(!isScannerOpened)}

                            />
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
                        {importDetails.map(detail => (
                            <ImportProductHorizontalCard
                                key={detail.product.id}
                                product={detail.product}
                                onPriceChange={(price) => handlePriceChange(detail.product, price)}
                                onTotalQuantityChange={(quantity) => handleTotalQuantityChange(detail.product.id, quantity)}
                                onTotalPriceChange={(totalPrice) => handleTotalPriceChange(detail.product.id, totalPrice)}
                            />
                        ))}
                        {importDetails.length == 0 && <p className="text-center">There is no product</p>}
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
                            <RoundedButton disable={!isValidForm} label="Save" onClick={handleSaveImport} />
                        </div>
                    </div>
                </div>
            </div>
            {
                isScannerOpened && <DraggableFloatComponent
                    width="400px"
                    height="350px"
                    defaultPosition={{ x: 100, y: -500 }}
                >
                    {
                        products.length > 0 ? (
                            <ProductScannerComponent
                                products={products}
                                onProductScanned={handleProductScanned}
                                width={400}
                                height={300}
                            />
                        ) : (
                            <div>No products available for scanning!</div>
                        )
                    }
                </DraggableFloatComponent>
            }

            {showModal && (
                <ProductSelectionModal
                    products={products}
                    onSelectProduct={handleAddDetail}
                    onClose={() => setShowModal(false)}
                />
            )}

        </>
    );
}

export default AddImport;
