import { Reducer } from 'redux';
import { IAppThunkAction } from 'src/store';

/* Actions */
interface ILoad { type: 'LOAD' }
interface IOpen { type: 'OPEN', movie: string }
type KnownAction = ILoad | IOpen;


/* State */
export const actionCreators = {
    Load: (): IAppThunkAction<KnownAction> => (dispatch) => dispatch({ type: 'LOAD' }),
};


/* Reducer */
export const reducer: Reducer<IMovieStore> = (state: IMovieStore, action: KnownAction) => {
    const DEFAULT = Object.assign({}, state || DEFAULOBJ)
    switch (action.type) {
        case 'LOAD':
            DEFAULT.movies = FAKELOAD;
            DEFAULT.movie = null;
            return DEFAULT;
        case 'OPEN':
            DEFAULT.movie = action.movie;
            return DEFAULT;
    }
    return DEFAULT;
};



export interface IMovie {
    title: string;
    id: number;
}


export interface IMovieStore {
    movies: IMovie[];
    movie?: string;
}

export const DEFAULOBJ = {
    movies: []
} as IMovieStore

export const FAKELOAD =
    [
        { "id": 10, "title": "Avengers: Infinity War (2018)" },
        { "id": 13, "title": "The Shawshank Redemption (1994)" },
        { "id": 16, "title": "The Dark Knight (2008)" },
        { "id": 19, "title": "Pulp Fiction (1994)" },
        { "id": 22, "title": "Schindler's List (1993)" },
        { "id": 25, "title": "The Lord of the Rings" },
        { "id": 28, "title": "Inception (2010)" },
        { "id": 31, "title": "Forrest Gump (1994)" },
        { "id": 34, "title": "The Matrix (1999)" },
        { "id": 37, "title": "The Silence of the Lambs (1991)" },
        { "id": 40, "title": "Se7en (1995)" },
        { "id": 43, "title": "Léon: The Professional (1994)" },
        { "id": 46, "title": "The Usual Suspects (1995)" },
        { "id": 49, "title": "Saving Private Ryan (1998)" },
        { "id": 52, "title": "Spirited Away (2001)" },
        { "id": 55, "title": "The Green Mile (1999)" },
        { "id": 58, "title": "The Departed (2006)" },
        { "id": 61, "title": "Back to the Future (1985)" },
        { "id": 64, "title": "Terminator 2 (1991)" },
        { "id": 67, "title": "Gladiator (2000)" },
        { "id": 70, "title": "Whiplash (2014)" },
        { "id": 73, "title": "Alien (1979)" },
        { "id": 76, "title": "Memento (2000)" },
        { "id": 79, "title": "American History X (1998)" },
        { "id": 82, "title": "The Intouchables (2011)" },
        { "id": 85, "title": "The Pianist (2002)" },
        { "id": 88, "title": "Django Unchained (2012)" },
        { "id": 91, "title": "The Dark Knight Rises (2012)" },
        { "id": 94, "title": "Braveheart (1995)" },
        { "id": 97, "title": "Oldboy (2003)" },
        { "id": 100, "title": "WALL·E (2008)" },
        { "id": 103, "title": "Das Boot (1981)" },
        { "id": 106, "title": "Witness for the Prosecution (1957)" },
        { "id": 109, "title": "Inglourious Basterds (2009)" },
        { "id": 112, "title": "Eternal Sunshine of the Spotless Mind (2004)" },
        { "id": 115, "title": "Full Metal Jacket (1987)" },
        { "id": 118, "title": "Good Will Hunting (1997)" },
        { "id": 121, "title": "Deadpool (2016)" },
        { "id": 124, "title": "Snatch (2000)" },
        { "id": 127, "title": "Contact (1997)" },
        { "id": 130, "title": "Whiplash (2014)" },
        { "id": 133, "title": "Scarface (1983)" },
        { "id": 136, "title": "Schindler's List (1993)" },
        { "id": 139, "title": "Mr. Nobody (2009)" },
        { "id": 142, "title": "Mad Max (1979)" },
        { "id": 145, "title": "Raging Bull (1980)" },
        { "id": 148, "title": "The Color Purple (1985)" },
        { "id": 151, "title": "Die Hard (1988)" },
        { "id": 154, "title": "Rain Man (1988)" },
        { "id": 157, "title": "Natural Born Killers (1994)" },
        { "id": 160, "title": "Trainspotting (1996)" },
        { "id": 163, "title": "The Sixth Sense (1999)" },
        { "id": 166, "title": "Requiem for a Dream (2000)" },
        { "id": 169, "title": "The Lord of the Rings: The Two Towers (2002)" },
        { "id": 172, "title": "The Lord of the Rings: The Fellowship of the Ring (2001)" },
        { "id": 175, "title": "The Lord of the Rings: The Return of the King (2003)" },
        { "id": 178, "title": "Kill Bill: Vol. 1 (2003)" },
        { "id": 181, "title": "Kill Bill: Vol. 2 (2004)" },
        { "id": 184, "title": "Pan's Labyrinth (2006)" },
        { "id": 187, "title": "No Country for Old Men (2007)" },
        { "id": 190, "title": "District 9 (2009)" },
        { "id": 193, "title": "The Help (2011)" },
        { "id": 196, "title": "Pirates of the Caribbean: The Curse of the Black Pearl (2003)" },
        { "id": 199, "title": "Pirates of the Caribbean: Dead Man's Chest (2006)" },
        { "id": 202, "title": "Pirates of the Caribbean: At World's End (2007)" },
        { "id": 205, "title": "Once Upon a Time in Mexico (2003)" },
        { "id": 208, "title": "Corpse Bride (2005)" },
        { "id": 211, "title": "I Am Legend (2007)" },
        { "id": 214, "title": "Munich (2005)" },
        { "id": 217, "title": "Letters from Iwo Jima (2006)" },
        { "id": 220, "title": "Flags of our Fathers (2006)" },
        { "id": 223, "title": "Gravity (2013)" },
        { "id": 226, "title": "The Mist (2007)" },
        { "id": 229, "title": "Twelve Monkeys (1995)" },
        { "id": 232, "title": "The Fifth Element (1997)" },
        { "id": 235, "title": "Limitless (I) (2011)" },
        { "id": 238, "title": "Arrival (II) (2016)" },
        { "id": 241, "title": "The Abyss (1989)" },
        { "id": 244, "title": "War of the Worlds (2005)" }
    ] as IMovie[];



