import React, {useEffect} from "react"
import axios from "axios"
import {debounceAPI} from "../../utils/api_utils"

export default function (OriginalComponent) {
    const testAPI = new debounceAPI(800)

    return function LoginCheck() {
        const loginCheck = () => {
            testAPI.scheduleAPI.callback = (controller) =>
                axios.get("/api/login_status/?access_level=super_admin&escape_str", {
                    signal: controller.signal,
                })
        }
        let interval
        useEffect(async () => {
            await loginCheck()
            interval = setInterval(async () => {
                await loginCheck()
            }, 5000)
            return () => {
                clearInterval(interval)
                return () => testAPI?.scheduleAPI?.controller?.abort()
            }
        }, [])
        return <OriginalComponent />
    }
}
