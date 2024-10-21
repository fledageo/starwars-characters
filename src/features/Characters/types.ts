import { ICharacter } from "../../lib/types";

export interface IState{
    list: ICharacter[]
    currentPage:number
    charCount:number
    previousPage:number | null
    nextPage:number | null
}

export interface IGetCharsResponse{
    count: number; 
    next: string | null; 
    previous: string | null; 
    results: ICharacter[]; 
}

export interface ISearchPayload{
    value:string
    page:number | null
}