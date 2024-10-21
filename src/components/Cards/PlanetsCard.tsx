import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { fetchFilmsNames, fetchCharactersNames } from "../../lib/api";
import { setComplexData, setType } from "../../features/ShowData/ShowData.slice";
import { IPlanetComplexData } from "../../features/ShowData/types";
import { IPlanet } from "../../lib/types";

export const PlanetCard = () => {
    const [more, setMore] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const planet = useAppSelector((state) => state.currentInfo.data) as IPlanet;
    const complexData = useAppSelector((state) => state.currentInfo.complexData) as IPlanetComplexData;

    const getComplexData = async () => {
        const residents = await fetchCharactersNames(planet.residents);
        const films = await fetchFilmsNames(planet.films);
        
        dispatch(setComplexData({ residents, films }));
    };

    useEffect(() => {
        if (planet) {
            getComplexData();
        }
    }, [planet]);

    const handleMore = () => {
        setMore(!more);
    };
    
    return (
        <>
            <div className="card my-6 p-5">
                <div className={styles.cardHeader}>
                    <span className="title">{planet?.name}</span>
                    <p><strong>Climate:</strong> {planet?.climate}</p>
                    <p><strong>Terrain:</strong> {planet?.terrain}</p>
                    <p><strong>Population:</strong> {planet?.population}</p>
                </div>

                <div className={styles.cardBody}>
                    <p><strong>Diameter:</strong> {planet?.diameter} km</p>
                    <p><strong>Rotation Period:</strong> {planet?.rotation_period} hours</p>
                    <p><strong>Orbital Period:</strong> {planet?.orbital_period} days</p>
                </div>

                {more && (
                    <div className={styles.complexInfo}>
                        <div className={styles.section}>
                            <span className="subtitle">Residents</span>
                            <ul className="ml-3 my-4">
                                {complexData?.residents?.map((resident, index) => (
                                    <li
                                        key={index}
                                        className="button"
                                        onClick={() => dispatch(setType({ type: "people", url: resident.url }))}
                                    >
                                        {resident.name}
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