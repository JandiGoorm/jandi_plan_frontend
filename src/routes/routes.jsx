import { PageEndPoints } from "@/constants";
import {
  Home,
  Test,
  AuthLayout,
  PlanCreate,
  PlanList,
  SearchLayout,
  Notice,
  Board,
  BoardDetail,
  BoardWrite,
  PlanDetail,
  MyPage,
  DestinationDetail,
  DestinationList,
  PreferenceLayout,
  BoardModify,
  AdminLayout,
} from "@/pages";

export const routes = [
  {
    path: PageEndPoints.HOME,
    element: <Home />,
    requireAuth: false,
  },
  {
    path: PageEndPoints.TEST,
    element: <Test />,
    requireAuth: false,
  },
  {
    path: PageEndPoints.AUTH,
    element: <AuthLayout />,
    requireAuth: false,
  },
  {
    path: PageEndPoints.SEARCH,
    element: <SearchLayout />,
    requireAuth: false,
  },
  {
    path: PageEndPoints.NOTICE,
    element: <Notice />,
    requireAuth: false,
  },
  {
    path: PageEndPoints.MYPAGE,
    element: <MyPage />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.DESTINATION_DETAIL,
    element: <DestinationDetail />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.DESTINATION_LIST,
    element: <DestinationList />,
    requireAuth: false,
  },
  {
    path: PageEndPoints.PREFERENCE,
    element: <PreferenceLayout />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.PLAN_DETAIL,
    element: <PlanDetail />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.PLAN_CREATE,
    element: <PlanCreate />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.PLAN_LIST,
    element: <PlanList />,
    requireAuth: false,
  },
  {
    path: PageEndPoints.BOARD,
    element: <Board />,
    requireAuth: false,
  },
  {
    path: PageEndPoints.BOARD_DETAIL,
    element: <BoardDetail />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.BOARD_WRITE,
    element: <BoardWrite />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.BOARD_MODIFY,
    element: <BoardModify />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.ADMIN,
    element: <AdminLayout />,
    requireAuth: true,
  },
];
