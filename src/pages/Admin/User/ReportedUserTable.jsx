import { formatDate } from "date-fns";
import styles from "./ReportedUserTable.module.css";
import { Button } from "@/components";
import DeleteUserModal from "../Modals/DeleteUserModal";

const ReportedUserTable = ({ reportedUsers, permitUser, refetch }) => {
  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>닉네임</th>
            <th>이메일</th>
            <th>생성일</th>
            <th>제한</th>
            <th className={styles.action_title}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {reportedUsers?.items.map((user) => {
            const date = formatDate(user.createdAt, "yyyy. MM. dd");

            return (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td className={styles.user_email}>{user.email}</td>
                <td>{date}</td>
                <td>{user.reported ? "true" : "false"}</td>
                <td className={styles.actions}>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      permitUser(user.userId).then(() => refetch())
                    }
                  >
                    제한해제
                  </Button>

                  <DeleteUserModal id={user.userId} onSuccess={refetch} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedUserTable;
