"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_data_1 = require("./data/queue.data");
const discord_js_1 = require("discord.js");
const bot_1 = require("./core/bot");
const subscription_data_1 = require("./data/subscription.data");
const media_data_1 = require("./data/media.data");
const user_data_1 = require("./data/user.data");
const data_helper_1 = require("./helpers/data.helper");
const client_1 = require("./core/client");
const manager_command_1 = require("./command/manager.command");
const message_handler_1 = require("./handlers/message.handler");
const openshift_1 = require("./others/openshift");
openshift_1.OpenShiftUptimer.Log(true);
openshift_1.OpenShiftUptimer.AutoConfigure();
bot_1.Bot.Instance.Init();
client_1.ClientManager.Init(new discord_js_1.Client());
message_handler_1.MessageHandler.Init();
manager_command_1.CommandManager.Init();
data_helper_1.DataHelper.Instance.Init().then(() => {
    user_data_1.UserData.Instance.Init()
        .then(() => {
        media_data_1.MediaData.Instance.Init()
            .then(() => {
            queue_data_1.QueueData.Instance.Init()
                .then(() => {
                subscription_data_1.SubscriptionData.Instance.Init().catch((reason) => {
                    console.log(reason.message);
                });
            })
                .catch((reason) => {
                console.log(reason.message);
            });
        })
            .catch((reason) => {
            console.log(reason.message);
        });
    })
        .catch((reason) => {
        console.log(reason.message);
    });
});
//# sourceMappingURL=index.js.map