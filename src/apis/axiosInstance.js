import axios from "axios";
import AuthService from "./auth";
import { APIEndPoints } from "@/constants";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const { refreshAccessToken } = AuthService;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const protectedEndpoints = new Set([
  `GET:${APIEndPoints.PROFILE}`,
  `PUT:${APIEndPoints.USER_CHANGE_PASSWORD}`,
  `POST:${APIEndPoints.PROFILE_UPLOAD}`,

  `POST:${APIEndPoints.COUNTRY_ADD}`,
  `POST:${APIEndPoints.CITY_ADD}`,
  `DELETE:${APIEndPoints.CITY_MANAGE}`,
  `PATCH:${APIEndPoints.CITY_MANAGE}`,
  `DELETE:${APIEndPoints.COUNTRY_MANAGE}`,
  `PATCH:${APIEndPoints.COUNTRY_MANAGE}`,

  `GET:${APIEndPoints.PREFER_DEST}`,
  `POST:${APIEndPoints.PREFER_DEST}`,
  `PATCH:${APIEndPoints.PREFER_DEST}`,

  `POST:${APIEndPoints.BOARD}`,
  `PATCH:${APIEndPoints.BOARD}`,
  `DELETE:${APIEndPoints.BOARD}`,

  `GET:${APIEndPoints.BOARD_DETAIL}`,
  `PATCH:${APIEndPoints.BOARD_DETAIL}`,
  `DELETE:${APIEndPoints.BOARD_DETAIL}`,

  `POST:${APIEndPoints.BOARD_REPORTS}`,
  `POST:${APIEndPoints.COMMENTS_REPORTS}`,

  `GET:${APIEndPoints.COMMUNITY_COMMENTS}`,
  `POST:${APIEndPoints.COMMUNITY_COMMENTS}`,
  `DELETE:${APIEndPoints.COMMUNITY_COMMENTS}`,

  `GET:${APIEndPoints.COMMENTS_REPLIES}`,
  `POST:${APIEndPoints.COMMENTS_REPLIES}`,
  `DELETE:${APIEndPoints.COMMENTS_REPLIES}`,

  `POST:${APIEndPoints.BOARD_LIKE}`,
  `DELETE:${APIEndPoints.BOARD_LIKE}`,
  `POST:${APIEndPoints.COMMENTS_LIKE}`,
  `DELETE:${APIEndPoints.COMMENTS_LIKE}`,

  `POST:${APIEndPoints.TRIP_CREATE}`,
  `GET:${APIEndPoints.TRIP_MY}`,

  `GET:${APIEndPoints.TRIP_DETAIL}`,
  `PATCH:${APIEndPoints.TRIP_MY_DETAIL}`,
  `DELETE:${APIEndPoints.TRIP_MY_DETAIL}`,

  `GET:${APIEndPoints.TRIP_LIKED}`,
  `POST:${APIEndPoints.TRIP_SET_LIKED}`,
  `DELETE:${APIEndPoints.TRIP_SET_LIKED}`,

  `GET:${APIEndPoints.TRIP_ITINERARY}`,
  `POST:${APIEndPoints.TRIP_ITINERARY}`,
  `PATCH:${APIEndPoints.TRIP_ITINERARY}`,
  `DELETE:${APIEndPoints.TRIP_ITINERARY}`,

  `GET:${APIEndPoints.TRIP_RESERVATION}`,
  `POST:${APIEndPoints.TRIP_RESERVATION}`,
  `PATCH:${APIEndPoints.TRIP_RESERVATION}`,
  `DELETE:${APIEndPoints.TRIP_RESERVATION}`,

  `GET:${APIEndPoints.TRIP_FRIENDS}`,
  `POST:${APIEndPoints.TRIP_FRIENDS}`,
  `DELETE:${APIEndPoints.TRIP_SET_FRIENDS}`,

  `POST:${APIEndPoints.TRIP_IMG}`,

  `POST:${APIEndPoints.PLACE}`,

  `POST:${APIEndPoints.IMAGE_UPLOAD_COMMUNITY}`,
  `POST:${APIEndPoints.IMAGE_UPLOAD_NOTICE}`,
  `POST:${APIEndPoints.IMAGE_UPLOAD}`,

  `POST:${APIEndPoints.TEMP}`,

  `POST:${APIEndPoints.NOTICE}`,
  `DELETE:${APIEndPoints.NOTICE_DETAIL}`,
  `PATCH:${APIEndPoints.NOTICE_DETAIL}`,

  `PATCH:${APIEndPoints.BANNER_DETAIL}`,
  `DELETE:${APIEndPoints.BANNER_DETAIL}`,
  `POST:${APIEndPoints.BANNER}`,

  `GET:${APIEndPoints.USER_ALL}`,
  `GET:${APIEndPoints.MANAGE_UTIL}`,
  `GET:${APIEndPoints.REPORTED_USER}`,
  `POST:${APIEndPoints.PERMIT_USER}`,
  `DELETE:${APIEndPoints.DELETE_USER}`,
  `GET:${APIEndPoints.REPORTED_BOARD}`,
  `GET:${APIEndPoints.REPORTED_COMMNET}`,
  `DELETE:${APIEndPoints.DELETE_COMMENT}`,

  `POST:${APIEndPoints.MAP_RESTAURANT}`,
]);

axiosInstance.interceptors.request.use((config) => {
  const requestKey = `${config.method.toUpperCase()}:${config.url}`;

  const normalizedUrl = requestKey.replace(/\/\d+(?=\/|$)/g, "/:id");

  const isRequiredAuth = protectedEndpoints.has(normalizedUrl);

  if (isRequiredAuth) {
    const accessToken = localStorage.getItem("access-token");
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response.status === 401 &&
      error.config.url !== APIEndPoints.REFRESH
    ) {
      console.log("error", error);
      const refreshToken = localStorage.getItem("refresh-token");

      if (refreshToken) {
        const response = await refreshAccessToken(refreshToken);

        if (!response.accessToken || !response.refreshToken) {
          return Promise.reject(
            "리프레쉬 토큰으로 액세스토큰 재발행 실패",
            error
          );
        }

        localStorage.setItem("access-token", response.accessToken);
        localStorage.setItem("refresh-token", response.refreshToken);

        error.config.headers[
          "Authorization"
        ] = `Bearer ${response.accessToken}`;

        return axios.request(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
