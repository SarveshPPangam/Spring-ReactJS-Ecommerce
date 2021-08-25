import { Button, Grid, Icon, makeStyles, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import RupeeSymbol from '../../rupee.svg'
import { AppContext } from '../contexts'

const useStyles = makeStyles((theme) => ({
  title: {
    width: 600,
  },
  media: {
    height: 200,
    width: 200
    // objectFit: 'contain',
  },
  link: {
    color: 'inherit',
    textDecoration: 'inherit',
  }
}))
export const OrderItemTile = ({ orderItem }) => {
  const classes = useStyles()
  const { state } = useContext(AppContext);
  return (
    <div>
      <Grid container >
        <Grid item>
          <Link to={`/product/${orderItem?.product?.id}`} className={classes.link} >
            <Typography variant="h5" noWrap className={classes.title}>
              {orderItem?.product?.name}
            </Typography>
          </Link>

          <Typography variant="h5" noWrap>
            Total price:
            <Icon>
              <img src={RupeeSymbol} height={14} width={14} />
            </Icon>
            {orderItem?.totalPrice}
          </Typography>

          <Typography variant="h5" noWrap>
            Total quantity:
            {orderItem?.quantity}
          </Typography>
          <Typography variant="h5" noWrap>
            Ordered at: 
            {orderItem?.createdAt}
          </Typography>
    



        </Grid>
        <Grid item className={classes.media}>
          <Link to={`/product/${orderItem.product.id}`} className={classes.link} >
            <img src={orderItem.product.imageURL} width="100%" height="100%" style={{ objectFit: "contain" }} />
          </Link>
        </Grid>

      </Grid>
    </div>


  )
}
