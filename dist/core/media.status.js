"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MediaStatus {
    static Ongoing($m) {
        if ($m.status === "RELEASING" &&
            $m.nextAiringEpisode !== null &&
            $m.nextAiringEpisode.airingAt !== null) {
            return true;
        }
        return false;
    }
    static NotYetAired($m) {
        if ($m.status === "NOT_YET_RELEASED" &&
            $m.nextAiringEpisode !== null &&
            $m.nextAiringEpisode.airingAt !== null) {
            return true;
        }
        return false;
    }
    static NotYetAiredNoDate($m) {
        if ($m.status === "NOT_YET_RELEASED" && $m.nextAiringEpisode === null) {
            return true;
        }
        return false;
    }
    static Completed($m) {
        if ($m.status === "FINISHED") {
            return true;
        }
        return false;
    }
}
exports.MediaStatus = MediaStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuc3RhdHVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvbWVkaWEuc3RhdHVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBYSxXQUFXO0lBQ2YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFVO1FBQzlCLElBQ0UsRUFBRSxDQUFDLE1BQU0sS0FBSyxXQUFXO1lBQ3pCLEVBQUUsQ0FBQyxpQkFBaUIsS0FBSyxJQUFJO1lBQzdCLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUN0QztZQUNBLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQVU7UUFDbEMsSUFDRSxFQUFFLENBQUMsTUFBTSxLQUFLLGtCQUFrQjtZQUNoQyxFQUFFLENBQUMsaUJBQWlCLEtBQUssSUFBSTtZQUM3QixFQUFFLENBQUMsaUJBQWlCLENBQUMsUUFBUSxLQUFLLElBQUksRUFDdEM7WUFDQSxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU0sTUFBTSxDQUFDLGlCQUFpQixDQUFDLEVBQVU7UUFDeEMsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLGtCQUFrQixJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsS0FBSyxJQUFJLEVBQUU7WUFDckUsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVNLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBVTtRQUNoQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssVUFBVSxFQUFFO1lBQzVCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Q0FDRjtBQXBDRCxrQ0FvQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTWVkaWEgfSBmcm9tIFwiLi8uLi9pbnRlcmZhY2VzL3BhZ2UuaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVkaWFTdGF0dXMge1xyXG4gIHB1YmxpYyBzdGF0aWMgT25nb2luZygkbTogSU1lZGlhKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgICRtLnN0YXR1cyA9PT0gXCJSRUxFQVNJTkdcIiAmJlxyXG4gICAgICAkbS5uZXh0QWlyaW5nRXBpc29kZSAhPT0gbnVsbCAmJlxyXG4gICAgICAkbS5uZXh0QWlyaW5nRXBpc29kZS5haXJpbmdBdCAhPT0gbnVsbFxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBOb3RZZXRBaXJlZCgkbTogSU1lZGlhKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgICRtLnN0YXR1cyA9PT0gXCJOT1RfWUVUX1JFTEVBU0VEXCIgJiZcclxuICAgICAgJG0ubmV4dEFpcmluZ0VwaXNvZGUgIT09IG51bGwgJiZcclxuICAgICAgJG0ubmV4dEFpcmluZ0VwaXNvZGUuYWlyaW5nQXQgIT09IG51bGxcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgTm90WWV0QWlyZWROb0RhdGUoJG06IElNZWRpYSkge1xyXG4gICAgaWYgKCRtLnN0YXR1cyA9PT0gXCJOT1RfWUVUX1JFTEVBU0VEXCIgJiYgJG0ubmV4dEFpcmluZ0VwaXNvZGUgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIENvbXBsZXRlZCgkbTogSU1lZGlhKSB7XHJcbiAgICBpZiAoJG0uc3RhdHVzID09PSBcIkZJTklTSEVEXCIpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==