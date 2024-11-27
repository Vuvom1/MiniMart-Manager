import RoundedButton from "../../components/Button/RoundedButton";
import MetricCard from "../../components/Card/MetricCard";
import ComboBox from "../../components/ComboBox";
import RankingCard from "../../components/Card/RankingCard";
import { CustomerColumnData } from "../../data/ColumnData/CustomerColumnData";
import { getAllCustomers, getCustomerStatistic, updateCustomerStatus } from "../../services/api/CustomerApi";
import { useState, useEffect } from "react";
import { Customer } from "../../data/Entities/Customer";
import { CustomerStatistic } from "../../data/StatisticData/CustomerStatistic";
import { CustomerStatus, Period } from "../../constant/enum";
import LineChartCard from "../../components/Card/LineChartCard";
import CollapsedRowTable from "../../components/Table/CollapsedRowTable";
import toast from "react-hot-toast";
import SuccessToast from "../../components/Toast/SuccessToast";
import CustomErrorToast from "../../components/Toast/ErrorToast";


function CustomerManagement() {
  const [period, setPeriod] = useState<Period>(Period.YEARLY);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerStatistic, setCustomerStatistic] = useState<CustomerStatistic | null>(null);
  const [totalCustomersBarChartData, setTotalCustomersBarChartData] = useState<any>();

  function handleSelectPeriod(option: any) {
    setPeriod(option);
  }

  const handleLineChartData = () => {
    
    const periods = Period.DAILY == period ? customerStatistic?.statisticByDate.totalCustomersByDate : ( Period.MONTHLY == period ? customerStatistic?.statisticByMonth.totalCustomersByMonth : customerStatistic?.statisticByYear.totalCustomersByYear);  
    const totalCustomerData = Period.DAILY == period ? customerStatistic?.statisticByDate.totalCustomersByDate : ( Period.MONTHLY == period ? customerStatistic?.statisticByMonth.totalCustomersByMonth : customerStatistic?.statisticByYear.totalCustomersByYear);

    const data = {
      labels: periods?.slice(0, 10).map(period => period._id),
      datasets: [
        {
          label: 'Total Customers',
          data: totalCustomerData?.slice(0, 10).map(period => period.totalCustomers),
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.4, 
          fill: false,
        },
      ],
    };
    setTotalCustomersBarChartData(data);
  }


  const fetchCustomers = async () => {
    try {
      const data = await getAllCustomers();
      const statisticData = await getCustomerStatistic();

      setCustomers(data);
      setCustomerStatistic(statisticData);

      console.log(customers)
    } catch (error) {
      console.error('Error fetching imports:', error);
    }
  };

  const handleChangeStatus = async (id: string, status: string) => {
    try {
      const response = await updateCustomerStatus(id, status);

      toast.custom((t) => (
        <SuccessToast
            message={response}
            onDismiss={() => toast.dismiss(t.id)}
        />))
    } catch (error: any) {
      toast.custom((t) => (
        <CustomErrorToast
            message={error}
            onDismiss={() => toast.dismiss(t.id)}
        />))
    }
  }


  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    handleLineChartData()
  }, [customerStatistic, period]);

  return <>
    <div className="flex flex-col gap-y-4 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-800 ">Customer Management</h1>
        <div className="flex gap-x-4">
          <ComboBox
            options={[Period.YEARLY, Period.MONTHLY, Period.DAILY]}
            placeholder="Choose a period..."
            onSelect={handleSelectPeriod}
          />

          <RoundedButton label="Export" color="text-white bg-cyan-500" />

        </div>

      </div>

      <div className="flex gap-x-4 mt-2 h-3/8">

        <div className="flex flex-col w-1/4 h-full justify-between gap-y-4">
          <MetricCard title="Total Customers"
            period={period == Period.DAILY ? "day" : (period == Period.MONTHLY ? "month" : "year")}
            value={period == Period.DAILY ? (customerStatistic?.statisticByDate.todayTotalCustomers) : (period == Period.MONTHLY ? customerStatistic?.statisticByMonth.currentMonthTotalCustomers : customerStatistic?.statisticByYear.currentYearTotalCustomers)}
            percentage={period == Period.DAILY ? (customerStatistic?.statisticByDate.totalCustomerPercentage) : (period == Period.MONTHLY ? customerStatistic?.statisticByMonth.totalCustomerPercentage : customerStatistic?.statisticByYear.totalCustomerPercentage)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
            } isPositive={false} />
          <MetricCard
            period={period == Period.DAILY ? "day" : (period == Period.MONTHLY ? "month" : "year")}
            value={period == Period.DAILY ? (customerStatistic?.statisticByDate.todayNewCustomers) : (period == Period.MONTHLY ? customerStatistic?.statisticByMonth.currentMonthNewCustomers : customerStatistic?.statisticByYear.currentYearNewCustomers)}
            percentage={period == Period.DAILY ? (customerStatistic?.statisticByDate.newCustomerPercentage) : (period == Period.MONTHLY ? customerStatistic?.statisticByMonth.newCustomerPercentage : customerStatistic?.statisticByYear.newCustomerPercentage)}
            title="Total New Registed Customer"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
            } isPositive={true} />
        </div>

        <div className="w-2/4 h-full">
          <LineChartCard data={totalCustomersBarChartData} height="100%" label="Total Customers By Month" />
        </div>
        <div className="w-1/4 h-full">
          <RankingCard customers={customers} />
        </div>

      </div>


      <div className="grow mb-2">
        <CollapsedRowTable onStatusChange={(id, newStatus) => handleChangeStatus(id, newStatus == true ? CustomerStatus.ACTIVE : CustomerStatus.INACTIVE )} statuses={CustomerStatus} title="Customer List" itemData={customers} columnData={CustomerColumnData} />
      </div>



    </div>


  </>
}

export default CustomerManagement;