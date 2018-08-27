import { Omnibar } from "@blueprintjs/select";
import * as Films from "src/models/films";
import * as React from 'react';
import { MenuItem, Button } from "@blueprintjs/core";
import * as MovieStore from 'src/store/movie';

import "./search.css"
import { connect } from "react-redux";
import { IApplicationState } from "src/store";
import { RouteComponentProps } from "react-router";

type MoviesProps = MovieStore.IMovieStore
    & typeof MovieStore.actionCreators
    & RouteComponentProps<{ id: string }>;


class SearchBar extends React.Component<MoviesProps, {}> {
  
    constructor(props : MoviesProps) {
        super(props);
    }

    public render() {
        // const FilmSelect = Select.ofType<Films.IFilm>();
        const Omn = Omnibar.ofType<Films.IFilm>();

        return (
            <div className="search">
                <Button minimal={true} autoFocus={true} icon="search" text="Click to show Omnibar" onClick={ (ev:any) => this.HandleClick()} />         
                
                <Omn
                    onClose={(x) => this.props.ToggleSearch()}
                    isOpen={this.props.searchIsOpen}
                    items={this.props.movies}
                    itemRenderer={Films.renderFilm}
                    onQueryChange={(ev) => this.HandleQuery(ev)}
                    onItemSelect={(ev) => this.props.history.push(`/Movie/${ev.id}`)}
                    noResults={<MenuItem disabled={true} text="No results." />} />
            </div>
        );
    }
    private HandleClick() {
        this.props.ToggleSearch();
        this.props.history.push(`/`);
    }

   

    private HandleQuery(ev: string): any {
        if(ev.length > 3) {
            this.props.Load(ev);
        }
        else{
            this.props.history.push(`/`)
        }
    }
}

const SearchBarComp = connect((state: IApplicationState) => state.movieStore, MovieStore.actionCreators)(SearchBar);
export default SearchBarComp;