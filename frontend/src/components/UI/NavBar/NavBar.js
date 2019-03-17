import React from 'react';
import Logo from "./Logo";
import Menu from "./Menu";


const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Logo/>
        <Menu/>
    </nav>
);


export default Navbar