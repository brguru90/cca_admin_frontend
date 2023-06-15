import React, {useEffect, useRef, useState} from "react"
import "./style.scss"
import {Button, Form, Input, Upload, Space, Select, Divider} from "antd"
import {InboxOutlined, PlusOutlined} from "@ant-design/icons"
import axios from "axios"
import Swal from "sweetalert2"
import {Toast} from "../../../utils/utils"

export default function UploadStudyMaterial() {
    const [studyMaterialUploadList, setStudyMaterialUploadList] = useState([])
    const [imageUploadList, setImageUploadList] = useState([])

    const [uploadInProgress, setUploadInProgress] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)

    const [categories, setCategories] = useState([])
    const [name, setCategory] = useState("")
    const inputRef = useRef(null)
    const indexRef = useRef(0)

    const onCategoryChange = (event) => {
        setCategory(event.target.value)
    }

    const addCategory = (e) => {
        e.preventDefault()
        setCategories([...categories, name || `New item ${indexRef.current++}`])
        setCategory("")
        setTimeout(() => {
            inputRef.current?.focus()
        }, 0)
    }

    const fetchCategories = () => {
        axios.get("/api/user/study_materials_categories/").then((res) => {
            if (res.status == 200 && res.data?.data?.length) {
                setCategories(res.data?.data?.map((cat) => cat?.title))
            }
        })
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const onFinish = (values) => {
        const {title, created_by, description, price, category, enroll_days} = values

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
        formData.append("price", price)
        formData.append("enroll_days", enroll_days)
        formData.append("category", category)
        formData.append("author", created_by)
        formData.append("description", description)
        formData.append("is_live", true)
        setUploadInProgress(true)
        setUploadProgress(0)
        axios({
            method: "post",
            url: "/api/admin/upload_study_material/",
            data: formData, // you are sending body instead
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                console.log({percentCompleted})
                setUploadProgress(percentCompleted)
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
            .finally(() => setUploadInProgress(false))
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
                        disabled={uploadInProgress}
                    >
                        <div className="form_col">
                            <Form.Item label="Title" name="title" rules={[{required: true, message: "Required"}]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Description" name="description">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Price" name="price">
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
                        </div>

                        <div className="form_col">
                            <Form.Item label="Author" name="created_by" rules={[{required: true, message: "Required"}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Category" name="category" rules={[{required: true, message: "Required"}]}>
                                <Select
                                    style={{width: 300}}
                                    placeholder="Grouping category"
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{margin: "8px 0"}} />
                                            <Space style={{padding: "0 8px 4px"}}>
                                                <Input placeholder="Select option" ref={inputRef} value={name} onChange={onCategoryChange} />
                                                <Button type="text" icon={<PlusOutlined />} onClick={addCategory}>
                                                    Add item
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                    options={categories.map((item) => ({label: item, value: item}))}
                                />
                            </Form.Item>
                            <Form.Item label="Enroll for days" name="enroll_days">
                                <Input />
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
                        {uploadInProgress && <h4>Upload progress {uploadProgress}%</h4>}
                    </Form>
                </div>
            </div>
        </div>
    )
}
