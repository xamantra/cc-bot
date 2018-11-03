"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_command_1 = require("./bot.command");
const enums_1 = require("./../core/enums");
const functions_1 = require("./functions");
const examples_1 = require("./examples");
const functions_2 = require("./functions");
exports.help = new bot_command_1.BotCommand("help", "Show all my command list.", false, false, enums_1.Response.ChannelReply, 10, functions_1.helpFunction);
exports.dmhelp = new bot_command_1.BotCommand("dmhelp", "Just similar with the* ***-help*** *command.", false, false, enums_1.Response.DirectMessage, 10, functions_1.helpFunction);
exports.when = new bot_command_1.BotCommand("when", `Search for a schedule of an anime that matches the keyword/parameter.\nYou can either put the exact anime title or just a keyword.`, true, false, enums_1.Response.ChannelReply, 5, functions_1.whenAnimeFunction, examples_1.mediaExample);
exports.dmwhen = new bot_command_1.BotCommand("dmwhen", "Just similar with the* ***-when*** *command.", true, false, enums_1.Response.DirectMessage, 5, functions_1.whenAnimeFunction, examples_1.mediaExample);
exports.sub = new bot_command_1.BotCommand("sub", "Subscribe to an ongoing anime. You can provide keyword or anime title.", true, false, enums_1.Response.ChannelReply, 5, functions_1.subscribeFunction, examples_1.mediaExample);
exports.dmsub = new bot_command_1.BotCommand("dmsub", "Just similar with* ***-sub.**", true, false, enums_1.Response.DirectMessage, 5, functions_1.subscribeFunction, examples_1.mediaExample);
exports.viewsubs = new bot_command_1.BotCommand("viewsubs", "View your own or other's subscription list.", false, true, enums_1.Response.ChannelReply, 20, functions_1.viewSubsFunction);
exports.dmviewsubs = new bot_command_1.BotCommand("dmviewsubs", "Just similar with* ***-viewsubs.**", false, true, enums_1.Response.DirectMessage, 20, functions_1.viewSubsFunction);
exports.unsub = new bot_command_1.BotCommand("unsub", "Unsubscribe to an ongoing anime. You can provide keyword or anime title.", true, false, enums_1.Response.ChannelReply, 5, functions_1.unsubFunction, examples_1.mediaExample);
exports.dmunsub = new bot_command_1.BotCommand("dmunsub", "Just similar with* ***-unsub.**", true, false, enums_1.Response.DirectMessage, 5, functions_1.unsubFunction, examples_1.mediaExample);
exports.malbind = new bot_command_1.BotCommand("malbind", `Bind your mal account with your Rikimaru Discord.`, true, false, enums_1.Response.ChannelReply, 10, functions_2.malBindFunction, examples_1.malBindExample, false);
exports.malsync = new bot_command_1.BotCommand("malsync", `Automatically subscribe to all ongoing anime in your MAL CW list. And also unsubscribe to any anime that it is not in your list.`, false, false, enums_1.Response.ChannelReply, 60, functions_2.malSyncFunction, null, false);
exports.ping = new bot_command_1.BotCommand("ping", "Just check your ping and the API's ping.", false, false, enums_1.Response.ChannelReply, 3, functions_1.pingFunction);
exports.dmping = new bot_command_1.BotCommand("dmping", "Just similar with* ***-ping*** *command.", false, false, enums_1.Response.DirectMessage, 3, functions_1.pingFunction);
exports.logall = new bot_command_1.BotCommand("logall", "Developer only..", false, false, enums_1.Response.DirectMessage, 0, functions_1.logAllFunction, null, true);
//# sourceMappingURL=commands.js.map