import React from "react"
import "./style.scss"
import {Form, Input} from "antd"

export default function VideoPlaylist() {
    return (
        <div className="video_playlist">
            <div className="table_wrap">
                <h1 className="form_title">Video Playlists</h1>

                <div className="form_body">
                    <Form name="basic" initialValues={{remember: true}} autoComplete="off">
                        <table className="table table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">isLive</th>
                                    <th scope="col">Modify playlist</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
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
                                        <Form.Item name="username" rules={[{required: true, message: "Required"}]}>
                                            <Input />
                                        </Form.Item>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </Form>
                </div>
            </div>
        </div>
    )
}
