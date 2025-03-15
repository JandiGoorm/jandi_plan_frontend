import { usePlan, usePlanItinerary, usePlanReservation, useFriends } from "@/hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlanDetailContext } from "./PlanDetailContext";

const PlanDetailProvider = ({ children }) => {
  const [flattendItinerary, setFlattendItinerary] = useState([]);
  const [focusDay, setFocusDay] = useState(null);
  const { id } = useParams();

  const { reservations, addReservation, updateReservation, deleteReservation } =
    usePlanReservation(id);

  const { itineraries, addItinerary, updateItinerary, deleteItinerary } =
    usePlanItinerary(id);

  const { tripDetail, updatePlan, deletePlan } = usePlan(id);

  const {friends, addFriends, deleteFriends} = useFriends(id);

  // 일정 정보를 날짜별로 정리하는 코드
  useEffect(() => {
    if (!itineraries || !tripDetail) return;

    const { startDate, endDate } = tripDetail;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const temp = [];
    while (start <= end) {
      const date = start.toISOString().split("T")[0];
      const day =
        Math.floor((start - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
      temp.push({ date, day, data: [], cost: 0 });
      start.setDate(start.getDate() + 1);
    }

    (itineraries ?? []).forEach((item) => {
      const { date, cost } = item;
      const index = temp.findIndex((day) => day.date === date);
      if (index === -1) return;
      temp[index].data.push(item);
      temp[index].cost += cost;
    });

    setFlattendItinerary(temp);
  }, [itineraries, tripDetail]);

  return (
    <PlanDetailContext.Provider
      value={{
        focusDay,
        setFocusDay,

        tripDetail,
        itineraries,
        reservations,

        updatePlan,
        deletePlan,

        addReservation,
        updateReservation,
        deleteReservation,

        addItinerary,
        updateItinerary,
        deleteItinerary,

        flattendItinerary,

        friends,
        addFriends,
        deleteFriends,
      }}
    >
      {children}
    </PlanDetailContext.Provider>
  );
};

export default PlanDetailProvider;
