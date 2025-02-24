export const PageEndPoints = {
  HOME: "/",
  TEST: "/test",
  AUTH: "/auth/*",
  LOGIN: "/auth/login",
  JOIN: "/auth/join",

  PLAN_DETAIL: "/plan/:id",
  PLAN_LIST: "/plan/list",
  PLAN_CREATE: "/plan/create",

  PREFERENCE: "/preference/*",
  PREF_CONT: "/preference/continent",
  PREF_DEST: "/preference/destination",

  SEARCH: "/search/*",
  NOTICE: "/notice",

  BOARD: "/board",
  BOARD_DETAIL: "/board/:id",
  BOARD_WRITE: "/board/write",

  MYPAGE: "/mypage",

  DESTINATION_DETAIL: "/destination/:id",
  DESTINATION_LIST: "/destination/list",
};

export const APIEndPoints = {
  USER: "/users",
  LOGIN: "/users/login",
  RESISTER: "/users/register",
  REFRESH: "/users/token/refresh",
  USER_VERIFY: "/users/verify",
  USER_CHECK_EMAIL: "/users/register/checkEmail",
  USER_CHECK_NICKNAME: "/users/register/checkName",

  NOTICEALL: "/notice/lists",
  BANNER: "/banner/lists",

  BOARD: "/community/posts",
  COMMUNITY_COMMENTS: "/community/comments/:id",
  COMMENTS_REPLIES: "/community/replies/:id",

  IMAGE_UPLOAD_COMMUNITY: "/images/upload/community",
};
