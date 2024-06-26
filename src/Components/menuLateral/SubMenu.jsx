import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const MenuLink = styled(Link)`
  // margin-top: 20px;
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 50px;
  text-decoration: none;
  font-size: 18px;

  &:hover{
    background: #285AA5 ;
    border-left: 4px solid #F2ECD8;
    cursor: pointer;
  }
  @media screen and (max-width: 568px) {
    font-size: 1rem;
  }
`;
const MenuLabel = styled.span`
  margin-left: 16px;
`;
const DropdownLink = styled(Link)`
  background: #002D4D;
  height: 50px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 18px;
  color: #f5f5f5;

  &:hover{
    background: #2673D4 ;
    cursor: pointer;
  }
  @media screen and (max-width: 568px) {
    font-size: .9rem;
  }
`;
const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false)
  const showSubnav = () => setSubnav(!subnav)
  return (
    <React.Fragment>
      <MenuLink  onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <MenuLabel>{item.title}</MenuLabel>
        </div>
        <div>
          {item.subNav && subnav 
          ? item.iconOpened 
          : item.subNav 
          ? item.iconClosed 
          : null}
        </div>
      </MenuLink>
      {subnav && item.subNav.map((item, index) => {
        return (
          <DropdownLink to={item.path} key={index}>
            {item.icon}
            <MenuLabel>{item.title}</MenuLabel>
          </DropdownLink>

        )
      })}
    </React.Fragment>
  )
}

export default SubMenu
