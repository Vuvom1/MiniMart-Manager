
import { useEffect, useState } from "react";
import MetricCard from "../../../components/Card/MetricCard";
import TableLayout from "../../../components/Table/TableLayout";
import { promotionColumnData } from "../../../data/ColumnData/PromotionColumnData";
import { Promotion } from "../../../data/Entities/Promotion";
import { getAllPromotions, getPromotionStatistics } from "../../../services/api/PromotionApi";
import { useNavigate } from "react-router-dom";
import { Period } from "../../../constant/enum";
import ComboBox from "../../../components/ComboBox";
import RoundedButton from "../../../components/Button/RoundedButton";
import Urls from "../../../constant/urls";

function PromotionManagement() {
    const navigate = useNavigate();
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [statistic, setStatistic] = useState<any>();
    const [period, setPeriod] = useState<Period>(Period.YEARLY);

    const fetchPromotions = async () => {
        try {
            const data = await getAllPromotions();
            const statisticData = await getPromotionStatistics();


            setPromotions(data);
            setStatistic(statisticData);

        } catch (error) {
            console.error('Error fetching imports:', error);
        }
    };

    useEffect(() => {
        fetchPromotions();
    }, []);
    const handleSelect = (option: any) => {
        setPeriod(option);
    }

    return <div className="flex flex-col gap-4 h-full">
        <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Promotion Control</h1>
            <div className="flex gap-x-4">
                <ComboBox
                    prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                    </svg>
                    }
                    options={[Period.YEARLY, Period.MONTHLY, Period.DAILY]}
                    placeholder="Choose a period..."
                    onSelect={handleSelect}
                />
                <RoundedButton suffixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
</svg>
} label="Export" color="text-white bg-cyan-500" />
            </div>
        </div>
        {/* <div className="flex gap-x-4 w-full">
            <MetricCard title="Total Promotions" period={period == Period.DAILY ? "day" : (period == Period.MONTHLY ? "month" : "year")}
                value={period == Period.DAILY ? (statistic?.statisticByDate.todayPromotions) : (period == Period.MONTHLY ? statistic?.statisticByMonth.thisMonthPromotions : statistic?.statisticByYear.thisYearPromotions)} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
                } isPositive={false} />

            <MetricCard title="Total Voucher Used" value={"0.00"} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
            } isPositive={false} />
        </div> */}
        <div className="grow mb-4">
            <TableLayout
                action={(id: string) => { navigate(`${id}`) }}
                addItem={() => { navigate(Urls.ADMIN.PROMOTIONS.ADD.Path) }}
                title="Promotion List"
                data={promotions}
                columns={promotionColumnData} />

        </div>

    </div>
}

export default PromotionManagement;