import React from "react"
import "./style.scss"
import {Tabs} from "antd"
import UploadStudyMaterials from "./upload"
import ManageStudyMaterials from "./manage"

export default function StudyMaterials() {
    // const onChange = (key) => {
    //     console.log(key);
    // };

    const items = [
        {
            key: "1",
            label: `View Uploaded`,
            children: <ManageStudyMaterials />,
        },
        {
            key: "2",
            label: `New Upload`,
            children: <UploadStudyMaterials />,
        },
    ]

    return (
        <div className="docs_page">
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
