import { Select, Suggest } from "@blueprintjs/select";
import * as Films from "src/models/films";
import * as React from 'react';
import { MenuItem, Button, Card } from "@blueprintjs/core";

import "./search.css"

export interface ILayoutProps {
    children?: React.ReactNode;
}

export class SearchBar extends React.Component<ILayoutProps, {}> {

    public render() {
        const FilmSelect = Select.ofType<Films.IFilm>();
        const FilmSuggest = Suggest.ofType<Films.IFilm>();
        return (
            <Card className="search">
                {"Search:"}
                <FilmSuggest 
                    items={Films.TOP_100_FILMS}
                    itemRenderer={Films.renderFilm}
                    onItemSelect={(ev)=> console.log(ev)}
                    inputValueRenderer={Films.renderInputValue} 
                    noResults={<MenuItem disabled={true}text="No results." />} />

                <FilmSelect
                    items={Films.TOP_100_FILMS}
                    itemPredicate={Films.filterFilm}
                    itemRenderer={Films.renderFilm}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    onItemSelect={(ev) => console.log(ev)}>
                    {/* children become the popover target; render value here */}
                    <Button text={"100 top dowloads list"} rightIcon="double-caret-vertical" />
                </FilmSelect>
            </Card>
        );
    }

}