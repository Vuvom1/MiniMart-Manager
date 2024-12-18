import React, { useEffect, useState } from 'react';
import TextField from '../InputField/TextField';
import { LoadingScreen } from '../Loading/LoadingScreen';
import { Promotion } from '../../data/Entities/Promotion';
import useSearch from '../../utils/SearchUtil';
import { getUsablePromotionsByUserId } from '../../services/api/PromotionApi';
import { useAuth } from '../../providers/AuthProvider';
import { DiscountType } from '../../constant/enum';
import { TimeUtil } from '../../utils/TimeUtil';

interface VoucherSelectionModalProps {
    onSelectPromotion: (promotion: Promotion) => void;
    onClose: () => void;
}

const VoucherSelectionModal: React.FC<VoucherSelectionModalProps> = ({
    onSelectPromotion,
    onClose,
}) => {
    const timeUtil = new TimeUtil();
    const auth = useAuth();
    const userId = auth?.user?._id;
    const [loading, setLoading] = useState(false);
    const [promotions, setPromotions] = useState<Promotion[]>([]);

    const { searchTerm, handleSearchChange, filteredData } = useSearch(promotions);

    const fetchPromotions = async () => {
        setLoading(true);
        try {
            const data = await getUsablePromotionsByUserId(userId!);
            setPromotions(data);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleSelectPromotion = (promotion: Promotion) => {
        onSelectPromotion(promotion);
        onClose();
    }

    useEffect(() => {
        fetchPromotions();
    }, []);

    return (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col bg-white rounded-lg p-4 max-w-lg min-h-[80%] min-w-[80%] w-full">
                <h2 className="text-lg font-medium mb-4">Select Products</h2>
                {loading ? <div className='flex items-center grow'>
                    <LoadingScreen />
                </div> : (
                    <>
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

                        <div className="grid grid-cols-2 gap-2 grow w-full overflow-y-auto content-start mt-4">
                            {filteredData.map((promotion) => (
                                <div
                                 className="container mx-auto">
                                    <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white text-center py-10 px-20 rounded-lg shadow-md relative">
                                        
                                        <h3 className="text-2xl font-semibold mb-4">{promotion.name}</h3>
                                        <div className="flex items-center space-x-2 mb-6 justify-center">
                                            <span id="cpnCode" className="border-dashed border text-white px-4 py-2 rounded-l">{promotion.code}</span>
                                            <span onClick={() => handleSelectPromotion(promotion)} id="cpnBtn" className="border border-white bg-white text-cyan-600 px-4 py-2 rounded-r cursor-pointer">Apply Code</span>
                                        </div>
                                        <p className="text-sm">Valid Til: {timeUtil.convertToDayMonthYearShort(promotion.startDate)}, {promotion.endTime}</p>

                                        <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
                                        <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>

                                    </div>
                                </div>

                            ))}
                        </div></>
                )}
            </div>
        </div>
    );
};

export default VoucherSelectionModal;
