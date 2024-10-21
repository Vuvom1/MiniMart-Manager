import RoundedButton from "../../components/Button/RoundedButton";
import MetricCard from "../../components/Card/MetricCard";
import BarChartCard from "../../components/Card/BarChartCard";
import ComboBox from "../../components/ComboBox";
import OverviewTable from "../../components/Table/OverviewTable";
import RankingCard from "../../components/Card/RankingCard";

function CustomerManage() {
    function handleSelect(option: string) {
        console.log("Selected option:", option);
      }

      const barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', "July", "August", "September", "October", "November", "December", "Juanuary"],
        barDatasets: [
          {
            label: 'Nam',
            data: [50, 70, 100, 90, 120],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
          {
            label: 'Nữ',
            data: [40, 60, 80, 50, 70],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
          },
        ],
      };

    const columnHeaders = ["ID", "Supplier", "Time", "Date", "Staff", "Total Products", "Total Expenditure"];
    const dataFields = ["id", "supplier", "time", "date", "staff", "totalProducts", "totalExpenditure"];
    const itemData = [
        { id: 1, supplier: "Apples", time: 50, date: 100, staff: 50, totalProducts: "ABC Fruit", totalExpenditure: "2 days" },
        { id: 2, supplier: "Bananas", time: 30, date: 80, staff: 60, totalProducts: "XYZ Produce", totalExpenditure: "3 days" },
    ];

    const customers = [
      { name: 'Alice Johnson', points: 450 },
      { name: 'Bob Smith', points: 320 },
      { name: 'Carol Williams', points: 500 },
      { name: 'David Brown', points: 150 },
    ];

    return <>
        <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Customer Management</h1>
            <div className="flex gap-x-4">
            <ComboBox
            options={['Daily', 'Monthly', 'Yearly']}
            placeholder="Choose a period..."
            onSelect={handleSelect}
          />
         
            <RoundedButton label="Export" color="text-white bg-cyan-500" />
           
            </div>
            
        </div>

        <div className="gap-y-4 grid">

            <div className="flex gap-x-4">
                
                <div className="flex flex-col w-1/4 justify-between">
                <MetricCard title="Total Customers" value="0.00" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
                } isPositive={false} />
                <MetricCard title="Total Customer Point" value="0.00" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
                } isPositive={true} />
                </div>
             
                <div className="w-2/4"> 
                <BarChartCard data={barChartData} height="280px"/>
                </div>
                <div className="w-1/4">
                <RankingCard customers={customers}/> 
                </div>
               
            </div>

            <div className="flex gap-x-6">
                <div className="grow">
                    <OverviewTable title="Customer Overview" itemData={itemData} columnHeaders={columnHeaders} dataFields={dataFields} />
                </div>
               
            </div>

        </div>


    </>
}

export default CustomerManage;