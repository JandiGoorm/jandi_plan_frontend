import { useCallback, useEffect } from "react";
import { useAxios } from "@/hooks";
import { buildPath, handleApiCall } from "@/utils";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { useNavigate } from "react-router-dom";

// id에 해당하는 여행의 친구 목록을 다룹니다.
const useFriends = (id) => {
  const navigate = useNavigate();
  const { createToast } = useToast();

  const { response: friends, fetchData: getApi } = useAxios();
  const { fetchData: postApi } = useAxios();
  const { fetchData: deleteApi } = useAxios();

  const fetchFriends = useCallback(async () => {
    const url = buildPath(APIEndPoints.TRIP_FRIENDS, { id },);
    await getApi({ url, method: "GET" });
  }, [id, getApi]);

  const addFriends = useCallback(
    async (data) => {
      const url = buildPath(APIEndPoints.TRIP_FRIENDS, {id},);
      const formData = new FormData();
      formData.append("participantUserName", data.participantUserName);

      return await postApi({
        url, method: "POST", data: formData
      }).then(()=>{
        fetchFriends();
        createToast({
          type: "success",
          text: "친구가 추가되었습니다.",
        });
      }).catch((err)=>{
        createToast({
          type: "error",
          text: err.data.message,
        });
      })
    },
    [createToast, navigate, postApi, fetchFriends]
  );

  const deleteFriends = useCallback(async (participantUserName) => {
    const url = buildPath(APIEndPoints.TRIP_SET_FRIENDS, { id, participantUserName });

    console.log(url);

    await handleApiCall(
      () => deleteApi({ url, method: "DELETE" }),
      "친구가 삭제되었습니다.",
      "친구 삭제에 실패했습니다.",
      createToast,
      fetchFriends,
    );
  }, [createToast, deleteApi, id, navigate,fetchFriends]);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  return {
    friends,
    addFriends,
    deleteFriends,
  };
};

export default useFriends;
