import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { fetchFilmsNames, fetchCharactersNames } from "../../lib/api";
import { setComplexData, setType } from "../../features/ShowData/ShowData.slice";
import { IStarshipsComplexData } from "../../features/ShowData/types";
import { IStarship } from "../../lib/types";

export const StarshipCard = () => {
    const [more, setMore] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const starship = useAppSelector((state) => state.currentInfo.data) as IStarship;
    const complexData = useAppSelector((state) => state.currentInfo.complexData) as IStarshipsComplexData;

    const getComplexData = async () => {
        const pilots = await fetchCharactersNames(starship.pilots);
        const films = await fetchFilmsNames(starship.films);
        
        dispatch(setComplexData({ pilots, films }));
    };

    useEffect(() => {
        if (starship) {
            getComplexData();
        }
    }, [starship]);

    const handleMore = () => {
        setMore(!more);
    };
    
    return (
        <>
            <div className="card my-6 p-5">
                <div className={styles.cardHeader}>
                    <span className="title">{starship?.name}</span>
                    <p><strong>Model:</strong> {starship?.model}</p>
                    <p><strong>Manufacturer:</strong> {starship?.manufacturer}</p>
                    <p><strong>Cost:</strong> {starship?.cost_in_credits} credits</p>
                </div>

                <div className={styles.cardBody}>
                    <p><strong>Length:</strong> {starship?.length} meters</p>
                    <p><strong>Max Speed:</strong> {starship?.max_atmosphering_speed} km/h</p>
                    <p><strong>Crew:</strong> {starship?.crew}</p>
                </div>

                {more && (
                    <div className={styles.complexInfo}>
                        <div className={styles.section}>
                            <span className="subtitle">Pilots</span>
                            <ul className="ml-3 my-4">
                                {complexData?.pilots?.map((pilot, index) => (
                                    <li
                                        key={index}
                                        className="button"
                                        onClick={() => dispatch(setType({ type: "people", url: pilot.url }))}
                                    >
                                        {pilot.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

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
                    </div>
                )}

                <div className={styles.action}>
                    <button className={`button ${styles.moreBtn}`} onClick={handleMore}>
                        {more ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </button>
                </div>
            </div>
        </>
    );
};