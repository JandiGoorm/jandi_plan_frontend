import {
  Button,
  Loading,
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/components";
import { APIEndPoints } from "@/constants";
import { useToast } from "@/contexts";
import { useAxios } from "@/hooks";
import { buildPath, handleApiCall } from "@/utils";
import { useCallback, useEffect } from "react";
import AddDestModal from "../AddDestModal";
import styles from "./City.module.css";
import CityTable from "./CityTable";

const City = () => {
  const { fetchData, response, loading } = useAxios();
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

  const deleteCity = useCallback(
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
  }, [fetchCities]);

  if (loading) return <Loading />;
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

      <CityTable
        cities={response ?? []}
        fetchCities={fetchCities}
        deleteCity={deleteCity}
      />
    </div>
  );
};

export default City;
