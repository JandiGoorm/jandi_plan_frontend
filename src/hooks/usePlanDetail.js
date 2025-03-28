import { APIEndPoints, PageEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { useAxios } from "@/hooks";
import { buildPath, handleApiCall } from "@/utils";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// id에 해당하는 여행의 상세 정보를 다룹니다.
const usePlan = (id) => {
  const navigate = useNavigate();
  const { createToast } = useToast();

  const { response: tripDetail, fetchData: getApi } = useAxios();
  const { fetchData: postApi } = useAxios();
  const { fetchData: updateApi } = useAxios();
  const { fetchData: deleteApi } = useAxios();
  const { response: planImg, fetchData: updateImgApi } = useAxios();

  const fetchTripDetail = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_DETAIL, { id });
    await getApi({ url, method: "GET" });
  }, [id, getApi]);

  const addPlan = useCallback(
    async (data) => {
      const url = buildPath(APIEndPoints.TRIP_CREATE);

      await handleApiCall(
        () => postApi({ url, method: "POST", data }),
        "계획이 추가되었습니다.",
        "계획 등록에 실패했습니다.",
        createToast,
        async (res) => {
          const path = buildPath(PageEndPoints.PLAN_DETAIL, {
            id: res.data.tripId,
          });
          navigate(path);
        }
      );
    },
    [createToast, navigate, postApi]
  );

  const updatePlan = useCallback(
    async (data) => {
      const url = buildPath(APIEndPoints.TRIP_MY_DETAIL, { id });

      await handleApiCall(
        () => updateApi({ url, method: "PATCH", data }),
        "계획이 수정되었습니다.",
        "계획 수정에 실패했습니다.",
        createToast,
        fetchTripDetail
      );
    },
    [createToast, fetchTripDetail, id, updateApi]
  );

  const deletePlan = useCallback(
    async (successCallback, planId = id) => {
      const url = buildPath(APIEndPoints.TRIP_MY_DETAIL, { id: planId });

      await handleApiCall(
        () => deleteApi({ url, method: "DELETE" }),
        "계획이 삭제되었습니다.",
        "계획 삭제에 실패했습니다.",
        createToast,
        successCallback
      );
    },
    [createToast, deleteApi, id]
  );

  const updatePlanImg = useCallback(
    async (data) => {
      console.log(data.file?.[0]);
      const formData = new FormData();
      formData.append("file", data.file?.[0]);
      formData.append("targetId", id);

      await handleApiCall(
        () =>
          updateImgApi({
            url: APIEndPoints.TRIP_IMG,
            method: "POST",
            data: formData,
          }),
        "계획이 수정되었습니다.",
        "계획 수정에 실패했습니다.",
        createToast,
        fetchTripDetail
      );
    },
    [createToast, fetchTripDetail, id, updateImgApi]
  );

  return {
    fetchTripDetail,
    tripDetail,
    addPlan,
    updatePlan,
    deletePlan,

    planImg,
    updatePlanImg,
  };
};

export default usePlan;
