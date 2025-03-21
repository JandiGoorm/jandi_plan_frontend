import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import styles from "./AdminLayout.module.css";
import BannerManagement from "./Banner/BannerManagement";
import CommentManagement from "./Comment/CommentManagement";
import Communities from "./Community/Communities";
import ReportedCommunities from "./Community/ReportedCommunities";
import Dashboard from "./Dashboard/Dashboard";
import NoticeManagement from "./Notice/NoticeManagement";
import Sidebar from "./Sidebar/Sidebar";
import AllUser from "./User/AllUser";
import ReportedUser from "./User/ReportedUser";
import UserManagerProvider from "./UserManagerProvider";
import City from "./Trip/City/City";
import Country from "./Trip/Country/Country";
import Plan from "./Trip/Plan/Plan";

const AdminPage = () => {
  const location = useLocation();

  return (
    <UserManagerProvider>
      <div className={styles.container}>
        <Sidebar />

        <div className={styles.main_content}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className={styles.motion_container}
            >
              <Routes location={location}>
                <Route path="/" element={<Dashboard />} />
                <Route path="allUsers" element={<AllUser />} />
                <Route path="reportedUsers" element={<ReportedUser />} />

                <Route path="cities" element={<City />} />
                <Route path="countries" element={<Country />} />
                <Route path="plans" element={<Plan />} />

                <Route path="allPosts" element={<Communities />} />
                <Route path="reportedPosts" element={<ReportedCommunities />} />

                <Route path="comment" element={<CommentManagement />} />

                <Route path="notice" element={<NoticeManagement />} />
                <Route path="banner" element={<BannerManagement />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </UserManagerProvider>
  );
};

export default AdminPage;
