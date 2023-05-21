import React, {useState} from "react"
import "./style.scss"
import axios from "axios"
import {Button, Table, Space, Badge} from "antd"
import {useEffect} from "react"
import Swal from "sweetalert2"

export default function manageVideos() {
    const [uploadedVideos, setUploadedVideos] = useState([])

    const fetchVideoList = () => {
        axios.get("/api/admin/upload_list/").then((res) => {
            if (res.status == 200) {
                setUploadedVideos(
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
        fetchVideoList()
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
            title: "Created by",
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

    const generateVideoStream = () => {
        setLoading(true)
        axios({
            method: "post",
            url: "/api/admin/generate_video_stream/",
            data: JSON.stringify({video_ids: selectedRowKeys}), // you are sending body instead
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log({res})
                Swal.fire({
                    title: "Started",
                    icon: "success",
                })
                setSelectedRowKeys([])
                setLoading(false)
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
    const deleteVideo = () => {
        setLoading(true)
        axios({
            method: "delete",
            url: "/api/admin/delete_streaming_video/",
            data: JSON.stringify({video_ids: selectedRowKeys}), // you are sending body instead
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
                fetchVideoList()
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
        <div className="manage_videos_page">
            <div className="manage_video_sec">
                <h1 className="form_title">Manage videos</h1>

                <div className="form_body">
                    <div>
                        <Space
                            style={{
                                marginBottom: 16,
                            }}
                        >
                            <Button type="primary" onClick={deleteVideo} disabled={!hasSelected} loading={loading}>
                                Delete
                            </Button>
                            <Button type="primary" onClick={generateVideoStream} disabled={!hasSelected} loading={loading}>
                                Create or update Stream
                            </Button>
                            <span
                                style={{
                                    marginLeft: 8,
                                }}
                            >
                                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
                            </span>
                        </Space>
                        <Table rowSelection={rowSelection} columns={columns} dataSource={uploadedVideos} />
                    </div>
                </div>
            </div>
        </div>
    )
}
