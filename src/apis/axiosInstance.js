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

  `POST:${APIEndPoints.BOARD}`,
  `PATCH:${APIEndPoints.BOARD}`,
  `DELETE:${APIEndPoints.BOARD}`,

  `PATCH:${APIEndPoints.BOARD_DETAIL}`,
  `DELETE:${APIEndPoints.BOARD_DETAIL}`,

  `POST:${APIEndPoints.COMMUNITY_COMMENTS}`,
  `DELETE:${APIEndPoints.COMMUNITY_COMMENTS}`,

  `POST:${APIEndPoints.BOARD_LIKE}`,

  `POST:${APIEndPoints.TRIP_CREATE}`,
  `GET:${APIEndPoints.TRIP_MY}`,
  `GET:${APIEndPoints.TRIP_DETAIL}`,

  `GET:${APIEndPoints.TRIP_ITINERARY}`,
  `POST:${APIEndPoints.TRIP_ITINERARY}`,
  `PATCH:${APIEndPoints.TRIP_ITINERARY}`,
  `DELETE:${APIEndPoints.TRIP_ITINERARY}`,

  `GET:${APIEndPoints.TRIP_RESERVATION}`,
  `POST:${APIEndPoints.TRIP_RESERVATION}`,
  `PATCH:${APIEndPoints.TRIP_RESERVATION}`,
  `DELETE:${APIEndPoints.TRIP_RESERVATION}`,

  `POST:${APIEndPoints.PLACE}`,

  `POST:${APIEndPoints.IMAGE_UPLOAD_COMMUNITY}`,
  `POST:${APIEndPoints.IMAGE_UPLOAD}`,
]);

axiosInstance.interceptors.request.use((config) => {
  const requestKey = `${config.method.toUpperCase()}:${config.url}`;
  const normalizedUrl = requestKey.replace(/\/\d+$/, "/:id");

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
    if (error.response.status === 403) {
      //응답에 인증 필요할 때 403 에러러
      const refreshToken = localStorage.getItem("refresh-token");

      if (refreshToken) {
        const response = await refreshAccessToken(refreshToken);

        if (!response.accessToken) {
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
