import { Button, Modal, ModalContent, ModalTrigger } from "@/components";
import { useBanner } from "@/hooks";
import { formatDate } from "date-fns";
import styles from "./BannerManagement.module.css";
import ModifyBanner from "./ModifyBanner";
import AddBanner from "./AddBanner";
import DeleteModal from "@/components/Modal/ModalContents/DeleteModal";

const BannerManagement = () => {
  const { allBanner, addBanner, updateBanner, deleteBanner } = useBanner();

  if (!allBanner) return null;
  return (
    <div className={styles.container} id="banner">
      <div className={styles.header}>
        <p className={styles.title}>배너 관리</p>
        <Modal>
          <ModalTrigger>
            <Button size="sm" variant="ghost">
              배너 추가
            </Button>
          </ModalTrigger>
          <ModalContent>
            <AddBanner callback={addBanner} />
          </ModalContent>
        </Modal>
      </div>

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
            {allBanner?.items.map((banner) => {
              const date = formatDate(
                new Date(banner.createdAt),
                "yyyy. MM. dd"
              );

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
    </div>
  );
};

export default BannerManagement;
