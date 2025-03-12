import { FaImage, FaPlane, FaUserFriends } from "react-icons/fa";
import {
  IoAlertCircleSharp,
  IoChatbubbleEllipsesSharp,
  IoHomeSharp,
} from "react-icons/io5";
import { MdModeComment } from "react-icons/md";

export const menuData = [
  {
    id: "",
    label: "메인",
    icon: <IoHomeSharp />,
    subItems: null,
  },
  {
    id: "user",
    label: "회원 관리",
    icon: <FaUserFriends />,
    subItems: [
      { id: "allUsers", label: "전체 회원 관리" },
      { id: "reportedUsers", label: "신고된 회원 관리" },
    ],
  },
  {
    id: "plan",
    label: "여행 관리",
    icon: <FaPlane />,
    subItems: [
      { id: "plans", label: "여행 계획 관리" },
      { id: "countries", label: "나라 관리" },
      { id: "cities", label: "도시 관리" },
    ],
  },
  {
    id: "community",
    label: "게시글 관리",
    icon: <IoChatbubbleEllipsesSharp />,
    subItems: [
      { id: "allPosts", label: "전체 게시글 관리" },
      { id: "reportedPosts", label: "신고된 게시글 관리" },
    ],
  },
  {
    id: "comment",
    label: "댓글 관리",
    icon: <MdModeComment />,
    subItems: null,
  },
  {
    id: "notice",
    label: "공지 관리",
    icon: <IoAlertCircleSharp />,
    subItems: null,
  },
  {
    id: "banner",
    label: "배너 관리",
    icon: <FaImage />,
    subItems: null,
  },
];

export const adminEndpoint = "/admin/:id";
