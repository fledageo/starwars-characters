import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { fetchPlanetNames, fetchSpeciesNames, fetchStarshipsNames, fetchVehiclesNames, fetchCharactersNames } from "../../lib/api";
import { setComplexData, setType } from "../../features/ShowData/ShowData.slice";
import { IFilmComplexData } from "../../features/ShowData/types";
import { IFilm } from "../../lib/types";

export const FilmCard = () => {
    const [more, setMore] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const film = useAppSelector((state) => state.currentInfo.data) as IFilm
    const complexData = useAppSelector((state) => state.currentInfo.complexData) as IFilmComplexData;

    const getComplexData = async () => {
        const characters = await fetchCharactersNames(film.characters);
        const planets = await fetchPlanetNames(film.planets);
        const starships = await fetchStarshipsNames(film.starships);
        const vehicles = await fetchVehiclesNames(film.vehicles);
        const species = await fetchSpeciesNames(film.species);

        dispatch(setComplexData({ characters, planets, starships, vehicles, species }));
    }

    useEffect(() => {
        getComplexData()
    }, [film])

    const handleMore = async () => {
        setMore(!more);
    };
    
    return (
        <>
            <div className="card my-6 p-5">
                <div className={styles.cardHeader}>
                    <span className="title">{film?.title}</span>
                    <p><strong>Director:</strong> {film?.director}</p>
                    <p><strong>Producer:</strong> {film?.producer}</p>
                    <p><strong>Release Date:</strong> {film?.release_date}</p>
                </div>

                <div className={styles.cardBody}>
                    <p><strong>Episode ID:</strong> {film?.episode_id}</p>
                    <p><strong>Opening Crawl:</strong></p>
                    <p className={styles.openingCrawl}>{film?.opening_crawl}</p>
                </div>

                {more && (
                    <div className={styles.complexInfo}>
                        <div className={styles.section}>
                            <span className="subtitle">Characters</span>
                            <ul className="ml-3 my-4">
                                {complexData?.characters?.map((character, index) => (
                                    <li
                                        key={index}
                                        className="button"
                                        onClick={() => dispatch(setType({ type: "people", url: character.url }))}
                                    >
                                        {character.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.section}>
                            <span className="subtitle">Planets</span>
                            <ul className="ml-3 my-4">
                                {complexData?.planets?.map((planet, index) => (
                                    <li
                                        key={index}
                                        className="button"
                                        onClick={() => dispatch(setType({ type: "planets", url: planet.url }))}
                                    >
                                        {planet.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.section}>
                            <span className="subtitle">Starships</span>
                            <ul className="ml-3 my-4">
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
                            <ul className="ml-3 my-4">
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

                        <div className={styles.section}>
                            <span className="subtitle">Species</span>
                            <ul className="ml-3 my-4">
                                {complexData?.species?.map((species, index) => (
                                    <li
                                        key={index}
                                        className="button"
                                        onClick={() => dispatch(setType({ type: "species", url: species.url }))}
                                    >
                                        {species.name}
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