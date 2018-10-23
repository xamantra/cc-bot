import "reflect-metadata";
import { BotCommand } from "./../command/bot.command";
import "class-transformer";
import { ICommand } from "../interfaces/command.interface";
import { Message } from "discord.js";
import { RescueCenter } from "../core/rescue.center";
import { MediaResult } from "../core/media.result";
import { CommandManager } from "../command/manager.command";
import { Bot } from "../core/bot";

export class ResponseHandler {
  public static Get(message: Message, command: ICommand) {
    const commands = CommandManager.Commands;
    let iteration = 1;
    commands.forEach(cmd => {
      if (cmd.Name === command.Name) {
        const parameter = command.Parameter;
        const paramRequired = cmd.ParameterRequired;
        if (parameter.length === 0 && paramRequired) {
          this.SendRescue(message, cmd.DMResponse, cmd, command);
        } else if (parameter.length > 0 && !paramRequired) {
          this.SendRescue(message, cmd.DMResponse, cmd, command);
        } else {
          if (cmd.Function !== null) {
            if (
              cmd.DevOnly === true &&
              message.author.id === "442621672714010625"
            ) {
              cmd.Function.Execute(message, command, cmd.DMResponse);
              return;
            }

            if (Bot.IsActive === true)
              cmd.Function.Execute(message, command, cmd.DMResponse);
            else
              MediaResult.SendInfo(
                message,
                `I am currently on tweak mode. Please try again later. My creator is trying to do something on me.`,
                false
              );
          }
        }
        return;
      } else {
        if (iteration === commands.length) {
          MediaResult.SendInfo(
            message,
            `The command ***${
              command.Name
            }*** doesn't exists. Type the command: ***-help***  to see all commands.`,
            false
          );
          return;
        }
      }
      iteration++;
    });
  }

  private static SendRescue(
    message: Message,
    dm: boolean,
    botCommand: BotCommand,
    command: ICommand
  ) {
    MediaResult.SendInfo(
      message,
      RescueCenter.RequireParameter(botCommand, command),
      dm
    );
  }
}
