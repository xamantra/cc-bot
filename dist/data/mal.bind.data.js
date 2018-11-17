"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("../core/mongo");
const table_1 = require("../core/table");
const mal_bind_model_1 = require("../models/mal.bind.model");
const json_helper_1 = require("../helpers/json.helper");
const array_helper_1 = require("../helpers/array.helper");
class MalBindData {
    static Init() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            this.Initializing = true;
            const results = await mongo_1.Mongo.FindAll(table_1.Table.malbind);
            const list = await json_helper_1.JsonHelper.ArrayConvert(results, mal_bind_model_1.MalBind);
            if (list === undefined || list === null) {
                this.Initializing = false;
                console.log(`JsonHelper.ArrayConvert<MalSync>(results, MalSync) is 'null' or 'undefined'.`);
                resolve();
            }
            else {
                if (list.length === 0) {
                    this.Initializing = false;
                    console.log(`MalBind List Length: ${this.List.length}`);
                    resolve();
                }
                else {
                    this.List = list;
                    this.Initializing = false;
                    console.log(`MalBind List Length: ${this.List.length}`);
                    resolve();
                }
            }
        });
    }
    static Insert(discordId, malUsername, code) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const exists = await this.Exists(discordId);
            if (exists === false) {
                const data = {
                    discord_id: discordId,
                    mal_username: malUsername,
                    code: code,
                    verified: false
                };
                const result = await mongo_1.Mongo.Insert(table_1.Table.malbind, data);
                console.log(result.insertedId);
                const malsync = new mal_bind_model_1.MalBind();
                malsync.Id = result.insertedId;
                malsync.DiscordId = discordId;
                malsync.MalUsername = malUsername;
                malsync.Code = code;
                malsync.Verified = false;
                this.List.push(malsync);
                resolve(malsync);
            }
            else {
                resolve(this.All.find(x => x.DiscordId === discordId));
            }
        });
    }
    static get All() {
        return this.List;
    }
    static Verify(discordId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const query = { discord_id: discordId };
            const newValue = { $set: { verified: true } };
            await mongo_1.Mongo.Update(table_1.Table.malbind, query, newValue);
            const oldValue = await this.Get(discordId);
            array_helper_1.ArrayHelper.remove(this.List, oldValue, async () => {
                const res = await mongo_1.Mongo.FindOne(table_1.Table.malbind, query);
                const ms = await json_helper_1.JsonHelper.ArrayConvert(res, mal_bind_model_1.MalBind);
                const m = ms[0];
                console.log(`Update MAL bind: ${m.Code}`);
                if (m !== null && m !== undefined) {
                    this.List.push(m);
                    resolve(m);
                }
                else {
                    console.log(`JsonHelper.Convert<MalSync>(res, MalSync) is 'null' or 'undefined'.`);
                    resolve(null);
                }
            });
        });
    }
    static Exists(discordId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const malsync = this.List.find(m => m.DiscordId === discordId);
            if (malsync === null || malsync === undefined) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    }
    static Get(discordId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            let iteration = 0;
            if (this.List.length === 0) {
                console.log(`List is empty.`);
                resolve(null);
            }
            this.List.forEach(m => {
                iteration++;
                if (m.DiscordId === discordId) {
                    resolve(m);
                }
                else {
                    if (iteration === this.List.length) {
                        console.log(`this.List.find(m => m.DiscordId === discordId) is 'null' or 'undefined'.`);
                        resolve(null);
                    }
                }
            });
        });
    }
    static LogAll() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            if (this.List === null ||
                this.List === undefined ||
                this.List.length === 0) {
                reject(new Error(`this.List is 'null' or 'empty'.`));
            }
            else {
                console.log(this.List);
                resolve();
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
MalBindData.List = [];
MalBindData.Initializing = false;
exports.MalBindData = MalBindData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsLmJpbmQuZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhL21hbC5iaW5kLmRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBc0M7QUFDdEMseUNBQXNDO0FBQ3RDLDZEQUFtRDtBQUNuRCx3REFBb0Q7QUFDcEQsMERBQXNEO0FBRXRELE1BQWEsV0FBVztJQUlmLE1BQU0sQ0FBQyxJQUFJO1FBQ2hCLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixNQUFNLE9BQU8sR0FBRyxNQUFNLGFBQUssQ0FBQyxPQUFPLENBQUMsYUFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25ELE1BQU0sSUFBSSxHQUFHLE1BQU0sd0JBQVUsQ0FBQyxZQUFZLENBQVUsT0FBTyxFQUFFLHdCQUFPLENBQUMsQ0FBQztZQUN0RSxJQUFJLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsOEVBQThFLENBQy9FLENBQUM7Z0JBQ0YsT0FBTyxFQUFFLENBQUM7YUFDWDtpQkFBTTtnQkFDTCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztvQkFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO29CQUN4RCxPQUFPLEVBQUUsQ0FBQztpQkFDWDtxQkFBTTtvQkFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFB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QUFDO2FBQ1g7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsT0FBTztRQUNuQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2YsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLEtBQUssRUFBRTtvQkFDL0IsT0FBTyxFQUFFLENBQUM7aUJBQ1g7WUFDSCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBbEphLGdCQUFJLEdBQWMsRUFBRSxDQUFDO0FBQ3JCLHdCQUFZLEdBQUcsS0FBSyxDQUFDO0FBRnJDLGtDQW9KQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvIH0gZnJvbSBcIi4uL2NvcmUvbW9uZ29cIjtcbmltcG9ydCB7IFRhYmxlIH0gZnJvbSBcIi4uL2NvcmUvdGFibGVcIjtcbmltcG9ydCB7IE1hbEJpbmQgfSBmcm9tIFwiLi4vbW9kZWxzL21hbC5iaW5kLm1vZGVsXCI7XG5pbXBvcnQgeyBKc29uSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvanNvbi5oZWxwZXJcIjtcbmltcG9ydCB7IEFycmF5SGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvYXJyYXkuaGVscGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBNYWxCaW5kRGF0YSB7XG4gIHB1YmxpYyBzdGF0aWMgTGlzdDogTWFsQmluZFtdID0gW107XG4gIHB1YmxpYyBzdGF0aWMgSW5pdGlhbGl6aW5nID0gZmFsc2U7XG5cbiAgcHVibGljIHN0YXRpYyBJbml0KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gdHJ1ZTtcbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBNb25nby5GaW5kQWxsKFRhYmxlLm1hbGJpbmQpO1xuICAgICAgY29uc3QgbGlzdCA9IGF3YWl0IEpzb25IZWxwZXIuQXJyYXlDb252ZXJ0PE1hbEJpbmQ+KHJlc3VsdHMsIE1hbEJpbmQpO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZCB8fCBsaXN0ID09PSBudWxsKSB7XG4gICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIGBKc29uSGVscGVyLkFycmF5Q29udmVydDxNYWxTeW5jPihyZXN1bHRzLCBNYWxTeW5jKSBpcyAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuYFxuICAgICAgICApO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLkluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBNYWxCaW5kIExpc3QgTGVuZ3RoOiAke3RoaXMuTGlzdC5sZW5ndGh9YCk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuTGlzdCA9IGxpc3Q7XG4gICAgICAgICAgdGhpcy5Jbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgTWFsQmluZCBMaXN0IExlbmd0aDogJHt0aGlzLkxpc3QubGVuZ3RofWApO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBJbnNlcnQoZGlzY29yZElkOiBzdHJpbmcsIG1hbFVzZXJuYW1lOiBzdHJpbmcsIGNvZGU6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxNYWxCaW5kPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGNvbnN0IGV4aXN0cyA9IGF3YWl0IHRoaXMuRXhpc3RzKGRpc2NvcmRJZCk7XG4gICAgICBpZiAoZXhpc3RzID09PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgIGRpc2NvcmRfaWQ6IGRpc2NvcmRJZCxcbiAgICAgICAgICBtYWxfdXNlcm5hbWU6IG1hbFVzZXJuYW1lLFxuICAgICAgICAgIGNvZGU6IGNvZGUsXG4gICAgICAgICAgdmVyaWZpZWQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IE1vbmdvLkluc2VydChUYWJsZS5tYWxiaW5kLCBkYXRhKTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0Lmluc2VydGVkSWQpO1xuICAgICAgICBjb25zdCBtYWxzeW5jID0gbmV3IE1hbEJpbmQoKTtcbiAgICAgICAgbWFsc3luYy5JZCA9IHJlc3VsdC5pbnNlcnRlZElkO1xuICAgICAgICBtYWxzeW5jLkRpc2NvcmRJZCA9IGRpc2NvcmRJZDtcbiAgICAgICAgbWFsc3luYy5NYWxVc2VybmFtZSA9IG1hbFVzZXJuYW1lO1xuICAgICAgICBtYWxzeW5jLkNvZGUgPSBjb2RlO1xuICAgICAgICBtYWxzeW5jLlZlcmlmaWVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuTGlzdC5wdXNoKG1hbHN5bmMpO1xuICAgICAgICByZXNvbHZlKG1hbHN5bmMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLkFsbC5maW5kKHggPT4geC5EaXNjb3JkSWQgPT09IGRpc2NvcmRJZCkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXQgQWxsKCkge1xuICAgIHJldHVybiB0aGlzLkxpc3Q7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIFZlcmlmeShkaXNjb3JkSWQ6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxNYWxCaW5kPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0geyBkaXNjb3JkX2lkOiBkaXNjb3JkSWQgfTtcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0geyAkc2V0OiB7IHZlcmlmaWVkOiB0cnVlIH0gfTtcbiAgICAgIGF3YWl0IE1vbmdvLlVwZGF0ZShUYWJsZS5tYWxiaW5kLCBxdWVyeSwgbmV3VmFsdWUpO1xuICAgICAgY29uc3Qgb2xkVmFsdWUgPSBhd2FpdCB0aGlzLkdldChkaXNjb3JkSWQpO1xuICAgICAgQXJyYXlIZWxwZXIucmVtb3ZlKHRoaXMuTGlzdCwgb2xkVmFsdWUsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgTW9uZ28uRmluZE9uZShUYWJsZS5tYWxiaW5kLCBxdWVyeSk7XG4gICAgICAgIGNvbnN0IG1zID0gYXdhaXQgSnNvbkhlbHBlci5BcnJheUNvbnZlcnQ8TWFsQmluZD4ocmVzLCBNYWxCaW5kKTtcbiAgICAgICAgY29uc3QgbSA9IG1zWzBdO1xuICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRlIE1BTCBiaW5kOiAke20uQ29kZX1gKTtcbiAgICAgICAgaWYgKG0gIT09IG51bGwgJiYgbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5MaXN0LnB1c2gobSk7XG4gICAgICAgICAgcmVzb2x2ZShtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBKc29uSGVscGVyLkNvbnZlcnQ8TWFsU3luYz4ocmVzLCBNYWxTeW5jKSBpcyAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuYFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIEV4aXN0cyhkaXNjb3JkSWQ6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGNvbnN0IG1hbHN5bmMgPSB0aGlzLkxpc3QuZmluZChtID0+IG0uRGlzY29yZElkID09PSBkaXNjb3JkSWQpO1xuICAgICAgaWYgKG1hbHN5bmMgPT09IG51bGwgfHwgbWFsc3luYyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgR2V0KGRpc2NvcmRJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPE1hbEJpbmQ+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgbGV0IGl0ZXJhdGlvbiA9IDA7XG4gICAgICBpZiAodGhpcy5MaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb25zb2xlLmxvZyhgTGlzdCBpcyBlbXB0eS5gKTtcbiAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuTGlzdC5mb3JFYWNoKG0gPT4ge1xuICAgICAgICBpdGVyYXRpb24rKztcbiAgICAgICAgaWYgKG0uRGlzY29yZElkID09PSBkaXNjb3JkSWQpIHtcbiAgICAgICAgICByZXNvbHZlKG0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpdGVyYXRpb24gPT09IHRoaXMuTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICBgdGhpcy5MaXN0LmZpbmQobSA9PiBtLkRpc2NvcmRJZCA9PT0gZGlzY29yZElkKSBpcyAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgTG9nQWxsKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5MaXN0ID09PSBudWxsIHx8XG4gICAgICAgIHRoaXMuTGlzdCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIHRoaXMuTGlzdC5sZW5ndGggPT09IDBcbiAgICAgICkge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKGB0aGlzLkxpc3QgaXMgJ251bGwnIG9yICdlbXB0eScuYCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5MaXN0KTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBPblJlYWR5KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLkluaXRpYWxpemluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDEpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=