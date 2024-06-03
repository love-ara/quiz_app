import FilledButton from "../../../component/filledButton";

import {useState} from "react"
import DashBoard from "../../../component/dashBoard/index.";

function Hero() {
    const [name, setName] = useState("name")
    const [password, setPassword] = useState("password")

const updateName = () => {
    setName(prevState => {
        return{
            ...prevState, password: "name"
        }
    })
}
    return(
        <>

            <DashBoard />
        </>
    )
}

export default Hero;