import MetricCard from "../../components/Card/MetricCard";
import OverviewTable from "../../components/OverviewTable";
import DoughnutChartCard from "../../components/Card/DoughnutChartCard";
import ComboBox from "../../components/ComboBox";
import RoundedButton from "../../components/Button/RoundedButton";

function SupplyManagement() {
    function handleSelect(option: string) {
        console.log("Selected option:", option);
      }

    const doughnutChartData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        values: [12, 19, 3, 5, 2],
    };

    const columnHeaders = ["ID", "Supplier", "Time", "Date", "Staff", "Total Products", "Total Expenditure"];
    const dataFields = ["id", "supplier", "time", "date", "staff", "totalProducts", "totalExpenditure"];
    const itemData = [
        { id: 1, supplier: "Apples", time: 50, date: 100, staff: 50, totalProducts: "ABC Fruit", totalExpenditure: "2 days" },
        { id: 2, supplier: "Bananas", time: 30, date: 80, staff: 60, totalProducts: "XYZ Produce", totalExpenditure: "3 days" },
    ];

    return <>
        <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Supply Management</h1>
            <div className="flex gap-x-4">
            <ComboBox
            options={['Daily', 'Monthly', 'Yearly']}
            placeholder="Choose a period..."
            onSelect={handleSelect}
          />
         
            <RoundedButton label="Export" color="text-white bg-blue-600" />
           
            </div>

            
            
        </div>

        <div className="gap-y-4 grid">

            <div className="flex gap-x-4">
                <MetricCard title="Total Imports" value="0.00" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
                } isPositive={true} />
                <MetricCard title="Total Import products" value="0.00" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
                } isPositive={true} />
                <MetricCard title="Total Import Expenditure" value="0.00" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
                } isPositive={true} />
            </div>

            <div className="flex gap-x-6">
                <div className="grow">
                    <OverviewTable title="Imports Overview" itemData={itemData} columnHeaders={columnHeaders} dataFields={dataFields} />
                </div>
                <DoughnutChartCard title="Import Distribution" data={doughnutChartData} />
            </div>

            <div className="grow">
                    <OverviewTable title="Supplier Information" itemData={itemData} columnHeaders={columnHeaders} dataFields={dataFields} />
                </div>




        </div>


    </>

}

export default SupplyManagement;