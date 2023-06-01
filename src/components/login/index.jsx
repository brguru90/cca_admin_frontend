import React from "react"
import "./style.scss"
import {Button, Form, Input} from "antd"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
import {useEffect} from "react"

export default function Login() {
    let navigate = useNavigate()

    const LoginStatusCheck = () => {
        axios
            .get("/api/login_status/?access_level=admin")
            .then((res) => {
                if (res.status == 200) {
                    console.log({res})
                    navigate("/home")
                }
            })
            .catch(() => {})
    }

    useEffect(() => {
        LoginStatusCheck()
    }, [])

    const onSubmit = ({email, password}) => {
        axios({
            method: "post",
            url: "/api/login/",
            data: JSON.stringify({email, password}), // you are sending body instead
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log({res})
                sessionStorage.setItem("super_admin", res?.data?.data?.access_level == "super_admin" ? "true" : "false")
                navigate("/home")
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
        <div className="login_page">
            <fieldset className="login_form">
                <legend className="login_title">Login</legend>
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
                    initialValues={{remember: true}}
                    onFinish={onSubmit}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        initialValue={"brguru90@gmail.com"}
                        rules={[{required: true, message: "Please input your username!"}]}
                    >
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password" initialValue={""} rules={[{required: true, message: "Please input your password!"}]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </fieldset>
        </div>
    )
}
