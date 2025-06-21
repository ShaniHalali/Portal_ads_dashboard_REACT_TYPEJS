
type StatCardProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

const StatCard = ({ label, value, icon }: StatCardProps) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      flex: 1,
      minWidth: '300px',
      maxWidth: '350px',
    }}>
      <div style={{ fontSize: '40px', marginBottom: '10px', display: 'flex', justifyContent: "center",alignItems: 'center' }}>{icon}</div>
      <div style={{ fontSize: '20px', color: '#777', display: 'flex', justifyContent: "center",alignItems: 'center',fontWeight: 'bold' }}>{label}</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold', display: 'flex', justifyContent: "center",alignItems: 'center' }}>{value}</div>
    </div>
  );
};

export default StatCard;
