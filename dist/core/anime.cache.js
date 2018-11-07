"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_search_1 = require("./media.search");
const array_helper_1 = require("../helpers/array.helper");
const random_helper_1 = require("../helpers/random.helper");
class AnimeCache {
    static async Update(index) {
        setTimeout(async () => {
            if (this.List.length > 0) {
                const local = this.List[index];
                const fromApi = await media_search_1.MediaSearch.Find(local.idMal);
                if (fromApi !== null && fromApi !== undefined) {
                    const exists = await this.Exist(fromApi.idMal);
                    if (exists === false)
                        this.List.push(fromApi);
                    else {
                        array_helper_1.ArrayHelper.remove(this.List, local, async () => {
                            this.List.push(fromApi);
                        });
                    }
                }
                else {
                    this.Check(0);
                }
            }
            else {
                this.Check(0);
            }
        }, 1000);
    }
    static Check(index) {
        if (index === this.List.length - 1) {
            this.Update(0);
        }
        else {
            this.Update(index + 1);
        }
    }
    static async Get(id) {
        return new Promise(async (resolve, reject) => {
            const local = this.List.find(x => x.idMal === id);
            if (local !== null && local !== undefined) {
                resolve(local);
            }
            else {
                const fromApi = await media_search_1.MediaSearch.Find(id);
                if (fromApi !== null && fromApi !== undefined) {
                    const exists = await this.Exist(fromApi.idMal);
                    if (exists === false)
                        this.List.push(fromApi);
                    resolve(fromApi);
                }
                else {
                    resolve(null);
                }
            }
        });
    }
    static Exist(idMal) {
        return new Promise((resolve, reject) => {
            const anime = this.List.find(x => x.idMal === idMal);
            if (anime !== null && anime !== undefined) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    }
    static GetRandom() {
        return new Promise((resolve, reject) => {
            setInterval(() => {
                const anime = this.List[random_helper_1.Random.Range(0, this.List.length - 1)];
                if (anime !== null && anime !== undefined) {
                    resolve(anime);
                }
            }, 1);
        });
    }
    static async Search(keyword) {
        return new Promise(async (resolve, reject) => {
            const found = [];
            const length = this.List.length;
            if (length === 0) {
                const apiResult = await media_search_1.MediaSearch.All(keyword);
                for (let i = 0; i < apiResult.length; i++) {
                    const fromApi = apiResult[i];
                    const exists = await this.Exist(fromApi.idMal);
                    if (exists === false)
                        this.List.push(fromApi);
                    if (i === apiResult.length - 1) {
                        resolve(apiResult);
                    }
                }
            }
            for (let i = 0; i < length; i++) {
                const cache = this.List[i];
                const english = cache.title.english;
                const romaji = cache.title.romaji;
                let media = null;
                if (english !== null && english !== undefined) {
                    const match = await this.ScanMatch(keyword, english);
                    if (match === true) {
                        media = cache;
                    }
                }
                if (romaji !== null && romaji !== undefined) {
                    const match = await this.ScanMatch(keyword, romaji);
                    if (match === true) {
                        media = cache;
                    }
                }
                if (media !== null)
                    found.push(media);
                if (i === length - 1) {
                    if (found.length === 0) {
                        const apiResult = await media_search_1.MediaSearch.All(keyword);
                        for (let x = 0; x < apiResult.length; x++) {
                            const fromApi = apiResult[x];
                            const exists = await this.Exist(fromApi.idMal);
                            if (exists === false)
                                this.List.push(fromApi);
                            if (i === apiResult.length - 1) {
                                resolve(apiResult);
                            }
                        }
                    }
                    else {
                        resolve(found);
                    }
                }
            }
        });
    }
    static async ScanMatch(keyword, title) {
        return new Promise(async (resolve, reject) => {
            const match = await this.ScanTitle(keyword, title);
            if (match < 0) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    }
    static async ScanTitle(keyword, title) {
        return new Promise((resolve, reject) => {
            const keywords = keyword.split(/ +/g);
            let match = 0;
            for (let i = 0; i < keywords.length; i++) {
                const word = keywords[i];
                if (title.toLowerCase().includes(word)) {
                    match++;
                }
                if (i === keywords.length - 1) {
                    if (match === keywords.length)
                        resolve(match);
                    else
                        resolve(-1);
                }
            }
        });
    }
}
AnimeCache.List = [];
exports.AnimeCache = AnimeCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWUuY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9hbmltZS5jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGlEQUE2QztBQUM3QywwREFBc0Q7QUFFdEQsNERBQWtEO0FBRWxELE1BQWEsVUFBVTtJQUdkLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQWE7UUFDdEMsVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3BCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN4QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMvQixNQUFNLE9BQU8sR0FBRyxNQUFNLDBCQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxPQUFPLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7b0JBQzdDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQy9DLElBQUksTUFBTSxLQUFLLEtBQUs7d0JBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7eUJBQ3pDO3dCQUNILDBCQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssSUFBSSxFQUFFOzRCQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDMUIsQ0FBQyxDQUFDLENBQUM7cUJBQ0o7aUJBQ0Y7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDZjthQUNGO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDZjtRQUNILENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFTyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQWE7UUFDaEMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEI7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQVU7UUFDaEMsT0FBTyxJQUFJLE9BQU8sQ0FBUyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25ELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQztZQUNsRCxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDekMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hCO2lCQUFNO2dCQUNMLE1BQU0sT0FBTyxHQUFHLE1BQU0sMEJBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNDLElBQUksT0FBTyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO29CQUM3QyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMvQyxJQUFJLE1BQU0sS0FBSyxLQUFLO3dCQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5QyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2xCO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDZjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFhO1FBQ2hDLE9BQU8sSUFBSSxPQUFPLENBQVUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDO1lBQ3JELElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDZjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDaEI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsU0FBUztRQUNyQixPQUFPLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzdDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2YsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0QsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBQ3pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDaEI7WUFDSCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFlO1FBQ3hDLE9BQU8sSUFBSSxPQUFPLENBQVcsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyRCxNQUFNLEtBQUssR0FBYSxFQUFFLENBQUM7WUFDM0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDaEMsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNoQixNQUFNLFNBQVMsR0FBRyxNQUFNLDBCQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNqRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDekMsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMvQyxJQUFJLE1BQU0sS0FBSyxLQUFLO3dCQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5QyxJQUFJLENBQUMsS0FBSyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDOUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUNwQjtpQkFDRjthQUNGO1lBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDL0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7Z0JBQ3BDLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO2dCQUNsQyxJQUFJLEtBQUssR0FBVyxJQUFJLENBQUM7Z0JBQ3pCLElBQUksT0FBTyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO29CQUM3QyxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUNyRCxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7d0JBQ2xCLEtBQUssR0FBRyxLQUFLLENBQUM7cUJBQ2Y7aUJBQ0Y7Z0JBQ0QsSUFBSSxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7b0JBQzNDLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ3BELElBQUksS0FBSyxLQUFLLElBQUksRUFBRTt3QkFDbEIsS0FBSyxHQUFHLEtBQUssQ0FBQztxQkFDZjtpQkFDRjtnQkFDRCxJQUFJLEtBQUssS0FBSyxJQUFJO29CQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxLQUFLLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3BCLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7d0JBQ3RCLE1BQU0sU0FBUyxHQUFHLE1BQU0sMEJBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ2pELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUN6QyxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzdCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQy9DLElBQUksTUFBTSxLQUFLLEtBQUs7Z0NBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQzlDLElBQUksQ0FBQyxLQUFLLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dDQUM5QixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7NkJBQ3BCO3lCQUNGO3FCQUNGO3lCQUFNO3dCQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDaEI7aUJBQ0Y7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQWUsRUFBRSxLQUFhO1FBQzNELE9BQU8sSUFBSSxPQUFPLENBQVUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNwRCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ25ELElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDYixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDaEI7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFlLEVBQUUsS0FBYTtRQUMzRCxPQUFPLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzdDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN0QyxLQUFLLEVBQUUsQ0FBQztpQkFDVDtnQkFDRCxJQUFJLENBQUMsS0FBSyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDN0IsSUFBSSxLQUFLLEtBQUssUUFBUSxDQUFDLE1BQU07d0JBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzt3QkFDekMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2xCO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBdEpjLGVBQUksR0FBYSxFQUFFLENBQUM7QUFEckMsZ0NBd0pDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU1lZGlhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcGFnZS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IE1lZGlhU2VhcmNoIH0gZnJvbSBcIi4vbWVkaWEuc2VhcmNoXCI7XG5pbXBvcnQgeyBBcnJheUhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL2FycmF5LmhlbHBlclwiO1xuaW1wb3J0IHVuaXF1ZSBmcm9tIFwiYXJyYXktdW5pcXVlXCI7XG5pbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi4vaGVscGVycy9yYW5kb20uaGVscGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBBbmltZUNhY2hlIHtcbiAgcHJpdmF0ZSBzdGF0aWMgTGlzdDogSU1lZGlhW10gPSBbXTtcblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIFVwZGF0ZShpbmRleDogbnVtYmVyKSB7XG4gICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5MaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgbG9jYWwgPSB0aGlzLkxpc3RbaW5kZXhdO1xuICAgICAgICBjb25zdCBmcm9tQXBpID0gYXdhaXQgTWVkaWFTZWFyY2guRmluZChsb2NhbC5pZE1hbCk7XG4gICAgICAgIGlmIChmcm9tQXBpICE9PSBudWxsICYmIGZyb21BcGkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnN0IGV4aXN0cyA9IGF3YWl0IHRoaXMuRXhpc3QoZnJvbUFwaS5pZE1hbCk7XG4gICAgICAgICAgaWYgKGV4aXN0cyA9PT0gZmFsc2UpIHRoaXMuTGlzdC5wdXNoKGZyb21BcGkpO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgQXJyYXlIZWxwZXIucmVtb3ZlKHRoaXMuTGlzdCwgbG9jYWwsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5MaXN0LnB1c2goZnJvbUFwaSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5DaGVjaygwKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5DaGVjaygwKTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIENoZWNrKGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAoaW5kZXggPT09IHRoaXMuTGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICB0aGlzLlVwZGF0ZSgwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5VcGRhdGUoaW5kZXggKyAxKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEdldChpZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPElNZWRpYT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgbG9jYWwgPSB0aGlzLkxpc3QuZmluZCh4ID0+IHguaWRNYWwgPT09IGlkKTtcbiAgICAgIGlmIChsb2NhbCAhPT0gbnVsbCAmJiBsb2NhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc29sdmUobG9jYWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZnJvbUFwaSA9IGF3YWl0IE1lZGlhU2VhcmNoLkZpbmQoaWQpO1xuICAgICAgICBpZiAoZnJvbUFwaSAhPT0gbnVsbCAmJiBmcm9tQXBpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zdCBleGlzdHMgPSBhd2FpdCB0aGlzLkV4aXN0KGZyb21BcGkuaWRNYWwpO1xuICAgICAgICAgIGlmIChleGlzdHMgPT09IGZhbHNlKSB0aGlzLkxpc3QucHVzaChmcm9tQXBpKTtcbiAgICAgICAgICByZXNvbHZlKGZyb21BcGkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIEV4aXN0KGlkTWFsOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgYW5pbWUgPSB0aGlzLkxpc3QuZmluZCh4ID0+IHguaWRNYWwgPT09IGlkTWFsKTtcbiAgICAgIGlmIChhbmltZSAhPT0gbnVsbCAmJiBhbmltZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgR2V0UmFuZG9tKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxJTWVkaWE+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgY29uc3QgYW5pbWUgPSB0aGlzLkxpc3RbUmFuZG9tLlJhbmdlKDAsIHRoaXMuTGlzdC5sZW5ndGggLSAxKV07XG4gICAgICAgIGlmIChhbmltZSAhPT0gbnVsbCAmJiBhbmltZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVzb2x2ZShhbmltZSk7XG4gICAgICAgIH1cbiAgICAgIH0sIDEpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBTZWFyY2goa2V5d29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPElNZWRpYVtdPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBmb3VuZDogSU1lZGlhW10gPSBbXTtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuTGlzdC5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnN0IGFwaVJlc3VsdCA9IGF3YWl0IE1lZGlhU2VhcmNoLkFsbChrZXl3b3JkKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcGlSZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBmcm9tQXBpID0gYXBpUmVzdWx0W2ldO1xuICAgICAgICAgIGNvbnN0IGV4aXN0cyA9IGF3YWl0IHRoaXMuRXhpc3QoZnJvbUFwaS5pZE1hbCk7XG4gICAgICAgICAgaWYgKGV4aXN0cyA9PT0gZmFsc2UpIHRoaXMuTGlzdC5wdXNoKGZyb21BcGkpO1xuICAgICAgICAgIGlmIChpID09PSBhcGlSZXN1bHQubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmVzb2x2ZShhcGlSZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjYWNoZSA9IHRoaXMuTGlzdFtpXTtcbiAgICAgICAgY29uc3QgZW5nbGlzaCA9IGNhY2hlLnRpdGxlLmVuZ2xpc2g7XG4gICAgICAgIGNvbnN0IHJvbWFqaSA9IGNhY2hlLnRpdGxlLnJvbWFqaTtcbiAgICAgICAgbGV0IG1lZGlhOiBJTWVkaWEgPSBudWxsO1xuICAgICAgICBpZiAoZW5nbGlzaCAhPT0gbnVsbCAmJiBlbmdsaXNoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zdCBtYXRjaCA9IGF3YWl0IHRoaXMuU2Nhbk1hdGNoKGtleXdvcmQsIGVuZ2xpc2gpO1xuICAgICAgICAgIGlmIChtYXRjaCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbWVkaWEgPSBjYWNoZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJvbWFqaSAhPT0gbnVsbCAmJiByb21hamkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnN0IG1hdGNoID0gYXdhaXQgdGhpcy5TY2FuTWF0Y2goa2V5d29yZCwgcm9tYWppKTtcbiAgICAgICAgICBpZiAobWF0Y2ggPT09IHRydWUpIHtcbiAgICAgICAgICAgIG1lZGlhID0gY2FjaGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChtZWRpYSAhPT0gbnVsbCkgZm91bmQucHVzaChtZWRpYSk7XG4gICAgICAgIGlmIChpID09PSBsZW5ndGggLSAxKSB7XG4gICAgICAgICAgaWYgKGZvdW5kLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29uc3QgYXBpUmVzdWx0ID0gYXdhaXQgTWVkaWFTZWFyY2guQWxsKGtleXdvcmQpO1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBhcGlSZXN1bHQubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgICAgY29uc3QgZnJvbUFwaSA9IGFwaVJlc3VsdFt4XTtcbiAgICAgICAgICAgICAgY29uc3QgZXhpc3RzID0gYXdhaXQgdGhpcy5FeGlzdChmcm9tQXBpLmlkTWFsKTtcbiAgICAgICAgICAgICAgaWYgKGV4aXN0cyA9PT0gZmFsc2UpIHRoaXMuTGlzdC5wdXNoKGZyb21BcGkpO1xuICAgICAgICAgICAgICBpZiAoaSA9PT0gYXBpUmVzdWx0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGFwaVJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShmb3VuZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBhc3luYyBTY2FuTWF0Y2goa2V5d29yZDogc3RyaW5nLCB0aXRsZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG1hdGNoID0gYXdhaXQgdGhpcy5TY2FuVGl0bGUoa2V5d29yZCwgdGl0bGUpO1xuICAgICAgaWYgKG1hdGNoIDwgMCkge1xuICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBhc3luYyBTY2FuVGl0bGUoa2V5d29yZDogc3RyaW5nLCB0aXRsZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPG51bWJlcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qga2V5d29yZHMgPSBrZXl3b3JkLnNwbGl0KC8gKy9nKTtcbiAgICAgIGxldCBtYXRjaCA9IDA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXdvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHdvcmQgPSBrZXl3b3Jkc1tpXTtcbiAgICAgICAgaWYgKHRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMod29yZCkpIHtcbiAgICAgICAgICBtYXRjaCsrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSBrZXl3b3Jkcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgaWYgKG1hdGNoID09PSBrZXl3b3Jkcy5sZW5ndGgpIHJlc29sdmUobWF0Y2gpO1xuICAgICAgICAgIGVsc2UgcmVzb2x2ZSgtMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19