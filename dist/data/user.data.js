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
                    console.log(`User Length: "${this.UserList.length}"`);
                    resolve();
                }
                else {
                    this.UserList = users;
                    this.Initializing = false;
                    console.log(`User Length: "${this.UserList.length}"`);
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
                reject(new Error(`"this.All.find(x => x.Id === id)" is 'null' or 'undefined'.`));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RhdGEvdXNlci5kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUVBQW9EO0FBQ3BELHdEQUFvRDtBQUNwRCwyQ0FBd0M7QUFDeEMseUNBQXNDO0FBRXRDLE1BQWEsUUFBUTtJQUVaLE1BQU0sS0FBSyxHQUFHO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBR00sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJO1FBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQU8sS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNqRCxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixNQUFNLE1BQU0sR0FBRyxNQUFNLGFBQUssQ0FBQyxPQUFPLENBQUMsZUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hELE1BQU0sS0FBSyxHQUFHLE1BQU0sd0JBQVUsQ0FBQyxZQUFZLENBQU8sTUFBTSxFQUFFLHlCQUFJLENBQUMsQ0FBQztZQUNoRSxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtnQkFDekMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7b0JBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDdEQsT0FBTyxFQUFFLENBQUM7aUJBQ1g7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO29CQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixJ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QUMsT0FBTztRQUNuQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2YsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLEtBQUssRUFBRTtvQkFDL0IsT0FBTyxFQUFFLENBQUM7aUJBQ1g7WUFDSCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBeEhNLHFCQUFZLEdBQUcsS0FBSyxDQUFDO0FBSWIsaUJBQVEsR0FBVyxFQUFFLENBQUM7QUFMdkMsNEJBMEhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9tb2RlbHMvc3Vic2NyaXB0aW9uLm1vZGVsXCI7XG5pbXBvcnQgeyBKc29uSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvanNvbi5oZWxwZXJcIjtcbmltcG9ydCB7IFRhYmxlcyB9IGZyb20gXCIuLi9jb3JlL3RhYmxlc1wiO1xuaW1wb3J0IHsgTW9uZ28gfSBmcm9tIFwiLi4vY29yZS9tb25nb1wiO1xuXG5leHBvcnQgY2xhc3MgVXNlckRhdGEge1xuICBzdGF0aWMgSW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gIHB1YmxpYyBzdGF0aWMgZ2V0IEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5Vc2VyTGlzdDtcbiAgfVxuICBwcml2YXRlIHN0YXRpYyBVc2VyTGlzdDogVXNlcltdID0gW107XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBJbml0KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gdHJ1ZTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IE1vbmdvLkZpbmRBbGwoVGFibGVzLnVzZXIpO1xuICAgICAgY29uc3QgdXNlcnMgPSBhd2FpdCBKc29uSGVscGVyLkFycmF5Q29udmVydDxVc2VyPihyZXN1bHQsIFVzZXIpO1xuICAgICAgaWYgKHVzZXJzICE9PSB1bmRlZmluZWQgJiYgdXNlcnMgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKHVzZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgICAgY29uc29sZS5sb2coYFVzZXIgTGVuZ3RoOiBcIiR7dGhpcy5Vc2VyTGlzdC5sZW5ndGh9XCJgKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5Vc2VyTGlzdCA9IHVzZXJzO1xuICAgICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgICAgY29uc29sZS5sb2coYFVzZXIgTGVuZ3RoOiBcIiR7dGhpcy5Vc2VyTGlzdC5sZW5ndGh9XCJgKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgIHJlamVjdChcbiAgICAgICAgICBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgXCJKc29uSGVscGVyLkFycmF5Q29udmVydDxVc2VyPihyZXN1bHQsIFVzZXIpXCIgaXMgJ251bGwnIG9yICd1bmRlZmluZWQnLmBcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEdldFVzZXIoZGlzY29yZElkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VXNlcj4oYXN5bmMgKHJlcywgcmVqKSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGNvbnN0IHVzZXIgPSB0aGlzLkFsbC5maW5kKHggPT4geC5EaXNjb3JkSWQgPT09IGRpc2NvcmRJZCk7XG4gICAgICBpZiAodXNlciAhPT0gbnVsbCAmJiB1c2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzKHVzZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqKFxuICAgICAgICAgIG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBcInRoaXMuQWxsLmZpbmQoeCA9PiB4LkRpc2NvcmRJZCA9PT0gZGlzY29yZElkKVwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBHZXRVc2VyQnlJZChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFVzZXI+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgY29uc3QgdXNlciA9IHRoaXMuQWxsLmZpbmQoeCA9PiB4LklkID09PSBpZCk7XG4gICAgICBpZiAodXNlciAhPT0gbnVsbCAmJiB1c2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzb2x2ZSh1c2VyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChcbiAgICAgICAgICBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgXCJ0aGlzLkFsbC5maW5kKHggPT4geC5JZCA9PT0gaWQpXCIgaXMgJ251bGwnIG9yICd1bmRlZmluZWQnLmBcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEluc2VydChkaXNjb3JkSWQ6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxudW1iZXI+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgY29uc3QgZXhpc3RzID0gYXdhaXQgdGhpcy5FeGlzdHMoZGlzY29yZElkKS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGV4aXN0cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHsgZGlzY29yZF9pZDogZGlzY29yZElkIH07XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IE1vbmdvLkluc2VydChUYWJsZXMudXNlciwgZGF0YSk7XG4gICAgICAgIGlmIChyZXN1bHQuaW5zZXJ0ZWRJZCAhPT0gbnVsbCAmJiByZXN1bHQuaW5zZXJ0ZWRJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKCk7XG4gICAgICAgICAgdXNlci5JZCA9IHJlc3VsdC5pbnNlcnRlZElkO1xuICAgICAgICAgIHVzZXIuRGlzY29yZElkID0gZGlzY29yZElkO1xuICAgICAgICAgIHRoaXMuVXNlckxpc3QucHVzaCh1c2VyKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlc3VsdC5pbnNlcnRlZElkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoYERpc2NvcmRJZDogXCIke2Rpc2NvcmRJZH1cIiBhbHJlYWR5IGV4aXN0cy5gKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEV4aXN0cyhkaXNjb3JkSWQ6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPihhc3luYyAocmVzLCByZWopID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgY29uc3QgdSA9IHRoaXMuQWxsLmZpbmQoeCA9PiB4LkRpc2NvcmRJZCA9PT0gZGlzY29yZElkKTtcbiAgICAgIGlmICh1ID09PSB1bmRlZmluZWQgfHwgdSA9PT0gbnVsbCkge1xuICAgICAgICByZXMoZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzKHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBMb2dBbGwoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXMsIHJlaikgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICBpZiAodGhpcy5BbGwgPT09IHVuZGVmaW5lZCB8fCB0aGlzLkFsbCA9PT0gbnVsbCkge1xuICAgICAgICByZWoobmV3IEVycm9yKGBcIlVzZXJEYXRhLkFsbFwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkFsbCk7XG4gICAgICAgIHJlcygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBPblJlYWR5KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLkluaXRpYWxpemluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDEpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=