"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_job_model_1 = require("./../models/queue.job.model");
const json_helper_1 = require("./../helpers/json.helper");
const tables_1 = require("../core/tables");
const array_helper_1 = require("../helpers/array.helper");
const mongo_1 = require("../core/mongo");
const subscription_model_1 = require("../models/subscription.model");
class QueueData {
    static get All() {
        return this.Queues;
    }
    static async Init() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            await this.Clear()
                .then(() => {
                this.Initializing = true;
            })
                .catch((err) => {
                console.log(err.message);
            });
            const result = await mongo_1.Mongo.FindAll(tables_1.Tables.queue);
            const queues = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Queue);
            if (queues === null || queues === undefined) {
                this.Initializing = false;
                reject(new Error(`"JsonHelper.ArrayConvert<Queue>(result, Queue)" is 'null' or 'undefined'`));
            }
            else {
                if (queues.length === 0) {
                    this.Initializing = false;
                    console.log(`Queues Length: "${this.Queues.length}"`);
                    resolve();
                }
                else {
                    this.Queues = queues;
                    this.Initializing = false;
                    console.log(`Queues Length: "${this.Queues.length}"`);
                    resolve();
                }
            }
        });
    }
    static async Clear() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            this.Queues.length = 0;
            this.QueueJobs.length = 0;
            this.Queues.splice(0, this.Queues.length);
            this.QueueJobs.splice(0, this.QueueJobs.length);
            if (this.Queues.length === 0 && this.QueueJobs.length === 0) {
                resolve();
            }
            else {
                reject(new Error(`The arrays were not cleared.`));
            }
        });
    }
    static async GetQueue(mediaId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const q = this.All.find(x => x.MediaId === mediaId);
            if (q !== null && q !== undefined) {
                resolve(q);
            }
            else {
                reject(new Error(`"this.All.find(x => x.MediaId === mediaId)" is 'null' or 'undefined'.`));
            }
        });
    }
    static SetQueue($m) {
        this.GetQueue($m.idMal).then(async (queue) => {
            await this.OnReady();
            const queueJob = new queue_job_model_1.QueueJob($m, queue);
            this.AddJob(queueJob);
        });
    }
    static GetJobs() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            resolve(this.QueueJobs);
        });
    }
    static AddJob(queueJob) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            queueJob.Check();
            this.QueueJobs.push(queueJob);
            resolve();
        });
    }
    static async RemoveJob(queueJob) {
        await this.OnReady();
        array_helper_1.ArrayHelper.remove(this.QueueJobs, queueJob, async () => {
            queueJob = null;
        });
    }
    static async Insert(mediaId, next_episode) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const exists = await this.Exists(mediaId);
            if (exists === false) {
                const data = { media_id: mediaId, next_episode: next_episode };
                const result = await mongo_1.Mongo.Insert(tables_1.Tables.queue, data);
                if (result.insertedId !== undefined && result.insertedId !== null) {
                    const q = new subscription_model_1.Queue();
                    q.Id = result.insertedId;
                    q.MediaId = mediaId;
                    q.NextEpisode = next_episode;
                    this.Queues.push(q);
                    resolve(q.Id);
                }
                else {
                    reject(new Error(`ERROR: 654567898765`));
                }
            }
            else {
                const queue = this.Queues.find(x => x.MediaId === mediaId);
                resolve(queue.Id);
            }
        });
    }
    static async Update(media, queueJob) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const query = { media_id: media.idMal };
            const newValues = {
                $set: { next_episode: media.nextAiringEpisode.next }
            };
            await mongo_1.Mongo.Update(tables_1.Tables.queue, query, newValues);
            await this.Init();
            await this.Init().catch(err => {
                console.log(err);
            });
            const q = await this.GetQueue(media.idMal).catch(err => {
                console.log(err);
            });
            let qj = null;
            if (q instanceof subscription_model_1.Queue)
                qj = new queue_job_model_1.QueueJob(media, q);
            await this.AddJob(qj);
            await this.RemoveJob(queueJob);
            resolve();
        });
    }
    static async Exists(mediaId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const q = this.All.find(x => x.MediaId === mediaId);
            if (q === null || q === undefined) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    }
    static async LogAll() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            if (this.Queues === null || this.Queues === undefined) {
                reject(new Error(`"Queues" is 'null' or 'undefined'.`));
            }
            else {
                console.log(this.Queues);
                console.log(this.QueueJobs);
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
QueueData.Queues = [];
QueueData.QueueJobs = [];
QueueData.Initializing = false;
exports.QueueData = QueueData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhL3F1ZXVlLmRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpRUFBdUQ7QUFDdkQsMERBQXNEO0FBQ3RELDJDQUF3QztBQUN4QywwREFBc0Q7QUFFdEQseUNBQXNDO0FBQ3RDLHFFQUFxRDtBQUVyRCxNQUFhLFNBQVM7SUFDYixNQUFNLEtBQUssR0FBRztRQUNuQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQU9NLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSTtRQUN0QixPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckIsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO2lCQUNmLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDM0IsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLEdBQVUsRUFBRSxFQUFFO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztZQUNMLE1BQU0sTUFBTSxHQUFHLE1BQU0sYUFBSyxDQUFDLE9BQU8sQ0FBQyxlQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakQsTUFBTSxNQUFNLEdBQUcsTUFBTSx3QkFBVSxDQUFDLFlBQVksQ0FBUSxNQUFNLEVBQUUsMEJBQUssQ0FBQyxDQUFDO1lBQ25FLElBQUksTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUMzQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsTUFBTSxDQUNKLElBQUksS0FBSyxDQUNQLDBFQUEwRSxDQUMzRSxDQUNG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QUUsQ0FBQztBQUNyQixtQkFBUyxHQUFlLEVBQUUsQ0FBQztBQUM1QixzQkFBWSxHQUFHLEtBQUssQ0FBQztBQVJyQyw4QkEyTEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWV1ZUpvYiB9IGZyb20gXCIuLy4uL21vZGVscy9xdWV1ZS5qb2IubW9kZWxcIjtcbmltcG9ydCB7IEpzb25IZWxwZXIgfSBmcm9tIFwiLi8uLi9oZWxwZXJzL2pzb24uaGVscGVyXCI7XG5pbXBvcnQgeyBUYWJsZXMgfSBmcm9tIFwiLi4vY29yZS90YWJsZXNcIjtcbmltcG9ydCB7IEFycmF5SGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvYXJyYXkuaGVscGVyXCI7XG5pbXBvcnQgeyBJTWVkaWEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9wYWdlLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgTW9uZ28gfSBmcm9tIFwiLi4vY29yZS9tb25nb1wiO1xuaW1wb3J0IHsgUXVldWUgfSBmcm9tIFwiLi4vbW9kZWxzL3N1YnNjcmlwdGlvbi5tb2RlbFwiO1xuXG5leHBvcnQgY2xhc3MgUXVldWVEYXRhIHtcbiAgcHVibGljIHN0YXRpYyBnZXQgQWxsKCkge1xuICAgIHJldHVybiB0aGlzLlF1ZXVlcztcbiAgfVxuXG4gIHN0YXRpYyBfaW5zdGFuY2U6IFF1ZXVlRGF0YTtcbiAgcHJpdmF0ZSBzdGF0aWMgUXVldWVzOiBRdWV1ZVtdID0gW107XG4gIHByaXZhdGUgc3RhdGljIFF1ZXVlSm9iczogUXVldWVKb2JbXSA9IFtdO1xuICBwdWJsaWMgc3RhdGljIEluaXRpYWxpemluZyA9IGZhbHNlO1xuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgSW5pdCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICBhd2FpdCB0aGlzLkNsZWFyKClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gdHJ1ZTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IE1vbmdvLkZpbmRBbGwoVGFibGVzLnF1ZXVlKTtcbiAgICAgIGNvbnN0IHF1ZXVlcyA9IGF3YWl0IEpzb25IZWxwZXIuQXJyYXlDb252ZXJ0PFF1ZXVlPihyZXN1bHQsIFF1ZXVlKTtcbiAgICAgIGlmIChxdWV1ZXMgPT09IG51bGwgfHwgcXVldWVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5Jbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgcmVqZWN0KFxuICAgICAgICAgIG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBcIkpzb25IZWxwZXIuQXJyYXlDb252ZXJ0PFF1ZXVlPihyZXN1bHQsIFF1ZXVlKVwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJ2BcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocXVldWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgICAgY29uc29sZS5sb2coYFF1ZXVlcyBMZW5ndGg6IFwiJHt0aGlzLlF1ZXVlcy5sZW5ndGh9XCJgKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5RdWV1ZXMgPSBxdWV1ZXM7XG4gICAgICAgICAgdGhpcy5Jbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgUXVldWVzIExlbmd0aDogXCIke3RoaXMuUXVldWVzLmxlbmd0aH1cImApO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgQ2xlYXIoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgdGhpcy5RdWV1ZXMubGVuZ3RoID0gMDtcbiAgICAgIHRoaXMuUXVldWVKb2JzLmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLlF1ZXVlcy5zcGxpY2UoMCwgdGhpcy5RdWV1ZXMubGVuZ3RoKTtcbiAgICAgIHRoaXMuUXVldWVKb2JzLnNwbGljZSgwLCB0aGlzLlF1ZXVlSm9icy5sZW5ndGgpO1xuICAgICAgaWYgKHRoaXMuUXVldWVzLmxlbmd0aCA9PT0gMCAmJiB0aGlzLlF1ZXVlSm9icy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgVGhlIGFycmF5cyB3ZXJlIG5vdCBjbGVhcmVkLmApKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgR2V0UXVldWUobWVkaWFJZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFF1ZXVlPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGNvbnN0IHEgPSB0aGlzLkFsbC5maW5kKHggPT4geC5NZWRpYUlkID09PSBtZWRpYUlkKTtcbiAgICAgIGlmIChxICE9PSBudWxsICYmIHEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXNvbHZlKHEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KFxuICAgICAgICAgIG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBcInRoaXMuQWxsLmZpbmQoeCA9PiB4Lk1lZGlhSWQgPT09IG1lZGlhSWQpXCIgaXMgJ251bGwnIG9yICd1bmRlZmluZWQnLmBcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIFNldFF1ZXVlKCRtOiBJTWVkaWEpIHtcbiAgICB0aGlzLkdldFF1ZXVlKCRtLmlkTWFsKS50aGVuKGFzeW5jIHF1ZXVlID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgY29uc3QgcXVldWVKb2IgPSBuZXcgUXVldWVKb2IoJG0sIHF1ZXVlKTtcbiAgICAgIHRoaXMuQWRkSm9iKHF1ZXVlSm9iKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgR2V0Sm9icygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8UXVldWVKb2JbXT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICByZXNvbHZlKHRoaXMuUXVldWVKb2JzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgQWRkSm9iKHF1ZXVlSm9iOiBRdWV1ZUpvYikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIHF1ZXVlSm9iLkNoZWNrKCk7XG4gICAgICB0aGlzLlF1ZXVlSm9icy5wdXNoKHF1ZXVlSm9iKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgUmVtb3ZlSm9iKHF1ZXVlSm9iOiBRdWV1ZUpvYikge1xuICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgIEFycmF5SGVscGVyLnJlbW92ZSh0aGlzLlF1ZXVlSm9icywgcXVldWVKb2IsIGFzeW5jICgpID0+IHtcbiAgICAgIHF1ZXVlSm9iID0gbnVsbDtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgSW5zZXJ0KG1lZGlhSWQ6IG51bWJlciwgbmV4dF9lcGlzb2RlOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGNvbnN0IGV4aXN0cyA9IGF3YWl0IHRoaXMuRXhpc3RzKG1lZGlhSWQpO1xuICAgICAgaWYgKGV4aXN0cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHsgbWVkaWFfaWQ6IG1lZGlhSWQsIG5leHRfZXBpc29kZTogbmV4dF9lcGlzb2RlIH07XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IE1vbmdvLkluc2VydChUYWJsZXMucXVldWUsIGRhdGEpO1xuICAgICAgICBpZiAocmVzdWx0Lmluc2VydGVkSWQgIT09IHVuZGVmaW5lZCAmJiByZXN1bHQuaW5zZXJ0ZWRJZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IHEgPSBuZXcgUXVldWUoKTtcbiAgICAgICAgICBxLklkID0gcmVzdWx0Lmluc2VydGVkSWQ7XG4gICAgICAgICAgcS5NZWRpYUlkID0gbWVkaWFJZDtcbiAgICAgICAgICBxLk5leHRFcGlzb2RlID0gbmV4dF9lcGlzb2RlO1xuICAgICAgICAgIHRoaXMuUXVldWVzLnB1c2gocSk7XG4gICAgICAgICAgcmVzb2x2ZShxLklkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBFUlJPUjogNjU0NTY3ODk4NzY1YCkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBxdWV1ZSA9IHRoaXMuUXVldWVzLmZpbmQoeCA9PiB4Lk1lZGlhSWQgPT09IG1lZGlhSWQpO1xuICAgICAgICByZXNvbHZlKHF1ZXVlLklkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgVXBkYXRlKG1lZGlhOiBJTWVkaWEsIHF1ZXVlSm9iOiBRdWV1ZUpvYikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0geyBtZWRpYV9pZDogbWVkaWEuaWRNYWwgfTtcbiAgICAgIGNvbnN0IG5ld1ZhbHVlcyA9IHtcbiAgICAgICAgJHNldDogeyBuZXh0X2VwaXNvZGU6IG1lZGlhLm5leHRBaXJpbmdFcGlzb2RlLm5leHQgfVxuICAgICAgfTtcbiAgICAgIGF3YWl0IE1vbmdvLlVwZGF0ZShUYWJsZXMucXVldWUsIHF1ZXJ5LCBuZXdWYWx1ZXMpO1xuICAgICAgYXdhaXQgdGhpcy5Jbml0KCk7XG4gICAgICBhd2FpdCB0aGlzLkluaXQoKS5jYXRjaChlcnIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBxID0gYXdhaXQgdGhpcy5HZXRRdWV1ZShtZWRpYS5pZE1hbCkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICAgICAgbGV0IHFqOiBRdWV1ZUpvYiA9IG51bGw7XG4gICAgICBpZiAocSBpbnN0YW5jZW9mIFF1ZXVlKSBxaiA9IG5ldyBRdWV1ZUpvYihtZWRpYSwgcSBhcyBRdWV1ZSk7XG4gICAgICBhd2FpdCB0aGlzLkFkZEpvYihxaik7XG4gICAgICBhd2FpdCB0aGlzLlJlbW92ZUpvYihxdWV1ZUpvYik7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEV4aXN0cyhtZWRpYUlkOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICBjb25zdCBxID0gdGhpcy5BbGwuZmluZCh4ID0+IHguTWVkaWFJZCA9PT0gbWVkaWFJZCk7XG4gICAgICBpZiAocSA9PT0gbnVsbCB8fCBxID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBMb2dBbGwoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgaWYgKHRoaXMuUXVldWVzID09PSBudWxsIHx8IHRoaXMuUXVldWVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgXCJRdWV1ZXNcIiBpcyAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuYCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5RdWV1ZXMpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlF1ZXVlSm9icyk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgT25SZWFkeSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5Jbml0aWFsaXppbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9LCAxKTtcbiAgICB9KTtcbiAgfVxufVxuIl19