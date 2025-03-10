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
      }}
    >
      {children}
    </UserManagerContext.Provider>
  );
};

export default UserManagerProvider;
