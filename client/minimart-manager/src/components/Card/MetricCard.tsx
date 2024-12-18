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
                        {isPositive ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                            </svg>

                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                            </svg>
                        )}
                        <span className="text-sm font-medium">{isPositive ? '+' : '-'}{typeof percentage === 'number' ? percentage.toFixed(2) : percentage}%</span>
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
