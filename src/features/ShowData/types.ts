import { ICharacter, IFilm, IPlanet, ISpecies, IStarship, IVehicle } from "../../lib/types";

export interface IState {
    type: ICardType | null
    data: ICharacter | IFilm | IVehicle | IStarship | ISpecies | IPlanet | null
    complexData: ICharacterComplexData |
    IFilmComplexData |
    IPlanetComplexData |
    IVehiclesComplexData | 
    ISpeciesComplexData | null
}

export interface ICharacterComplexData {
    homeworld: IFetchNamesData
    species: IFetchNamesData[]
    starships: IFetchNamesData[]
    vehicles: IFetchNamesData[]
    films: IFetchNamesData[]
}
export interface IFilmComplexData {
    characters: IFetchNamesData[]
    planets: IFetchNamesData[]
    starships: IFetchNamesData[]
    vehicles: IFetchNamesData[]
    species: IFetchNamesData[]
}
export interface IPlanetComplexData {
    films: IFetchNamesData[]
    residents: IFetchNamesData[]
}

export interface ISpeciesComplexData {
    homeworld: IFetchNamesData
    people: IFetchNamesData[]
    films: IFetchNamesData[]
}

export interface IStarshipsComplexData {
    pilots?: IFetchNamesData[]
    films: IFetchNamesData[]
}

export interface IVehiclesComplexData {
    pilots: IFetchNamesData[]
    films: IFetchNamesData[]
}

export interface IFetchNamesData {
    name: string,
    url: string
}
export interface ICardType {
    type: "people" | "planets" | "species" | "starships" | "vehicles" | "films"
    url: string
}

