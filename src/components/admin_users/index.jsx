import React, {useEffect, useState} from "react"
import axios from "axios"
import {Table} from "antd"
import {BsLink45Deg as LinkIcon} from "react-icons/bs"
import ManageUsers from "./manage_user"

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
    ]

    const handleOk = () => {
        setShowModal(false)
    }

    const handleCancel = () => {
        setShowModal(false)
    }

    return (
        <div className="admin_users">
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
