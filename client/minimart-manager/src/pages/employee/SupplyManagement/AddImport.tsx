import { useEffect, useState } from "react";
import RoundedButton from "../../../components/Button/RoundedButton";
import ImportProductHorizontalCard from "../../../components/Card/ImportProductHorizontalCard";
import SelectField from "../../../components/InputField/SelectField";
import TextField from "../../../components/InputField/TextField";
import ProductSelectionModal from "../../../components/Modal/ProductSelectionModal";
import { getAllSuppliers } from "../../../services/api/SupplierApi";
import { addImport } from "../../../services/api/ImportApi";
import toast from "react-hot-toast";
import SuccessToast from "../../../components/Toast/SuccessToast";
import CustomErrorToast from "../../../components/Toast/ErrorToast";
import { ImportStatus, SupplierStatus } from "../../../constant/enum";
import { useNavigate } from "react-router-dom";
import DraggableFloatComponent from "../../../components/Dragable/DragableComponent";
import ProductScannerComponent from "../../../components/Scanner/ProductScanner";
import ValidationUtil from "../../../utils/ValidationUtil";
import StatusPickerPopover from "../../../components/Picker/StatusPicker";
import { importStatusColorMapping } from "../../../constant/mapping";
import Urls from "../../../constant/urls";
import { entityImport, Import } from "../../../data/Entities/Import";
import { Product } from "../../../data/Entities/Product";
import { useAuth } from "../../../providers/AuthProvider";
import { ImportDetail } from "../../../data/Entities/ImportDetail";


function AddImport() {
    const auth = useAuth();
    const user = auth?.user;
    const navigate = useNavigate();
    const [importData, setImportData] = useState<Import>(entityImport);
    const [loading, setLoading] = useState(true);
    const [supplierOptions, setSupplierOptions] = useState<any[]>([]);
    const [isScannerOpened, setIsScannerOpened] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false);


    const fetchSuppliers = async () => {
        try {
            const data = await getAllSuppliers();

            const activeSuppliers = data.filter((supplier: any) => supplier.status === SupplierStatus.ACTIVE);

            const newSupplierOptions = activeSuppliers.map((supplier: any) => ({
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
        fetchSuppliers();
    }, []);


    const handleSaveImport = async () => {
        try {
            setImportData({
                ...importData,
                staff: user?._id || '',
            });

            const message = await addImport(importData);

            toast.custom((t) => (
                <SuccessToast
                    message={message}
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
            navigate(Urls.ADMIN.SUPPLIES.IMPORTS.BASE.Path);
        } catch (error: any) {
            toast.custom((t) => (
                <CustomErrorToast
                    message={error || 'Add import failed'}
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
        } finally {
            setLoading(false);
            
        }
    };

    const handleValidationChange = (isValid: boolean) => {
        setIsValidForm(isValid);
    };

    const handleAddDetail = (selectedProducts: Product[]) => {
        const updatedImportDetails = selectedProducts.map(product => ({
            product,
            quantity: 1, 
            importPrice: 0,
        }));

        setImportData({
            ...importData,
            importDetails: updatedImportDetails,
            totalQuantity: updatedImportDetails.reduce((sum, detail) => sum + detail.quantity, 0),
            totalImportPrice: updatedImportDetails.reduce((sum, detail) => sum + detail.importPrice * detail.quantity, 0),
        });
    };

    function handleProductScanned(product: Product): void {
        handleAddDetail([product]);
    }

    const handleUpdateDetail = (updatedDetail: ImportDetail) => {
        const updatedDetails = importData.importDetails.map(detail => {
            if (detail.product._id === updatedDetail.product._id) {
                return updatedDetail;
            }

            return detail;
        });

        setImportData({
            ...importData,
            importDetails: updatedDetails,
            totalQuantity: updatedDetails.reduce((sum, detail) => sum + detail.quantity, 0),
            totalImportPrice: updatedDetails.reduce((sum, detail) => sum + detail.importPrice * detail.quantity, 0),    
        });
    }

    return (
        <>
            <h1 className="text-2xl font-bold flex-auto text-gray-800 mb-8">
                Add new import
            </h1>
            <div className="h-[calc(100vh-180px)] w-full flex gap-x-4">
                <div className="shadow-lg bg-white p-4 flex flex-col gap-6 w-1/2 rounded-lg">
                    <h2 className="text-lg font-medium">Basic Information</h2>
                    <div className="flex gap-x-4 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                        </svg>

                        <SelectField
                            placeholder="Choose supplier..."
                            options={supplierOptions}
                            onChange={(selectedOption) => {
                                setImportData({
                                    ...importData,
                                    supplier: supplierOptions.find(option => option.value === selectedOption?.value).value || null,
                                }); 
                            }} />
                    </div>
                    <div className="flex gap-x-4 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>  <TextField
                            validationPassed={handleValidationChange}
                            validations={[ValidationUtil.validateRequired("Invoice number")]}
                            value={importData.invoiceNumber}
                            placeholder="Enter invoice number..."
                            onChange={(e) => setImportData({ ...importData, invoiceNumber: e.target.value })} />

                    </div>
                    <div className="flex gap-x-4 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>

                        <TextField
                            value={importData.deliveryMan}
                            validations={[ValidationUtil.validateRequired("Delivery man")]}
                            placeholder="Enter delivery man name..."
                            onChange={(e)=>setImportData(
                                {
                                    ...importData,
                                    deliveryMan: e.target.value
                                }
                            )} />
                    </div>
                    <div className="flex items-center gap-x-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                        </svg>
                        <StatusPickerPopover statusEnum={ImportStatus} colorMapping={importStatusColorMapping} onSelect={
                            (status) => setImportData({
                                ...importData,
                                status: status
                            })
                        } />

                    </div>
                    <div className="flex gap-x-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                        </svg>
                        <TextField
                            multiline={true}
                            value={importData.description}
                            placeholder="Enter import description"
                            height="150px"
                            onChange={(e) => setImportData({ ...importData, description: e.target.value })}
                            />
                    </div>
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
                        {importData.importDetails.map(detail => (
                            <ImportProductHorizontalCard
                                showImage={true}
                                key={detail.product._id}
                                importDetail={detail}
                                onPriceChange={(newPrice) => handleUpdateDetail({ ...detail, importPrice: newPrice })}
                                onQuantityChange={(newQuantity) => handleUpdateDetail({ ...detail, quantity: newQuantity })}    
                            />
                        ))}
                        {importData.importDetails.length == 0 && <p className="text-center text-gray-400">There is no product, please add products for adding new import!</p>}
                    </div>

                    <div className="flex flex-col px-8 mt-4">
                        <div className="flex justify-between mt-4">
                            <p className="text-gray-600">Total product quantity:</p>
                            <p className="font-medium">{importData.totalQuantity}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-600">Total import price:</p>
                            <p className="font-medium">
                                ${importData.totalImportPrice?.toFixed(2) || '0.00'}
                            </p>
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

                    <ProductScannerComponent

                        onProductScanned={handleProductScanned}
                        width={400}
                        height={300}
                    />


                </DraggableFloatComponent>
            }

            {showModal && (
                <ProductSelectionModal
                    selectedProducts={importData.importDetails.map((detail) => detail.product)}
                    onSelectProducts={handleAddDetail}
                    onClose={() => setShowModal(false)}
                />
            )}

        </>
    );
}

export default AddImport;