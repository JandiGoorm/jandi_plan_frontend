import {
  Button,
  DropDown,
  DropDownContent,
  DropDownTrigger,
  Input,
} from "@/components";
import styles from "./FormHashtag.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tagDictionary, tagScheme } from "./constants";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDropDown } from "@/components/DropDown/DropDownContext";
import { APIEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { useDarkModeContext } from "@/contexts";
import { TiDelete } from "react-icons/ti";

const FormHashTag = ({ defaultValue = [], callback }) => {
  const [selectedTag, setSelectedTag] = useState(defaultValue);
  const tagFormController = useForm({
    resolver: zodResolver(tagScheme),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = tagFormController;
  const { onClick, close } = useDropDown();
  const { fetchData, response } = useAxios();
  const { isDarkMode } = useDarkModeContext();
  const dropdownRef = useRef(null);

  const handleSelectTag = (tagObject) => {
    if (!dropdownRef.current) return;
    dropdownRef.current.close();

    const tag = tagObject.tag;
    const normalized = tag.startsWith("#") ? tag : `#${tag}`;

    // 태그는 최대 5개까지만 추가할 수 있습니다.
    if (selectedTag.length >= 5) {
      tagFormController.setError("tag", {
        type: "manual",
        message: "태그는 최대 5개까지만 추가할 수 있습니다.",
      });
      return;
    }

    // 중복으로 태그를 입력할 수 없습니다.
    if (selectedTag.includes(normalized)) {
      tagFormController.setError("tag", {
        type: "manual",
        message: "이미 추가된 태그입니다.",
      });
      return;
    }

    setSelectedTag([...selectedTag, normalized]);
    reset({ tag: "" });
    close();
  };

  const handleRemoveTag = (tag) => {
    setSelectedTag(selectedTag.filter((v) => v !== tag));
  };

  const containCityDictionary = useMemo(() => {
    if (!response) return tagDictionary;
    const names = response.map((v) => v.name);

    return [...names, ...tagDictionary];
  }, [response]);

  const renderTagOptions = containCityDictionary.filter(
    (v) =>
      tagFormController.watch("tag") &&
      v.startsWith(tagFormController.watch("tag"))
  );

  useEffect(() => {
    fetchData({
      method: "GET",
      url: APIEndPoints.DESTINATION,
      params: {
        category: "ALL",
      },
    });
  }, [fetchData]);

  useEffect(() => {
    callback(selectedTag);
  }, [callback, selectedTag]);

  return (
    <div className={styles.container}>
      <div className={styles.tags_container}>
        <DropDown dropdownRef={dropdownRef}>
          <DropDownTrigger>
            <form onSubmit={handleSubmit(handleSelectTag)}>
              <Input
                register={register}
                name="tag"
                placeholder="태그를 추가해보세요"
                style={{
                  width: "25rem",
                }}
                onFocus={() => onClick()}
                onBlur={() => close()}
                isDarkMode={isDarkMode}
              />
            </form>
          </DropDownTrigger>

          <DropDownContent>
            {renderTagOptions.length > 0 && (
              <div className={styles.dropdown_container}>
                <h3 className={styles.dropdown_title}>추천 태그</h3>
                <ul className={styles.dropdown_list}>
                  {renderTagOptions.map((item) => (
                    <li
                      key={item}
                      className={styles.dropdown_item}
                      onClick={() => handleSelectTag({ tag: item })}
                    >
                      #{item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </DropDownContent>
        </DropDown>

        {errors.tag && (
          <span className={styles.error_message}>{errors.tag.message}</span>
        )}

        {selectedTag.length > 0 && (
          <div className={styles.selected_tags_container}>
            {selectedTag.map((tag) => {
              return (
                <div key={tag} className={styles.tag}>
                  <p>{tag}</p>

                  <Button
                    onClick={() => handleRemoveTag(tag)}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 0,
                    }}
                    size="sm"
                    variant="none"
                  >
                    <TiDelete
                      size={24}
                      style={{
                        color: "var(--color-tag-text)",
                      }}
                    />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormHashTag;
