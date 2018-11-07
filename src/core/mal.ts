import { Config } from "./config";
import rp from "request-promise";
import { JsonHelper } from "../helpers/json.helper";
import { MalAnime } from "../models/mal.anime.model";
import cheerio from "cheerio";

export class MAL {
  public static GetCWList(username: string) {
    return new Promise<MalAnime[]>((resolve, reject) => {
      const url = Config.MAL_CW_LINK(username);
      const options = {
        uri: url,
        json: true
      };

      rp(options)
        .then(async (result: any) => {
          const converted = await JsonHelper.ArrayConvert<MalAnime>(
            result,
            MalAnime
          );
          if (converted != null || converted !== undefined) {
            resolve(converted);
          } else {
            reject(new Error(`Result is either 'null' or 'undefined'.`));
          }
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  public static GetProfileAbout(username: string) {
    return new Promise<string>((resolve, reject) => {
      const url = `${Config.MAL_PROFILE_BASE}/${username}`;
      const options = {
        uri: url,
        transform: function(body: string) {
          return cheerio.load(body);
        }
      };

      rp(options)
        .then(($: CheerioStatic) => {
          resolve(
            $(".profile-about-user")
              .find(".word-break")
              .text()
          );
        })
        .catch(err => {
          console.log(err);
          resolve(null);
        });
    });
  }
}
