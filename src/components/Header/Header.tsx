import styles from "./Header.module.css"
export const Header = () => {
  return (
    <>
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <img src="src/assets/logo.png" className={styles.logo}/>
            </div>
        </div>
    </>
  )
}
