import { cloneElement, useCallback, useState } from "react";
import { MdClose } from "react-icons/md";
import styles from "./Modal.module.css";
import { ModalContext, useModal } from "./ModalContext";

const Modal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
      }}
    >
      <>{children}</>
    </ModalContext.Provider>
  );
};

const ModalTrigger = ({ children, onOpen }) => {
  const { openModal } = useModal();

  return cloneElement(children, {
    onClick: (event) => {
      if (children.props.onClick) {
        children.props.onClick(event);
      }
      openModal();

      if (onOpen) {
        onOpen();
      }
    },
  });
};

const ModalContent = ({ children }) => {
  const { isOpen, closeModal } = useModal();

  return (
    <>
      {isOpen && (
        <>
          <div className={styles.backdrop} onClick={closeModal} />
          <div className={styles.container}>
            <MdClose
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                cursor: "pointer",
              }}
              size={20}
            />
            {children}
          </div>
        </>
      )}
    </>
  );
};

export { Modal, ModalContent, ModalTrigger };
