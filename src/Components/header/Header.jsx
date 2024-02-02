import React from "react";
import logo from '../../imgs/logo-ufersa.png'
import './Header.css'
import { BiLogIn, BiLogOut } from "react-icons/bi";

import { Link } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";

const Header = (props) => {
    const { token, clearToken } = useAuth()

    const limparLocal = () => {
        clearToken()
    }
    return (
        <header>
            <div className="logo" >
                <Link to={props.link}><img src={logo} alt="logo" /></Link>
            </div>
            <div className="titulo">
                <h1>{props.titulo}</h1>
            </div>
            <div className="loginOrLogout">
                {token ?
                    <Link to="/">
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

        </header>

    )
}
export default Header