import React, {useState} from "react"
import "./style.scss"
import {Button, Checkbox, Form, Input, Upload} from "antd"
import {InboxOutlined} from "@ant-design/icons"
import axios from "axios"
import Swal from "sweetalert2"

export default function Videos() {
    const [videoUploadList, setVideoUploadList] = useState([])
    const [imageUploadList, setImageUploadList] = useState([])

    const onFinish = (values) => {
        const {title, created_by, description} = values

        console.log({
            onFinish: {
                values,
                videoUploadList,
                imageUploadList,
            },
        })

        var formData = new FormData()
        formData.append("video_file", videoUploadList[0]?.originFileObj)
        formData.append("preview_image_file", imageUploadList[0]?.originFileObj)
        formData.append("title", title)
        formData.append("created_by", created_by)
        formData.append("description", description)
        axios({
            method: "post",
            url: "/api/admin/upload_streaming_video/",
            data: formData, // you are sending body instead
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                console.log({res})
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
                        title: "Unknown error",
                        icon: "error",
                    })
                }
            })
    }

    return (
        <div className="videos_page">
            <div className="upload_video_sec">
                <h1 className="form_title">Upload new video</h1>

                <div className="form_body">
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className="actual_form"
                    >
                        <div className="form_col">
                            <Form.Item label="Title" name="title" rules={[{required: true, message: "Required"}]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Description" name="description">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Video">
                                <Form.Item
                                    name="video"
                                    valuePropName="videoFileList"
                                    getValueFromEvent={({fileList}) => setVideoUploadList(fileList)}
                                    noStyle
                                >
                                    <Upload.Dragger name="video_files" accept="video/*" beforeUpload={() => false} fileList={videoUploadList}>
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Upload video</p>
                                        <p className="ant-upload-hint">Click or drag file to this area to upload</p>
                                    </Upload.Dragger>
                                </Form.Item>
                            </Form.Item>
                        </div>

                        <div className="form_col">
                            <Form.Item label="video created by" name="created_by" rules={[{required: true, message: "Required"}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="is_live" label="Video visibility" valuePropName="checked">
                                <Checkbox>Visible</Checkbox>
                            </Form.Item>
                            <Form.Item label="Preview Image" rules={[{required: true, message: "Required"}]}>
                                <Form.Item
                                    name="preview_img"
                                    valuePropName="previewImageFileList"
                                    getValueFromEvent={({fileList}) => setImageUploadList(fileList)}
                                    noStyle
                                >
                                    <Upload.Dragger name="preview_img_files" accept="image/*" beforeUpload={() => false} fileList={imageUploadList}>
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                        <p className="ant-upload-hint">Click or drag file to this area to upload</p>
                                    </Upload.Dragger>
                                </Form.Item>
                            </Form.Item>
                        </div>

                        <div className="form_col">
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
