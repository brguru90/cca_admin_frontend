import React, {useEffect, useState} from "react"
import axios from "axios"
import {Table, Form, Input, Checkbox, Button} from "antd"
import {BsLink45Deg as LinkIcon} from "react-icons/bs"
import {AiOutlineDelete as DeleteIcon} from "react-icons/ai"
import ManageUsers from "./manage_user"
import Swal from "sweetalert2"
import {Toast} from "./../../utils/utils"

export default function AdminUsers() {
    const [adminUsers, setAdminUsers] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedAdminUser, setSelectedAdminUser] = useState({})

    const fetchAdminUsers = () => {
        axios.get("/api/super_admin/user").then((res) => {
            if (res.status == 200) {
                setAdminUsers(res?.data?.data?.users || [])
            }
        })
    }

    useEffect(() => {
        fetchAdminUsers()
    }, [])

    const DeleteAdmin = (user_id) => {
        axios({
            method: "delete",
            url: `/api/super_admin/user?user_id=${user_id}`,
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
                    fetchAdminUsers()
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

    const columns = [
        {
            title: "User name",
            dataIndex: "username",
            sorter: (a, b) => {
                return a.username > b.username
            },
        },
        {
            title: "Email",
            dataIndex: "email",
            sorter: (a, b) => {
                return a.email > b.email
            },
        },
        {
            title: "Access level",
            dataIndex: "access_level",
        },
        {
            title: "Last updated",
            dataIndex: "updatedAt",
        },
        {
            title: "Created at",
            dataIndex: "createdAt",
            filterSearch: true,
            onFilter: (value, record) => record.title.includes(value),
            sorter: (a, b) => {
                return new Date(a.createdAt) > new Date(b.createdAt)
            },
            // sortDirections: ['descend'],
            defaultSortOrder: "descend",
        },
        {
            title: "Edit",
            dataIndex: "_id",
            render: function EditButton(id, row) {
                return (
                    <LinkIcon
                        onClick={() => {
                            setSelectedAdminUser(row)
                            setShowModal(true)
                        }}
                    />
                )
            },
        },
        {
            title: "Delete",
            dataIndex: "_id",
            render: function EditButton(id, row) {
                return (
                    <DeleteIcon
                        onClick={() => {
                            DeleteAdmin(id)
                            console.log(id, row)
                        }}
                    />
                )
            },
        },
    ]

    const handleOk = () => {
        setShowModal(false)
    }

    const handleCancel = () => {
        setShowModal(false)
    }

    const AddAdmin = (values) => {
        // const { email, password, username, is_super_admin } = values
        console.log(values)

        axios({
            method: "post",
            url: "/api/super_admin/user",
            data: JSON.stringify(values),
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
                    fetchAdminUsers()
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
        <div className="admin_users">
            <div>
                <h1>Add Admin user</h1>
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 400}}
                    // layout="inline"
                    initialValues={{remember: true}}
                    onFinish={AddAdmin}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className="actual_form"
                >
                    <Form.Item label="Email" name="email" rules={[{required: true, message: "Required"}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name="password" initialValue={""} rules={[{required: true, message: "Please input your password!"}]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="Name" name="username">
                        <Input />
                    </Form.Item>

                    <Form.Item name="is_super_admin" label="Super Admin" valuePropName="checked">
                        <Checkbox>EnableI</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div className="manage_doc_sec">
                <h1 className="form_title">Admin users</h1>
                <div className="form_body">
                    <Table columns={columns} dataSource={adminUsers} />
                </div>
            </div>

            <ManageUsers
                showModal={showModal}
                handleCancel={handleCancel}
                handleOk={handleOk}
                selectedAdminUser={selectedAdminUser}
                fetchAdminUsers={fetchAdminUsers}
            />
        </div>
    )
}
