import React from "react"
import "./style.scss"
import {Button, Checkbox, Form, Input, Upload} from "antd"
import {InboxOutlined} from "@ant-design/icons"

export default function Videos() {
    const onFinish = (values) => {
        console.log("Success:", values)
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
                                <Form.Item name="video" valuePropName="fileList" getValueFromEvent={(e) => console.log({file: e})} noStyle>
                                    <Upload.Dragger name="video_files">
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    </Upload.Dragger>
                                </Form.Item>
                            </Form.Item>
                        </div>

                        <div className="form_col">
                            <Form.Item label="video created by" name="created_by" rules={[{required: true, message: "Required"}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="video created by" name="created_by" rules={[{required: true, message: "Required"}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Preview Image">
                                <Form.Item name="preview_img" valuePropName="fileList" getValueFromEvent={(e) => console.log({file: e})} noStyle>
                                    <Upload.Dragger name="preview_img_files">
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    </Upload.Dragger>
                                </Form.Item>
                            </Form.Item>
                        </div>

                        <div className="form_col">
                            <Form.Item name="is_live" label="Video visibility" valuePropName="checked">
                                <Checkbox>Visible</Checkbox>
                            </Form.Item>
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
