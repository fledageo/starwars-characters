import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { fetchCharactersNames, fetchHomeworldName, fetchFilmsNames } from "../../lib/api";
import { setComplexData, setType } from "../../features/ShowData/ShowData.slice";
import { ISpeciesComplexData } from "../../features/ShowData/types";
import { ISpecies } from "../../lib/types";

export const SpeciesCard = () => {
    const [more, setMore] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const species = useAppSelector((state) => state.currentInfo.data) as ISpecies;
    const complexData = useAppSelector((state) => state.currentInfo.complexData) as ISpeciesComplexData;

    const getComplexData = async () => {
        const people = await fetchCharactersNames(species.people);
        const homeworld = await fetchHomeworldName(species.homeworld);
        const films = await fetchFilmsNames(species.films);

        dispatch(setComplexData({ people, homeworld, films }));
    };

    useEffect(() => {
        if (species) {
            getComplexData();
        }
    }, [species]);

    const handleMore = () => {
        setMore(!more);
    };
    
    return (
        <>
            <div className="card my-6 p-5">
                <div className={styles.cardHeader}>
                    <span className="title">{species?.name}</span>
                    <p><strong>Classification:</strong> {species?.classification}</p>
                    <p><strong>Language:</strong> {species?.language}</p>
                    <p><strong>Average Lifespan:</strong> {species?.average_lifespan} years</p>
                </div>

                <div className={styles.cardBody}>
                    <p><strong>Designation:</strong> {species?.designation}</p>
                </div>

                {more && (
                    <div className={styles.complexInfo}>
                        <div className={styles.section}>
                            <span className="subtitle">Homeworld</span>
                            <p className="ml-3 my-4">{complexData?.homeworld?.name}</p>
                        </div>

                        <div className={styles.section}>
                            <span className="subtitle">People</span>
                            <ul className="ml-3 my-4">
                                {complexData?.people?.map((person, index) => (
                                    <li
                                        key={index}
                                        className="button"
                                        onClick={() => dispatch(setType({ type: "people", url: person.url }))}
                                    >
                                        {person.name}
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