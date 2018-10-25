"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_model_1 = require("./../models/subscription.model");
const queue_job_model_1 = require("./../models/queue.job.model");
const user_data_1 = require("./user.data");
const result_mysql_model_1 = require("./../models/result.mysql.model");
const json_helper_1 = require("./../helpers/json.helper");
const query_1 = require("./../core/query");
const data_helper_1 = require("../helpers/data.helper");
const array_helper_1 = require("../helpers/array.helper");
const media_data_1 = require("./media.data");
class QueueData {
    static get All() {
        return this.Queues;
    }
    static async Init() {
        return new Promise((resolve, reject) => {
            query_1.Query.Execute(this.DataHelper.QueueSelectAll(), async (result) => {
                const queues = json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Queue);
                if (queues === null || queues === undefined) {
                    reject(new Error(`"JsonHelper.ArrayConvert<Queue>(result, Queue)" is 'null' or 'undefined'`));
                }
                else {
                    queues.forEach(q => {
                        this.Queues.push(q);
                    });
                    resolve();
                }
            });
        });
    }
    static async GetQueue(mediaId) {
        return new Promise(async (resolve, reject) => {
            const q = this.All.find(x => x.MediaId === mediaId);
            if (q !== null && q !== undefined) {
                resolve(q);
            }
            else {
                reject(new Error(`"this.All.find(x => x.MediaId === mediaId)" is 'null' or 'undefined'.`));
            }
        });
    }
    static get GetJobs() {
        return this.QueueJobs;
    }
    static AddJob(queueJob) {
        queueJob.StartQueue();
        this.QueueJobs.push(queueJob);
    }
    static RemoveJob(queueJob) {
        array_helper_1.ArrayHelper.remove(this.QueueJobs, queueJob, () => {
            queueJob.Cancel();
            queueJob = null;
            console.log(`Queue Job: "${queueJob}"`);
        });
    }
    static async Insert(mediaId, next_episode) {
        return new Promise((resolve, reject) => {
            this.Exists(mediaId).then(exists => {
                if (exists === false) {
                    query_1.Query.Execute(this.DataHelper.QueueInsert(mediaId, next_episode), result => {
                        const res = json_helper_1.JsonHelper.Convert(result, result_mysql_model_1.MySqlResult);
                        console.log(res);
                        if (res !== undefined && res !== null) {
                            const q = new subscription_model_1.Queue();
                            q.Id = res.InsertId;
                            q.MediaId = mediaId;
                            q.NextEpisode = next_episode;
                            this.Queues.push(q);
                            console.log(`${q.MediaId} added to queue.`);
                            resolve(q.Id);
                        }
                        else {
                            reject(new Error(`JsonHelper.ArrayConvert<MySqlResult>(result, MySqlResult)[0] is 'null' or 'undefined'.`));
                        }
                    });
                }
                else {
                    reject(new Error(`Queue with mediaId: "${mediaId}" already exists.`));
                }
            });
        });
    }
    static async Update(mediaId, nextEpisode) {
        return new Promise(async (resolve, reject) => {
            const oldQueue = this.All.find(x => x.MediaId === mediaId);
            query_1.Query.Execute(this.DataHelper.QueueUpdate(mediaId, nextEpisode), async () => {
                this.GetQueue(mediaId)
                    .then(async (q) => {
                    array_helper_1.ArrayHelper.remove(this.All, oldQueue, async () => {
                        this.Queues.push(q);
                        media_data_1.MediaData.LoadFromApi()
                            .then(async () => {
                            media_data_1.MediaData.GetMediaList.forEach(async (m) => {
                                user_data_1.UserData.All.forEach(async (user) => {
                                    const queueJob = new queue_job_model_1.QueueJob(user, m, q);
                                    QueueData.AddJob(queueJob);
                                });
                            });
                        })
                            .catch((reason) => {
                            console.log(reason.message);
                        });
                        resolve();
                    });
                })
                    .catch((reason) => {
                    console.log(reason.message);
                });
            });
        });
    }
    static async Exists(mediaId) {
        return new Promise(async (resolve, reject) => {
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
            if (this.Queues === null || this.Queues === undefined) {
                reject(new Error(`"Queues" is 'null' or 'undefined'.`));
            }
            else {
                this.Queues.forEach(q => {
                    console.log(`Queue:`, q.MediaId);
                });
                this.QueueJobs.forEach(qj => {
                    qj.Log();
                });
                resolve();
            }
        });
    }
}
QueueData.Queues = [];
QueueData.QueueJobs = [];
QueueData.DataHelper = data_helper_1.DataHelper.Instance;
exports.QueueData = QueueData;
//# sourceMappingURL=queue.data.js.map