import React, {useState} from "react"
import "./style.scss"
import {Button, Checkbox, Form, Input, Upload} from "antd"
import {InboxOutlined} from "@ant-design/icons"
import axios from "axios"
import Swal from "sweetalert2"
import {Toast} from "../../../utils/utils"

export default function UploadStudyMaterial() {
    const [studyMaterialUploadList, setStudyMaterialUploadList] = useState([])
    const [imageUploadList, setImageUploadList] = useState([])

    const onFinish = (values) => {
        const {title, created_by, description, is_live} = values

        console.log({
            onFinish: {
                values,
                studyMaterialUploadList,
                imageUploadList,
            },
        })

        var formData = new FormData()
        formData.append("doc_file", studyMaterialUploadList[0]?.originFileObj)
        formData.append("preview_image_file", imageUploadList[0]?.originFileObj)
        formData.append("title", title)
        formData.append("created_by", created_by)
        formData.append("description", description)
        formData.append("is_live", is_live || false)
        axios({
            method: "post",
            url: "/api/admin/upload_study_material/",
            data: formData, // you are sending body instead
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                if (res.status == 200) {
                    Toast.fire({
                        icon: "success",
                        title: "Added",
                    })
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

    return (
        <div className="upload_docs_page">
            <div className="upload_doc_sec">
                <h1 className="form_title">Upload study material</h1>

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
                            <Form.Item label="Document">
                                <Form.Item
                                    name="doc_file"
                                    valuePropName="docFileList"
                                    getValueFromEvent={({fileList}) => setStudyMaterialUploadList(fileList)}
                                    noStyle
                                >
                                    <Upload.Dragger
                                        name="doc_files"
                                        accept="application/pdf"
                                        beforeUpload={() => false}
                                        fileList={studyMaterialUploadList}
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Upload document</p>
                                        <p className="ant-upload-hint">Click or drag file to this area to upload</p>
                                    </Upload.Dragger>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item label="Price" name="price">
                                <Input />
                            </Form.Item>
                        </div>

                        <div className="form_col">
                            <Form.Item label="Author" name="created_by" rules={[{required: true, message: "Required"}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="is_live" label="visibility" valuePropName="checked">
                                <Checkbox>Visible</Checkbox>
                            </Form.Item>
                            <Form.Item label="Cover Image" rules={[{required: true, message: "Required"}]}>
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
