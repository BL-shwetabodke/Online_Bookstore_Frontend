import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import axios from 'axios';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ReactPaginate from 'react-paginate';
import '../../css/Demotb.css';
import Demotbrows from "./Demotbrows";

const StyledTableCell = withStyles((theme) => ({
    head: {
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
export default class Dem extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            count: "",
            booksPerPage: 5,
            offset: 0,
            currentPage: 0
        };
        this.handlePageClick = this.handlePageClick.bind(this);

    }

    deleteItem(i) {
        const {items} = this.state;
        items.splice(i, 1);
        this.setState({items});
    }

    onRowUpdate(newData, oldData) {
        const {items} = this.state;
        items[items.indexOf(oldData)] = newData;
        this.setState({items});
    }

    getBooks() {
        axios

            .get("http://www.json-generator.com/api/json/get/cfAdcUThsO?indent=2")

            .then(response => {
                const booksArray = response.data.booksArray;
                const slice = booksArray.slice(this.state.offset, this.state.offset + this.state.booksPerPage)
                const postData = slice.map(pd =>

                    <Demotbrows
                        key={pd.id}
                        bookName={pd.bookName}
                        authorName={pd.authorName}
                        bookPrice={pd.bookPrice}
                        image={pd.image}
                        quantity={pd.quantity}
                    />
                )


                this.setState({
                    count: response.data.booksArray.length,
                    pageCount: Math.ceil(booksArray.length / this.state.booksPerPage),
                    items: response.data.booksArray,
                    postData

                })
            })

            .catch(error => this.setState({error, isLoading: false}));
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.booksPerPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getBooks()
        });

    };

    componentDidMount() {
        this.getBooks();
    }

    render() {
        const {classes} = this.props;
        return (
            <Paper className="containerPaper">
                <Table>
                    <TableHead style={{backgroundColor: "#b90f4b"}}>
                        <TableRow>
                            <StyledTableCell>Book Image</StyledTableCell>
                            <StyledTableCell align="right">Book Name</StyledTableCell>
                            <StyledTableCell align="right">Author Name&nbsp;</StyledTableCell>
                            <StyledTableCell align="right">Quantity&nbsp;</StyledTableCell>
                            <StyledTableCell align="right">Price&nbsp;</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {this.state.postData}

                    </TableBody>
                </Table>
                <div className="pagingdiv">
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>
                </div>
            </Paper>
        )
    };
}