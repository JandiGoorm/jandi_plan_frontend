import { Button, Field, Input } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { manageFriendsScheme } from "../../constants";
import { usePlanDetail } from "../PlanDetailContext";
import styles from "./ManageFriends.module.css";
import { useModal } from "@/components/Modal/ModalContext";
import { useCallback } from "react";

const ManageFriends = ({ plan, friends }) => {
  const { addFriends, deleteFriends } = usePlanDetail();
  const { closeModal } = useModal();

  console.log(friends);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(manageFriendsScheme),
  });

  const onSubmit = useCallback(
    (data) => {
      addFriends(data);
    },
    [addFriends]
  );

  const handleRemoveUser = useCallback(
    (participantUserName) => {
      deleteFriends(participantUserName)
    }
  )

  if (!plan) return <p>해당 계획을 불러오기 실패했습니다.</p>;

  return (
    <div className={styles.container}>
      <p className={styles.title}>친구 관리</p>

      <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
        <Field
          label="친구 닉네임"
          isRequire
          error={errors.participantUserName}
        >
          <Input
            type="text"
            style={{
              boxSizing: "border-box",
              width: "100%",
            }}
            size="sm"
            register={register}
            placeholder="친구 닉네임을 입력하세요"
            name="participantUserName"
          />
        </Field>

        <Button
          variant="ghost"
          style={{
            alignSelf: "end",
            width: "6rem",
          }}
          type="submit"
        >
          추가
        </Button>
      </form>
      
      <p className={styles.title}>친구 목록</p>
      <div className={styles.user_name_box}>
        {friends.map((friend) => (
          <div key={friend.participantUserId} className={styles.user_name}>
            <p className={styles.name}>{friend.participantUserName}</p>
            <Button
              size="sm"
              variant="none"
              onClick={() => handleRemoveUser(friend.participantUserName)}
            >
              X
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageFriends;
