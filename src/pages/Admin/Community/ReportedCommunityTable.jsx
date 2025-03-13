import styles from "./ReportedCommunityTable.module.css";
import ReportedItem from "./ReportedItem";

const ReportedCommunityTable = ({
  reportedCommunities,
  refetch,
  handleViewClick,
  deleteCommunity,
}) => {
  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>작성자ID</th>
            <th>작성일</th>
            <th>신고 수</th>
            <th>
              <p className={styles.action_title}>Actions</p>
            </th>
          </tr>
        </thead>

        <tbody>
          {reportedCommunities.map((community) => {
            return (
              <ReportedItem
                community={community}
                handleViewClick={handleViewClick}
                deleteCommunity={deleteCommunity}
                key={community.postId}
                refetch={refetch}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedCommunityTable;
