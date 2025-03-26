import { useCallback, useEffect } from "react";
import { useAxios } from "@/hooks";
import { buildPath, handleApiCall } from "@/utils";
import { APIEndPoints } from "@/constants";
import { useToast } from "@/contexts";

// id에 해당하는 여행의 예약 정보를 다룹니다.
const usePlanReservation = (id) => {
  const { createToast } = useToast();

  const { response: reservations, fetchData: getApi } = useAxios();
  const { fetchData: postApi } = useAxios();
  const { fetchData: updateApi } = useAxios();
  const { fetchData: deleteApi, loading } = useAxios();

  const fetchReservations = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_RESERVATION, { id });
    await getApi({ url, method: "GET" });
  }, [id, getApi]);

  const addReservation = useCallback(
    async (data) => {
      const url = buildPath(APIEndPoints.TRIP_RESERVATION, { id });

      await handleApiCall(
        () => postApi({ url, method: "POST", data }),
        "예약이 추가되었습니다.",
        "예약 추가에 실패했습니다.",
        createToast,
        fetchReservations
      );
    },
    [createToast, fetchReservations, id, postApi]
  );

  const updateReservation = useCallback(
    async (reservationId, data) => {
      const url = buildPath(APIEndPoints.TRIP_RESERVATION, {
        id: reservationId,
      });

      await handleApiCall(
        () => updateApi({ url, method: "PATCH", data }),
        "예약이 수정되었습니다.",
        "예약 수정에 실패했습니다.",
        createToast,
        fetchReservations
      );
    },
    [createToast, fetchReservations, updateApi]
  );

  const deleteReservation = useCallback(
    async (reservationId) => {
      if (loading) return;
      const url = buildPath(APIEndPoints.TRIP_RESERVATION, {
        id: reservationId,
      });

      await handleApiCall(
        () => deleteApi({ url, method: "DELETE" }),
        "예약이 삭제되었습니다.",
        "예약 삭제에 실패했습니다.",
        createToast,
        fetchReservations
      );
    },
    [createToast, deleteApi, fetchReservations, loading]
  );

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  return {
    reservations,
    addReservation,
    updateReservation,
    deleteReservation,
  };
};

export default usePlanReservation;
