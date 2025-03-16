import { createContext, useContext } from "react";

export const PlanDetailContext = createContext({
  tripDetail: null, // 여행 계획의 기본 정보
  focusDay: null, // 현재 보고 있는 일자
  itineraries: null, // 일정 정보
  reservations: null, // 여행 계획의 예약 정보
  friends: null, //여행 동반자 목록

  setFocusDay: () => {}, // 현재 보고 있는 일자를 변경하는 함수

  updatePlan: () => {}, // 여행 계획의 기본 정보를 수정하는 함수
  deletePlan: () => {}, // 여행 계획을 삭제하는 함수

  addReservation: () => {}, // 예약 정보를 추가하는 함수
  updateReservation: () => {}, // 예약 정보를 수정하는 함수
  deleteReservation: () => {}, // 예약 정보를 삭제하는 함수

  addItinerary: () => {}, // 일정 정보를 추가하는 함수
  updateItinerary: () => {}, // 일정 정보를 수정하는 함수
  deleteItinerary: () => {}, // 일정 정보를 삭제하는 함수

  addFriends: () => {}, // 동반자 추가하는 함수
  deleteFriends: () => {}, // 동반자 삭제하는 함수

  flattendItinerary: [], // 일정 정보를 날짜별로 정리한 정보
});

export const usePlanDetail = () => {
  const context = useContext(PlanDetailContext);

  if (!context) {
    throw new Error(
      "usePlanDetail 는 PlanDetailProvider 내부에서 사용되어야 합니다."
    );
  }

  return context;
};
