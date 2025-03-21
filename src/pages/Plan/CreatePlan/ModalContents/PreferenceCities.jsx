import { Button, CityCard, Loading } from "@/components";
import styles from "./PreferenceCities.module.css";
import { useModal } from "@/components/Modal/ModalContext";

const PreferenceCities = ({
  preferenceCities,
  loading,
  setSelectedCity,
  handleChangeView,
}) => {
  const { closeModal } = useModal();

  return (
    <div className={styles.flex_column}>
      <div className={styles.sub_title}>
        <p>선호 여행지</p>
        <Button variant="ghost" isInModal onClick={handleChangeView}>
          전체 여행지
        </Button>
      </div>

      {loading ? (
        <Loading
          isSection
          style={{
            height: "20rem",
            width: "100%",
          }}
        />
      ) : (
        <div className={styles.grid_container}>
          {preferenceCities?.map((city) => {
            return (
              <div
                key={city.cityId}
                onClick={() => {
                  setSelectedCity(city);
                  closeModal();
                }}
                className={styles.wrapper_city_card}
              >
                <CityCard item={city} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PreferenceCities;
