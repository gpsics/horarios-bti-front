import React, { useEffect, useState } from "react";
import logo from '../../imgs/logo-ufersa.png'
import './Header.css'
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiLogIn, BiLogOut } from "react-icons/bi";

import { Link } from "react-router-dom";

const Header = (props) => {
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };

    //conferir se existe Token no localStorage
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
        }
    }, [isAuth]);

    return (
        <React.Fragment>
            <header>
                <div className="imgLogo">
                    <Link to={props.link}><img src={logo} alt="logo" /></Link>
                </div>
                <div className="dataLocal">
                    <i><FaMapMarkerAlt /></i>
                    <p>Pau dos Ferros, {today.toLocaleDateString('pt-br', options)}</p>
                    <div className="loginOrLogout">
                        {isAuth ?
                            <Link to="/pilot">
                                <i>
                                    <BiLogOut />
                                </i>
                            </Link> :
                            <Link to="/login">
                                <i>
                                    <BiLogIn />
                                </i>
                            </Link>
                        }
                    </div>
                </div>


            </header>
        </React.Fragment>
    )
}
export default Header