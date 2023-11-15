import React from "react";
import logo from '../../imgs/logo-ufersa.png'
import './Header.css'
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiLogIn, BiLogOut } from "react-icons/bi";

import { Link } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";

const Header = (props) => {
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const {token, clearToken} = useAuth()

    const limparLocal = () => {
        clearToken()
    }
    return (
        <header>
            <div className="imgLogo">
                <Link to={props.link}><img src={logo} alt="logo" /></Link>
            </div>
            <div className="dataLocal">
                <i><FaMapMarkerAlt /></i>
                <p>Pau dos Ferros, {today.toLocaleDateString('pt-br', options)}</p>
                <div className="loginOrLogout">
                    {token ?
                        <Link to="/pilot">
                            <i onClick={limparLocal}>
                                <BiLogOut />
                            </i>
                        </Link> :
                        <Link to="/login">
                            <i onClick={limparLocal}>
                                <BiLogIn />
                            </i>
                        </Link>
                    }
                </div>
            </div>


        </header>

    )
}
export default Header