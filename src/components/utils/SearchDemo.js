import React, {Component} from 'react';
import "../utils/SearchDemo.css";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';

class SearchDemo extends Component {
    render() {
        return (
            <div className="searchBox">
                <div className="searchIcon">
                    <SearchIcon/>
                </div>
                <InputBase fullWidth
                           id="searchText"
                           placeholder=" Search"
                           className="inputRoot inputInput"
                           inputProps={{'aria-label': 'search'}}
                           onChange={(event) => this.returnSearchTextValue(event.target.value)}
                />
            </div>
        );
    }

}

export default SearchDemo;