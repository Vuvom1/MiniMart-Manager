import CircleIcon from "../Icon/CircleIcon";

interface MetricCard {
    title: string,
    value: string | number | undefined,
    percentage?: string | number,
    icon?: JSX.Element,
    isPositive: boolean,
    period?: string,
}

const MetricCard = ({
    title,
    value = "0.00",
    percentage = "0.00",
    icon,
    isPositive,
    period = "", }: MetricCard) => {
    return (
        <div className="flex justify-between bg-white rounded-lg p-6 shadow-lg h-full w-full">
            <div className="flex flex-col justify-between ">
                <h3 className="text-gray-600 text-lg font-medium">{title}</h3>
               
                    <span className="text-3xl font-bold text-gray-800">{value}</span>
                    <div className="flex items-center mt-2 gap-x-2">
                        <div className={`flex ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            <svg
                                className={`w-5 h-5 ml-1 transform ${isPositive ? 'rotate-0' : 'rotate-180'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a1 1 0 01-1-1V6.414L5.707 10.707a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L11 6.414V17a1 1 0 01-1 1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-sm  font-medium">{isPositive ? '+' : '-'}{percentage}%</span>

                        </div>
                        <p className="text-gray-500 text-sm">vs last {period}</p>
                    </div>

          

            </div>
            <div className="">
                {
                    icon ? (<CircleIcon icon={icon} />) : (<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>)
                }
            </div>



        </div>


    );
};

export default MetricCard;
