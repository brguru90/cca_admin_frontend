import React, {Component} from "react"
import "./App.scss"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SideBar from "./components/sidebar/index.jsx"
import Login from "./pages/login.jsx"
import Home from "./pages/home.jsx"
import Video from "./pages/video.jsx"
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
                        </Route>
                        <Route path="*" element={<h1>404 Not found</h1>} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}
