"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GlobalEventService = /** @class */ (function () {
    function GlobalEventService() {
        this.loggedIn = new core_1.EventEmitter();
        this.disconneted = new core_1.EventEmitter();
    }
    GlobalEventService = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [])
    ], GlobalEventService);
    return GlobalEventService;
}());
exports.GlobalEventService = GlobalEventService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWV2ZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnbG9iYWwtZXZlbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUd6RDtJQUdFO1FBRk8sYUFBUSxHQUFxQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNoRCxnQkFBVyxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBSEwsa0JBQWtCO1FBRDlCLGlCQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7O09BQ3RCLGtCQUFrQixDQUk5QjtJQUFELHlCQUFDO0NBQUEsQUFKRCxJQUlDO0FBSlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgR2xvYmFsRXZlbnRTZXJ2aWNlIHtcbiAgcHVibGljIGxvZ2dlZEluOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgZGlzY29ubmV0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBjb25zdHJ1Y3RvcigpIHt9XG59XG4iXX0=