import { useToast } from "@/contexts";
import useAxios from "./useAxios";
import { APIEndPoints } from "@/constants";
import { buildPath, handleApiCall } from "@/utils";
import { useCallback } from "react";

const useUser = () => {
  const { createToast } = useToast();

  const {
    response: users,
    fetchData: getUserApi,
    loading: userLoading,
  } = useAxios();
  const {
    response: reportedUsers,
    fetchData: getReportedUserApi,
    loading: reportedUserLoading,
  } = useAxios();
  const { fetchData: permitApi } = useAxios();
  const { fetchData: deleteApi } = useAxios();
  const { fetchData: updateRole } = useAxios();

  const fetchUsers = useCallback(
    async (params, setTotalPage) => {
      const url = buildPath(APIEndPoints.USER_ALL);
      await getUserApi({
        method: "GET",
        url,
        params,
      }).then((res) => {
        setTotalPage(res.data.pageInfo.totalPages || 0);
      });
    },
    [getUserApi]
  );

  const fetchReportedUsers = useCallback(
    async (params, setTotalPage) => {
      const url = buildPath(APIEndPoints.REPORTED_USER);
      await getReportedUserApi({
        method: "GET",
        url,
        params,
      }).then((res) => {
        setTotalPage(res.data.pageInfo.totalPages || 0);
      });
    },
    [getReportedUserApi]
  );

  const permitUser = useCallback(
    async (id) => {
      const url = buildPath(APIEndPoints.PERMIT_USER, { id });

      await permitApi({
        method: "POST",
        url,
      })
        .then((res) => {
          createToast({ type: "success", text: res.data });
        })
        .catch((error) => {
          createToast({ type: "error", text: error.data.message });
        });
    },
    [createToast, permitApi]
  );

  const deleteUser = useCallback(
    async (id) => {
      const url = buildPath(APIEndPoints.DELETE_USER, { id });

      await handleApiCall(
        () => deleteApi({ method: "DELETE", url }),
        "사용자가 삭제되었습니다.",
        "사용자 삭제에 실패했습니다.",
        createToast
      );
    },
    [createToast, deleteApi]
  );

  const updateUserRole = useCallback(
    (id, isUp) => {
      const url = buildPath(APIEndPoints.USER_ROLE_CHANGE, { id });
      const newRole = isUp ? "STAFF" : "USER";

      return handleApiCall(
        () =>
          updateRole({
            method: "PUT",
            url,
            data: { roleName: newRole },
          }),
        `사용자 권한이 ${isUp ? "스태프" : "사용자"}로 변경되었습니다.`,
        "사용자 권한 변경에 실패했습니다.",
        createToast
      );
    },
    [createToast, updateRole]
  );

  return {
    users,
    reportedUsers,
    fetchUsers,
    fetchReportedUsers,
    permitUser,
    deleteUser,
    updateUserRole,
    userLoading,
    reportedUserLoading,
  };
};

export default useUser;
