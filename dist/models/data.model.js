"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_model_1 = require("./page.model");
const json2typescript_1 = require("json2typescript");
const media_model_1 = require("./media.model");
let DataPage = class DataPage {
    constructor() {
        this.Page = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("Page", page_model_1.Page),
    __metadata("design:type", Object)
], DataPage.prototype, "Page", void 0);
DataPage = __decorate([
    json2typescript_1.JsonObject("data")
], DataPage);
exports.DataPage = DataPage;
let DataMedia = class DataMedia {
    constructor() {
        this.Media = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("Media", media_model_1.Media),
    __metadata("design:type", Object)
], DataMedia.prototype, "Media", void 0);
DataMedia = __decorate([
    json2typescript_1.JsonObject("data")
], DataMedia);
exports.DataMedia = DataMedia;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvZGF0YS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDZDQUFvQztBQUNwQyxxREFBMkQ7QUFFM0QsK0NBQXNDO0FBR3RDLElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVE7SUFEckI7UUFHUyxTQUFJLEdBQVUsU0FBUyxDQUFDO0lBQ2pDLENBQUM7Q0FBQSxDQUFBO0FBREM7SUFEQyw4QkFBWSxDQUFDLE1BQU0sRUFBRSxpQkFBSSxDQUFDOztzQ0FDSTtBQUZwQixRQUFRO0lBRHBCLDRCQUFVLENBQUMsTUFBTSxDQUFDO0dBQ04sUUFBUSxDQUdwQjtBQUhZLDRCQUFRO0FBTXJCLElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVM7SUFEdEI7UUFHUyxVQUFLLEdBQVcsU0FBUyxDQUFDO0lBQ25DLENBQUM7Q0FBQSxDQUFBO0FBREM7SUFEQyw4QkFBWSxDQUFDLE9BQU8sRUFBRSxtQkFBSyxDQUFDOzt3Q0FDSTtBQUZ0QixTQUFTO0lBRHJCLDRCQUFVLENBQUMsTUFBTSxDQUFDO0dBQ04sU0FBUyxDQUdyQjtBQUhZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSURhdGFQYWdlLCBJRGF0YU1lZGlhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZGF0YS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwiLi9wYWdlLm1vZGVsXCI7XG5pbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tIFwianNvbjJ0eXBlc2NyaXB0XCI7XG5pbXBvcnQgeyBJUGFnZSwgSU1lZGlhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcGFnZS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IE1lZGlhIH0gZnJvbSBcIi4vbWVkaWEubW9kZWxcIjtcblxuQEpzb25PYmplY3QoXCJkYXRhXCIpXG5leHBvcnQgY2xhc3MgRGF0YVBhZ2UgaW1wbGVtZW50cyBJRGF0YVBhZ2Uge1xuICBASnNvblByb3BlcnR5KFwiUGFnZVwiLCBQYWdlKVxuICBwdWJsaWMgUGFnZTogSVBhZ2UgPSB1bmRlZmluZWQ7XG59XG5cbkBKc29uT2JqZWN0KFwiZGF0YVwiKVxuZXhwb3J0IGNsYXNzIERhdGFNZWRpYSBpbXBsZW1lbnRzIElEYXRhTWVkaWEge1xuICBASnNvblByb3BlcnR5KFwiTWVkaWFcIiwgTWVkaWEpXG4gIHB1YmxpYyBNZWRpYTogSU1lZGlhID0gdW5kZWZpbmVkO1xufVxuIl19