import React, {useState} from "react"
import "./style.scss"
import {Outlet, useNavigate} from "react-router-dom"
import {Layout, Menu} from "antd"
import {AiFillHome as HomeIcon} from "react-icons/ai"
import {TbLayoutSidebarLeftCollapse} from "react-icons/tb"
import {FaVideo as VideoIcon} from "react-icons/fa"
import {RiPlayList2Fill as PlaylistIcon} from "react-icons/ri"
import {FaUsers as UsersIcon} from "react-icons/fa"
import {RiShieldUserFill as AdminUsers} from "react-icons/ri"
import {RiLogoutBoxLine as LogoutIcon} from "react-icons/ri"
import {MdOutlineMenuBook as BookIcon} from "react-icons/md"

import axios from "axios"
import Swal from "sweetalert2"

export default function Home() {
    const {Header, Sider, Content} = Layout
    let navigate = useNavigate()
    // const { SubMenu } = Menu;

    const [collapsed, setCollapsed] = useState(false)
    const toggleSlideBar = () => setCollapsed((state) => !state)

    const Logout = () => {
        axios
            .get("/api/user/logout/")
            .then((res) => {
                console.log({res})
                navigate("/")
            })
            .catch((error) => {
                console.log({error})
                Swal.fire({
                    title: "Unknown error",
                    icon: "error",
                })
            })
        return false
    }

    const navigateTo = (to) => {
        navigate(to)
        return false
    }

    return (
        <div className="side_bar_wrapper">
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="app_info">
                        <div className="info_text">
                            <span>A</span>dmin Panel
                        </div>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[window.location.pathname]}>
                        <Menu.Item key="/home" icon={<HomeIcon className="menu_icon" />}>
                            <a onClick={() => navigateTo("/home")}>Dashboard</a>
                        </Menu.Item>
                        <Menu.Item key="/video" icon={<VideoIcon className="menu_icon" />}>
                            <a onClick={() => navigateTo("/video")}>Videos</a>
                        </Menu.Item>
                        <Menu.Item key="/study_materials" icon={<BookIcon className="menu_icon" />}>
                            <a onClick={() => navigateTo("/study_materials")}>Study Materials</a>
                        </Menu.Item>
                        <Menu.Item key="/playlist" icon={<PlaylistIcon className="menu_icon" />}>
                            <a onClick={() => navigateTo("/playlist")}>Playlist</a>
                        </Menu.Item>
                        <Menu.Item key="/subscriptions" icon={<UsersIcon className="menu_icon" />}>
                            <a onClick={() => navigateTo("/subscriptions")}>Subscriptions</a>
                        </Menu.Item>
                        <Menu.Item key="/users" icon={<AdminUsers className="menu_icon" />}>
                            <a onClick={() => navigateTo("/users")}>Users</a>
                        </Menu.Item>
                        <Menu.Item key="/logout" icon={<LogoutIcon className="menu_icon" />}>
                            <a onClick={Logout}>Logout</a>
                        </Menu.Item>
                        {/* <SubMenu  key="#/skills" icon={<FaClipboardList />} title="Skills">
              <Menu.Item key="#/reactjs"><a href="#/reactjs">Videos</a></Menu.Item>
              <Menu.Item key="#/django"><a href="#/django">Playlist</a></Menu.Item>
              <Menu.Item key="#/django"><a href="#/django">Subscriptions</a></Menu.Item>
            </SubMenu> */}
                    </Menu>
                </Sider>
                <Layout className="site-layout  nav-bar-header">
                    <Header className="site-layout-background" style={{padding: 0}}>
                        <div className="header-content">
                            <div className="collapse_icon_wrapper">
                                <TbLayoutSidebarLeftCollapse className="collapse_icon" onClick={toggleSlideBar} />
                            </div>
                        </div>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: 280,
                            // backgroundImage:`url(${Bg_Img})`
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}
