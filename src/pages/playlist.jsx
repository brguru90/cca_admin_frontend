import React from "react"
import VideoPlaylist from "../components/playlist"
import LoginCheck from "../sharedComponet/LoginCheck"

function PlaylistPage() {
    return <VideoPlaylist />
}

export default LoginCheck(PlaylistPage)
