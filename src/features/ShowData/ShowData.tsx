import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../lib/hooks"
import styles from "./ShowData.module.css"
import { getInfoByURL } from "./ShowData.slice"
import { CharacterCard } from "../../components/Cards/CharacterCard"
import { FilmCard } from "../../components/Cards/FilmCard"
import { PlanetCard } from "../../components/Cards/PlanetsCard"
import { VehicleCard } from "../../components/Cards/VehiclesCard"
import { StarshipCard } from "../../components/Cards/StarshipCard"
import { SpeciesCard } from "../../components/Cards/SpeciesCard"

export const ShowData = () => {

    const dispatch = useAppDispatch()
    const type = useAppSelector(state => state.currentInfo.type)
    const data = useAppSelector(state => state.currentInfo.data)

    useEffect(() => {
        if (type) {
            dispatch(getInfoByURL(type.url))
        }
    }, [type])

    return (
        <>
            <div className={styles.wrapper}>
                {
                    type?.type == "people" && data ? <CharacterCard /> :
                        type?.type == "films" ? <FilmCard /> :
                            type?.type == "planets" ? <PlanetCard /> :
                                type?.type == "vehicles" ? <VehicleCard /> :
                                    type?.type == "starships" ? <StarshipCard /> :
                                        type?.type == "species" ? <SpeciesCard /> : ""
                }
            </div>
        </>
    )
}
