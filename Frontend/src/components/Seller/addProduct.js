import { React, useEffect, useContext, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Hidden from "@material-ui/core/Hidden";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import {
    Link,
    Switch,
    useNavigate,
    useParams
} from "react-router-dom";
import { ProductList } from '../productList';
import Product from '../productTile';
import { Controller, useFieldArray, useForm } from "react-hook-form";
import AuthContext from '../Auth/authProvider';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';


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

}));


export const AddProduct = ({ edit = false }) => {
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState();
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate()
    var fetchUrl = product?.id ? "/seller/editProduct" : "/seller/addProduct";

    const axiosPrivate = useAxiosPrivate()



    let { id } = useParams();


    const { handleSubmit, control, register, reset, setValue } = useForm({
        defaultValues: {
            "details": [{ "name": "", "value": "" }]
        },
    });

    const { fields, remove, append } = useFieldArray({
        control,
        name: "details"
    })

    const getProductDetails = async () => {
        const controller = new AbortController()
        try {
            const response = await axiosPrivate.get(`/product/${id}`, {
                signal: controller.signal
            });
            setProduct(response.data)
            reset(response.data)
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        const getCategories = async () => {
            try {
                const response = await axiosPrivate.get(`/seller/categories`, {
                    signal: controller.signal
                });
                if (isMounted) {
                    setCategories(response.data)
                }
            } catch (err) {
                console.error(err);
            }
        }
        getCategories()
        edit && getProductDetails()

        return () => {
            isMounted = false;
            controller.abort();
        }


    }, [auth?.accessToken])

    useEffect(() => {
        setValue('category', categories[0]?.name || '')
    }, [categories])

    useEffect(() => {
        console.log("use2")
        if (product && categories) {
            setTimeout(() => {
                setValue('category', product?.category?.name || categories[0]?.name || '')
            }, 1000)
        }
    }, [product])

    function isValidId(id) {
        return /^\+?(0|[1-9]\d*)$/.test(id);
    }

    const onSubmit = async (data) => {
        console.log(data)
        data.details.forEach(detail => {
            if (!isValidId(detail.id))
                detail.id = null
        })

        try {
            const response = await axiosPrivate.post(fetchUrl,
                JSON.stringify(data),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            navigate(id ? `/seller/product/${id}` : `/seller/products`)
        } catch (err) {
            console.log(err?.response)
        }


    }

    return (
        <div className={classes.root} >
            <CssBaseline />
            {console.log(product)}
            {categories ?

                <main className={classes.content}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("id", { required: false })} name="id" type="hidden" />
                        <Grid container className={classes.root} spacing={6}>
                            <Grid item xs={12}>
                                <h2>Product </h2>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={6} sm={3}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="name">Product name</InputLabel>

                                        <Controller
                                            render={({ field }) => <Input {...field} required />}
                                            name={`name`}
                                            control={control}
                                            defaultValue={""} // make sure to set up defaultValue
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="imageURL">Product imageURL</InputLabel>

                                        <Controller
                                            render={({ field }) => <Input {...field} required />}
                                            name={`imageURL`}
                                            control={control}
                                            defaultValue={""} // make sure to set up defaultValue
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6} sm={3}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="description">Description</InputLabel>

                                        <Controller
                                            render={({ field }) => <Input {...field} required />}
                                            name={`description`}
                                            control={control}
                                            defaultValue={""} // make sure to set up defaultValue
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <InputLabel htmlFor="price">Price</InputLabel>

                                    <FormControl fullWidth>

                                        <Controller
                                            render={({ field }) => <Input {...field} type="number" required />}
                                            name={`price`}
                                            control={control}
                                        // make sure to set up defaultValue
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <InputLabel htmlFor="quantity">Quantity</InputLabel>

                                    <FormControl fullWidth>

                                        <Controller
                                            render={({ field }) => <Input {...field} type="number" required />}
                                            name={`quantity`}
                                            control={control}
                                        // make sure to set up defaultValue
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6} sm={4}>
                                    <FormControl className={classes.formControl} fullWidth >
                                        <InputLabel htmlFor="c-t-label">Product category</InputLabel>
                                        <Controller
                                            render={({ field }) => (
                                                <Select {...field}   >
                                                    {categories?.map((categoryy, key) => {
                                                        return <MenuItem key={key} value={categoryy.name} >{categoryy.name}</MenuItem>
                                                    })}
                                                </Select>
                                            )}
                                            control={control}
                                            name="category"
                                            defaultValue={categories[0]?.name || ''}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={6} sm={4}>
                                    <h3>Product details</h3>
                                </Grid>
                            </Grid>


                            {fields.map((detail, index) => {
                                return (
                                    <Grid container key={detail.id} spacing={6}>

                                        <FormControl fullWidth>
                                            {/* <input {...register(`details[${index}].id`)} value={detail.id || ""} name={`details[${index}].id`} type="hidden" /> */}
                                        </FormControl>
                                        <Grid item xs={12}>


                                            <Grid container spacing={4} key={detail.id}>




                                                <Grid item xs={6} sm={3}>
                                                    <input {...register(`details[${index}].id`)} value={detail.id || ""}
                                                        name={`details[${index}].id`} type="hidden" />
                                                    <FormControl fullWidth>
                                                        <InputLabel htmlFor="name">Name</InputLabel>

                                                        <Controller
                                                            render={({ field }) => <Input {...field} required />}
                                                            name={`details.${index}.name`}
                                                            control={control}
                                                            defaultValue={detail.name} // make sure to set up defaultValue
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <FormControl fullWidth>
                                                        <InputLabel htmlFor="value">Value</InputLabel>

                                                        <Controller
                                                            render={({ field }) => <Input {...field} required />}
                                                            name={`details.${index}.value`}
                                                            control={control}
                                                            defaultValue={detail.value} // make sure to set up defaultValue
                                                        />
                                                    </FormControl>
                                                </Grid>

                                                <Hidden smDown>
                                                    <Grid item sm={1}>
                                                        <Tooltip title="Add" aria-label="add">
                                                            <AddIcon onClick={() => append({ "name": "", "value": "" })} />
                                                        </Tooltip>
                                                        {index > 0 &&
                                                            <Tooltip title="Remove" aria-label="remove">
                                                                <DeleteIcon onClick={() => remove(index)} />
                                                            </Tooltip>
                                                        }
                                                    </Grid>
                                                </Hidden>

                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} />
                                    </Grid>
                                )
                            })}
                            <Grid item xs={12}>
                                <FormControl>
                                    <Button type="submit" variant="contained" color="primary">Save</Button>
                                </FormControl>
                            </Grid>


                        </Grid>
                    </form>
                </main>
                : <h3>Please add a category</h3>
            }

        </div >

    )
}
