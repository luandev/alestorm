import { Reducer } from 'redux';
import { IAppThunkAction } from 'src/store';
import * as Film from 'src/models/films';

/* Actions */
interface ILoad { type: 'LOAD', apiFilms: Film.IFilm[], searchQuery: string }
interface ILoadFull { type: 'LOADMOVIE', apiFilms: Film.IFullFilm }
interface IOpen { type: 'TOGGLESEARCH' }
type KnownAction = ILoad | IOpen | ILoadFull;


/* State */
export const actionCreators = {
    Load: (search: string): IAppThunkAction<KnownAction> => async (dispatch) => {
        if(search.length > 3){
            const data = await Film.getMovies(search);
            dispatch({ type: 'LOAD', searchQuery: search, apiFilms: data });
        }else{
            dispatch({ type: 'LOAD', searchQuery: search, apiFilms: null });
        }
    },
    LoadMovie: (mid: number): IAppThunkAction<KnownAction> => async (dispatch) => {
        const data = await Film.getMovie(mid);
        dispatch({ type: 'LOADMOVIE', apiFilms: data });
    },
    ToggleSearch: (): IAppThunkAction<KnownAction> => (dispatch) =>
        dispatch({ type: 'TOGGLESEARCH' }),
};


/* Reducer */
export const reducer: Reducer<IMovieStore> = (state: IMovieStore, action: KnownAction) => {
    const DEFAULT = Object.assign({}, state || DEFAULOBJ)
    switch (action.type) {
        case 'LOAD':
            if(action.apiFilms !== null) {
                DEFAULT.movies = action.apiFilms;
            }
            DEFAULT.searchQuery = action.searchQuery;
            return DEFAULT;
        case 'LOADMOVIE':
            DEFAULT.movie = action.apiFilms;
            return DEFAULT;
        case 'TOGGLESEARCH':
            DEFAULT.searchIsOpen = !state.searchIsOpen;
            return DEFAULT;
    }
    return DEFAULT;
};

export interface IMovieStore {
    movies: Film.IFilm[];
    movie: Film.IFullFilm;
    searchQuery?: string;
    searchIsOpen: boolean;
}

export const DEFAULOBJ = {
    movies: [],
    searchQuery: ""
} as IMovieStore

