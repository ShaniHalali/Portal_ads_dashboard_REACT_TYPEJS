import "./StatCard.css"

type StatCardProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

const StatCard = ({ label, value, icon }: StatCardProps) => {
  return (
    <div className= "cards-main-div" >
      <div className="div-icon">{icon}</div>
      <div className="div-label" >{label}</div>
      <div className="div-value" >{value}</div>
    </div>
  );
};

export default StatCard;
