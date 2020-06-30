import React from "react";
import {withStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

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

function Demotbrows(props) {
    return (
        <TableRow key={props.bookName}>
            <StyledTableCell component="th" scope="row">
                <img src={props.image} className="bookimg"></img>
            </StyledTableCell>
            <StyledTableCell align="right">{props.bookName}</StyledTableCell>
            <StyledTableCell align="right">{props.authorName}</StyledTableCell>
            <StyledTableCell align="right">{props.quantity}</StyledTableCell>
            <StyledTableCell align="right">{props.bookPrice}</StyledTableCell>
            <StyledTableCell align="right">
                <IconButton><EditIcon fontSize="small"/></IconButton>
            </StyledTableCell>
            <StyledTableCell align="right">
                <IconButton><DeleteIcon fontSize="small"/></IconButton>
            </StyledTableCell>
        </TableRow>

    )

}

export default Demotbrows;