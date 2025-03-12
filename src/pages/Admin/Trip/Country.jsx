import { Button, Modal, ModalContent, ModalTrigger } from "@/components";
import styles from "./Country.module.css";
import { useAxios } from "@/hooks";
import { useEffect, useCallback } from "react";
import { APIEndPoints } from "@/constants";
import AddDestModal from "./components/AddDestModal";
import { useToast } from "@/contexts";
import { buildPath, handleApiCall } from "@/utils";
import DeleteModal from "@/components/Modal/ModalContents/DeleteModal";
import DestMoreInfo from "./components/DestMoreInfo";

const Country = ({ setView }) => {
  const { fetchData, response } = useAxios();
  const { fetchData: deleteApi } = useAxios();
  const { createToast } = useToast();

  const fetchCountries = useCallback(async () => {
    await fetchData({
      url: APIEndPoints.COUNTRY,
      method: "GET",
      params: {
        category: "ALL",
      },
    });
  }, [fetchData]);

  const deleteCountries = useCallback(
    async (id) => {
      await handleApiCall(
        () =>
          deleteApi({
            method: "DELETE",
            url: buildPath(APIEndPoints.COUNTRY_MANAGE, { id }),
          }),
        "나라가 삭제되었습니다",
        "나라 삭제에 실패했습니다",
        createToast,
        fetchCountries
      );
    },
    [createToast, deleteApi, fetchCountries]
  );

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries, setView]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>나라 관리</p>

        <Modal>
          <ModalTrigger>
            <Button variant="ghost" size="sm">
              나라 추가
            </Button>
          </ModalTrigger>
          <ModalContent>
            <AddDestModal content="나라" onSuccess={fetchCountries} />
          </ModalContent>
        </Modal>
      </div>

      <div className={styles.table_wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>대륙</th>
              <th>나라</th>
              <th className={styles.action_title}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {response?.map((country) => {
              return (
                <tr key={country.countryId}>
                  <td>{country.countryId}</td>
                  <td>{country.continent.name}</td>
                  <td>{country.name}</td>
                  <td className={styles.actions}>
                    <Modal>
                      <ModalTrigger>
                        <Button size="sm" variant="ghost">
                          View
                        </Button>
                      </ModalTrigger>
                      <ModalContent>
                        <DestMoreInfo
                          content="나라"
                          data={country}
                          onSuccess={fetchCountries}
                        />
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
                          callback={() => deleteCountries(country.countryId)}
                        />
                      </ModalContent>
                    </Modal>
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

export default Country;
