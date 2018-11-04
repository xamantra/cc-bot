"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mal_1 = require("../core/mal");
const mal_bind_data_1 = require("./mal.bind.data");
class MalUserData {
    static GetUser(message) {
        return new Promise((resolve, reject) => {
            mal_bind_data_1.MalBindData.Get(message.author.id)
                .then(malBind => {
                mal_1.MAL.GetCWList(malBind.MalUsername)
                    .then(list => {
                    resolve(list);
                })
                    .catch(err => {
                    reject(err);
                });
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    static Exists(message, sub) {
        return new Promise((resolve, reject) => {
            this.GetUser(message)
                .then(list => {
                const malAnime = list.find(ma => ma.anime_id === sub.MediaId);
                if (malAnime === null || malAnime === undefined) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            })
                .catch(err => {
                reject(err);
            });
        });
    }
}
exports.MalUserData = MalUserData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsLnVzZXIuZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhL21hbC51c2VyLmRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBa0M7QUFFbEMsbURBQThDO0FBSTlDLE1BQWEsV0FBVztJQUNmLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBZ0I7UUFDcEMsT0FBTyxJQUFJLE9BQU8sQ0FBYSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNqRCwyQkFBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztpQkFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNkLFNBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztxQkFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDO3FCQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDWCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2QsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNYLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFnQixFQUFFLEdBQWlCO1FBQ3RELE9BQU8sSUFBSSxPQUFPLENBQVUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7aUJBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDWCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsS0FBSyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzlELElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO29CQUMvQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2hCO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDZjtZQUNILENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQW5DRCxrQ0FtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNQUwgfSBmcm9tIFwiLi4vY29yZS9tYWxcIjtcclxuaW1wb3J0IHsgTWFsQW5pbWUgfSBmcm9tIFwiLi4vbW9kZWxzL21hbC5hbmltZS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBNYWxCaW5kRGF0YSB9IGZyb20gXCIuL21hbC5iaW5kLmRhdGFcIjtcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gXCIuLi9tb2RlbHMvc3Vic2NyaXB0aW9uLm1vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWFsVXNlckRhdGEge1xyXG4gIHB1YmxpYyBzdGF0aWMgR2V0VXNlcihtZXNzYWdlOiBNZXNzYWdlKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8TWFsQW5pbWVbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBNYWxCaW5kRGF0YS5HZXQobWVzc2FnZS5hdXRob3IuaWQpXHJcbiAgICAgICAgLnRoZW4obWFsQmluZCA9PiB7XHJcbiAgICAgICAgICBNQUwuR2V0Q1dMaXN0KG1hbEJpbmQuTWFsVXNlcm5hbWUpXHJcbiAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUobGlzdCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgRXhpc3RzKG1lc3NhZ2U6IE1lc3NhZ2UsIHN1YjogU3Vic2NyaXB0aW9uKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLkdldFVzZXIobWVzc2FnZSlcclxuICAgICAgICAudGhlbihsaXN0ID0+IHtcclxuICAgICAgICAgIGNvbnN0IG1hbEFuaW1lID0gbGlzdC5maW5kKG1hID0+IG1hLmFuaW1lX2lkID09PSBzdWIuTWVkaWFJZCk7XHJcbiAgICAgICAgICBpZiAobWFsQW5pbWUgPT09IG51bGwgfHwgbWFsQW5pbWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==