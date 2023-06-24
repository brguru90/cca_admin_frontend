import React from "react"
import LoginCheck from "../sharedComponet/LoginCheck"
import UserSubscriptions from "../components/user_subscriptions"

function UserSubscriptionsPage() {
    return <UserSubscriptions />
}

export default LoginCheck(UserSubscriptionsPage)
