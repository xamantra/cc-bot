import { Random } from "../../helpers/random.helper";
import { ICommandExample } from "../../interfaces/command.example.interface";
import { ICommand } from "../../interfaces/command.interface";
import { Config } from "../../core/config";

export class MediaExample implements ICommandExample {
  public Count: number;
  private media: string[] = [];

  constructor(count: number) {
    this.Count = count;
    this.media = [
      "blood lad",
      "canaan",
      "another",
      "cells at work",
      "gate",
      "god eater",
      "grimgar",
      "with my smartphone",
      "kabaneri",
      "kanatagatari",
      "kiba",
      "made in abyss",
      "king's avatar",
      "konosuba",
      "kyoukai no kanata",
      "mob psycho",
      "mondaiji-taichi",
      "hero academia",
      "boku no hero",
      "nanatsu",
      "no game no life",
      "noragami",
      "one punch man",
      "oregairu",
      "plastic memories",
      "rokuaka",
      "scum's wish",
      "seraph of the end",
      "shuumatsu",
      "sirius",
      "zestiria",
      "devil is a part-timer",
      "your name",
      "shape of voice",
      "witch craft",
      "tokyo ghoul",
      "radiant",
      "karakuri",
      "youjo senki",
      "zombieland",
      "one piece",
      "classroom of the elites",
      "your lie in april",
      "code geass",
      "sao",
      "danmachi",
      "re zero",
      "dororo",
      "boarding juliet",
      "reincarnated as slime",
      "bunny girl senpai",
      "irozuku sekai",
      "kekkai sensen",
      "boruto",
      "merc storia",
      "gridman",
      "tokyo ghoul",
      "franxx",
      "akame ga kill",
      "asobi asobase",
      "goblin slayer"
    ];
  }

  public Get(command: ICommand, count: number) {
    let result = ``;
    const picked: string[] = [];
    for (let i = 0; i < this.media.length; i++) {
      const item: string = this.media[Random.Range(0, this.media.length - 1)];
      if (!picked.includes(item) && picked.length < count) {
        result += `\n${Config.COMMAND_PREFIX}*${command.Name}* ${item}`;
        picked.push(item);
      }
      if (picked.length === count) {
        return result;
      }
    }
    return result;
  }
}
