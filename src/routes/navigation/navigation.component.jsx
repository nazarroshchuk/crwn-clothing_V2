import {Fragment, useContext} from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { LogoContainer, NavigationContainer, NavLink, NavLinkSContainer } from "./navigation.styles";
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser();
  }
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinkSContainer>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {
            currentUser
              ? <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
              : <Link className='nav-link' to='/auth'>
                  SIGN IN
                </Link>
          }
          <CartIcon />
        </NavLinkSContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
