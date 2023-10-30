import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { MenuData } from './MenuData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';

const Nav = styled.div`
  background: #243e6a;
  border-radius: 0px 40px 40px 0px;
  height: 80px;
  width: 100px;
  display: ${({ menu }) => (menu ? 'none' : 'flex')};
  justify-content: flex-start;
  align-items: center;
  ${({ menu }) => menu ? 'display: none;' : ''}
`;


const NavIcon = styled(Link)`
  margin-left: 1.5rem;
  font-size: 2rem;
  height: 80px; 
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const MenuNav = styled.nav`
  background: #243e6a;
  width: 250px;
  min-height: 97%;
  position: relative; 
  top: 0;
  ${({ menu }) => menu ? 'left: 0;' : 'left: -100%;'}
  // transition: 150ms;
  z-index: 10;
`;

const MenuWrap = styled.div`
  width: 100%;
`;

const Menu = () => {
  const [menu, setMenu] = useState(false);
  const showMenu = () => setMenu(!menu);
  return (
    <React.Fragment>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav menu={menu ? true : undefined}>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showMenu} />
          </NavIcon>
        </Nav>
        <MenuNav menu={menu? true : undefined}>
          <MenuWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showMenu} />
            </NavIcon>
            {MenuData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </MenuWrap>
        </MenuNav>
      </IconContext.Provider>
    </React.Fragment>
  );
};

export default Menu;
