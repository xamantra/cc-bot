import { ICommandFunction } from "../../interfaces/command.function.interface";
import { MediaSearch } from "./../../core/media.search";
import { SubscriptionData } from "./../../data/subscription.data";
import { Message, User } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { IMedia } from "../../interfaces/page.interface";
import { UserData } from "../../data/user.data";
import { MediaFormatHandler } from "../../handlers/media.list.handler";
import { SearchList } from "../../core/search.list";
import { TitleHelper } from "../../helpers/title.helper";
import { Sender } from "./../../core/sender";

export class UnsubFunction implements ICommandFunction {
  public async Execute(
    message?: Message,
    command?: ICommand,
    dm?: boolean
  ): Promise<void> {
    await this.Search(message, command, dm);
  }

  private async Search(message?: Message, command?: ICommand, dm?: boolean) {
    const title = command.Parameter;
    let media: IMedia[] = [];
    const discordId = message.author.id;
    const userMedia: number[] = [];
    const filteredMedia: IMedia[] = [];
    const formattedResults: any[] = [];
    UserData.GetUser(discordId)
      .then(user => {
        MediaSearch.All(command.Parameter)
          .then(res => {
            media = res;
            SubscriptionData.All.forEach(async sub => {
              if (sub.UserId === user.Id) {
                await userMedia.push(sub.MediaId);
              }
            });
            media.forEach(async m => {
              if (userMedia.includes(m.idMal)) {
                await filteredMedia.push(m);
                await formattedResults.push(MediaFormatHandler.Get(m));
              }
            });
            if (filteredMedia.length === 0) {
              Sender.SendInfo(
                message,
                `Hmm..It seems that you are not subscribe to any anime that matches your keyword  ***${title}***.`,
                dm
              );
            } else if (filteredMedia.length === 1) {
              SubscriptionData.Delete(filteredMedia[0].idMal, discordId).then(
                () => {
                  Sender.SendInfo(
                    message,
                    `You are now unsubscribed from  ***${TitleHelper.Get(
                      filteredMedia[0].title
                    )}***`,
                    dm
                  );
                }
              );
            } else {
              SearchList.Embed(command, formattedResults).then(embed => {
                Sender.SendInfo(message, embed, dm);
              });
            }
          })
          .catch(error => {
            Sender.Send(
              message,
              `Ge mo nasai! I didn't find anime that matches your keyword \`${
                command.Parameter
              }\``,
              dm
            );
            console.warn(
              `Error while searching : [MediaSearch.All(${command.Parameter})]`
            );
          });
      })
      .catch((reason: Error) => {
        console.log(reason.message);
      });
  }
}
