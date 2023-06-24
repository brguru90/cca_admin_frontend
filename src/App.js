import React, {Component} from "react"
import "./App.scss"
import {HashRouter, Routes, Route} from "react-router-dom"
import "antd/dist/antd.css"
import "./utils/login_check"
import SideBar from "./components/sidebar/index.jsx"
import Login from "./pages/login.jsx"
import Home from "./pages/home.jsx"
import Video from "./pages/video.jsx"
import StudyMaterials from "./pages/study_materials.jsx"
import Playlist from "./pages/playlist"
import Users from "./pages/users"
import PrivacyPolicyPage from "./pages/privacy_policy"
import User_subscriptions from "./pages/user_subscriptions"

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <HashRouter>
                    <Routes>
                        <Route path="/" exact element={<Login />} />
                        <Route path="/privacy_policy" exact element={<PrivacyPolicyPage />} />
                        <Route path="/" element={<SideBar />}>
                            <Route path="/home" exact element={<Home />} />
                            <Route path="/video" exact element={<Video />} />
                            <Route path="/study_materials" exact element={<StudyMaterials />} />
                            <Route path="/playlist" exact element={<Playlist />} />
                            <Route path="/subscriptions" exact element={<User_subscriptions />} />
                            <Route path="/users" exact element={<Users />} />
                        </Route>
                        <Route path="*" element={<h1>404 Not found</h1>} />
                    </Routes>
                </HashRouter>
            </div>
        )
    }
}
