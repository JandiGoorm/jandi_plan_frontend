import { createContext, useContext } from "react";

export const UserManagerContext = createContext({
  users: [],
  reportedUsers: [],
  fetchUsers: async () => {},
  fetchReportedUsers: async () => {},
  permitUser: async () => {},
  deleteUser: async () => {},
  userLoading: false,
  reportedUserLoading: false,
});

export const useUserManger = () => {
  const context = useContext(UserManagerContext);

  if (!context) {
    throw new Error(
      "useUserManger 는 useUserManagerProvider 내부에서 사용되어야 합니다."
    );
  }

  return context;
};
