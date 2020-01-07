import React from 'react';

import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

import './InfoBar.css';

const InfoBar = ({ room }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online icon"/>
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            {/* full page refresh to bring back to join screen*/}
            <a href="/"><img src={closeIcon} alt="close icon"/></a>
        </div>
    </div>
)

export default InfoBar;