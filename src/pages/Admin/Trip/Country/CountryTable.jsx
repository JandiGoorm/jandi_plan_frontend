import {
  Modal,
  ModalContent,
  ModalTrigger,
  Button,
  DeleteModal,
} from "@/components";
import styles from "./CountryTable.module.css";
import DestMoreInfo from "../DestMoreInfo";

const CountryTable = ({ countries, fetchCountries, deleteCountry }) => {
  return (
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
          {countries.map((country) => {
            return (
              <tr key={country.countryId}>
                <td>{country.countryId}</td>
                <td>{country.continent.name}</td>
                <td>{country.name}</td>
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
                          callback={() => deleteCountry(country.countryId)}
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

export default CountryTable;
