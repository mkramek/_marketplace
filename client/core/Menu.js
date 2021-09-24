import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import frameLogo from '../assets/logo/Frame.png';
import allShopsIco from '../assets/ico/all_shops_ico.png';
import allAuctionsIco from '../assets/ico/all_auctions_ico.png';
import cartIco from '../assets/ico/cart_icop.png';
import myShopsIco from '../assets/ico/my_shops_ico.png';
import myAuctionsIco from '../assets/ico/my_auctions_ico.png';
import myProfIco from '../assets/ico/my_profile_ico.png';
import exitIco from '../assets/ico/exit_ico.png';
import signUpIco from '../assets/ico/sign_up_ico.png';
import { Menu as MenuIcon } from '@material-ui/icons';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import auth from './../auth/auth-helper';

import Badge from '@material-ui/core/Badge';
import cart from './../cart/cart-helper';
import { ClickAwayListener, Collapse } from '@material-ui/core';
import { useStyles } from '../styles';
import theme from '../theme';

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return { backgroundColor: '#80b392', color: 'white' }
  else
    return { backgroundColor: 'rgba(0,0,0,0)', color: 'black' }
}
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path))
    return { color: '#bef67a' }
  else
    return { color: '#ffffff' }
}

const Menu = withRouter(({ history }) => {
  const [mobile, setMobile] = React.useState(true);
  const classes = useStyles(theme);

  const DesktopToolbar = () => (
    <Toolbar>
      <div>
        <Link to="/">
          <IconButton aria-label="Home">
            <img src={frameLogo} style={{ 'width': '5rem', 'margin': '0 0 0 -1rem' }} />
          </IconButton>
        </Link>
        <Link to="/shops/all">
          <Button style={isActive(history, "/shops/all")}>
            <img src={allShopsIco} />
          </Button>
        </Link>
        <Link to="/auctions/all">
          <Button style={isActive(history, "/auctions/all")}>
            <img src={allAuctionsIco} />
          </Button>
        </Link>
        <Link to="/cart">
          <Button style={isActive(history, "/cart")}>
            <Badge invisible={false} color="secondary" badgeContent={cart.itemTotal()} style={{ 'marginLeft': '7px' }}>
              <img src={cartIco} />
            </Badge>
          </Button>
        </Link>
      </div>
      <div style={{ 'position': 'absolute', 'right': '10px' }}>
        <span style={{ 'float': 'right' }}>
          {!auth.isAuthenticated() && (
            <Link to="/signup">
              <Button style={isActive(history, "/signup")}>
                <img src={signUpIco} />
              </Button>
            </Link>
          )}
          {!auth.isAuthenticated() && (
            <Link to="/signin">
              <Button style={isActive(history, "/signin")}>
                <img src={myProfIco} />
              </Button>
            </Link>
          )}
          {auth.isAuthenticated() && (<span>
            {auth.isAuthenticated().user.seller && (<>
              <Link to="/seller/shops">
                <Button style={isPartActive(history, "/seller/")}>
                  <img src={myShopsIco} />
                </Button>
              </Link>
              <Link to="/myauctions">
                <Button style={isPartActive(history, "/myauctions")}>
                  <img src={myAuctionsIco} />
                </Button>
              </Link>
            </>
            )}
            <Link to={"/user/" + auth.isAuthenticated().user._id}>
              <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>
                <img src={myProfIco} />
              </Button>
            </Link>
            <Button color="inherit" onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>
              <img src={exitIco} />
            </Button>
          </span>)}
        </span>
      </div>
    </Toolbar>
  );

  const MobileToolbar = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickAway = () => setOpen(false);
    const handleClick = () => setOpen((prevStatus) => !prevStatus);
    return (
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={handleClickAway}
      >
        <>
          <Toolbar>
            <div>
              <IconButton style={{ marginRight: 20 }} onClick={handleClick}>
                <MenuIcon fontSize={'large'} />
              </IconButton>
              <Link to="/">
                <IconButton aria-label="Home" style={{ backgroundColor: 'transparent' }}>
                  <img src={frameLogo} style={{ 'width': '5rem', 'margin': '0 0 0 -1rem' }} />
                </IconButton>
              </Link>
            </div>
          </Toolbar>
          <Collapse in={open}>
            <div className={classes.menu_toolbar_dropdown}>
              <Link to="/shops/all">
                <Button style={isActive(history, "/shops/all")} className={classes.menu_dropdown_btn}>
                  <img src={allShopsIco} />
                  <Typography className={classes.menu_dropdown_btn_label}>Sklepy</Typography>
                </Button>
              </Link>
              <Link to="/auctions/all">
                <Button style={isActive(history, "/auctions/all")} className={classes.menu_dropdown_btn}>
                  <img src={allAuctionsIco} />
                  <Typography className={classes.menu_dropdown_btn_label}>Aukcje</Typography>
                </Button>
              </Link>
              <Link to="/cart">
                <Button style={isActive(history, "/cart")} className={classes.menu_dropdown_btn}>
                  <Badge invisible={false} color="secondary" badgeContent={cart.itemTotal()}>
                    <img src={cartIco} />
                  </Badge>
                  <Typography className={classes.menu_dropdown_btn_label}>Koszyk</Typography>
                </Button>
              </Link>
              {!auth.isAuthenticated() && (
                <Link to="/signup">
                  <Button style={isActive(history, "/signup")} className={classes.menu_dropdown_btn}>
                    <img src={signUpIco} />
                    <Typography className={classes.menu_dropdown_btn_label}>Zarejestruj się</Typography>
                  </Button>
                </Link>
              )}
              {!auth.isAuthenticated() && (
                <Link to="/signin">
                  <Button style={isActive(history, "/signin")} className={classes.menu_dropdown_btn}>
                    <img src={myProfIco} />
                    <Typography className={classes.menu_dropdown_btn_label}>Zaloguj się</Typography>
                  </Button>
                </Link>
              )}
              {auth.isAuthenticated() && (<>
                {auth.isAuthenticated().user.seller && (
                  <Link to="/seller/shops">
                    <Button style={isPartActive(history, "/seller/")} className={classes.menu_dropdown_btn}>
                      <img src={myShopsIco} />
                      <Typography className={classes.menu_dropdown_btn_label}>Moje sklepy</Typography>
                    </Button>
                  </Link>
                )}
                {auth.isAuthenticated().user.seller && (
                  <Link to="/myauctions">
                    <Button style={isPartActive(history, "/myauctions")} className={classes.menu_dropdown_btn}>
                      <img src={myAuctionsIco} />
                      <Typography className={classes.menu_dropdown_btn_label}>Moje aukcje</Typography>
                    </Button>
                  </Link>
                )}
                <Link to={"/user/" + auth.isAuthenticated().user._id}>
                  <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)} className={classes.menu_dropdown_btn}>
                    <img src={myProfIco} />
                    <Typography className={classes.menu_dropdown_btn_label}>Mój profil</Typography>
                  </Button>
                </Link>
                <Button color="inherit" onClick={() => { auth.clearJWT(() => history.push('/')) }} className={classes.menu_dropdown_btn}>
                  <img src={exitIco} />
                  <Typography className={classes.menu_dropdown_btn_label}>Wyloguj się</Typography>
                </Button>
              </>)}
            </div>
          </Collapse>
        </>
      </ClickAwayListener>
    );
  };

  React.useEffect(() => {
    const setMobileView = () => {
      console.log(`Mobile view status: should be ${window.innerWidth < 900 ? 'on' : 'off'}`);
      return setMobile(window.innerWidth < 900);
    }

    setMobileView();
    window.addEventListener('resize', () => setMobileView());

    return () => {
      window.removeEventListener('resize', () => setMobileView());
    }
  }, []);

  return (
    <AppBar position="static" style={{
      marginBottom: 20,
      background: 'linear-gradient(270deg, rgba(225, 233, 202, 0.96) 53.54%, rgba(223, 237, 228, 0.11) 88.89%)', 'border': '1px solid',
      borderImageSource: 'linear-gradient(91.6deg, #8DBB52 48.64%, rgba(88, 215, 86, 0) 118.91%)'
    }}>
      {mobile ? <MobileToolbar /> : <DesktopToolbar />}
    </AppBar>
  );
});

export default Menu
