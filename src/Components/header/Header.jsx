import React from "react";
import logo from '../../imgs/logo-ufersa.png'
import './Header.css'
import { FaMapMarkerAlt } from "react-icons/fa";
const Header = () =>{
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)
    const options = { weekday: 'long', day: 'numeric', month: 'long',  year: 'numeric' };
   
    return (
        <React.Fragment>
            <header>
                <div className="imgLogo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="dataLocal">
                    <i><FaMapMarkerAlt/></i>
                    <p>Pau dos Ferros, {today.toLocaleDateString('pt-br', options)}</p>
                </div>
            </header>
        </React.Fragment>
    )
}
export default Header