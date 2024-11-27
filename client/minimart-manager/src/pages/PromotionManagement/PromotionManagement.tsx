
import { useEffect, useState } from "react";
import MetricCard from "../../components/Card/MetricCard";
import TableLayout from "../../components/Table/TableLayout";
import { promotionColumnData } from "../../data/ColumnData/PromotionColumnData";
import { Promotion } from "../../data/Entities/Promotion";
import { getAllPromotions } from "../../services/api/PromotionApi";
import { useNavigate } from "react-router-dom";

function PromotionManagement() {
    const navigate = useNavigate();
   const [promotions, setPromotions] = useState<Promotion[]>([]); 

   const fetchPromotions = async () => {
    try {
      const data = await getAllPromotions();

      setPromotions(data);
    } catch (error) {
      console.error('Error fetching imports:', error);
    }
  };

  useEffect(() => {
    fetchPromotions();
}, []);

    return <div className="flex flex-col gap-4 h-full">
        <div>
        <h1 className="text-2xl font-bold flex-auto text-gray-800">Promotions</h1>

        </div>
        <div className="flex gap-x-4 w-full">
            <MetricCard title="Total Promotions" value="0.00" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
            } isPositive={false} />

            <MetricCard title="Total Voucher Used" value="0.00" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
            } isPositive={false} />
            <MetricCard title="Total Voucher Used" value="0.00" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
            } isPositive={false} />
        </div>
        <div className="grow mb-4">
        <TableLayout 
        action={(id: string) => {navigate(`/promotions/${id}`)}}
        addItem={() => {navigate('/promotions/add')}} 
        title="Promotion List" 
        data={promotions} 
        columns={promotionColumnData} 
        height="100%" />

        </div>

    </div>
}

export default PromotionManagement;