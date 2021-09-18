import * as React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { Table } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TablePagination } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';


const columns = [
    { id: 'sr_no', label: 'Sr. no', minWidth: 170 },
    { id: 'items', label: 'Items', minWidth: 100 },
    {
        id: 'totalQuantity',
        label: 'Total Quantity',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'totalPrice',
        label: 'Total price',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'placedAt',
        label: 'PlacedAt',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];


function createData(sr_no, items, totalQuantity, totalPrice, status, placedAt, id) {
    //const density = population / size;
    return { sr_no, items, totalQuantity, totalPrice, status, placedAt, id };
}



export default function OrderListTable({ orders, viewOrderURL, link }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    var srNo = 1;




    const rows = [
        //the first column wont show
        createData('India', 'IN', 1324171354, 3287263, 555), // if u delete this column the second column wont show


    ];
    orders?.forEach(order => {

        rows.push(createData(srNo,
            <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: '20rem' }}>
                <Typography noWrap >
                    {order?.orderItems?.length > 1 ?
                        order?.orderItems?.[0]?.product?.name + "..."
                        : order?.orderItems?.[0]?.product?.name}
                </Typography>
            </div>,
            order?.totalItems,
            order?.totalPrice,
            order?.status,
            order?.placedAt,
            order?.id

        ))
        srNo++;
    })

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>

                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ top: 57, minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                let id = row.id;
                                console.log(viewOrderURL)
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (

                                                <TableCell key={column.id} align={column.align}>

                                                    <Link to={viewOrderURL + id} className={link} >
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </Link>
                                                </TableCell>

                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length - 1}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
