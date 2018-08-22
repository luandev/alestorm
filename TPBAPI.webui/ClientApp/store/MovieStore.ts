import { fetch, addTask } from 'domain-task';
import { Reducer } from 'redux';
import { IAppThunkAction } from '.';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface MovieStoreState {
    isLoading: boolean;
    MovieQuery?: string;
    forecasts: WeatherForecast[];
}

export interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestMovieStoreAction {
    type: 'REQUEST_WEATHER_FORECASTS';
    MovieQuery: string;
}

interface ReceiveMovieStoreAction {
    type: 'RECEIVE_WEATHER_FORECASTS';
    MovieQuery: string;
    forecasts: WeatherForecast[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestMovieStoreAction | ReceiveMovieStoreAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    getMovie: (MovieQuery: string): IAppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (MovieQuery !== getState().movieStore.MovieQuery) {
            let fetchTask = fetch(`api/SampleData/MovieStore?startDateIndex=${ MovieQuery }`)
                .then(response => response.json() as Promise<WeatherForecast[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_WEATHER_FORECASTS', MovieQuery: MovieQuery, forecasts: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_WEATHER_FORECASTS', MovieQuery: MovieQuery });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: MovieStoreState = { forecasts: [], isLoading: false };

export const reducer: Reducer<MovieStoreState, KnownAction> = (state: MovieStoreState | undefined, incomingAction: KnownAction) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        //case 'REQUEST_WEATHER_FORECASTS':
        //    return {
        //        MovieQuery: action.MovieQuery,
        //        forecasts: state.forecasts,
        //        isLoading: true
        //    };
        //case 'RECEIVE_WEATHER_FORECASTS':
        //    // Only accept the incoming data if it matches the most recent request. This ensures we correctly
        //    // handle out-of-order responses.
        //    if (action.MovieQuery === state.MovieQuery) {
        //        return {
        //            MovieQuery: action.MovieQuery,
        //            forecasts: action.forecasts,
        //            isLoading: false
        //        };
        //    }
        //    break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            //const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
