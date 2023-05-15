import React from "react"
import Home from "../components/home"
import LoginCheck from "../sharedComponet/LoginCheck"

function HomePage() {
    return <Home />
}

export default LoginCheck(HomePage)
