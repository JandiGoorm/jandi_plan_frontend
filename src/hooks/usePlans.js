import { APIEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { buildPath } from "@/utils";
import { useCallback } from "react";

// 플랜목록을 다룹니다.
const usePlans = () => {
  const {
    response: plans,
    fetchData: getApi,
    loading: getLoadings,
  } = useAxios();

  const fetchPlans = useCallback(
    async (params, setTotalPage) => {
      const isSearch = params.keyword ? true : false;
      const url = isSearch
        ? buildPath(APIEndPoints.TRIP_SEARCH)
        : buildPath(APIEndPoints.TRIP_ALL);

      await getApi({
        method: "GET",
        url,
        params,
      }).then((res) => {
        setTotalPage(res.data.pageInfo.totalPages || 0);
      });
    },
    [getApi]
  );

  return {
    plans,
    fetchPlans,
    getLoadings,
  };
};

export default usePlans;
