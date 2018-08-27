import { Reducer } from 'redux';
import { IAppThunkAction } from 'src/store';
import * as Film from 'src/models/films';

/* Actions */
interface ILoad { type: 'LOAD', apiFilms: Film.IFilm[], searchQuery: string }
interface IOpen { type: 'OPEN', movie: string }
type KnownAction = ILoad | IOpen;


/* State */
export const actionCreators = {
    Load: (search: string): IAppThunkAction<KnownAction> => async (dispatch) => {
        const data = await Film.getMovies(search);
        dispatch({ type: 'LOAD', searchQuery:search, apiFilms:data  });
    },
};


/* Reducer */
export const reducer: Reducer<IMovieStore> = (state: IMovieStore, action: KnownAction) => {
    const DEFAULT = Object.assign({}, state || DEFAULOBJ)
    switch (action.type) {
        case 'LOAD':
            DEFAULT.movies = action.apiFilms;
            DEFAULT.searchQuery = action.searchQuery;
            return DEFAULT;
    }
    return DEFAULT;
};

export interface IMovieStore {
    movies: Film.IFilm[];
    searchQuery?: string;
}

export const DEFAULOBJ = {
    movies: []
} as IMovieStore

