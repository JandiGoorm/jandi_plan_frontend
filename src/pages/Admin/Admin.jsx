import styles from "./Admin.module.css";
import Dashboard from "./Dashboard/Dashboard";
import UserManagement from "./User/UserManagement";
import TripManagement from "./Trip/TripManagement";
import Sidebar from "./Sidebar";
import NoticeManagement from "./Notice/NoticeManagement";
import BannerManagement from "./Banner/BannerManagement";
import CommunityManagement from "./Community/CommunityManagement";
import UserManagerProvider from "./UserManagerProvider";

const AdminPage = () => {
  return (
    <UserManagerProvider>
      <div className={styles.container}>
        <Sidebar />

        <div className={styles.main_content}>
          <Dashboard />
          <UserManagement />
          <TripManagement />
          <CommunityManagement />
          <NoticeManagement />
          <BannerManagement />
        </div>
      </div>
    </UserManagerProvider>
  );
};

export default AdminPage;
