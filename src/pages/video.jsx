import React from "react"
import Videos from "../components/videos"
import LoginCheck from "../sharedComponet/LoginCheck"

function VideosPage() {
    return <Videos />
}
export default LoginCheck(VideosPage)
