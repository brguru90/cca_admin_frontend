import React, {useEffect, useState} from "react"
import "./style.scss"
import {Table, Badge} from "antd"
import axios from "axios"

export default function PlaylistUserSubscription() {
    const [data, setData] = useState([])

    const fetchData = () => {
        axios.get("/api/admin/user_subscriptions/playlist/").then((res) => {
            if (res.status == 200) {
                setData(
                    res.data?.data?.map((item) => {
                        return {
                            ...item,
                            key: `${item["_id"]}_${item?.subscriptions?.subscribed_on}`,
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
        fetchData()
    }, [])

    const columns = [
        {
            title: "User name",
            dataIndex: "username",
            sorter: (a, b) => {
                return a.username > b.username
            },
            // sortDirections: ['descend'],
        },
        {
            title: "First subscription",
            render: (id, row) => new Date(row?.initial_subscription_date).toLocaleString(),
            sorter: (a, b) => {
                return new Date(a.initial_subscription_date) > new Date(b.initial_subscription_date)
            },
        },

        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Enabled",
            dataIndex: "is_enabled",
            render: function VisibilityStatus(status) {
                return <Badge status={status ? "success" : "warning"} text={status ? "yes" : "no"} />
            },
        },
        {
            title: "Subscribed on",
            render: (id, row) => new Date(row?.subscriptions.subscribed_on).toLocaleString(),
            sorter: (a, b) => {
                return new Date(a.subscriptions.subscribed_on) > new Date(b.subscriptions.subscribed_on)
            },
        },
        {
            title: "Expire On",
            render: (id, row) => new Date(row?.expired_on).toLocaleString(),
            sorter: (a, b) => {
                return new Date(a.expired_on) > new Date(b.expired_on)
            },
        },
        {
            title: "Amount paid",
            render: (id, row) => row?.subscriptions.amount_paid,
        },
        {
            title: "Last updated",
            dataIndex: "updated_at",
        },
        {
            title: "Created at",
            dataIndex: "created_at",
            filterSearch: true,
            onFilter: (value, record) => record.title.includes(value),
            sorter: (a, b) => {
                return new Date(a.createdAt) > new Date(b.createdAt)
            },
            // sortDirections: ['descend'],
            defaultSortOrder: "descend",
        },
    ]

    return (
        <div className="playlist_user_subscriptions">
            <div className="subscription_for_type">
                <div className="sub_title">Video subscriptions</div>
                <div className="subscription_list">
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        </div>
    )
}
