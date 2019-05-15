"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var base_service_1 = require("./base.service");
var http_client_custom_service_1 = require("../core/http-client-custom.service");
var rxjs_1 = require("rxjs");
var global_event_service_1 = require("./global-event.service");
var variables_1 = require("../utils/variables");
var operators_1 = require("rxjs/operators");
var storage = require("nativescript-localstorage");
var toast_helper_service_1 = require("../core/toast-helper.service");
var user_data_1 = require("../models/user-data");
var HASH = 'hash';
var CREDENTIALS = 'credentials';
var AccountService = /** @class */ (function (_super) {
    __extends(AccountService, _super);
    function AccountService(globalEvent, httpClient, toastHepler) {
        var _this = _super.call(this, httpClient, '/access') || this;
        _this.globalEvent = globalEvent;
        _this.httpClient = httpClient;
        _this.toastHepler = toastHepler;
        _this.subject = new rxjs_1.BehaviorSubject(new user_data_1.UserData());
        _this.userData$ = _this.subject.asObservable();
        return _this;
    }
    AccountService.prototype.login = function (credential) {
        var _this = this;
        return this.action('/login', credential).pipe(operators_1.tap(function (res) {
            if (res.success) {
                _this.saveSession(res.content.hash, credential);
                _this.subject.next(res.content);
            }
            else {
                _this.toastHepler.showToast(res.errors[0].message + " ");
            }
        }));
    };
    AccountService.prototype.logout = function () {
        storage.clear();
        this.globalEvent.disconneted.emit();
        this.subject.next(new user_data_1.UserData());
    };
    AccountService.prototype.isLogged = function () {
        var logged = storage.getItem(CREDENTIALS) ? true : false;
        return logged;
    };
    AccountService.prototype.getSession = function () {
        return storage.getItem(CREDENTIALS);
    };
    AccountService.prototype.saveRegister = function (enroll) {
        var _this = this;
        return this.save('/enroll', enroll).pipe(operators_1.tap(function (res) {
            if (!res.success) {
                _this.toastHepler.showToast(res.errors[0].message + " ");
            }
        }));
    };
    AccountService.prototype.saveSession = function (hash, credential) {
        storage.setItem(HASH, hash);
        storage.setItem(CREDENTIALS, variables_1.btoa(credential));
        this.globalEvent.loggedIn.emit();
    };
    AccountService = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [global_event_service_1.GlobalEventService,
            http_client_custom_service_1.HttpClientCustom,
            toast_helper_service_1.ToastHelperService])
    ], AccountService);
    return AccountService;
}(base_service_1.BaseService));
exports.AccountService = AccountService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWNjb3VudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLCtDQUE2QztBQUM3QyxpRkFBc0U7QUFFdEUsNkJBQW1EO0FBQ25ELCtEQUE0RDtBQUM1RCxnREFBMEM7QUFDMUMsNENBQXFDO0FBQ3JDLG1EQUFxRDtBQUVyRCxxRUFBa0U7QUFDbEUsaURBQStDO0FBRS9DLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQztBQUNwQixJQUFNLFdBQVcsR0FBRyxhQUFhLENBQUM7QUFHbEM7SUFBb0Msa0NBQVc7SUFLN0Msd0JBQ1UsV0FBK0IsRUFDN0IsVUFBNEIsRUFDOUIsV0FBK0I7UUFIekMsWUFLRSxrQkFBTSxVQUFVLEVBQUUsU0FBUyxDQUFDLFNBQzdCO1FBTFMsaUJBQVcsR0FBWCxXQUFXLENBQW9CO1FBQzdCLGdCQUFVLEdBQVYsVUFBVSxDQUFrQjtRQUM5QixpQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFOakMsYUFBTyxHQUFHLElBQUksc0JBQWUsQ0FBQyxJQUFJLG9CQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELGVBQVMsR0FBeUIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7SUFROUQsQ0FBQztJQUVELDhCQUFLLEdBQUwsVUFBTSxVQUF1QjtRQUE3QixpQkFXQztRQVZDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUMzQyxlQUFHLENBQUMsVUFBQSxHQUFHO1lBQ0wsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQy9DLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoQztpQkFBTTtnQkFDTCxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBRyxDQUFDLENBQUM7YUFDekQ7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELCtCQUFNLEdBQU47UUFDRSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBUSxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNFLElBQU0sTUFBTSxHQUFZLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3BFLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxtQ0FBVSxHQUFWO1FBQ0UsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxxQ0FBWSxHQUFaLFVBQWEsTUFBYztRQUEzQixpQkFRQztRQVBDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUN0QyxlQUFHLENBQUMsVUFBQSxHQUFHO1lBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hCLEtBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxNQUFHLENBQUMsQ0FBQzthQUN6RDtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRU8sb0NBQVcsR0FBbkIsVUFBb0IsSUFBWSxFQUFFLFVBQXVCO1FBQ3ZELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLGdCQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBdkRVLGNBQWM7UUFEMUIsaUJBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQzt5Q0FPVix5Q0FBa0I7WUFDakIsNkNBQWdCO1lBQ2pCLHlDQUFrQjtPQVI5QixjQUFjLENBd0QxQjtJQUFELHFCQUFDO0NBQUEsQUF4REQsQ0FBb0MsMEJBQVcsR0F3RDlDO0FBeERZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZVNlcnZpY2UgfSBmcm9tICcuL2Jhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50Q3VzdG9tIH0gZnJvbSAnLi4vY29yZS9odHRwLWNsaWVudC1jdXN0b20uc2VydmljZSc7XG5pbXBvcnQgeyBDcmVkZW50aWFscyB9IGZyb20gJy4uL21vZGVscy9jcmVkZW50aWFscyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEdsb2JhbEV2ZW50U2VydmljZSB9IGZyb20gJy4vZ2xvYmFsLWV2ZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgYnRvYSB9IGZyb20gJy4uL3V0aWxzL3ZhcmlhYmxlcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBzdG9yYWdlIGZyb20gJ25hdGl2ZXNjcmlwdC1sb2NhbHN0b3JhZ2UnO1xuaW1wb3J0IHsgRW5yb2xsIH0gZnJvbSAnLi4vbW9kZWxzL2Vucm9sbCc7XG5pbXBvcnQgeyBUb2FzdEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3RvYXN0LWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL3VzZXItZGF0YSc7XG5cbmNvbnN0IEhBU0ggPSAnaGFzaCc7XG5jb25zdCBDUkVERU5USUFMUyA9ICdjcmVkZW50aWFscyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQWNjb3VudFNlcnZpY2UgZXh0ZW5kcyBCYXNlU2VydmljZSB7XG4gIFxuICBwcml2YXRlIHN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG5ldyBVc2VyRGF0YSgpKTtcbiAgdXNlckRhdGEkOiBPYnNlcnZhYmxlPFVzZXJEYXRhPiA9IHRoaXMuc3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGdsb2JhbEV2ZW50OiBHbG9iYWxFdmVudFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGh0dHBDbGllbnQ6IEh0dHBDbGllbnRDdXN0b20sXG4gICAgcHJpdmF0ZSB0b2FzdEhlcGxlcjogVG9hc3RIZWxwZXJTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGh0dHBDbGllbnQsICcvYWNjZXNzJyk7XG4gIH1cblxuICBsb2dpbihjcmVkZW50aWFsOiBDcmVkZW50aWFscyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aW9uKCcvbG9naW4nLCBjcmVkZW50aWFsKS5waXBlKFxuICAgICAgdGFwKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuc2F2ZVNlc3Npb24ocmVzLmNvbnRlbnQuaGFzaCwgY3JlZGVudGlhbCk7XG4gICAgICAgICAgdGhpcy5zdWJqZWN0Lm5leHQocmVzLmNvbnRlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudG9hc3RIZXBsZXIuc2hvd1RvYXN0KGAke3Jlcy5lcnJvcnNbMF0ubWVzc2FnZX0gYCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGxvZ291dCgpOiB2b2lkIHtcbiAgICBzdG9yYWdlLmNsZWFyKCk7XG4gICAgdGhpcy5nbG9iYWxFdmVudC5kaXNjb25uZXRlZC5lbWl0KCk7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQobmV3IFVzZXJEYXRhKCkpO1xuICB9XG5cbiAgaXNMb2dnZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbG9nZ2VkOiBib29sZWFuID0gc3RvcmFnZS5nZXRJdGVtKENSRURFTlRJQUxTKSA/IHRydWUgOiBmYWxzZTtcbiAgICByZXR1cm4gbG9nZ2VkO1xuICB9XG5cbiAgZ2V0U2Vzc2lvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiBzdG9yYWdlLmdldEl0ZW0oQ1JFREVOVElBTFMpO1xuICB9XG5cbiAgc2F2ZVJlZ2lzdGVyKGVucm9sbDogRW5yb2xsKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5zYXZlKCcvZW5yb2xsJywgZW5yb2xsKS5waXBlKFxuICAgICAgdGFwKHJlcyA9PiB7XG4gICAgICAgIGlmICghcmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLnRvYXN0SGVwbGVyLnNob3dUb2FzdChgJHtyZXMuZXJyb3JzWzBdLm1lc3NhZ2V9IGApO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHNhdmVTZXNzaW9uKGhhc2g6IHN0cmluZywgY3JlZGVudGlhbDogQ3JlZGVudGlhbHMpOiB2b2lkIHtcbiAgICBzdG9yYWdlLnNldEl0ZW0oSEFTSCwgaGFzaCk7XG4gICAgc3RvcmFnZS5zZXRJdGVtKENSRURFTlRJQUxTLCBidG9hKGNyZWRlbnRpYWwpKTtcbiAgICB0aGlzLmdsb2JhbEV2ZW50LmxvZ2dlZEluLmVtaXQoKTtcbiAgfVxufVxuIl19