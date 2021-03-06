import { Message } from "discord.js";
import { ICommandFunction } from "../../interfaces/command.function.interface";
import { ICommand } from "../../interfaces/command.interface";
import { ClientManager } from "../../core/client";

export class PingFunction implements ICommandFunction {
  constructor() {}

  public async Execute(message?: Message, command?: ICommand, dm?: boolean) {
    await this.Get(message, dm);
  }

  public async Get(message: Message, isDM: boolean) {
    const client = ClientManager.Client;
    const m = isDM
      ? ((await message.author.send("Ping?")) as Message)
      : ((await message.reply("Ping?")) as Message);
    await m.edit(
      `Pingga!, Pongga! Latency is ${m.createdTimestamp -
        message.createdTimestamp}ms. API Latency is ${Math.round(
        client.ping
      )}ms`
    );
  }
}
