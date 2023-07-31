import React from "react";
import './Footer.css'
import logo from '../../imgs/logo-ufersa.png'

const Footer = () => {
    return(
        <React.Fragment>
            <footer>
                <div className="logoFooter">
                    <img src={logo} alt="logo" />
                </div>
               <hr />
                <div className="ufersa"><h3> UNIVERSIDADE FEDERAL RURAL DO SEMI-ÁRIDO</h3></div>
            </footer>
        </React.Fragment>
    )
}
export default Footer