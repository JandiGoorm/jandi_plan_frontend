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
import styles from "./Country.module.css";
import CountryTable from "./CountryTable";

const Country = () => {
  const { fetchData, response, loading } = useAxios();
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

  const deleteCountry = useCallback(
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
  }, [fetchCountries]);

  if (loading) return <Loading />;
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

      <CountryTable
        countries={response ?? []}
        fetchCountries={fetchCountries}
        deleteCountry={deleteCountry}
      />
    </div>
  );
};

export default Country;
