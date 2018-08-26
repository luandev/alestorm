import { Select, Suggest } from "@blueprintjs/select";
import * as Films from "src/models/films";
import * as React from 'react';
import { MenuItem, Button, Card } from "@blueprintjs/core";
import * as MovieStore from 'src/store/movie';

import "./search.css"
import { connect } from "react-redux";
import { IApplicationState } from "src/store";
import { RouteComponentProps } from "react-router";

type MoviesProps = MovieStore.IMovieStore
    & typeof MovieStore.actionCreators
    & RouteComponentProps<{ id: string }>;

class SearchBar extends React.Component<MoviesProps, {}> {

    public render() {
        const FilmSelect = Select.ofType<Films.IFilm>();
        const FilmSuggest = Suggest.ofType<Films.IFilm>();

        return (
            <Card className="search">

                {"Search: "}
                <FilmSuggest
                    items={this.props.movies}
                    itemRenderer={Films.renderFilm}
                    onQueryChange={(ev) => this.props.Load(ev)}
                    onItemSelect={(ev) => this.props.history.push(`/Movie/${ev.id}`)}
                    inputValueRenderer={Films.renderInputValue}
                    noResults={<MenuItem disabled={true} text="No results." />} />
                {" or "}
                <FilmSelect
                    items={this.props.movies}
                    itemPredicate={Films.filterFilm}
                    itemRenderer={Films.renderFilm}
                    onQueryChange={(ev) => this.props.Load(ev)}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    onItemSelect={(ev) => this.props.history.push(`/Movie/${ev.id}`)}>
                    {/* children become the popover target; render value here */}
                    <Button text={"100 top dowloads list"} rightIcon="double-caret-vertical" />
                </FilmSelect>
            </Card>
        );
    }
}

const SearchBarComp = connect((state: IApplicationState) => state.movieStore, MovieStore.actionCreators)(SearchBar);
export default SearchBarComp;