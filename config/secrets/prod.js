// prod.js - production keys should be fetched from environment variables
module.exports = {
    session:{
        secret:process.env.SESSION_SECRET
    },
    auth: {
        username: process.env.AUTH_USERNAME,
        password: process.env.AUTH_PASSWORD
    },
    jupyter: {
        host: process.env.JUPYTER_HOST,
        port: process.env.JUPYTER_PORT,
        username: process.env.JUPYTER_USERNAME,
        password: process.env.JUPYTER_PASSWORD,
        bootNum: process.env.JUPYTER_BOOT_NUM
    },
    miner: {
        host: process.env.MINER_HOST,
        port: process.env.MINER_PORT,
        username: process.env.MINER_USERNAME,
        password: process.env.MINER_PASSWORD,
        bootNum: process.env.MINER_BOOT_NUM
    }
};