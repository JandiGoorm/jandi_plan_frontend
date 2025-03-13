import { APIEndPoints, PageEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { useAxios } from "@/hooks";
import { buildPath, handleApiCall } from "@/utils";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// 게시판을 다룹니다.
const useCommunity = () => {
  const navigate = useNavigate();
  const { createToast } = useToast();

  const {
    response: communities,
    fetchData: getCommunityApi,
    loading: communitiesLoading,
  } = useAxios();

  const {
    response: reportedCommunities,
    fetchData: getReportedCommunityApi,
    loading: reportedCommunitiesLoading,
  } = useAxios();

  const { fetchData: postApi } = useAxios();
  const { fetchData: updateApi } = useAxios();
  const { fetchData: deleteApi } = useAxios();

  const fetchCommunities = useCallback(
    async (params) => {
      const isSearch = params.keyword ? true : false;
      const url = isSearch
        ? buildPath(APIEndPoints.BOARD_SEARCH)
        : buildPath(APIEndPoints.BOARD);
      return await getCommunityApi({
        method: "GET",
        url,
        params,
      }).then((res) => {
        return res;
      });
    },
    [getCommunityApi]
  );

  const fetchReportedCommunities = useCallback(
    async (params) => {
      const url = buildPath(APIEndPoints.REPORTED_BOARD);
      return await getReportedCommunityApi({
        method: "GET",
        url,
        params,
      }).then((res) => {
        return res;
      });
    },
    [getReportedCommunityApi]
  );

  const addCommunity = useCallback(
    async (data) => {
      const url = buildPath(APIEndPoints.BOARD);

      await handleApiCall(
        () =>
          postApi({
            method: "POST",
            url,
            data: {
              title: data.title,
              tempPostId: data.tempCommunityId,
              content: data.content,
            },
          }),
        "게시글이 등록되었습니다.",
        "게시글 등록에 실패했습니다.",
        createToast,
        (res) =>
          navigate(
            buildPath(PageEndPoints.BOARD_DETAIL, { id: res.data.postId })
          )
      );
    },
    [createToast, navigate, postApi]
  );

  const updateCommunity = useCallback(
    async (data) => {
      const id = data.tempCommunityId;
      const url = buildPath(APIEndPoints.BOARD_DETAIL, { id });

      await handleApiCall(
        () =>
          updateApi({
            method: "PATCH",
            url,
            data: {
              title: data.title,
              content: data.content,
              tempPostId: data.tempCommunityId,
            },
          }),
        "게시글이 수정되었습니다.",
        "게시글 수정에 실패했습니다.",
        createToast,
        () => navigate(buildPath(PageEndPoints.BOARD_DETAIL, { id }))
      );
    },
    [createToast, navigate, updateApi]
  );

  const deleteCommunity = useCallback(
    async (id, isAdmin = false) => {
      const url = isAdmin
        ? buildPath(APIEndPoints.DELETE_BOARD, { id })
        : buildPath(APIEndPoints.BOARD_DETAIL, { id });

      await handleApiCall(
        () => deleteApi({ method: "DELETE", url }),
        "게시글이 삭제되었습니다.",
        "게시글 삭제에 실패했습니다.",
        createToast
      );
    },
    [createToast, deleteApi]
  );

  return {
    communities,
    reportedCommunities,
    fetchReportedCommunities,
    fetchCommunities,
    communitiesLoading,
    reportedCommunitiesLoading,
    addCommunity,
    updateCommunity,
    deleteCommunity,
  };
};

export default useCommunity;
