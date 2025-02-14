import styles from "./PlanList.module.css";
import { useState } from "react";
import { BaseLayout } from "@/layouts";
import DetailItem from "@/pages/Search/Detail/DetailItem";
import { Button, Input } from "@/components";
import { FiSearch } from "react-icons/fi";

const dummy = [
    {
      user: {
        id: 1,
        userId: "ush0105",
        profile_url: "/user2.jpg",
        nickname: "민근",
      },
  
      plan: {
        id: 1,
        title: "오사카 가즈아",
        profile_url: "/fukuoka.jpg",
        like: 10,
        comment: 2,
        isLike: false,
        create_at: "2021. 10. 10",
        destination: "오사카",
      },
    },
  
    {
      user: {
        id: 1,
        userId: "ush0105",
        profile_url: "/user1.png",
        nickname: "승휘",
      },
      plan: {
        id: 2,
        title: "도쿄 놀러갑니다",
        profile_url: "/osaka.jpg",
        like: 999,
        comment: 0,
        isLike: false,
        create_at: "2021. 10. 10",
        destination: "도쿄",
      },
    },
  
    {
      user: {
        id: 1,
        userId: "ush0105",
        profile_url: "/user1.png",
        nickname: "승휘",
      },
      plan: {
        id: 3,
        title: "후쿠오카 1박2일 가즈아",
        profile_url: "/tokyo.jpg",
        like: 50,
        comment: 20,
        isLike: false,
        create_at: "2021. 10. 10",
        destination: "후쿠오카",
      },
    },
    {
      user: {
        id: 1,
        userId: "ush0105",
        profile_url: "/user1.png",
        nickname: "승휘",
      },
  
      plan: {
        id: 4,
        title: "오사카 가즈아",
        profile_url: "/fukuoka.jpg",
        like: 10,
        comment: 2,
        isLike: false,
        create_at: "2021. 10. 10",
        destination: "오사카",
      },
    },
  
    {
      user: {
        id: 1,
        userId: "ush0105",
        profile_url: "/user2.jpg",
        nickname: "민근",
      },
      plan: {
        id: 5,
        title: "도쿄 놀러갑니다",
        profile_url: "/osaka.jpg",
        like: 999,
        comment: 0,
        isLike: false,
        create_at: "2021. 10. 10",
        destination: "도쿄",
      },
    },
  
    {
      user: {
        id: 1,
        userId: "ush0105",
        profile_url: "/user2.jpg",
        nickname: "민근",
      },
      plan: {
        id: 6,
        title: "후쿠오카 1박2일 가즈아",
        profile_url: "/tokyo.jpg",
        like: 50,
        comment: 20,
        isLike: false,
        create_at: "2021. 10. 10",
        destination: "후쿠오카",
      },
    },
  ];

const PlanList = () => {

    return (
        <BaseLayout>
            <div className={styles.continer}>
                <div className={styles.title_box}>
                    <p className={styles.title}>Travel Plans</p>
                    <form className={styles.search_input}>
                                <Input
                                  size="lg"
                                  placeholder="Search Plans ..."
                                  style={{
                                    width: "100%",
                                    borderRadius: "28px",
                                    boxSizing: "border-box",
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
                    <DetailItem key={item.plan.id} item={item} />
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

export default PlanList;