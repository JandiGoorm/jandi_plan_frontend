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

  const { response: userPlans, fetchData: getUserApi } = useAxios();

  const fetchPlans = useCallback(
    async (params) => {
      const isSearch = params.keyword ? true : false;
      const url = isSearch
        ? buildPath(APIEndPoints.TRIP_SEARCH)
        : buildPath(APIEndPoints.TRIP_ALL);

      return await getApi({
        method: "GET",
        url,
        params,
      })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          throw err;
        });
    },
    [getApi]
  );

  const fetchUserPlans = useCallback(
    async (url,params) => {
      return await getUserApi({
        method: "GET",
        url,
        params,
      })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          throw err;
        });
    },
    [getApi]
  );

  return {
    plans,
    fetchPlans,
    userPlans,
    fetchUserPlans,
    getLoadings,
  };
};

export default usePlans;
