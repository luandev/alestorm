import { Reducer } from 'redux';
import { IAppThunkAction } from 'FrontSrc/Store/Store';


// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface IMovieStore {
    movieID: string;
    lastChange: number;
}


interface ILoad { type: 'LOAD', movieID: string }


type KnownAction = ILoad;
export type SocketKnowAction = ILoad;


export const actionCreators = {
    LoadMovie: (movie: string): IAppThunkAction<KnownAction> => async (dispatch) =>
        dispatch({ type: 'LOAD', movieID: movie }),
};


export const reducer: Reducer<IMovieStore> = (state: IMovieStore, action: KnownAction) => {
    const DEFAULT = Object.assign({}, state || DEFAULOBJ)
    DEFAULT.lastChange = Date.now();

    switch (action.type) {
        case 'LOAD':
            DEFAULT.movieID = action.movieID;
            return DEFAULT;

        default:
            return DEFAULT;
    }
};


const DEFAULOBJ = {
    lastChange: Date.now(),
    movieID: ""
} as IMovieStore

