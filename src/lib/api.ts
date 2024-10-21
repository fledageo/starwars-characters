import { IGetCharsResponse, ISearchPayload } from "../features/Characters/types"

export const getCharactersApi = async (page: number): Promise<IGetCharsResponse> => {
    const response = await fetch(`https://swapi.dev/api/people/?page=${page}`)
        .then(res => res.json());

    return response;
}

export const searchCharactersApi = async (payload: ISearchPayload): Promise<IGetCharsResponse> => {
    const value = payload.value
    const page = payload.page || 1

    const response = await fetch(`https://swapi.dev/api/people/?search=${value}&page=${page}`)
        .then(res => res.json());

    return response;
}

export const fetchInfoByURL = async (url: string) => {
    const response = await fetch(url)
        .then(res => res.json());
    return response
}

export const fetchHomeworldName = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return {name:data.name,url:data.url}
};

export const fetchFilmsNames = async (films: string[]) => {
    const filmPromises = films.map((url) => fetch(url).then(res => res.json()));
    const filmData = await Promise.all(filmPromises);
    return filmData.map(film => ({name:film.title,url:film.url}))
};

export const fetchVehiclesNames= async (vehicles: string[]) => {
    const vehiclePromises = vehicles.map((url) => fetch(url).then(res => res.json()));
    const vehicleData = await Promise.all(vehiclePromises);
    return vehicleData.map(vehicle => ({name:vehicle.name,url:vehicle.url}))
};


export const fetchStarshipsNames = async (starships: string[]) => {
    const starshipPromises = starships.map((url) => fetch(url).then(res => res.json()));
    const starshipData = await Promise.all(starshipPromises);
    return starshipData.map(starship => ({name:starship.name,url:starship.url}))
};

export const fetchSpeciesNames = async (species: string[]) => {
    const speciesPromises = species.map((url) => fetch(url).then(res => res.json()));
    const speciesData = await Promise.all(speciesPromises);
    return speciesData.map(spec => ({name:spec.name,url:spec.url}))
};

export const fetchPlanetNames = async (planets: string[]) => {
    const planetsPromises = planets.map((url) => fetch(url).then(res => res.json()));
    const planetsData = await Promise.all(planetsPromises);
    return planetsData.map(planet => ({name:planet.name,url:planet.url}))
};

export const fetchCharactersNames = async (characters: string[]) => {
    const charactersPromises = characters.map((url) => fetch(url).then(res => res.json()));
    const charactersData = await Promise.all(charactersPromises);
    return charactersData.map(character=> ({name:character.name,url:character.url}))
};
