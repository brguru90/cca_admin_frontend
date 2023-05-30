import React, {useEffect, useState} from "react"
import {Modal, Transfer} from "antd"
import axios from "axios"
import Swal from "sweetalert2"
import {Toast} from "./../../../utils/utils"
import "./style.scss"

const TransferModal = (props) => {
    const [targetKeys, setTargetKeys] = useState(props?.preTargetData || [])
    const [playlist_id_map, set_playlist_id_map] = useState({})

    useEffect(() => {
        setTargetKeys(props?.preTargetData || [])
    }, [props?.preTargetData])

    useEffect(() => {
        const temp = {}
        props.data.forEach((list) => {
            temp[list["_id"]] = list
        })
        set_playlist_id_map(temp)
    }, [props.data])

    const update_data = () => {
        const videos_data = targetKeys.map((key, index) => {
            return {
                display_order: index,
                video_id: key,
                title: playlist_id_map[key]?.title,
                link_to_video_preview_image: playlist_id_map[key]?.link_to_video_preview_image,
                link_to_video_stream: playlist_id_map[key]?.link_to_video_stream,
            }
        })

        axios({
            method: "put",
            url: "/api/admin/playlist/",
            data: JSON.stringify({
                videos_ids: videos_data,
                playlist_id: props?.playListKey,
            }),
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
            .finally(() => props?.handleOk())
    }

    const handleOk = () => {
        update_data()
    }

    const handleCancel = () => {
        props?.handleCancel()
    }

    const filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1

    const handleChange = (newTargetKeys) => {
        setTargetKeys(newTargetKeys)
        console.log("newTargetKeys:", newTargetKeys)
    }

    const handleSearch = (dir, value) => {
        console.log("search:", dir, value)
    }

    return (
        <>
            <Modal className="update_playlist_modal" title="Create a playlist" open={props?.showModal} onOk={handleOk} onCancel={handleCancel}>
                <div className="update_playlist_modal_body">
                    <Transfer
                        dataSource={props.data}
                        showSearch
                        filterOption={filterOption}
                        targetKeys={targetKeys}
                        onChange={handleChange}
                        onSearch={handleSearch}
                        render={(item) => item.title}
                    />
                </div>
            </Modal>
        </>
    )
}

export default TransferModal
