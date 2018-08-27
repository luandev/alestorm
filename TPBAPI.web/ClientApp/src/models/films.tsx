/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
// const API = "https://my-json-server.typicode.com/luandev/alestorm/";
import { MenuItem } from "@blueprintjs/core";
import { ItemPredicate, ItemRenderer } from "@blueprintjs/select";
import * as React from "react";


export interface IGenre {
    id: number;
    name: string;
}

export interface IProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface IProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface ISpokenLanguage {
    iso_639_1: string;
    name: string;
}

export interface IFilm {
    adult: boolean;
    original_title: string;
    release_date?: Date;
    title: string;
    video: boolean;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    id: number;
    media_type: string;
    popularity: number;
    // adult: boolean;
    // backdrop_path: string;
    // belongs_to_collection?: any;
    // budget: number;
    // genres: IGenre[];
    // homepage: string;
    // id: number;
    // imdb_id: string;
    // original_language: string;
    // original_title: string;
    // overview: string;
    // popularity: number;
    // poster_path: string;
    // production_companies: IProductionCompany[];
    // production_countries: IProductionCountry[];
    // release_date: string;
    // revenue: number;
    // runtime: number;
    // spoken_languages: ISpokenLanguage[];
    // status: string;
    // tagline: string;
    // title: string;
    // video: boolean;
    // vote_average: number;
    // vote_count: number;

    isDownloading: boolean;
    downloadProgress: number;
}



export async function getMovies(q?: string): Promise<IFilm[]> {
    const formData = new FormData();
    formData.append('query', q);

    return await api<IFilm[]>('http://localhost:52918/api/TMDB/', formData)
}


async function api<T>(url: string, data: any): Promise<T> {
    try {
        const request = await fetch(url, {
            headers: { 'Accept-Encoding': 'gzip, deflate, br' },
            method: "POST",
            body: data
        });
        if (request.ok) {
            const response = await request.json();
            return response as T;
        }
        else {
            throw new Error(request.statusText)
        }
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

/** Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top */
// export const TOP_100_FILMS: IFilm[] = [].map((m, index) => ({ ...m, rank: index + 1 }));

export const renderFilm: ItemRenderer<IFilm> = (film, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    const text = `${film.id}. ${film.title}`;
    return (
        <MenuItem
            active={modifiers.active}
            disabled={modifiers.disabled}
            label={film.title}
            key={film.id}
            onClick={handleClick}
            text={highlightText(text, query)}
        />
    );
};

export const renderInputValue = (film: IFilm) => film.title;


export const filterFilm: ItemPredicate<IFilm> = (query, film) => {
    return `${film.id}. ${film.title.toLowerCase()} ${film.release_date}`.indexOf(query.toLowerCase()) >= 0;
};

function highlightText(text: string, query: string) {
    let lastIndex = 0;
    const words = query
        .split(/\s+/)
        .filter(word => word.length > 0)
        .map(escapeRegExpChars);
    if (words.length === 0) {
        return [text];
    }
    const regexp = new RegExp(words.join("|"), "gi");
    const tokens: React.ReactNode[] = [];
    while (true) {
        const match = regexp.exec(text);
        if (!match) {
            break;
        }
        const length = match[0].length;
        const before = text.slice(lastIndex, regexp.lastIndex - length);
        if (before.length > 0) {
            tokens.push(before);
        }
        lastIndex = regexp.lastIndex;
        tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
    }
    const rest = text.slice(lastIndex);
    if (rest.length > 0) {
        tokens.push(rest);
    }
    return tokens;
}

function escapeRegExpChars(text: string) {
    return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

