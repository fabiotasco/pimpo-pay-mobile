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
                _this.toastHepler.showToast(res.errors[0].code + " " + res.errors[0].message + " ");
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
                _this.toastHepler.showToast(res.errors[0].code + " " + res.errors[0].message + " ");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWNjb3VudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLCtDQUE2QztBQUM3QyxpRkFBc0U7QUFFdEUsNkJBQW1EO0FBQ25ELCtEQUE0RDtBQUM1RCxnREFBMEM7QUFDMUMsNENBQXFDO0FBQ3JDLG1EQUFxRDtBQUVyRCxxRUFBa0U7QUFDbEUsaURBQStDO0FBRS9DLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQztBQUNwQixJQUFNLFdBQVcsR0FBRyxhQUFhLENBQUM7QUFHbEM7SUFBb0Msa0NBQTJCO0lBSzdELHdCQUNVLFdBQStCLEVBQzdCLFVBQTRCLEVBQzlCLFdBQStCO1FBSHpDLFlBS0Usa0JBQU0sVUFBVSxFQUFFLFNBQVMsQ0FBQyxTQUM3QjtRQUxTLGlCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUM3QixnQkFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFDOUIsaUJBQVcsR0FBWCxXQUFXLENBQW9CO1FBTmpDLGFBQU8sR0FBRyxJQUFJLHNCQUFlLENBQUMsSUFBSSxvQkFBUSxFQUFFLENBQUMsQ0FBQztRQUN0RCxlQUFTLEdBQXlCLEtBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7O0lBUTlELENBQUM7SUFFRCw4QkFBSyxHQUFMLFVBQU0sVUFBdUI7UUFBN0IsaUJBV0M7UUFWQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FDM0MsZUFBRyxDQUFDLFVBQUEsR0FBRztZQUNMLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFDZixLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMvQyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDaEM7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLE1BQUcsQ0FBQyxDQUFDO2FBQy9FO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQ0UsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksb0JBQVEsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDRSxJQUFNLE1BQU0sR0FBWSxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNwRSxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsbUNBQVUsR0FBVjtRQUNFLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQscUNBQVksR0FBWixVQUFhLE1BQWM7UUFBM0IsaUJBUUM7UUFQQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FDdEMsZUFBRyxDQUFDLFVBQUEsR0FBRztZQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNoQixLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBRyxDQUFDLENBQUM7YUFDL0U7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVPLG9DQUFXLEdBQW5CLFVBQW9CLElBQVksRUFBRSxVQUF1QjtRQUN2RCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QixPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxnQkFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQXZEVSxjQUFjO1FBRDFCLGlCQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7eUNBT1YseUNBQWtCO1lBQ2pCLDZDQUFnQjtZQUNqQix5Q0FBa0I7T0FSOUIsY0FBYyxDQXdEMUI7SUFBRCxxQkFBQztDQUFBLEFBeERELENBQW9DLDBCQUFXLEdBd0Q5QztBQXhEWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudEN1c3RvbSB9IGZyb20gJy4uL2NvcmUvaHR0cC1jbGllbnQtY3VzdG9tLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3JlZGVudGlhbHMgfSBmcm9tICcuLi9tb2RlbHMvY3JlZGVudGlhbHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBHbG9iYWxFdmVudFNlcnZpY2UgfSBmcm9tICcuL2dsb2JhbC1ldmVudC5zZXJ2aWNlJztcbmltcG9ydCB7IGJ0b2EgfSBmcm9tICcuLi91dGlscy92YXJpYWJsZXMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgc3RvcmFnZSBmcm9tICduYXRpdmVzY3JpcHQtbG9jYWxzdG9yYWdlJztcbmltcG9ydCB7IEVucm9sbCB9IGZyb20gJy4uL21vZGVscy9lbnJvbGwnO1xuaW1wb3J0IHsgVG9hc3RIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS90b2FzdC1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gJy4uL21vZGVscy91c2VyLWRhdGEnO1xuXG5jb25zdCBIQVNIID0gJ2hhc2gnO1xuY29uc3QgQ1JFREVOVElBTFMgPSAnY3JlZGVudGlhbHMnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEFjY291bnRTZXJ2aWNlIGV4dGVuZHMgQmFzZVNlcnZpY2U8QWNjb3VudFNlcnZpY2U+IHtcbiAgXG4gIHByaXZhdGUgc3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3QobmV3IFVzZXJEYXRhKCkpO1xuICB1c2VyRGF0YSQ6IE9ic2VydmFibGU8VXNlckRhdGE+ID0gdGhpcy5zdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZ2xvYmFsRXZlbnQ6IEdsb2JhbEV2ZW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgaHR0cENsaWVudDogSHR0cENsaWVudEN1c3RvbSxcbiAgICBwcml2YXRlIHRvYXN0SGVwbGVyOiBUb2FzdEhlbHBlclNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoaHR0cENsaWVudCwgJy9hY2Nlc3MnKTtcbiAgfVxuXG4gIGxvZ2luKGNyZWRlbnRpYWw6IENyZWRlbnRpYWxzKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5hY3Rpb24oJy9sb2dpbicsIGNyZWRlbnRpYWwpLnBpcGUoXG4gICAgICB0YXAocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy5zYXZlU2Vzc2lvbihyZXMuY29udGVudC5oYXNoLCBjcmVkZW50aWFsKTtcbiAgICAgICAgICB0aGlzLnN1YmplY3QubmV4dChyZXMuY29udGVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy50b2FzdEhlcGxlci5zaG93VG9hc3QoYCR7cmVzLmVycm9yc1swXS5jb2RlfSAke3Jlcy5lcnJvcnNbMF0ubWVzc2FnZX0gYCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGxvZ291dCgpOiB2b2lkIHtcbiAgICBzdG9yYWdlLmNsZWFyKCk7XG4gICAgdGhpcy5nbG9iYWxFdmVudC5kaXNjb25uZXRlZC5lbWl0KCk7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQobmV3IFVzZXJEYXRhKCkpO1xuICB9XG5cbiAgaXNMb2dnZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbG9nZ2VkOiBib29sZWFuID0gc3RvcmFnZS5nZXRJdGVtKENSRURFTlRJQUxTKSA/IHRydWUgOiBmYWxzZTtcbiAgICByZXR1cm4gbG9nZ2VkO1xuICB9XG5cbiAgZ2V0U2Vzc2lvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiBzdG9yYWdlLmdldEl0ZW0oQ1JFREVOVElBTFMpO1xuICB9XG5cbiAgc2F2ZVJlZ2lzdGVyKGVucm9sbDogRW5yb2xsKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5zYXZlKCcvZW5yb2xsJywgZW5yb2xsKS5waXBlKFxuICAgICAgdGFwKHJlcyA9PiB7XG4gICAgICAgIGlmICghcmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLnRvYXN0SGVwbGVyLnNob3dUb2FzdChgJHtyZXMuZXJyb3JzWzBdLmNvZGV9ICR7cmVzLmVycm9yc1swXS5tZXNzYWdlfSBgKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzYXZlU2Vzc2lvbihoYXNoOiBzdHJpbmcsIGNyZWRlbnRpYWw6IENyZWRlbnRpYWxzKTogdm9pZCB7XG4gICAgc3RvcmFnZS5zZXRJdGVtKEhBU0gsIGhhc2gpO1xuICAgIHN0b3JhZ2Uuc2V0SXRlbShDUkVERU5USUFMUywgYnRvYShjcmVkZW50aWFsKSk7XG4gICAgdGhpcy5nbG9iYWxFdmVudC5sb2dnZWRJbi5lbWl0KCk7XG4gIH1cbn1cbiJdfQ==