import React, {VFC} from 'react'
import {Link} from "react-router-dom";

const Logo: VFC = () => {
    const DEAULT_TITLE = 'amplify-reactjs-sample'

    const linkStyle = {
        textDecoration: "none",
        color: '#fff'
    };

    return (
        <div className="App-logo">
            <Link to="/" style={linkStyle}>{DEAULT_TITLE}</Link>
        </div>
    )
}

export default Logo