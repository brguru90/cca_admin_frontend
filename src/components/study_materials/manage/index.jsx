import React, {useState} from "react"
import "./style.scss"
import axios from "axios"
import {Button, Table, Space, Badge} from "antd"
import {useEffect} from "react"
import Swal from "sweetalert2"

export default function ManageStudyMaterials() {
    const [uploadeddocs, setUploadeddocs] = useState([])

    const fetchdocList = () => {
        axios.get("/api/admin/doc_upload_list/").then((res) => {
            if (res.status == 200) {
                setUploadeddocs(
                    res.data?.data?.map((item) => {
                        return {
                            ...item,
                            key: item["_id"],
                            created_at: new Date(item["createdAt"]).toLocaleString(),
                            updated_at: new Date(item["updatedAt"]).toLocaleString(),
                        }
                    })
                    // .sort(({ createdAt }) => new Date(createdAt) < new Date(createdAt))
                )
            }
        })
    }

    useEffect(() => {
        fetchdocList()
    }, [])

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            sorter: (a, b) => {
                return a.title > b.title
            },
            // sortDirections: ['descend'],
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Category",
            dataIndex: "category",
        },
        {
            title: "Author",
            dataIndex: "created_by_user",
        },
        {
            title: "Visibility",
            dataIndex: "is_live",
            render: function VisibilityStatus(status) {
                return <Badge status={status ? "success" : "warning"} text={status ? "visible" : "hidden"} />
            },
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Enroll Days",
            dataIndex: "enroll_days",
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
    ]

    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [loading, setLoading] = useState(false)

    const deletedoc = () => {
        setLoading(true)
        axios({
            method: "delete",
            url: "/api/admin/delete_study_material/",
            data: JSON.stringify({docs_ids: selectedRowKeys}),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log({res})
                Swal.fire({
                    title: "Deleted",
                    icon: "success",
                })
                setSelectedRowKeys([])
                setLoading(false)
                fetchdocList()
            })
            .catch((error) => {
                setLoading(false)
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
    const onSelectChange = (newSelectedRowKeys) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys)
        setSelectedRowKeys(newSelectedRowKeys)
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0

    return (
        <div className="manage_docs_page">
            <div className="manage_doc_sec">
                <h1 className="form_title">Manage study materials</h1>

                <div className="form_body">
                    <div>
                        <Space
                            style={{
                                marginBottom: 16,
                            }}
                        >
                            <Button type="primary" onClick={deletedoc} disabled={!hasSelected} loading={loading}>
                                Delete
                            </Button>
                            <span
                                style={{
                                    marginLeft: 8,
                                }}
                            >
                                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
                            </span>
                        </Space>
                        <Table rowSelection={rowSelection} columns={columns} dataSource={uploadeddocs} />
                    </div>
                </div>
            </div>
        </div>
    )
}
