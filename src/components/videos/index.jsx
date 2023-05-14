import React from "react"
import "./style.scss"
import {Tabs} from "antd"
import UploadVideos from "./upload_videos"
import ManageVideos from "./manage_videos"

export default function Videos() {
    // const onChange = (key) => {
    //     console.log(key);
    // };

    const items = [
        {
            key: "1",
            label: `View Uploaded`,
            children: <ManageVideos />,
        },
        {
            key: "2",
            label: `New Upload`,
            children: <UploadVideos />,
        },
    ]

    return (
        <div className="videos_page">
            <Tabs defaultActiveKey={"1"} destroyInactiveTabPane={true}>
                {items.map(({label, key, children}) => (
                    <Tabs.TabPane tab={label} key={key}>
                        <div className="tab_wrap">{children}</div>
                    </Tabs.TabPane>
                ))}
            </Tabs>
        </div>
    )
}
