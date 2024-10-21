export interface ICharacter {
    birth_year: string;
    eye_color: string;
    films: string[]; 
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string; 
    mass: string;
    name: string;
    skin_color: string;
    created: string;
    edited: string; 
    species: string[]; 
    starships: string[]; 
    url: string; 
    vehicles: string[]; 
  }
  
  export interface IFilm {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];  
    planets: string[];     
    starships: string[];   
    vehicles: string[];    
    species: string[];     
    created: string;
    edited: string;
    url: string;
  }

  export interface IPlanet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[];     
    films: string[];        
    created: string;
    edited: string;
    url: string;
  }

  export interface ISpecies {
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    skin_colors: string;
    hair_colors: string;
    eye_colors: string;
    average_lifespan: string;
    homeworld: string;       
    language: string;
    people: string[];        
    films: string[];         
    created: string;
    edited: string;
    url: string;
  }

  export interface IStarship {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
    pilots: string[];        
    films: string[];         
    created: string;
    edited: string;
    url: string;
  }

  export interface IVehicle {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    vehicle_class: string;
    pilots: string[];        
    films: string[];         
    created: string;
    edited: string;
    url: string;
  }