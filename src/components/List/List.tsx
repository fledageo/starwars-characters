import styles from "./List.module.css"
import { useAppDispatch, useAppSelector } from "../../lib/hooks"
import { CharacterBlock } from "../../components/CharacterBlock/CharacterBlock"
import { getCharacters, resetPage, searchCharacters } from "../../features/Characters/Characters.slice"
import { ChangeEvent, useEffect, useState } from "react"
import { IoIosSearch } from "react-icons/io";
import { Pagination } from "../../components/Pagination/Pagination"

export const List = () => {
    const [search, setSearch] = useState({ isSearch: false, value: "" })

    const dispatch = useAppDispatch()
    const currentPage = useAppSelector(state => state.characters.currentPage)
    const list = useAppSelector(state => state.characters.list)
    const findCount = useAppSelector(state => state.characters.charCount)

    useEffect(() => {
        if (!search.isSearch) {
            dispatch(getCharacters(currentPage))
        } else {
            dispatch(searchCharacters({ value: search.value, page: currentPage }))
        }
    }, [currentPage, search.isSearch])


    const handleSearch = () => {
        dispatch(resetPage())
        dispatch(searchCharacters({ value: search.value, page: 1 }))
        setSearch({ ...search, isSearch: true })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim() === "" && search.isSearch) {
            setSearch({ isSearch: false, value: e.target.value })
            dispatch(resetPage())
        } else {
            setSearch({ ...search, value: e.target.value })
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.searchWrapper}>
                    <input
                        className={`input is-link mr-3`}
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => handleChange(e)}
                        value={search.value}
                    />
                    <button className={`button is-link is-outlined`}
                        onClick={() => handleSearch()}
                    >
                        <IoIosSearch />
                    </button>
                </div>
                {
                    search.isSearch && <span>{`Results: ${findCount}`}</span>
                }


                <div className={styles.showBlock}>
                    <div className={styles.listWrapper}>
                        {
                            list.map((char, i) => <CharacterBlock key={i} character={char} />)
                        }
                        {
                            (search.isSearch && findCount === 0) && <span className={styles.message}>No results found</span>
                        }
                    </div>
                    <div className={styles.messageBlock}>
                    </div>
                </div>



                <div className={styles.paginationBlock}>
                    <Pagination />
                </div>
            </div>
        </>
    )
}
