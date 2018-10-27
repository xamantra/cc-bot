import { BotCommand } from "./bot.command";
import { Response } from "./../core/enums";
import {
  helpFunction,
  whenAnimeFunction,
  pingFunction,
  subscribeFunction,
  logAllFunction,
  viewSubsFunction,
  unsubFunction
} from "./functions";
import { mediaExample } from "./examples";

export const help = new BotCommand(
  "help",
  "Show all my command list.",
  false,
  false,
  Response.ChannelReply,
  helpFunction
);
export const dmhelp = new BotCommand(
  "dmhelp",
  "Just similar with the* ***-help*** *command.",
  false,
  false,
  Response.DirectMessage,
  helpFunction
);
export const when = new BotCommand(
  "when",
  `Search for a schedule of an anime that matches the keyword/parameter.\nYou can either put the exact anime title or just a keyword.`,
  true,
  false,
  Response.ChannelReply,
  whenAnimeFunction,
  mediaExample
);
export const dmwhen = new BotCommand(
  "dmwhen",
  "Just similar with the* ***-when*** *command.",
  true,
  false,
  Response.DirectMessage,
  whenAnimeFunction,
  mediaExample
);
export const sub = new BotCommand(
  "sub",
  "Subscribe to an ongoing anime. You can provide keyword or anime title.",
  true,
  false,
  Response.ChannelReply,
  subscribeFunction,
  mediaExample
);
export const dmsub = new BotCommand(
  "dmsub",
  "Just similar with* ***-sub.**",
  true,
  false,
  Response.DirectMessage,
  subscribeFunction,
  mediaExample
);
export const viewsubs = new BotCommand(
  "viewsubs",
  "View your own or other's subscription list.",
  false,
  true,
  Response.ChannelReply,
  viewSubsFunction
);
export const dmviewsubs = new BotCommand(
  "dmviewsubs",
  "Just similar with* ***-viewsubs.**",
  false,
  true,
  Response.DirectMessage,
  viewSubsFunction
);
export const unsub = new BotCommand(
  "unsub",
  "Unsubscribe to an ongoing anime. You can provide keyword or anime title.",
  true,
  false,
  Response.ChannelReply,
  unsubFunction,
  mediaExample
);
export const dmunsub = new BotCommand(
  "dmunsub",
  "Just similar with* ***-unsub.**",
  true,
  false,
  Response.DirectMessage,
  unsubFunction,
  mediaExample
);
export const ping = new BotCommand(
  "ping",
  "Just check your ping and the API's ping.",
  false,
  false,
  Response.ChannelReply,
  pingFunction
);
export const dmping = new BotCommand(
  "dmping",
  "Just similar with* ***-ping*** *command.",
  false,
  false,
  Response.DirectMessage,
  pingFunction
);
export const logall = new BotCommand(
  "logall",
  "Developer only..",
  false,
  false,
  Response.DirectMessage,
  logAllFunction,
  null,
  true
);
