import styles from "./Characters.module.css"
import { List } from "../../components/List/List"
import { CharInfo } from "../../components/InfoModal/InfoModal"
export const CharsList = () => {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <List />
        </div>
      </div>
    </>
  )
}
