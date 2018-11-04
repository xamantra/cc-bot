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
            let iteration = 1;
            if (users !== undefined && users !== null) {
                if (users.length === 0) {
                    this.Initializing = false;
                    resolve();
                }
                users.forEach(user => {
                    this.UserList.push(user);
                    if (iteration === users.length) {
                        this.Initializing = false;
                        resolve();
                    }
                    else {
                        iteration++;
                    }
                });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RhdGEvdXNlci5kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUVBQW9EO0FBQ3BELHdEQUFvRDtBQUNwRCwyQ0FBd0M7QUFDeEMseUNBQXNDO0FBRXRDLE1BQWEsUUFBUTtJQUVaLE1BQU0sS0FBSyxHQUFHO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBR00sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJO1FBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQU8sS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNqRCxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixNQUFNLE1BQU0sR0FBRyxNQUFNLGFBQUssQ0FBQyxPQUFPLENBQUMsZUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hELE1BQU0sS0FBSyxHQUFHLE1BQU0sd0JBQVUsQ0FBQyxZQUFZLENBQU8sTUFBTSxFQUFFLHlCQUFJLENBQUMsQ0FBQztZQUNoRSxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDbEIsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7Z0JBQ3pDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO29CQUMxQixPQUFPLEVBQUUsQ0FBQztpQkFDWDtnQkFDRCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekIsSUFBSSxTQUFTLEtBQUssS0FBSyxDQUFDLE1BQU0sRUFBRTt3QkFDOUIsSUFBSSxDQUFDLFlBQVks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QUMsQ0FBQztJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsT0FBTztRQUNuQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2YsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLEtBQUssRUFBRTtvQkFDL0IsT0FBTyxFQUFFLENBQUM7aUJBQ1g7WUFDSCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBNUhNLHFCQUFZLEdBQUcsS0FBSyxDQUFDO0FBSWIsaUJBQVEsR0FBVyxFQUFFLENBQUM7QUFMdkMsNEJBOEhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9tb2RlbHMvc3Vic2NyaXB0aW9uLm1vZGVsXCI7XHJcbmltcG9ydCB7IEpzb25IZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy9qc29uLmhlbHBlclwiO1xyXG5pbXBvcnQgeyBUYWJsZXMgfSBmcm9tIFwiLi4vY29yZS90YWJsZXNcIjtcclxuaW1wb3J0IHsgTW9uZ28gfSBmcm9tIFwiLi4vY29yZS9tb25nb1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXJEYXRhIHtcclxuICBzdGF0aWMgSW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgcHVibGljIHN0YXRpYyBnZXQgQWxsKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuVXNlckxpc3Q7XHJcbiAgfVxyXG4gIHByaXZhdGUgc3RhdGljIFVzZXJMaXN0OiBVc2VyW10gPSBbXTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBhc3luYyBJbml0KCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XHJcbiAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gdHJ1ZTtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgTW9uZ28uRmluZEFsbChUYWJsZXMudXNlcik7XHJcbiAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgSnNvbkhlbHBlci5BcnJheUNvbnZlcnQ8VXNlcj4ocmVzdWx0LCBVc2VyKTtcclxuICAgICAgbGV0IGl0ZXJhdGlvbiA9IDE7XHJcbiAgICAgIGlmICh1c2VycyAhPT0gdW5kZWZpbmVkICYmIHVzZXJzICE9PSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHVzZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgdGhpcy5Jbml0aWFsaXppbmcgPSBmYWxzZTtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdXNlcnMuZm9yRWFjaCh1c2VyID0+IHtcclxuICAgICAgICAgIHRoaXMuVXNlckxpc3QucHVzaCh1c2VyKTtcclxuICAgICAgICAgIGlmIChpdGVyYXRpb24gPT09IHVzZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLkluaXRpYWxpemluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpdGVyYXRpb24rKztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkluaXRpYWxpemluZyA9IGZhbHNlO1xyXG4gICAgICAgIHJlamVjdChcclxuICAgICAgICAgIG5ldyBFcnJvcihcclxuICAgICAgICAgICAgYFwiSnNvbkhlbHBlci5BcnJheUNvbnZlcnQ8VXNlcj4ocmVzdWx0LCBVc2VyKVwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEdldFVzZXIoZGlzY29yZElkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxVc2VyPihhc3luYyAocmVzLCByZWopID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XHJcbiAgICAgIGNvbnN0IHVzZXIgPSB0aGlzLkFsbC5maW5kKHggPT4geC5EaXNjb3JkSWQgPT09IGRpc2NvcmRJZCk7XHJcbiAgICAgIGlmICh1c2VyICE9PSBudWxsICYmIHVzZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJlcyh1c2VyKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZWooXHJcbiAgICAgICAgICBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgIGBcInRoaXMuQWxsLmZpbmQoeCA9PiB4LkRpc2NvcmRJZCA9PT0gZGlzY29yZElkKVwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEdldFVzZXJCeUlkKGlkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxVc2VyPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xyXG4gICAgICBjb25zdCB1c2VyID0gdGhpcy5BbGwuZmluZCh4ID0+IHguSWQgPT09IGlkKTtcclxuICAgICAgaWYgKHVzZXIgIT09IG51bGwgJiYgdXNlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZWplY3QoXHJcbiAgICAgICAgICBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgIGBcInRoaXMuQWxsLmZpbmQoeCA9PiB4LklkID09PSBpZClcIiBpcyAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuYFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBhc3luYyBJbnNlcnQoZGlzY29yZElkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxudW1iZXI+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XHJcbiAgICAgIGNvbnN0IGV4aXN0cyA9IGF3YWl0IHRoaXMuRXhpc3RzKGRpc2NvcmRJZCkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcclxuICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChleGlzdHMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHsgZGlzY29yZF9pZDogZGlzY29yZElkIH07XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgTW9uZ28uSW5zZXJ0KFRhYmxlcy51c2VyLCBkYXRhKTtcclxuICAgICAgICBpZiAocmVzdWx0Lmluc2VydGVkSWQgIT09IG51bGwgJiYgcmVzdWx0Lmluc2VydGVkSWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKCk7XHJcbiAgICAgICAgICB1c2VyLklkID0gcmVzdWx0Lmluc2VydGVkSWQ7XHJcbiAgICAgICAgICB1c2VyLkRpc2NvcmRJZCA9IGRpc2NvcmRJZDtcclxuICAgICAgICAgIHRoaXMuVXNlckxpc3QucHVzaCh1c2VyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQuaW5zZXJ0ZWRJZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgRGlzY29yZElkOiBcIiR7ZGlzY29yZElkfVwiIGFscmVhZHkgZXhpc3RzLmApKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEV4aXN0cyhkaXNjb3JkSWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KGFzeW5jIChyZXMsIHJlaikgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcclxuICAgICAgY29uc3QgdSA9IHRoaXMuQWxsLmZpbmQoeCA9PiB4LkRpc2NvcmRJZCA9PT0gZGlzY29yZElkKTtcclxuICAgICAgaWYgKHUgPT09IHVuZGVmaW5lZCB8fCB1ID09PSBudWxsKSB7XHJcbiAgICAgICAgcmVzKGZhbHNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXModHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBhc3luYyBMb2dBbGwoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xyXG4gICAgICBpZiAodGhpcy5BbGwgPT09IHVuZGVmaW5lZCB8fCB0aGlzLkFsbCA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJlaihuZXcgRXJyb3IoYFwiVXNlckRhdGEuQWxsXCIgaXMgJ251bGwnIG9yICd1bmRlZmluZWQnLmApKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkFsbCk7XHJcbiAgICAgICAgcmVzKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBPblJlYWR5KCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLkluaXRpYWxpemluZyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==