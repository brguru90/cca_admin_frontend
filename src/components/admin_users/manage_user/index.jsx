import React, {useEffect} from "react"
import {Modal} from "antd"
import "./style.scss"
import {Checkbox, Form, Input, Button} from "antd"
import axios from "axios"
import Swal from "sweetalert2"
import {Toast} from "./../../../utils/utils"

const ManageUsers = (props) => {
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({
            is_super_admin: props?.selectedAdminUser?.access_level == "super_admin",
        })
    }, [props?.selectedAdminUser])

    const handleCancel = () => {
        props?.handleCancel()
    }

    const onFinish = ({password, is_super_admin}) => {
        const req_payload = {
            user_id: props?.selectedAdminUser?.["_id"],
            is_super_admin,
        }
        if (password.trim() != "") {
            req_payload["password"] = password
        }
        axios({
            method: "put",
            url: "/api/super_admin/user/",
            data: JSON.stringify(req_payload), // you are sending body instead
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
                    props?.fetchAdminUsers()
                    props?.handleCancel()
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
    }

    return (
        <>
            <Modal
                className="manage_user_modal"
                title={`Edit credential for ${props?.selectedAdminUser?.username}`}
                open={props?.showModal}
                onCancel={handleCancel}
                footer={[]}
            >
                <div className="manage_user_modal_body">
                    <Form
                        form={form}
                        name="basic"
                        // labelCol={{ span: 8 }}
                        // wrapperCol={{ span: 16 }}
                        initialValues={{is_super_admin: props?.selectedAdminUser?.access_level == "super_admin"}}
                        onFinish={onFinish}
                        autoComplete="off"
                        className="actual_form"
                    >
                        <Form.Item label="Password" name="password" initialValue={""}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item name="is_super_admin" label="Super Admin" valuePropName="checked">
                            <Checkbox
                                checked={props?.selectedAdminUser?.access_level == "super_admin"}
                                defaultChecked={props?.selectedAdminUser?.access_level == "super_admin"}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}

export default ManageUsers
