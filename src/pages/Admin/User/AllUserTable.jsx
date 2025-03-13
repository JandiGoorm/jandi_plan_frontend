import { Button } from "@/components";
import styles from "./AllUserTable.module.css";
import { formatDate } from "date-fns";

const AllUserTable = ({ users, permitUser, refetch }) => {
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

        <tbody style={{ overflow: "hidden" }}>
          {users?.items.map((user) => {
            const date = formatDate(user.createdAt, "yyyy. MM. dd");

            return (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td className={styles.user_email}>{user.email}</td>
                <td>{date}</td>
                <td>{user.reported ? "true" : "false"}</td>
                <td>
                  <div className={styles.actions}>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        permitUser(user.userId).then(() => refetch())
                      }
                    >
                      {user.reported ? "제한해제" : "제한"}
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllUserTable;
