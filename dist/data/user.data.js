"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_model_1 = require("../models/subscription.model");
const json_helper_1 = require("../helpers/json.helper");
const tables_1 = require("../core/tables");
const mongo_1 = require("../core/mongo");
class UserData {
    static get All() {
        return this.UserList;
    }
    static async Init() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            this.Initializing = true;
            const result = await mongo_1.Mongo.FindAll(tables_1.Tables.user);
            const users = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.User);
            if (users !== undefined && users !== null) {
                if (users.length === 0) {
                    this.Initializing = false;
                    console.log(`User List Length: ${this.UserList.length}`);
                    resolve();
                }
                else {
                    this.UserList = users;
                    this.Initializing = false;
                    console.log(`User List Length: ${this.UserList.length}`);
                    resolve();
                }
            }
            else {
                this.Initializing = false;
                reject(new Error(`"JsonHelper.ArrayConvert<User>(result, User)" is 'null' or 'undefined'.`));
            }
        });
    }
    static async GetUser(discordId) {
        return new Promise(async (res, rej) => {
            await this.OnReady();
            const user = this.All.find(x => x.DiscordId === discordId);
            if (user !== null && user !== undefined) {
                res(user);
            }
            else {
                rej(new Error(`"this.All.find(x => x.DiscordId === discordId)" is 'null' or 'undefined'.`));
            }
        });
    }
    static async GetUserById(id) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const user = this.All.find(x => x.Id === id);
            if (user !== null && user !== undefined) {
                resolve(user);
            }
            else {
                resolve(null);
            }
        });
    }
    static async Insert(discordId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const exists = await this.Exists(discordId).catch((err) => {
                reject(err);
            });
            if (exists === false) {
                const data = { discord_id: discordId };
                const result = await mongo_1.Mongo.Insert(tables_1.Tables.user, data);
                if (result.insertedId !== null && result.insertedId !== undefined) {
                    const user = new subscription_model_1.User();
                    user.Id = result.insertedId;
                    user.DiscordId = discordId;
                    this.UserList.push(user);
                }
                resolve(result.insertedId);
            }
            else {
                reject(new Error(`DiscordId: "${discordId}" already exists.`));
            }
        });
    }
    static async Exists(discordId) {
        return new Promise(async (res, rej) => {
            await this.OnReady();
            const u = this.All.find(x => x.DiscordId === discordId);
            if (u === undefined || u === null) {
                res(false);
            }
            else {
                res(true);
            }
        });
    }
    static async LogAll() {
        return new Promise(async (res, rej) => {
            await this.OnReady();
            if (this.All === undefined || this.All === null) {
                rej(new Error(`"UserData.All" is 'null' or 'undefined'.`));
            }
            else {
                console.log(this.All);
                res();
            }
        });
    }
    static OnReady() {
        return new Promise((resolve, reject) => {
            setInterval(() => {
                if (this.Initializing === false) {
                    resolve();
                }
            }, 1);
        });
    }
}
UserData.Initializing = false;
UserData.UserList = [];
exports.UserData = UserData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RhdGEvdXNlci5kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUVBQW9EO0FBQ3BELHdEQUFvRDtBQUNwRCwyQ0FBd0M7QUFDeEMseUNBQXNDO0FBRXRDLE1BQWEsUUFBUTtJQUVaLE1BQU0sS0FBSyxHQUFHO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBR00sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJO1FBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQU8sS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNqRCxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixNQUFNLE1BQU0sR0FBRyxNQUFNLGFBQUssQ0FBQyxPQUFPLENBQUMsZUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hELE1BQU0sS0FBSyxHQUFHLE1BQU0sd0JBQVUsQ0FBQyxZQUFZLENBQU8sTUFBTSxFQUFFLHlCQUFJLENBQUMsQ0FBQztZQUNoRSxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtnQkFDekMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7b0JBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztvQkFDekQsT0FBTyxFQUFFLENBQUM7aUJBQ1g7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO29CQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixJ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LE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxXQUFXLENBQUMsR0FBRyxFQUFFO2dCQUNmLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxLQUFLLEVBQUU7b0JBQy9CLE9BQU8sRUFBRSxDQUFDO2lCQUNYO1lBQ0gsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztBQXBITSxxQkFBWSxHQUFHLEtBQUssQ0FBQztBQUliLGlCQUFRLEdBQVcsRUFBRSxDQUFDO0FBTHZDLDRCQXNIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vbW9kZWxzL3N1YnNjcmlwdGlvbi5tb2RlbFwiO1xuaW1wb3J0IHsgSnNvbkhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL2pzb24uaGVscGVyXCI7XG5pbXBvcnQgeyBUYWJsZXMgfSBmcm9tIFwiLi4vY29yZS90YWJsZXNcIjtcbmltcG9ydCB7IE1vbmdvIH0gZnJvbSBcIi4uL2NvcmUvbW9uZ29cIjtcblxuZXhwb3J0IGNsYXNzIFVzZXJEYXRhIHtcbiAgc3RhdGljIEluaXRpYWxpemluZyA9IGZhbHNlO1xuICBwdWJsaWMgc3RhdGljIGdldCBBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuVXNlckxpc3Q7XG4gIH1cbiAgcHJpdmF0ZSBzdGF0aWMgVXNlckxpc3Q6IFVzZXJbXSA9IFtdO1xuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgSW5pdCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICB0aGlzLkluaXRpYWxpemluZyA9IHRydWU7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBNb25nby5GaW5kQWxsKFRhYmxlcy51c2VyKTtcbiAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgSnNvbkhlbHBlci5BcnJheUNvbnZlcnQ8VXNlcj4ocmVzdWx0LCBVc2VyKTtcbiAgICAgIGlmICh1c2VycyAhPT0gdW5kZWZpbmVkICYmIHVzZXJzICE9PSBudWxsKSB7XG4gICAgICAgIGlmICh1c2Vycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLkluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBVc2VyIExpc3QgTGVuZ3RoOiAke3RoaXMuVXNlckxpc3QubGVuZ3RofWApO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLlVzZXJMaXN0ID0gdXNlcnM7XG4gICAgICAgICAgdGhpcy5Jbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgVXNlciBMaXN0IExlbmd0aDogJHt0aGlzLlVzZXJMaXN0Lmxlbmd0aH1gKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgIHJlamVjdChcbiAgICAgICAgICBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgXCJKc29uSGVscGVyLkFycmF5Q29udmVydDxVc2VyPihyZXN1bHQsIFVzZXIpXCIgaXMgJ251bGwnIG9yICd1bmRlZmluZWQnLmBcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEdldFVzZXIoZGlzY29yZElkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VXNlcj4oYXN5bmMgKHJlcywgcmVqKSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGNvbnN0IHVzZXIgPSB0aGlzLkFsbC5maW5kKHggPT4geC5EaXNjb3JkSWQgPT09IGRpc2NvcmRJZCk7XG4gICAgICBpZiAodXNlciAhPT0gbnVsbCAmJiB1c2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzKHVzZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqKFxuICAgICAgICAgIG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBcInRoaXMuQWxsLmZpbmQoeCA9PiB4LkRpc2NvcmRJZCA9PT0gZGlzY29yZElkKVwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBHZXRVc2VyQnlJZChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFVzZXI+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgY29uc3QgdXNlciA9IHRoaXMuQWxsLmZpbmQoeCA9PiB4LklkID09PSBpZCk7XG4gICAgICBpZiAodXNlciAhPT0gbnVsbCAmJiB1c2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzb2x2ZSh1c2VyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEluc2VydChkaXNjb3JkSWQ6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxudW1iZXI+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgY29uc3QgZXhpc3RzID0gYXdhaXQgdGhpcy5FeGlzdHMoZGlzY29yZElkKS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGV4aXN0cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHsgZGlzY29yZF9pZDogZGlzY29yZElkIH07XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IE1vbmdvLkluc2VydChUYWJsZXMudXNlciwgZGF0YSk7XG4gICAgICAgIGlmIChyZXN1bHQuaW5zZXJ0ZWRJZCAhPT0gbnVsbCAmJiByZXN1bHQuaW5zZXJ0ZWRJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKCk7XG4gICAgICAgICAgdXNlci5JZCA9IHJlc3VsdC5pbnNlcnRlZElkO1xuICAgICAgICAgIHVzZXIuRGlzY29yZElkID0gZGlzY29yZElkO1xuICAgICAgICAgIHRoaXMuVXNlckxpc3QucHVzaCh1c2VyKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlc3VsdC5pbnNlcnRlZElkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoYERpc2NvcmRJZDogXCIke2Rpc2NvcmRJZH1cIiBhbHJlYWR5IGV4aXN0cy5gKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEV4aXN0cyhkaXNjb3JkSWQ6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPihhc3luYyAocmVzLCByZWopID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgY29uc3QgdSA9IHRoaXMuQWxsLmZpbmQoeCA9PiB4LkRpc2NvcmRJZCA9PT0gZGlzY29yZElkKTtcbiAgICAgIGlmICh1ID09PSB1bmRlZmluZWQgfHwgdSA9PT0gbnVsbCkge1xuICAgICAgICByZXMoZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzKHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBMb2dBbGwoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXMsIHJlaikgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICBpZiAodGhpcy5BbGwgPT09IHVuZGVmaW5lZCB8fCB0aGlzLkFsbCA9PT0gbnVsbCkge1xuICAgICAgICByZWoobmV3IEVycm9yKGBcIlVzZXJEYXRhLkFsbFwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkFsbCk7XG4gICAgICAgIHJlcygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBPblJlYWR5KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLkluaXRpYWxpemluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDEpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=