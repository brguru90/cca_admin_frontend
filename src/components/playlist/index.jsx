import React, {useEffect, useState} from "react"
import "./style.scss"
import {Form, Input, Button} from "antd"
import TransferModal from "./transferModal"

export default function VideoPlaylist() {
    const [showModal, setShowModal] = useState(false)
    const [videosList, setVideosList] = useState([])

    const getVideos = () => {
        fetch("/api/admin/upload_list/")
            .then((resp) => resp.json())
            .then((resp) => {
                if (resp?.status === "success") {
                    const videos = resp?.data?.map((video, id) => {
                        video.key = id
                        video.chosen = false
                        return video
                    })
                    setVideosList(videos)
                }
            })
    }

    useEffect(getVideos, [])
    const handleOk = () => {
        setShowModal(false)
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
                        <Form name="basic" initialValues={{remember: true}} autoComplete="off">
                            <div className="table-responsive">
                                <table className="table table-hover" cellSpacing="0">
                                    <thead className="sticky-header thead-dark">
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">isLive</th>
                                            <th scope="col">Update videos for playlist</th>
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
                                                <Form.Item name="username" rules={[{required: true, message: "Required"}]}>
                                                    <Input />
                                                </Form.Item>
                                            </td>
                                            <td>
                                                <Form.Item name="username" rules={[{required: true, message: "Required"}]}>
                                                    <Input />
                                                </Form.Item>
                                            </td>
                                            <td>
                                                <Button type="primary" htmlType="submit">
                                                    Add
                                                </Button>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[1, 2, 3, 4, 5].map((video, index) => {
                                            return (
                                                <tr key={`${index} + ${Math.random()}`}>
                                                    <th scope="row">UPSC course</th>
                                                    <td>Basics of upsc</td>
                                                    <td>Rs 100</td>
                                                    <td>yes</td>
                                                    <td>
                                                        <Button
                                                            type="primary"
                                                            htmlType="submit"
                                                            onClick={() => {
                                                                setShowModal(true)
                                                            }}
                                                        >
                                                            Update
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
            <TransferModal showModal={showModal} data={videosList} handleCancel={handleCancel} handleOk={handleOk} />
        </>
    )
}
