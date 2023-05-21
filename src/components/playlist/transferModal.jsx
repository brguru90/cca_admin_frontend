import React, {useState} from "react"
import {Modal, Transfer} from "antd"

const TransferModal = (props) => {
    const [targetKeys, setTargetKeys] = useState([])

    const handleOk = () => {
        props?.handleOk()
    }

    const handleCancel = () => {
        props?.handleCancel()
    }

    const filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1

    const handleChange = (newTargetKeys) => {
        setTargetKeys(newTargetKeys)
    }

    const handleSearch = (dir, value) => {
        console.log("search:", dir, value)
    }

    return (
        <>
            <Modal title="Create a playlist" open={props?.showModal} onOk={handleOk} onCancel={handleCancel}>
                <Transfer
                    dataSource={props.data}
                    showSearch
                    filterOption={filterOption}
                    targetKeys={targetKeys}
                    onChange={handleChange}
                    onSearch={handleSearch}
                    render={(item) => item.title}
                />
            </Modal>
        </>
    )
}

export default TransferModal
