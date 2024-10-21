import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./style.module.css"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { fetchFilmsNames, fetchHomeworldName, fetchSpeciesNames, fetchStarshipsNames, fetchVehiclesNames } from "../../lib/api";
import { setComplexData, setType } from "../../features/ShowData/ShowData.slice";
import { ICharacterComplexData } from "../../features/ShowData/types";
import { ICharacter } from "../../lib/types";


export const CharacterCard = () => {
    const [more, setMore] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const character = useAppSelector(state => state.currentInfo.data) as ICharacter
    const complexData = useAppSelector(state => state.currentInfo.complexData) as ICharacterComplexData

    const getComplexData = async () => {
        const homeworld = await fetchHomeworldName(character.homeworld)
        const vehicles = await fetchVehiclesNames(character.vehicles)
        const films = await fetchFilmsNames(character.films)
        const starships = await fetchStarshipsNames(character.starships)
        const species = await fetchSpeciesNames(character.species)
        
        dispatch(setComplexData({ homeworld, vehicles, films, starships, species }))
    } 

    useEffect(() => {
        getComplexData()
    },[character])

    const handleMore = async () => {
        setMore(!more)
    }

    return (
        <>
            <div className="card my-6  p-5">
                <div className={styles.cardHeader}>
                    <span className="title">{character?.name}</span>
                </div>

                <div className={styles.cardBody}>
                    <p><strong>Height:</strong> {character?.height} cm</p>
                    <p><strong>Mass:</strong> {character?.mass} kg</p>
                    <p><strong>Hair Color:</strong> {character?.hair_color}</p>
                    <p><strong>Skin Color:</strong> {character?.skin_color}</p>
                    <p><strong>Eye Color:</strong> {character?.eye_color}</p>
                    <p><strong>Birth Year:</strong> {character?.birth_year}</p>
                    <p><strong>Gender:</strong> {character?.gender}</p>
                </div>

                {
                    more && <div className={styles.complexInfo}>
                        <div className={styles.section}>
                            <span className="subtitle">Films</span>
                            <ul className="ml-3 my-4">
                                {complexData?.films?.map((film, index) => (
                                    <li
                                        key={index}
                                        className="button"
                                        onClick={() => dispatch(setType({ type: "films", url: film.url }))}
                                    >
                                        {film.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.section}>
                            <p className="subtitle">Homeworld</p>
                            <p
                                className="ml-3 button"
                                onClick={() => dispatch(setType({ type: "planets", url: complexData.homeworld.url }))}
                            >
                                {complexData?.homeworld?.name}
                            </p>
                        </div>

                        <div className={styles.section}>
                            <span className="subtitle">Starships</span>
                            <ul className="ml-3  my-4">
                                {complexData?.starships?.map((starship, index) => (
                                    <li
                                        key={index}
                                        className="button"
                                        onClick={() => dispatch(setType({ type: "starships", url: starship.url }))}
                                    >
                                        {starship.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.section}>
                            <span className="subtitle">Vehicles</span>
                            <ul className="ml-3  my-4">
                                {complexData?.vehicles?.map((vehicle, index) => (
                                    <li
                                        key={index}
                                        className="button"
                                        onClick={() => dispatch(setType({ type: "vehicles", url: vehicle.url }))}
                                    >
                                        {vehicle.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                }
                <div className={styles.action}>
                    <button className={`button ${styles.moreBtn}`} onClick={handleMore}>
                        {
                            more ? <IoIosArrowUp /> : <IoIosArrowDown />
                        }
                    </button>
                </div>
            </div>
        </>
    )
}
