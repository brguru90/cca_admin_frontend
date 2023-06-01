import React from "react"
import LoginCheck from "../sharedComponet/LoginCheck"
import AdminUsers from "../components/admin_users"

function UsersPage() {
    return <AdminUsers />
}

export default LoginCheck(UsersPage)
