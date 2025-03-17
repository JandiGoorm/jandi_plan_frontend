import { useUser } from "@/hooks";
import { UserManagerContext } from "./UserManagerContext";

const UserManagerProvider = ({ children }) => {
  const {
    users,
    reportedUsers,
    fetchUsers,
    fetchReportedUsers,
    permitUser,
    deleteUser,
    updateUserRole,
    userLoading,
    reportedUserLoading,
  } = useUser();

  return (
    <UserManagerContext.Provider
      value={{
        users,
        reportedUsers,
        fetchUsers,
        fetchReportedUsers,
        permitUser,
        deleteUser,
        updateUserRole,
        userLoading,
        reportedUserLoading,
      }}
    >
      {children}
    </UserManagerContext.Provider>
  );
};

export default UserManagerProvider;
