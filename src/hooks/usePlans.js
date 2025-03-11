import { APIEndPoints, PageEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { useAxios } from "@/hooks";
import { buildPath } from "@/utils";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// 플랜목록을 다룹니다.
const usePlans = () => {
  const navigate = useNavigate();
  const { createToast } = useToast();

  const {
    response: plans,
    fetchData: getApi,
    loading: getLoadings,
  } = useAxios();

  const fetchPlans = useCallback(
    async (params, setCount, setTotalPage) => {
      const isSearch = params.keyword ? true : false;
      const url = isSearch
        ? buildPath(APIEndPoints.TRIP_SEARCH)
        : buildPath(APIEndPoints.TRIP_ALL);
      await getApi({
        method: "GET",
        url,
        params,
      }).then((res) => {
        console.log(res.data);
        setCount(res.data.pageInfo.totalSize || 0);
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
