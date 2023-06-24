import React, {useEffect, useState} from "react"
import "./style.scss"
import {Form, Input, Button, Badge, InputNumber} from "antd"
import axios from "axios"
import TransferModal from "./update_playlist"
import Swal from "sweetalert2"
import {Toast} from "./../../utils/utils"

export default function VideoPlaylist() {
    const [showModal, setShowModal] = useState(false)
    const [videosList, setVideosList] = useState([])
    const [playList, setPlaylist] = useState([])
    const [playListSelected, setPlaylistSelected] = useState([])

    const getPlaylists = () => {
        axios.get("/api/admin/playlist/").then((res) => {
            if (res.status == 200 && res?.data?.status === "success") {
                setPlaylist(res?.data?.data)
            }
        })
    }

    const getVideos = () => {
        axios.get("/api/admin/upload_list/").then((res) => {
            if (res.status == 200 && res?.data?.status === "success") {
                const videos = res?.data?.data?.map((video) => {
                    video.key = video["_id"]
                    video.chosen = false
                    return video
                })
                setVideosList(videos.filter((data) => data.is_live))
            }
        })
    }

    const createPlaylist = (values) => {
        console.log({values})

        const {title, description, price, enroll_days} = values
        axios({
            method: "post",
            url: "/api/admin/playlist/",
            data: JSON.stringify({
                description,
                enroll_days,
                is_live: true,
                price,
                title,
                videos_ids: [],
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.status == 200) {
                    Toast.fire({
                        icon: "success",
                        title: "Added",
                    })
                    getPlaylists()
                } else {
                    Toast.fire({
                        icon: "error",
                        title: "failed",
                    })
                }
            })
            .catch((error) => {
                if (error.response.status == 403) {
                    Swal.fire({
                        title: "wrong credential!",
                        icon: "error",
                        timer: 2000,
                        timerProgressBar: true,
                    })
                } else {
                    Swal.fire({
                        title: "Error",
                        icon: error?.response?.data?.status || "error",
                        text: error?.response?.data?.msg,
                    })
                }
            })
    }

    const deletePlaylist = (playlist_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "The user enrolled to playlist will not able to access it",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios({
                    method: "delete",
                    url: "/api/admin/playlist/",
                    data: JSON.stringify({playlist_id}),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => {
                        if (res.status == 200) {
                            Toast.fire({
                                icon: "success",
                                title: "Deleted",
                            })
                            getPlaylists()
                        } else {
                            Toast.fire({
                                icon: "error",
                                title: "failed",
                            })
                        }
                    })
                    .catch((error) => {
                        if (error.response.status == 403) {
                            Swal.fire({
                                title: "wrong credential!",
                                icon: "error",
                                timer: 2000,
                                timerProgressBar: true,
                            })
                        } else {
                            Swal.fire({
                                title: "Error",
                                icon: error?.response?.data?.status || "error",
                                text: error?.response?.data?.msg,
                            })
                        }
                    })
            }
        })
    }

    useEffect(() => {
        getVideos()
        getPlaylists()
    }, [])

    const handleOk = () => {
        setShowModal(false)
        getPlaylists()
    }

    const handleCancel = () => {
        setShowModal(false)
    }

    return (
        <>
            <div className="video_playlist">
                <div className="table_wrap">
                    <h1 className="form_title">Video Playlists</h1>

                    <div className="form_body">
                        <Form name="basic" initialValues={{remember: true}} autoComplete="off" onFinish={createPlaylist}>
                            <div className="table-responsive">
                                <table className="table table-hover" cellSpacing="0">
                                    <thead className="sticky-header thead-dark">
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Subscription duration</th>
                                            <th scope="col">isLive</th>
                                            <th scope="col">Update</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                        <tr className="table_form">
                                            <td>
                                                <Form.Item name="title" rules={[{required: true, message: "Required"}]}>
                                                    <Input placeholder="Enter title for playlist" />
                                                </Form.Item>
                                            </td>
                                            <td>
                                                <Form.Item name="description" rules={[{required: true, message: "Required"}]}>
                                                    <Input placeholder="Enter playlist description" />
                                                </Form.Item>
                                            </td>
                                            <td>
                                                <Form.Item name="price" rules={[{required: true, message: "Required"}]}>
                                                    <InputNumber min={0} />
                                                </Form.Item>
                                            </td>
                                            <td>
                                                <Form.Item name="enroll_days" rules={[{required: true, message: "Required"}]}>
                                                    <InputNumber />
                                                </Form.Item>
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <Button type="primary" htmlType="submit">
                                                    Add
                                                </Button>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {playList.map((playlist) => {
                                            return (
                                                <tr key={playlist["_id"]}>
                                                    <th scope="row">{playlist.title}</th>
                                                    <td>{playlist.description}</td>
                                                    <td>{playlist.price}</td>
                                                    <td>{playlist.enroll_days} Days</td>
                                                    <td>
                                                        <Badge
                                                            status={playlist.is_live ? "success" : "warning"}
                                                            text={playlist.is_live ? "Yes" : "No"}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Button
                                                            type="primary"
                                                            htmlType="button"
                                                            onClick={() => {
                                                                setPlaylistSelected(Object.assign({}, playlist))
                                                                setShowModal(true)
                                                            }}
                                                        >
                                                            Update
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            type="primary"
                                                            htmlType="button"
                                                            onClick={() => {
                                                                deletePlaylist(playlist["_id"])
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            <TransferModal
                showModal={showModal}
                data={videosList}
                preTargetData={playListSelected?.videos_ids?.map((list) => list["video_id"]) || []}
                playListKey={playListSelected["_id"]}
                playListSelected={playListSelected}
                handleCancel={handleCancel}
                handleOk={handleOk}
            />
        </>
    )
}
