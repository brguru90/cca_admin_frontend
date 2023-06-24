import React from "react"
import "./style.scss"
import {Tabs} from "antd"
import PlaylistUserSubscription from "./playlist"
import DocUserSubscription from "./doc"

export default function UserSubscriptions() {
    const items = [
        {
            key: "1",
            label: `Playlist`,
            children: <PlaylistUserSubscription />,
        },
        {
            key: "2",
            label: `PDF`,
            children: <DocUserSubscription />,
        },
    ]

    return (
        <div className="user_subscriptions">
            <div className="title">User subscriptions</div>
            <br />

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
