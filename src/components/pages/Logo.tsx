import React, {VFC} from 'react'
import {Link} from "react-router-dom";
import {URL} from '../../common/constants/url'

const Logo: VFC = () => {
    const DEAULT_TITLE = 'amplify-reactjs-sample'

    const linkStyle = {
        textDecoration: "none",
        color: '#fff'
    };

    return (
        <div className="App-logo">
            <Link to={URL.Top} style={linkStyle}>{DEAULT_TITLE}</Link>
        </div>
    )
}

export default Logo