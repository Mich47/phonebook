import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const LinkStyled = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
  text-align: center;
  padding: 8px 24px;
  max-width: 100%;
  max-height: 100%;
`;

export const NavLinkStyled = styled(NavLink)`
  display: block;
  color: inherit;
  text-decoration: none;
  text-align: center;
  padding: 8px 24px;
  max-width: 100%;
  max-height: 100%;
  &:hover,
  &:focus,
  &.active {
    @media (min-width: 900px) {
      color: yellow;
    }
  }
`;
