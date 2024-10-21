import styles from "./Pagination.module.css"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { changePage } from "../../features/Characters/Characters.slice";

export const Pagination = () => {
  const [range, setRange] = useState<number[]>([])

  const currentPage = useAppSelector(state => state.characters.currentPage)
  const charCount = useAppSelector(state => state.characters.charCount)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const temp = Array.from({ length: Math.ceil(charCount / 10) }, (_, i) => i + 1)
    let result = []
    if ((currentPage - 1) - 1 <= 0) {
      result = temp.slice(0, 3)
    } else {
      result = temp.slice((currentPage - 1) - 1, (currentPage - 1) + 2)
    }
    setRange(result)
  }, [currentPage, charCount])


  return (
    <>
      <div className={styles.pagination}>
        <button className={`button`}
          onClick={() => dispatch(changePage(currentPage - 1))}
          disabled={currentPage - 1 === 0}
        >
          <FaLongArrowAltLeft />
        </button>

        {
          range.map(page => <button
            key={page}
            className={`${styles.pageBtn} ${currentPage == page ? styles.active : ""}`}
            onClick={() => dispatch(changePage(page))}
          >
            {page}
          </button>)
        }

        <button
          className={`button`}
          onClick={() => dispatch(changePage(currentPage + 1))}
          disabled={currentPage >= Math.ceil(charCount / 10)}
        >
          <FaLongArrowAltRight />
        </button>
      </div>
    </>
  )
}
