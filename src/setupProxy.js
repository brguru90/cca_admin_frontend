const proxy = require("http-proxy-middleware")
const http = require("http")

const keepAliveAgent = new http.Agent({keepAlive: true})
module.exports = function (app) {
    app.use(
        proxy("/api", {
            target: process.env.BASE_URL,
            changeOrigin: true,
            agent: keepAliveAgent,
            // pathRewrite: {
            //     "^/api/": "/", // remove base path
            // },
            logLevel: "debug",
        })
    )
}
