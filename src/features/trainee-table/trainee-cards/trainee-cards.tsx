import ActiveTrainees from "./active-trainees";
import MonthlyRevenue from "./montly-revenue";
import OverduePayments from "./overdue-payments";
import TotalTrainees from "./total-trainees";

const TraineeCards = () => {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <ActiveTrainees />
      <MonthlyRevenue />
      <TotalTrainees />
      <OverduePayments />
    </section>
  );
};

export default TraineeCards;