import styles from "./BoardModify.module.css";
import { Button, Loading } from "@/components";
import { APIEndPoints } from "@/constants";
import { useAuth } from "@/contexts";
import { useAxios, useCommunity, useQuillSetup } from "@/hooks";
import { BaseLayout } from "@/layouts";
import { buildPath } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { boardWriteScheme } from "../constants";
import FormEditor from "../FormEditor";
import FormHashTag from "../FormHashtag";

const BoardModify = () => {
  const { id } = useParams();
  const { fetchData, response, loading } = useAxios();
  const { user } = useAuth();
  const { updateCommunity } = useCommunity();

  const formController = useForm({
    resolver: zodResolver(boardWriteScheme),
  });

  const { setValue } = formController;

  const { setQuill } = useQuillSetup(formController, "Community", id, true);

  useEffect(() => {
    fetchData({
      method: "GET",
      url: buildPath(APIEndPoints.BOARD_DETAIL, { id }),
    });
  }, [fetchData, id]);

  useEffect(() => {
    if (!response) return;

    const parsed = JSON.parse(response.items.content);
    setValue("title", response.items.title);
    setValue("tempCommunityId", Number(id));
    setValue("content", parsed);
  }, [id, response, setValue]);

  if (loading || !response) return <Loading />;
  if (!user || response.items.user.userId !== user.userId)
    return <p>권한이 없습니다.</p>;

  return (
    <BaseLayout>
      <div className={styles.container}>
        <FormHashTag
          defaultValue={response.items.hashtag}
          callback={(selectedTag) => setValue("hashtag", selectedTag)}
        />
        <FormEditor
          formController={formController}
          setQuill={setQuill}
          tempPostId={id}
          onSubmit={updateCommunity}
          defaultValue={response ? JSON.parse(response.items.content) : null}
          category="Commnunity"
        >
          <Button
            type="submit"
            variant="solid"
            size="md"
            style={{
              marginLeft: "auto",
            }}
          >
            포스팅 수정 완료
          </Button>
        </FormEditor>
      </div>
    </BaseLayout>
  );
};

export default BoardModify;
