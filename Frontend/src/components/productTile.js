import { React, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext, AppProvider } from './contexts'
import {
    Link,
} from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { Icon } from "@material-ui/core";
import RupeeSymbol from '../rupee.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 290,
        margin: 'auto',
    },
    // media: {
    //     height: 0,
    //     paddingTop:"56.25%",
    // },
    // root: {
    //     maxWidth: 300,   //VK's
    //     margin: '20px',
    // },
    media: {
        height: 200,

        // objectFit: 'contain',
    },
    // media: {
    //     height: 550,
    //     width: '100%',
    //     objectFit: 'cover'
    //   },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    }
}));

export default function ProductTile({ product }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const { state } = useContext(AppContext);
    const isSeller = state?.user?.role === 'SELLER'

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader />
            <CardMedia className={classes.media} >
                <img src={product.imageURL} width="100%" height="100%" style={{ objectFit: "contain" }} />
            </CardMedia>


            <CardContent>
                <Typography gutterBottom variant="h6" component="h2" noWrap >
                    {product.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="h3" noWrap >
                    <Icon>
                        <img src={RupeeSymbol} height={14} width={14} />
                    </Icon>
                    {product.price}
                </Typography>
                {isSeller ?

                    <Grid container >
                        <Grid item >
                            <Button variant="contained" >
                                <Link to={"/seller/editProduct/" + product.id} className={classes.link}>
                                    Edit
                                </Link>
                            </Button>
                        </Grid>
                    </Grid>
                    :
                    <Typography variant="body2" color="textSecondary" component="p" noWrap >
                        {product.description}
                    </Typography>
                }
            </CardContent>


        </Card >
    );
}