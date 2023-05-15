import axios from "axios"
import Swal from "sweetalert2"

axios.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error?.code == "ERR_CANCELED") return error
        const originalRequest = error.config
        if (!originalRequest.url.includes("api/login/") && !originalRequest.url.endsWith("api/login_status/")) {
            if (error.response.status == 400 || error.response.status == 403) {
                Swal.fire({
                    title: "Logged out",
                    text: "Invalid credential or credential expired,Redirecting to login",
                    icon: "error",
                    timer: 4000,
                    timerProgressBar: true,
                    didClose: () => window.location.assign("/"),
                })
            }
        }
        throw error
    }
)
