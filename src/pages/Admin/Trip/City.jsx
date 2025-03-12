import { Button, Modal, ModalContent, ModalTrigger } from "@/components";
import styles from "./City.module.css";
import { useAxios } from "@/hooks";
import { useCallback, useEffect } from "react";
import { APIEndPoints } from "@/constants";
import AddDestModal from "./components/AddDestModal";
import { useToast } from "@/contexts";
import { buildPath, handleApiCall } from "@/utils";
import DestMoreInfo from "./components/DestMoreInfo";
import DeleteModal from "@/components/Modal/ModalContents/DeleteModal";

const City = ({ setView }) => {
  const { fetchData, response } = useAxios();
  const { fetchData: deleteApi } = useAxios();
  const { createToast } = useToast();

  const fetchCities = useCallback(async () => {
    await fetchData({
      url: APIEndPoints.DESTINATION,
      method: "GET",
      params: {
        category: "ALL",
      },
    });
  }, [fetchData]);

  const deleteCities = useCallback(
    async (id) => {
      await handleApiCall(
        () =>
          deleteApi({
            method: "DELETE",
            url: buildPath(APIEndPoints.CITY_MANAGE, { id }),
          }),
        "도시가 삭제되었습니다",
        "도시 삭제에 실패했습니다",
        createToast,
        fetchCities
      );
    },
    [createToast, deleteApi, fetchCities]
  );

  useEffect(() => {
    fetchCities();
  }, [fetchCities, setView]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>도시 관리</p>

        <Modal>
          <ModalTrigger>
            <Button variant="ghost" size="sm">
              도시 추가
            </Button>
          </ModalTrigger>
          <ModalContent>
            <AddDestModal content="도시" onSuccess={fetchCities} />
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
              <th>도시</th>
              <th className={styles.action_title}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {response?.map((city) => {
              return (
                <tr key={city.cityId}>
                  <td>{city.cityId}</td>
                  <td>{city.country.continent.name}</td>
                  <td>{city.country.name}</td>
                  <td>{city.name}</td>
                  <td>
                    <div className={styles.actions}>
                      <Modal>
                        <ModalTrigger>
                          <Button size="sm" variant="ghost">
                            Edit
                          </Button>
                        </ModalTrigger>
                        <ModalContent>
                          <DestMoreInfo
                            content="도시"
                            data={city}
                            onSuccess={fetchCities}
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
                            callback={() => deleteCities(city.cityId)}
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

export default City;
