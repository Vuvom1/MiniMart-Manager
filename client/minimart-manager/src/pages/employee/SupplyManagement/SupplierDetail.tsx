import MetricCard from "../../../components/Card/MetricCard";

function SupplierDetail() {
  return (
    <div className="flex gap-x-4">
      <MetricCard title="Total suppliers" value="0.1" isPositive={true} />
      <MetricCard title="Total suppliers" value="0.1" isPositive={true} />
    </div>
  );
}
export default SupplierDetail;
