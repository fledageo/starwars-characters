import styles from "./InfoModal.module.css"
import { ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode
}

export const InfoModal = ({ isOpen, onClose, children }: IProps) => {

  if (!isOpen) return null;


  const handleClose = (e: HTMLElement) => {
    if (e.id == "close") {
      onClose()
    }
  }

  return (
    <>
      <div id={"close"} className={styles.container} onClick={(e) => handleClose(e.target as HTMLElement)}>
        <div className={styles.wrapper}>
          {children}
        </div>
      </div>
    </>
  )
}
