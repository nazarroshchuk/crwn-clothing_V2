import {Fragment} from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { LogoContainer, NavigationContainer, NavLink, NavLinkSContainer } from "./navigation.styles";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selectors";
import { userActions } from "../../store/user/user.actions";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen  = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  const signOutHandler = () => dispatch(userActions.signOutStart());

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
