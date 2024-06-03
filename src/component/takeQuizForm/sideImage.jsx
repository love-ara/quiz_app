import {Styles} from "../styles/Styles";
import React from "react";
import webPix from "../../img/webPix.png"

export function SideImage() {
    return <div style={Styles.imageContainer}>
        <img src={webPix} alt="quiz imag" style={Styles.image}/>
    </div>
}