import React, {Component} from "react"
import "./App.scss"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SideBar from "./components/sidebar/index.jsx"
import Login from "./pages/login.jsx"
import Home from "./pages/home.jsx"
import Video from "./pages/video.jsx"
import StudyMaterials from "./pages/study_materials.jsx"
import Playlist from "./pages/playlist"
import Subscriptions from "./pages/subscriptions"
import Users from "./pages/users"
import "./utils/login_check"
import "antd/dist/antd.css"

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" exact element={<Login />} />
                        <Route path="/" element={<SideBar />}>
                            <Route path="/home" exact element={<Home />} />
                            <Route path="/video" exact element={<Video />} />
                            <Route path="/study_materials" exact element={<StudyMaterials />} />
                            <Route path="/playlist" exact element={<Playlist />} />
                            <Route path="/subscriptions" exact element={<Subscriptions />} />
                            <Route path="/users" exact element={<Users />} />
                        </Route>
                        <Route path="*" element={<h1>404 Not found</h1>} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}
