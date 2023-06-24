import React, {useEffect, useState} from "react"
import "./style.scss"
import {Table, Badge, Button} from "antd"
import axios from "axios"
import {Excel} from "antd-table-saveas-excel"

export default function DocUserSubscription() {
    const [data, setData] = useState([])

    const fetchData = () => {
        axios.get("/api/admin/user_subscriptions/doc/").then((res) => {
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

    const original_cols = [
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
            dataIndex: "initial_subscription_date",
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
            title: "Subscribed on",
            dataIndex: ["subscriptions", "subscribed_on"],
            sorter: (a, b) => {
                return new Date(a.subscriptions.subscribed_on) > new Date(b.subscriptions.subscribed_on)
            },
        },
        {
            title: "Expire On",
            dataIndex: "expired_on",
            render: (id, row) => new Date(row?.expired_on).toLocaleString(),
            sorter: (a, b) => {
                return new Date(a.expired_on) > new Date(b.expired_on)
            },
        },
        {
            title: "Amount paid",
            dataIndex: ["subscriptions", "amount_paid"],
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

    const columns = [
        ...original_cols,
        {
            title: "Enabled",
            dataIndex: "is_enabled",
            render: function VisibilityStatus(status) {
                return <Badge status={status ? "success" : "warning"} text={status ? "yes" : "no"} />
            },
        },
    ]

    const exportTable = () => {
        const excel = new Excel()
        excel
            .addSheet("PDF - user subscriptions")
            .addColumns([
                ...original_cols,
                {
                    title: "Enabled",
                    dataIndex: "is_enabled",
                },
            ])
            .addDataSource(data, {
                str2Percent: true,
            })
            .saveAs("Excel.xlsx")
    }

    return (
        <div className="doc_user_subscriptions">
            <div className="subscription_for_type">
                <div className="sub_title">PDF subscriptions</div>
                <br />
                <div className="subscription_list">
                    <Button type="primary" onClick={exportTable}>
                        Export
                    </Button>
                    <br />
                    <br />
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        </div>
    )
}
