import React, { useContext, useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

import SellerNavBar from './Seller/sellerNavBar';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import AuthContext from './Auth/authProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { useQuery } from '../hooks/useQuery';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function CustomAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const axiosPrivate = useAxiosPrivate()
  const { auth, setAuth } = useContext(AuthContext)
  const isLoggedIn = auth?.accessToken;
  const isSeller = auth?.userRole === 'SELLER'

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const notLoggedIn = !auth?.accessToken;


  const query = useQuery()
  const productName = query.get('name')
  const [productNameQuery, setProductNameQuery] = useState(productName || '');

  const navigate = useNavigate()

  const onChangeQuery = e => {
    setProductNameQuery(e?.target?.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?name=${productNameQuery}`)
  }


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = async () => {
    // Logout


    try {
      const response = await axiosPrivate.get(`/logout/`);
      console.log(response.data);
      setAuth(prev => {
        return {
          userEmail: '',
          userRole: '',
          accessToken: ''
        }
      });
    } catch (err) {
      console.error(err);
    }


    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p onClick={handleMenuClose}>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>



          {!isSeller &&
            <form onSubmit={onSubmit}>
              <TextField id="outlined-basic" variant="outlined" name="name" value={productNameQuery} onChange={onChangeQuery} />
              <Button type="submit">Search</Button>
            </form>
          }
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {isLoggedIn &&
              <Button variant="outlined" onClick={handleMenuClose}>
                Logout
              </Button>
            }
          </div>
          {notLoggedIn &&
            <>
              <Button component={Link} to="/login" variant="outlined" >
                Login
              </Button>
              <Button component={Link} to="/register" variant="outlined" >
                Register
              </Button>
            </>}
        </Toolbar>
      </AppBar >
      {/* {isLoggedIn && renderMobileMenu} */}
      {/* {renderMenu} */}
      {isSeller && <SellerNavBar />}




    </div >
  );
}
