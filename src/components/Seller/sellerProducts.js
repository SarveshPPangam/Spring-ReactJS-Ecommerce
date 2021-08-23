import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ProductList} from '../productList';
import Product from '../productTile';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(4),
        marginLeft: 250
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    }
}));


export const SellerProducts = () => {
    const classes = useStyles();
    console.log("in sp");
    return (
        <div className={classes.root} >
            <CssBaseline />
            <main className={classes.content}>
                {/* <div className={classes.toolbar} /> */}
                <ProductList />
            </main>
        </div >
    )
}
