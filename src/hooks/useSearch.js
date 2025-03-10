import { useCallback } from "react";
import { useAxios } from "@/hooks";
import { APIEndPoints } from "@/constants";
import { buildPath } from "@/utils";

const useSearch = () => {

  const { fetchData: getApi, response: searchCount, loading: getLoading } = useAxios();

  const getSearchCount = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_SORT);
    await getApi({ url, method: "GET", params:{sort: "SEARCH"} });
  }, [getApi]);

  return { searchCount, getSearchCount, getLoading };
};

export default useSearch;
