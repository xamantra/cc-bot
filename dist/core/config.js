"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    static get BOT_TOKEN() {
        return process.env.BOT_TOKEN || require("../extras/env").env.BOT_TOKEN;
    }
    static get COMMAND_PREFIX() {
        return (process.env.COMMAND_PREFIX || require("../extras/env").env.COMMAND_PREFIX);
    }
    static get MONGO_BASE() {
        return process.env.MONGO_BASE || require("../extras/env").env.MONGO_BASE;
    }
    static get MONGO_DATABASE() {
        return (process.env.MONGO_DATABASE || require("../extras/env").env.MONGO_DATABASE);
    }
    static get MAL_PROFILE_BASE() {
        return (process.env.MAL_PROFILE_BASE ||
            require("../extras/env").env.MAL_PROFILE_BASE);
    }
    static MAL_CW_LINK(username) {
        const base = process.env.MAL_CW_BASE || require("../extras/env").env.MAL_CW_BASE;
        return `${base}/${username}/load.json?status=1`;
    }
}
exports.Config = Config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBYSxNQUFNO0lBQ1YsTUFBTSxLQUFLLFNBQVM7UUFDekIsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUN6RSxDQUFDO0lBRU0sTUFBTSxLQUFLLGNBQWM7UUFDOUIsT0FBTyxDQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxJQUFJLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUMxRSxDQUFDO0lBQ0osQ0FBQztJQUVNLE1BQU0sS0FBSyxVQUFVO1FBQzFCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7SUFDM0UsQ0FBQztJQUVNLE1BQU0sS0FBSyxjQUFjO1FBQzlCLE9BQU8sQ0FDTCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsSUFBSSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FDMUUsQ0FBQztJQUNKLENBQUM7SUFFTSxNQUFNLEtBQUssZ0JBQWdCO1FBQ2hDLE9BQU8sQ0FDTCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQjtZQUM1QixPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUM5QyxDQUFDO0lBQ0osQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBZ0I7UUFDeEMsTUFBTSxJQUFJLEdBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDdEUsT0FBTyxHQUFHLElBQUksSUFBSSxRQUFRLHFCQUFxQixDQUFDO0lBQ2xELENBQUM7Q0FDRjtBQWpDRCx3QkFpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ29uZmlnIHtcclxuICBwdWJsaWMgc3RhdGljIGdldCBCT1RfVE9LRU4oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBwcm9jZXNzLmVudi5CT1RfVE9LRU4gfHwgcmVxdWlyZShcIi4uL2V4dHJhcy9lbnZcIikuZW52LkJPVF9UT0tFTjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IENPTU1BTkRfUFJFRklYKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBwcm9jZXNzLmVudi5DT01NQU5EX1BSRUZJWCB8fCByZXF1aXJlKFwiLi4vZXh0cmFzL2VudlwiKS5lbnYuQ09NTUFORF9QUkVGSVhcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldCBNT05HT19CQVNFKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gcHJvY2Vzcy5lbnYuTU9OR09fQkFTRSB8fCByZXF1aXJlKFwiLi4vZXh0cmFzL2VudlwiKS5lbnYuTU9OR09fQkFTRTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IE1PTkdPX0RBVEFCQVNFKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBwcm9jZXNzLmVudi5NT05HT19EQVRBQkFTRSB8fCByZXF1aXJlKFwiLi4vZXh0cmFzL2VudlwiKS5lbnYuTU9OR09fREFUQUJBU0VcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldCBNQUxfUFJPRklMRV9CQVNFKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBwcm9jZXNzLmVudi5NQUxfUFJPRklMRV9CQVNFIHx8XHJcbiAgICAgIHJlcXVpcmUoXCIuLi9leHRyYXMvZW52XCIpLmVudi5NQUxfUFJPRklMRV9CQVNFXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBNQUxfQ1dfTElOSyh1c2VybmFtZTogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBiYXNlID1cclxuICAgICAgcHJvY2Vzcy5lbnYuTUFMX0NXX0JBU0UgfHwgcmVxdWlyZShcIi4uL2V4dHJhcy9lbnZcIikuZW52Lk1BTF9DV19CQVNFO1xyXG4gICAgcmV0dXJuIGAke2Jhc2V9LyR7dXNlcm5hbWV9L2xvYWQuanNvbj9zdGF0dXM9MWA7XHJcbiAgfVxyXG59XHJcbiJdfQ==