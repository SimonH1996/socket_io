const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

module.exports.Poll = mongoose.model("Poll",PollSchema);