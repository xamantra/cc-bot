import "reflect-metadata";
import { BotCommand } from "./../command/bot.command";
import "class-transformer";
import { ICommand } from "../interfaces/command.interface";
import { Message } from "discord.js";
import { RescueCenter } from "../core/rescue.center";
import { CommandManager } from "../command/manager.command";
import { Sender } from "./../core/sender";
import { Cooldown } from "../models/cooldown.model";

export class ResponseHandler {
  public static Get(message: Message, command: ICommand) {
    CommandManager.Validate(command)
      .then(cmd => {
        Cooldown.Get(cmd, message.member.user).then(cooldown => {
          cooldown.Register(message).then(response => {
            if (response === null) {
              const parameter = command.Parameter;
              const paramRequired = cmd.ParameterRequired;
              if (
                cmd.CanHaveMention &&
                message.mentions !== null &&
                message.mentions !== undefined
              ) {
                cmd.Function.Execute(message, command, cmd.DirectMessage);
                return;
              } else if (parameter.length === 0 && paramRequired) {
                this.SendRescue(message, cmd.DirectMessage, cmd, command);
                return;
              } else if (parameter.length > 0 && !paramRequired) {
                this.SendRescue(message, cmd.DirectMessage, cmd, command);
                return;
              } else {
                if (cmd.Function !== null) {
                  if (
                    cmd.DevOnly === true &&
                    message.author.id === "442621672714010625"
                  ) {
                    cmd.Function.Execute(message, command, cmd.DirectMessage);
                    return;
                  }
                  cmd.Function.Execute(message, command, cmd.DirectMessage);
                  return;
                }
              }
              return;
            } else {
              message.channel
                .send(`${response.content} -  \`${response.countdown}s\``)
                .then(($m: Message) => {
                  if (message.deletable) {
                    message.delete();
                  }
                  setInterval(() => {
                    if ($m !== null && $m !== undefined) {
                      const temp = response.countdown - 1;
                      $m.edit(`${response.content} -  \`${temp}s\``);
                    }
                  }, 1000);
                  setTimeout(() => {
                    $m.delete();
                  }, response.timeout);
                });
            }
          });
        });
      })
      .catch((err: Error) => {
        message.reply(err.message);
      });
  }

  private static SendRescue(
    message: Message,
    dm: boolean,
    botCommand: BotCommand,
    command: ICommand
  ) {
    RescueCenter.RequireParameter(botCommand, command).then(embed => {
      Sender.SendInfo(message, embed, dm);
    });
  }
}
