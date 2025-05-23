export const PageEndPoints = {
  HOME: "/",
  TEST: "/test",
  AUTH: "/auth/*",
  LOGIN: "/auth/login",
  JOIN: "/auth/join",
  FINDPW: "/auth/findPW",
  KAKAO_JOIN: "/auth/kakaoLogin",
  NAVER_JOIN: "/auth/naverLogin",
  GOOGLE_JOIN: "/auth/googleLogin",

  PLAN_DETAIL: "/plan/:id",
  PLAN_LIST: "/plan/list",
  PLAN_MY_LIST: "/plan/my/list",
  PLAN_LIKE_LIST: "/plan/like/list",
  PLAN_DEST_LIST: "/plan/list/:dest",
  PLAN_CREATE: "/plan/create",

  PREFERENCE: "/preference/*",
  PREF_CONT: "/preference/continent",
  PREF_DEST: "/preference/destination",

  SEARCH: "/search/*",
  NOTICE: "/notice",

  BOARD: "/board",
  BOARD_DETAIL: "/board/:id",
  BOARD_WRITE: "/board/write",
  BOARD_MODIFY: "/board/modify/:id",

  MYPAGE: "/mypage",
  ADMIN: "/admin/*",

  DESTINATION_DETAIL: "/destination/:id",
  DESTINATION_LIST: "/destination/list",
};

export const APIEndPoints = {
  LOGIN: "/users/login",
  FINDPW: "users/forgot",
  PROFILE: "/users/profile",
  REFRESH: "/users/token/refresh",
  USER: "/users",
  PROFILE_UPLOAD: "images/upload/profile",

  KAKAO_LOGIN: "/auth/kakaoLogin",
  NAVER_LOGIN_URL: "/auth/naver/loginUrl",
  NAVER_LOGIN: "/auth/naver/callback",
  GOOGLE_LOGIN: "/auth/googleLogin",

  PREFER_DEST: "/trip/cities/prefer",

  RESISTER: "/users/register",
  USER_CHANGE_PASSWORD: "/users/change-password",
  USER_VERIFY: "/users/verify",
  USER_CHECK_EMAIL: "/users/register/checkEmail",
  USER_CHECK_NICKNAME: "/users/register/checkName",
  USER_CHANGE_NICKNAME: "/users/change-username",

  NOTICE: "/notice",
  NOTICE_DETAIL: "/notice/:id",
  NOTICEALL: "/notice/lists",

  BANNER: "/banner/lists",
  BANNER_DETAIL: "/banner/lists/:id",

  BOARD: "/community/posts",
  BOARD_DETAIL: "/community/posts/:id",
  BOARD_LIKE: "community/posts/likes/:id",
  BOARD_SEARCH: "/community/search",
  COMMUNITY_COMMENTS: "/community/comments/:id",
  COMMENTS_LIKE: "/community/comments/likes/:id",
  COMMENTS_REPLIES: "/community/replies/:id",
  BOARD_REPORTS: "/community/posts/reports/:id",
  COMMENTS_REPORTS: "/community/comments/reports/:id",

  PLACE: "/place",

  TRIP_MY: "/trip/my/allTrips",
  TRIP_LIKED: "/trip/my/likedTrips",
  TRIP_SET_LIKED: "/trip/my/likedTrips/:id",
  TRIP_CREATE: "/trip/my/create",
  TRIP_ALL: "/trip/allTrips",
  TRIP_DETAIL: "/trip/:id",
  TRIP_MY_DETAIL: "/trip/my/:id",
  TRIP_ITINERARY: "/trip/itinerary/:id",
  TRIP_RESERVATION: "/trip/reservation/:id",
  TRIP_SEARCH: "trip/search",
  TRIP_SORT: "/trip/rank",

  TRIP_FRIENDS: "/trip/:id/participants",
  TRIP_SET_FRIENDS: "/trip/:id/participants/:participantUserName",
  TRIP_IMG: "/images/upload/trip",

  DESTINATION: "/trip/cities",
  CONTINENT: "/trip/continents",
  COUNTRY: "/trip/countries",
  PLAN_BEST: "/trip/top-likes",
  DESTINATION_BEST: "/trip/rank",

  MAP_RESTAURANT: "/map/recommend/restaurant",

  IMAGE_UPLOAD_COMMUNITY: "/images/upload/community",
  IMAGE_UPLOAD_NOTICE: "/images/upload/notice",
  IMAGE_UPLOAD: "/images/upload",

  TEMP: "/temp",

  MANAGE: "/manage",
  USER_ALL: "/manage/user/all",
  REPORTED_USER: "/manage/user/reported",
  PERMIT_USER: "/manage/user/permit/:id",
  DELETE_USER: "/manage/user/delete/:id",
  USER_ROLE_CHANGE: "/manage/user/change-role/:id",
  MANAGE_UTIL: "/manage/util/all",
  MANAGE_MONTH_USER: "/manage/util/month/users",
  REPORTED_BOARD: "/manage/community/reported/posts",
  DELETE_BOARD: "/manage/community/delete/posts/:id",
  REPORTED_COMMNET: "/manage/community/reported/comments",
  DELETE_COMMENT: "/manage/community/delete/comments/:id",
  COUNTRY_ADD: "/manage/trip/countries",
  COUNTRY_MANAGE: "/manage/trip/countries/:id",
  CITY_ADD: "/manage/trip/cities",
  CITY_MANAGE: "/manage/trip/cities/:id",
};
