import styles from "./DestinationList.module.css";
import { useState } from "react";
import { BaseLayout } from "@/layouts";
import DetailItem from "./components/DetailItem";
import { Button, Input } from "@/components";
import { FiSearch } from "react-icons/fi";

const dummy = [
    {
        id: 1,
        continent: "아시아",
        country: "일본",
        destination: "후쿠오카",
        profile_url: "/fukuoka.jpg",
    },
    {
      id: 1,
      continent: "아시아",
      country: "일본",
      destination: "오사카",
      profile_url: "/osaka.jpg",
  },
  {
    id: 1,
    continent: "아시아",
    country: "일본",
    destination: "도쿄",
    profile_url: "/tokyo.jpg",
},
  ];

const DestinationList = () => {

    return (
        <BaseLayout>
            <div className={styles.container}>
                <div className={styles.title_box}>
                    <p className={styles.title}>어디로 놀러가고 싶으신가요?</p>
                    <form className={styles.search_input}>
                      <Input
                        size="lg"
                        placeholder="Search Plans ..."
                        style={{
                          width: "100%",
                          borderRadius: "28px",
                          boxSizing: "border-box",
                          padding: "0.5rem 3rem 0.5rem 1.5rem",
                        }}
                      />
          
                      <div className={styles.icon_search_box}>
                        <FiSearch
                          size={24}
                          className={styles.icon_search}
                          type="submit"
                        />
                      </div>
                    </form>
                </div>
                <div className={styles.plan_container}>
                    {dummy.map((item) => (
                    <DetailItem key={item.id} item={item} />
                    ))}
                </div>

                <div className={styles.footer}>
                    <Button variant="ghost">이전</Button>
                    <Button variant="ghost">1</Button>
                    <Button variant="ghost">2</Button>
                    <Button variant="ghost">3</Button>
                    <Button variant="ghost">다음</Button>
                </div>
            </div>
        </BaseLayout>
    )
};

export default DestinationList;