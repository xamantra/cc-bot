import { QueueJob } from "./../models/queue.job.model";
import { JsonHelper } from "./../helpers/json.helper";
import { Table } from "../core/table";
import { ArrayHelper } from "../helpers/array.helper";
import { IMedia } from "../interfaces/page.interface";
import { Mongo } from "../core/mongo";
import { Queue } from "../models/subscription.model";

export class QueueData {
  public static get All() {
    return this.Queues;
  }

  static _instance: QueueData;
  private static Queues: Queue[] = [];
  private static QueueJobs: QueueJob[] = [];
  public static Initializing = false;

  public static async Init() {
    return new Promise(async (resolve, reject) => {
      await this.OnReady();
      await this.Clear()
        .then(() => {
          this.Initializing = true;
        })
        .catch((err: Error) => {
          console.log(err.message);
        });
      const result = await Mongo.FindAll(Table.queue);
      const queues = await JsonHelper.ArrayConvert<Queue>(result, Queue);
      if (queues === null || queues === undefined) {
        this.Initializing = false;
        reject(
          new Error(
            `"JsonHelper.ArrayConvert<Queue>(result, Queue)" is 'null' or 'undefined'`
          )
        );
      } else {
        if (queues.length === 0) {
          this.Initializing = false;
          resolve();
        } else {
<<<<<<< HEAD
          this.Queues = queues;
          this.Initializing = false;
          resolve();
=======
          for (let i = 0; i < queues.length; i++) {
            const q = queues[i];
            this.Queues.push(q);
            if (i === queues.length - 1) {
              this.Initializing = false;
              console.log(`Queue Length: ${this.Queues.length}`);
              resolve();
            }
          }
>>>>>>> 603055a6842e3854520589aac8541bfda67d7781
        }
      }
    });
  }

  private static async Clear() {
    return new Promise(async (resolve, reject) => {
      await this.OnReady();
      this.Queues.length = 0;
      this.QueueJobs.length = 0;
      this.Queues.splice(0, this.Queues.length);
      this.QueueJobs.splice(0, this.QueueJobs.length);
      if (this.Queues.length === 0 && this.QueueJobs.length === 0) {
        resolve();
      } else {
        reject(new Error(`The arrays were not cleared.`));
      }
    });
  }

  public static async GetQueue(mediaId: number) {
    return new Promise<Queue>(async (resolve, reject) => {
      await this.OnReady();
      const q = this.All.find(x => x.MediaId === mediaId);
      if (q !== null && q !== undefined) {
        resolve(q);
      } else {
        reject(
          new Error(
            `"this.All.find(x => x.MediaId === mediaId)" is 'null' or 'undefined'.`
          )
        );
      }
    });
  }

  public static SetQueue($m: IMedia) {
    this.GetQueue($m.idMal).then(async queue => {
      await this.OnReady();
      const queueJob = new QueueJob($m, queue);
      await this.AddJob(queueJob);
    });
  }

  public static GetJobs() {
    return new Promise<QueueJob[]>(async (resolve, reject) => {
      await this.OnReady();
      resolve(this.QueueJobs);
    });
  }

  public static AddJob(queueJob: QueueJob) {
    return new Promise(async (resolve, reject) => {
      await this.OnReady();
      queueJob.StartCheck();
      this.QueueJobs.push(queueJob);
      resolve();
    });
  }

  public static async RemoveJob(queueJob: QueueJob) {
    await this.OnReady();
    ArrayHelper.remove(this.QueueJobs, queueJob, async () => {
      queueJob = null;
    });
  }

  public static async Insert(mediaId: number, next_episode: number) {
    return new Promise<string>(async (resolve, reject) => {
      await this.OnReady();
      const exists = await this.Exists(mediaId);
      if (exists === false) {
        const data = { media_id: mediaId, next_episode: next_episode };
        const result = await Mongo.Insert(Table.queue, data);
        if (result.insertedId !== undefined && result.insertedId !== null) {
          const q = new Queue();
          q.Id = result.insertedId;
          q.MediaId = mediaId;
          q.NextEpisode = next_episode;
          this.Queues.push(q);
          resolve(q.Id);
        } else {
          reject(new Error(`ERROR: 654567898765`));
        }
      } else {
        const queue = this.Queues.find(x => x.MediaId === mediaId);
        resolve(queue.Id);
      }
    });
  }

  public static async Update(media: IMedia, queueJob: QueueJob) {
    return new Promise(async (resolve, reject) => {
      await this.OnReady();
      const query = { media_id: media.idMal };
      const newValues = {
        $set: { next_episode: media.nextAiringEpisode.next }
      };
      await Mongo.Update(Table.queue, query, newValues);
      await this.Init();
      await this.Init().catch(err => {
        console.log(err);
      });
      const q = await this.GetQueue(media.idMal).catch(err => {
        console.log(err);
      });
      let qj: QueueJob = null;
      if (q instanceof Queue) qj = new QueueJob(media, q as Queue);
      await this.AddJob(qj);
      await this.RemoveJob(queueJob);
      resolve();
    });
  }

  public static async Exists(mediaId: number) {
    return new Promise<boolean>(async (resolve, reject) => {
      await this.OnReady();
      const q = this.All.find(x => x.MediaId === mediaId);
      if (q === null || q === undefined) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }

  public static async LogAll() {
    return new Promise(async (resolve, reject) => {
      await this.OnReady();
      if (this.Queues === null || this.Queues === undefined) {
        reject(new Error(`"Queues" is 'null' or 'undefined'.`));
      } else {
        console.log(this.Queues);
        console.log(this.QueueJobs);
        resolve();
      }
    });
  }

  public static OnReady() {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        if (this.Initializing === false) {
          resolve();
        }
      }, 1);
    });
  }
}
