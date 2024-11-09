import React, { useEffect, useState } from 'react';
import ImportProductHorizontalCard from "../../components/Card/ImportProductHorizontalCard";
import TextField from "../../components/InputField/TextField";
import { Import } from '../../data/Entities/ImportData';
import RoundedButton from '../../components/Button/RoundedButton';
import FormatUtil from '../../utils/FormatUttil';
import UneditableImportProductHorizontalCard from '../../components/Card/UneditableImportProductCard';
import EditableInfo from '../../components/Info/EditableInfo';
import {ImportDetail} from '../../data/Entities/ImportDetailData';
import toast from 'react-hot-toast';
import CustomErrorToast from '../../components/Toast/ErrorToast';
import { updateImport } from '../../services/api/ImportApi';
import SuccessToast from '../../components/Toast/SuccessToast';

interface ImportDetailProps {
    importData: Import;
}

const ImportDetailComponent: React.FC<ImportDetailProps> = ({ importData }) => {
    const [editable, setEditable] = useState(false);
    const [updatedData, setUpdatedData] = useState<Import>(importData);
    const [importDetails, setImportDetails] = useState<ImportDetail[]>(importData.importDetails);
    const [totalQuantity, setTotalQuantity] = useState(importData.totalQuantity);
    const [totalImportPrice, setTotalImportPrice] = useState(importData.totalImportPrice);

    const handleDeliveryManChange = (newValue: string) => {
        setUpdatedData((prev) => ({
            ...prev,
            deliveryMan: newValue, 
        }));
    };

    const handleDescriptionChange = (newValue: string) => {
        setUpdatedData((prev) => ({
            ...prev,
            description: newValue, 
        }));
    };

    const handleQuantityChange = (id?: string, quantity?: number) => {
        if (id !== undefined && quantity !== undefined)
            setImportDetails(prev => {
                const updatedDetails = prev.map(detail =>
                    detail.id === id ? { ...detail, quantity } : detail
                );
                
                return updatedDetails.filter(detail=> detail.quantity > 0);
            });
    };


    const handlePriceChange = (updatedDetail: ImportDetail, importPrice?: number) => {
        if (updatedDetail && importPrice) {
            setImportDetails((prevImportDetails) => {
                const existingDetailIndex = prevImportDetails.findIndex(
                    (detail) => detail.id === updatedDetail.id
                );
    
                if (existingDetailIndex !== -1) {
                    const updatedDetails = [...prevImportDetails];
                    updatedDetails[existingDetailIndex].importPrice = importPrice;
                    return updatedDetails;
                } else {
                    return [...prevImportDetails, { ...updatedDetail, importPrice }];
                }
            });
        }
            
    }

    const handleTotalPriceChange = (id?: string, totalPrice?: number) => {
        if (id && totalPrice != undefined)
            setImportDetails(prev =>
                prev.map(detail =>
                    detail.id === id ? { ...detail, totalImportPrice: totalPrice } : detail
                )
            );
    };

    const handleUpdateData = async() => {
        if (importDetails.length == 0) {
            toast.custom((t) => (
                <CustomErrorToast
                    message="product list cannot be empty!"
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
            return;
        }

        if (importData.id == undefined) {
            toast.custom((t) => (
                <CustomErrorToast
                    message="Import can be found!"
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
            return;
        }

        const updatedImportData: Import = {
            ...updatedData,
            importDetails,
            totalQuantity,
            totalImportPrice,
        };

        try {
            const response =  await updateImport(importData.id ,updatedImportData);

            setEditable(false);
    
            toast.custom((t) => (
                <SuccessToast
                    message={response}
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
        } catch (error) {
            toast.custom((t) => (
                <CustomErrorToast
                    message="Failed to update import data."
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
        }


    }

    const handelCancel = () => {
        setUpdatedData({ ...importData });
        setImportDetails(importData.importDetails);
        setTotalQuantity(importData.totalQuantity);
        setTotalImportPrice(importData.totalImportPrice);
        setEditable(false);
    }

    useEffect(() => {
        const newTotalQuantity = importDetails.reduce((acc, detail) => acc + detail.quantity, 0);
        const newTotalPrice = importDetails.reduce((acc, detail) => acc + detail.importPrice * detail.quantity, 0);
        setTotalQuantity(newTotalQuantity);
        setTotalImportPrice(newTotalPrice);
    }, [importDetails]);

    if (!importData) return null;

    return (
        <div className="shadow-lg bg-white p-4 max-h-full flex flex-col gap-y-2 w-1/2 rounded-lg">
            <div className="flex flex-col justify-between">

                <div className='flex justify-between'>
                    <h2 className="text-lg font-medium">Import Detail</h2>
                    {editable ? <>
                    <div className='flex gap-x-2'>
                    <RoundedButton onClick={handelCancel} label='Cancel' />
                    <RoundedButton onClick={handleUpdateData} label='Save' />
                    </div>
                        
                    </> : <>
                    <RoundedButton onClick={() => setEditable(!editable)} label='Edit'/>
                    </>}
                    
                </div>


                <div className="flex gap-x-3">
                    <button
                        className="ml-2 p-1 border w-6 h-6 rounded hover:bg-gray-300"

                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                            />
                        </svg>
                    </button>
                    <h3 className="text-slate-500">{importData.id}</h3>
                </div>
                <div className='flex gap-x-2'>
                    <h3 className='font-semi-bold'>Delivered by:</h3>
                    <h3>
                        <EditableInfo editable={editable} initialValue={importData.deliveryMan} onValueChange={handleDeliveryManChange} />
                    </h3>
                </div>
            </div>

            <div className="flex-col gap-y-2 max-h-full divide-y">
                <div className="flex flex-col flex-auto gap-y-2 h-full max-h-80 overflow-y-auto py-4">
                    {editable ? importDetails.map((importDetail, detailIndex) => (
                        <ImportProductHorizontalCard
                            key={detailIndex}
                            initialQuantity={importDetail.quantity}
                            initialPrice={FormatUtil.moneyFormat(importDetail.importPrice.toString())}
                            product={importDetail.product}
                            onTotalQuantityChange={(quantity) => handleQuantityChange(importDetail.id, quantity)}
                            onTotalPriceChange={(totalPrice) => handleTotalPriceChange(importDetail.id, totalPrice)}
                            onPriceChange={(importPrice) => handlePriceChange(importDetail, importPrice)}
                        />
                    )) : importData.importDetails.map((importDetail, detailIndex) => (
                        <UneditableImportProductHorizontalCard
                            key={detailIndex}
                            quantity={importDetail.quantity}
                            price={FormatUtil.moneyFormat(importDetail.importPrice.toString())}
                            product={importDetail.product}
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
                        <p className="font-medium">{totalImportPrice}</p>
                    </div>
                </div>

                <div>
                    <p className='font-semibold'>Descripttion</p>
                    {editable ? <TextField
                        onChange={(e) =>handleDescriptionChange(e.target.value)}
                        initialValue={importData.description}
                        value={updatedData.description}
                        height="80px"
                    /> : <div className='flex flex-col'>
                            
                            <p>{updatedData.description}</p>
                        </div>}
                    
                </div>
            </div>
        </div>
    );
};

export default ImportDetailComponent;
