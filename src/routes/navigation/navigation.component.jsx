import {Fragment} from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { LogoContainer, NavigationContainer, NavLink, NavLinkSContainer } from "./navigation.styles";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selectors";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen  = useSelector(selectIsCartOpen);

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
