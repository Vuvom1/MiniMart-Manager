import { useState, useEffect } from "react";
import { promotionTypeToDiscountTypeMapping } from "../../../constant/mapping";
import TextField from "../../../components/InputField/TextField";
import DatePicker from "../../../components/Picker/DatePicker";
import StatusPickerModal from "../../../components/Picker/StatusPicker";
import { DiscountType, PromotionStatus, PromotionType } from "../../../constant/enum";
import TypePicker from "../../../components/Picker/TypePicker";
import { promotionStatusColorMapping } from "../../../constant/mapping";
import ProductSelectionModal from "../../../components/Modal/ProductSelectionModal";
import RoundedButton from "../../../components/Button/RoundedButton";
import IncrementalField from "../../../components/InputField/IncrementalInput";
import MoneyField from "../../../components/InputField/MoneyField";
import NumberField from "../../../components/InputField/NumberField";
import { createPromotion } from "../../../services/api/PromotionApi";
import toast from "react-hot-toast";
import ErrorToast from "../../../components/Toast/ErrorToast";
import { TimeUtil } from "../../../utils/TimeUtil";
import SuccessToast from "../../../components/Toast/SuccessToast";
import { useNavigate } from "react-router-dom";
import Urls from "../../../constant/urls";
import { Promotion } from "../../../data/Entities/Promotion";

function AddPromotion() {
    const navigate = useNavigate();
    const timeUtil = new TimeUtil();
    const [isProductSelectionModalVisible, setIsProductSelectionModalVisible] = useState(false);
    const [giftSelectionModalVisible, setGiftSelectionModalVisible] = useState(false);
    const [promotion, setPromotion] = useState<Promotion>({
        name: "",
        code: "",
        type: PromotionType.PRODUCT_BASED,
        discountType: DiscountType.PERCENTAGE,
        discountPercentage: 0,
        startTime: new Date(),
        endTime: new Date(),
        description: "",
        applicableProducts: [],
        maxUsage: 0,
        status: PromotionStatus.ACTIVE,
        maxDiscountAmount: 0,
    });
    
    
    const [availableDiscountTypes, setAvailableDiscountTypes] = useState<DiscountType[]>(promotionTypeToDiscountTypeMapping[promotion?.type]);

    const handleAddPromotion = async () => {
        console.log(promotion.applicableProducts);
        try {
            if (promotion === undefined) {
                alert("Please fill in all required fields");
            }

            const response = await createPromotion(promotion);

            toast.custom((t) => (
                <SuccessToast
                    message={response}
                    onDismiss={() => toast.dismiss(t.id)}
                />))
            navigate(Urls.ADMIN.PROMOTIONS.BASE.Path);    
        } catch (error: any) {
            toast.custom((t) => (
                <ErrorToast
                    message={error}
                    onDismiss={() => toast.dismiss(t.id)}
                />))
        }   
    }

    const handleChangePromotionData = (key: keyof Promotion, value: any) => {  
        setPromotion((prevPromotion) => ({
            ...prevPromotion,
            [key]: value,
        }));
    }  

    return <>
        <div className="flex flex-col gap-y-4 h-full">
            <div>
                <h1 className="text-2xl font-bold flex-auto text-gray-800">Add New Promotions</h1>
            </div>
            <div className="flex gap-4 h-full w-full mb-4">
                <div className="flex flex-col gap-y-6 p-4 bg-white w-1/2 rounded-lg">
                    <div>
                        <h1 className="text-xl font-bold flex-auto text-gray-800">Basic Information</h1>
                    </div>
                    <div className="flex gap-x-6 px-4">
                        <TextField value={promotion.name} onChange={(e)=>handleChangePromotionData("name", e.target.value)} label="Name" placeholder="Promotion name..." />
                        <TextField value={promotion.code} onChange={(e)=>handleChangePromotionData("code", e.target.value)} label="Code" placeholder="Promotion code..." />
                    </div>
                    <div className="flex gap-x-6 px-4 items-center">
                        <p className="w-[20%] text-sm font-medium leading-6 text-gray-900">Start Time</p>
                        <DatePicker value={promotion.startTime} onChange={(value)=>handleChangePromotionData("startTime", value)} width="25%" />
                        {/* <TimeField value={startTime ? startTime.toTimeString().slice(0, 5) : undefined}  onChange={(e) => } width="23%" /> */}
                    </div>
                    <div className="flex gap-x-6 px-4 items-center">
                        <p className="w-[20%] text-sm font-medium leading-6 text-gray-900">End Time</p>
                        <DatePicker value={promotion.endTime} onChange={(value)=>handleChangePromotionData("endTime", value)} width="25%" />
                        {/* <TimeField value={endTime ? endTime.toTimeString().slice(0, 5) : undefined} onChange={(e) => endTime && setEndTime(timeUtil.updateTime(endTime, e.target.value))} width="23%" /> */}
                    </div>
                    <div className="flex gap-x-6 px-4 items-center">
                        <p className="w-[20%] text-sm font-medium leading-6 text-gray-900">Status</p>
                        <StatusPickerModal
                            onSelect={(value) => handleChangePromotionData("status", value)}
                            statusEnum={PromotionStatus}
                            colorMapping={promotionStatusColorMapping}
                        />
                    </div>
                    <div className="flex gap-x-6 px-4 items-center">
                        <p className="w-[20%] text-sm font-medium leading-6 text-gray-900">Max usage</p>
                        <IncrementalField onQuantityChange={(value)=>handleChangePromotionData("maxUsage", value)} />
                    </div>
                    <div className="flex gap-x-6 px-4 items-center">
                        <TextField multiline={true} rows={5} onChange={(e) => handleChangePromotionData("description", e)} label="Description" height="200px" placeholder="Promotion description (Optional)" />
                    </div>
                </div>
                <div className="flex flex-col gap-y-6 p-4 bg-white w-1/2 rounded-lg">
                    <div>
                        <h1 className="text-xl font-bold flex-auto text-gray-800">Promotion Detail</h1>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <h1 className="text-sm font-semibold text-gray-800">Promotion Type</h1>
                        <ul className="flex overflow-x-auto max-w-full cursor-grab">
                            {Object.values(PromotionType).map((type) => (
                                <li key={type} className="mr-1">
                                    <button
                                        onClick={() => handleChangePromotionData("type", type)}
                                        className={`inline-block px-2 py-2 border-2 rounded-lg text-nowrap ${promotion.type === type ? 'border-cyan-400 text-cyan-400' : 'border-transparent'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <TypePicker
                        label="Discount type"
                        value={promotion.discountType}
                        onChange={(value) => handleChangePromotionData("discountType", value)}
                        options={availableDiscountTypes.map(type => ({ label: type, value: type }))}
                    />
                    <div className="flex flex-col grow gap-y-6">
                        {
                            promotion.discountType === DiscountType.PERCENTAGE &&
                            (<>
                                <div className="flex gap-x-4 items-center">
                                    <p className="text-sm font-semibold text-gray-800 w-[30%]">Discount percentage</p>
                                    <NumberField value={promotion.discountPercentage} onChange={(value) => handleChangePromotionData("discountPercentage", value)} width="30%" suffixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                    } />
                                </div>
                                <div className="flex gap-x-4 items-center">
                                    <p className="text-sm font-semibold text-gray-800 w-[30%]">Maximum discount amount</p>
                                    <MoneyField value={promotion.maxDiscountAmount} onChange={(value) => handleChangePromotionData("maxDiscountAmount", value)} suffixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.745 3A23.933 23.933 0 0 0 3 12c0 3.183.62 6.22 1.745 9M19.5 3c.967 2.78 1.5 5.817 1.5 9s-.533 6.22-1.5 9M8.25 8.885l1.444-.89a.75.75 0 0 1 1.105.402l2.402 7.206a.75.75 0 0 0 1.104.401l1.445-.889m-8.25.75.213.09a1.687 1.687 0 0 0 2.062-.617l4.45-6.676a1.688 1.688 0 0 1 2.062-.618l.213.09" />
                                    </svg>
                                    } width="30%" />
                                </div>
                            </>

                            )
                        }
                        {/* {
                            promotion.discountType === DiscountType.GET_MORE &&
                            (
                                <>
                                    <div className="flex gap-x-4 items-center">
                                        <p className="text-sm font-semibold text-gray-800 w-[30%]">Require quantity</p>
                                        <IncrementalField onQuantityChange={(value) => handleAddPromotion(""))} />
                                    </div>
                                    <div className="flex gap-x-4 items-center">
                                        <p className="text-sm font-semibold text-gray-800 w-[30%]">Reward quantity</p>
                                        <IncrementalField onQuantityChange={(value) => setRewardQuantity(Number(value))} />
                                    </div>

                                </>
                            )
                        } */}
                        {/* {
                            discountType === DiscountType.FREE_GIFT &&
                            (
                                <>
                                    <div className="flex gap-x-4 items-center">
                                        <p className="text-sm font-semibold text-gray-800 w-[30%]">Require quantity</p>
                                        <IncrementalField onQuantityChange={(value) => setRequireQuantity(Number(value))} />
                                    </div>
                                    <div className="flex gap-x-4 items-center">
                                        <p className="text-sm font-semibold text-gray-800 w-[30%]">Gift</p>
                                        <RoundedButton label={`${gifts.length == 0 ? 'Select gifts' : (gifts.length + ' gifts selected')}`} onClick={() => setGiftSelectionModalVisible(true)} />
                                    </div>
                                </>
                            )
                        } */}
                        {promotion.type === PromotionType.PRODUCT_BASED && (
                            <div className="flex gap-x-4 items-center">
                                <p className="text-sm font-semibold text-gray-800 w-[30%]">Applicable products</p>
                                <RoundedButton label={`${promotion.applicableProducts?.length == 0 ? 'Select products' : (promotion.applicableProducts?.length + ' products selected')}`} onClick={() => setIsProductSelectionModalVisible(true)} />
                            </div>
                        )}
                        {/* {promotion. === PromotionType.ORDER_BASED && (
                            <div className="flex gap-x-4">
                                <p className="text-sm font-semibold text-gray-800 w-[30%]">Minimum order amount</p>
                                <MoneyField value={requireOrderAmount}  onChange={(e)=>setRequireOrderAmount(Number(e.target.value))} width="30%" />
                            </div>
                        )}
                        {selectedPromotionType === PromotionType.CUSTOMER_BASED && (
                            <div className="flex gap-x-4 items-center">
                                <p className="text-sm font-semibold text-gray-800 w-[30%]">Minimum customer point</p>
                                <NumberField
                                    value={requireCustomerPoint}
                                    onChange={(value: number) => setRequireCustomerPoint(value)}
                                    width="30%"
                                />
                            </div>
                        )}
                        {
                            selectedPromotionType === PromotionType.ONLINE && (
                                <div className="flex gap-x-4">
                                    <p className="text-sm font-semibold text-gray-800 w-[30%]">Maximum discount amount</p>
                                    <MoneyField value={maxDiscountAmount} onChange={(e) => setMaxDiscountAmount(Number(e.target.value))} width="30%" />
                                </div>
                            )
                        } */}
                    </div>
                    <div className="flex justify-center">
                        <RoundedButton width="30%" label="Save" onClick={()=> handleAddPromotion()}/>
                    </div>
                </div>
            </div>
        </div>
        {isProductSelectionModalVisible && (
            <ProductSelectionModal
                selectedProducts={promotion.applicableProducts || []}
                onSelectProducts={(products) => handleChangePromotionData("applicableProducts", products)}
                onClose={() => setIsProductSelectionModalVisible(false)}
            />
        )}
        {giftSelectionModalVisible && (
            <ProductSelectionModal
                selectedProducts={promotion.giftItem || []}
                onSelectProducts={(products) => {
                   handleChangePromotionData("giftItem", products);
                }}
                onClose={() => setGiftSelectionModalVisible(false)}
            />
        )}
    </>
}

export default AddPromotion;
