import { formatDate } from "date-fns";
import styles from "./BannerTable.module.css";
import {
  Modal,
  ModalContent,
  ModalTrigger,
  Button,
  DeleteModal,
} from "@/components";
import ModifyBanner from "./ModifyBanner";

const BannerTable = ({ banners, updateBanner, deleteBanner }) => {
  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>링크</th>
            <th>생성일</th>
            <th className={styles.action_title}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {banners?.items.map((banner) => {
            const date = formatDate(new Date(banner.createdAt), "yyyy. MM. dd");

            return (
              <tr key={banner.bannerId}>
                <td>{banner.bannerId}</td>
                <td>{banner.title}</td>
                <td className={styles.banner_link}>
                  <a href={banner.linkUrl} target="_blank">
                    {banner.linkUrl}
                  </a>
                </td>
                <td>{date}</td>
                <td>
                  <div className={styles.actions}>
                    <Modal>
                      <ModalTrigger>
                        <Button size="sm" variant="ghost">
                          Edit
                        </Button>
                      </ModalTrigger>
                      <ModalContent>
                        <ModifyBanner item={banner} callback={updateBanner} />
                      </ModalContent>
                    </Modal>

                    <Modal>
                      <ModalTrigger>
                        <Button size="sm" variant="ghost">
                          Delete
                        </Button>
                      </ModalTrigger>
                      <ModalContent>
                        <DeleteModal
                          callback={() => deleteBanner(banner.bannerId)}
                        />
                      </ModalContent>
                    </Modal>
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

export default BannerTable;
