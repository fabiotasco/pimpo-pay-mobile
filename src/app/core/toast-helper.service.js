"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var global_event_service_1 = require("../services/global-event.service");
var Toast = require("nativescript-toast");
var ToastHelperService = /** @class */ (function () {
    function ToastHelperService(globalEvent) {
        this.globalEvent = globalEvent;
    }
    ToastHelperService.prototype.showToast = function (msg, duration) {
        if (duration === void 0) { duration = 'long'; }
        var toast = Toast.makeText(msg);
        toast.show();
    };
    ToastHelperService = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [global_event_service_1.GlobalEventService])
    ], ToastHelperService);
    return ToastHelperService;
}());
exports.ToastHelperService = ToastHelperService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QtaGVscGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b2FzdC1oZWxwZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyx5RUFBc0U7QUFDdEUsMENBQTRDO0FBRzVDO0lBQ0UsNEJBQW9CLFdBQStCO1FBQS9CLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtJQUNuRCxDQUFDO0lBRU0sc0NBQVMsR0FBaEIsVUFBaUIsR0FBVyxFQUFFLFFBQXlCO1FBQXpCLHlCQUFBLEVBQUEsaUJBQXlCO1FBQ3JELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQVBVLGtCQUFrQjtRQUQ5QixpQkFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO3lDQUVBLHlDQUFrQjtPQUR4QyxrQkFBa0IsQ0FROUI7SUFBRCx5QkFBQztDQUFBLEFBUkQsSUFRQztBQVJZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdsb2JhbEV2ZW50U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC1ldmVudC5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gJ25hdGl2ZXNjcmlwdC10b2FzdCc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgVG9hc3RIZWxwZXJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBnbG9iYWxFdmVudDogR2xvYmFsRXZlbnRTZXJ2aWNlKSB7XG4gIH1cblxuICBwdWJsaWMgc2hvd1RvYXN0KG1zZzogc3RyaW5nLCBkdXJhdGlvbjogc3RyaW5nID0gJ2xvbmcnKSB7XG4gICAgdmFyIHRvYXN0ID0gVG9hc3QubWFrZVRleHQobXNnKTtcbiAgICB0b2FzdC5zaG93KCk7XG4gIH1cbn1cbiJdfQ==