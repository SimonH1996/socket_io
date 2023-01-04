
const express = require('express');
const app = express();
require('./mongoose.config');
const server = app.listen(5000, () =>
    console.log('The server is all fired up on port 5000')
);

const io = require('socket.io')(server, { cors: true });
const { Poll } = require("./model.js");


async function getCounts() {
    let amountOfA = 0
    let amountOfB = 0
    let amountOfC = 0
    await Poll.count({ name: "A" }).then(res => amountOfA = res)
    await Poll.count({ name: "B" }).then(res => amountOfB = res)
    await Poll.count({ name: "C" }).then(res => amountOfC = res)

    return [amountOfA, amountOfB, amountOfC]

}

io.on("connection", socket => {
    console.log(socket.id)
    socket.on("answer", (data) => {
        Poll.create({ name: data }).then(() => {
            getCounts().then(counts =>io.emit("send_data_to_all_other_clients",counts))
        })
    })

    socket.on("update", (data) => {
        getCounts().then(counts =>io.emit("send_data_to_all_other_clients",counts ))
    })

})