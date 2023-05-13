import axios from "axios"
import React, {useEffect} from "react"

export default function Home() {
    const loginCHeck = () => axios.get("/api/login_status/?escape_str")

    useEffect(() => {
        loginCHeck()
    }, [])

    return <div>Home</div>
}
