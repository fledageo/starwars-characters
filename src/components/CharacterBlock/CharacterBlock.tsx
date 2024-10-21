import { useState } from "react";
import { ICharacter } from "../../lib/types"
import styles from "./CharacterBlock.module.css"
import { InfoModal } from "../InfoModal/InfoModal";
import { useAppDispatch } from "../../lib/hooks";
import { setType } from "../../features/ShowData/ShowData.slice";
import { ShowData } from "../../features/ShowData/ShowData";
interface IProps {
  character: ICharacter
}

export const CharacterBlock = ({ character }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch()


  const handleOpenModal = () => {
    dispatch(setType({type:"people",url:character.url}))
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  return (
    <>
      <div className={styles.block} onClick={handleOpenModal}>
        <div className={styles.wrapper}>
          <span className={styles.charName}>{character.name}</span>
        </div>
      </div>
      <InfoModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ShowData/>
      </InfoModal>
    </>
  )
}
