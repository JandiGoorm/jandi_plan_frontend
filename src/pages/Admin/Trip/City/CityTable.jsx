import {
  Modal,
  ModalContent,
  ModalTrigger,
  Button,
  DeleteModal,
} from "@/components";
import styles from "./CityTable.module.css";
import DestMoreInfo from "../DestMoreInfo";

const CityTable = ({ cities, fetchCities, deleteCity }) => {
  return (
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
          {cities.map((city) => {
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
                        <DeleteModal callback={() => deleteCity(city.cityId)} />
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

export default CityTable;
