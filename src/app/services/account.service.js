"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var base_service_1 = require("./base.service");
var http_client_custom_service_1 = require("../core/http-client-custom.service");
var global_event_service_1 = require("./global-event.service");
var variables_1 = require("../utils/variables");
var operators_1 = require("rxjs/operators");
var storage = require("nativescript-localstorage");
var toast_helper_service_1 = require("../core/toast-helper.service");
var HASH = 'hash';
var CREDENTIALS = 'credentials';
var AccountService = /** @class */ (function (_super) {
    __extends(AccountService, _super);
    function AccountService(globalEvent, httpClient, toastHepler) {
        var _this = _super.call(this, httpClient, '/access') || this;
        _this.globalEvent = globalEvent;
        _this.httpClient = httpClient;
        _this.toastHepler = toastHepler;
        return _this;
    }
    AccountService.prototype.login = function (credential) {
        var _this = this;
        return this.action('/login', credential).pipe(operators_1.tap(function (res) {
            if (res.success) {
                _this.saveSession(res.content.hash, credential);
            }
            else {
                _this.toastHepler.showToast(res.errors[0].code + " " + res.errors[0].message + " ");
            }
        }));
    };
    AccountService.prototype.logout = function () {
        storage.clear();
        this.globalEvent.disconneted.emit();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWNjb3VudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLCtDQUE2QztBQUM3QyxpRkFBc0U7QUFHdEUsK0RBQTREO0FBQzVELGdEQUEwQztBQUMxQyw0Q0FBcUM7QUFDckMsbURBQXFEO0FBRXJELHFFQUFrRTtBQUVsRSxJQUFNLElBQUksR0FBRyxNQUFNLENBQUM7QUFDcEIsSUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDO0FBR2xDO0lBQW9DLGtDQUEyQjtJQUM3RCx3QkFDVSxXQUErQixFQUM3QixVQUE0QixFQUM5QixXQUErQjtRQUh6QyxZQUtFLGtCQUFNLFVBQVUsRUFBRSxTQUFTLENBQUMsU0FDN0I7UUFMUyxpQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDN0IsZ0JBQVUsR0FBVixVQUFVLENBQWtCO1FBQzlCLGlCQUFXLEdBQVgsV0FBVyxDQUFvQjs7SUFHekMsQ0FBQztJQUVELDhCQUFLLEdBQUwsVUFBTSxVQUF1QjtRQUE3QixpQkFVQztRQVRDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUMzQyxlQUFHLENBQUMsVUFBQSxHQUFHO1lBQ0wsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDaEQ7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLE1BQUcsQ0FBQyxDQUFDO2FBQy9FO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQ0UsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0UsSUFBTSxNQUFNLEdBQVksT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDcEUsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELG1DQUFVLEdBQVY7UUFDRSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELHFDQUFZLEdBQVosVUFBYSxNQUFjO1FBQTNCLGlCQVFDO1FBUEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQ3RDLGVBQUcsQ0FBQyxVQUFBLEdBQUc7WUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFDaEIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLE1BQUcsQ0FBQyxDQUFDO2FBQy9FO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFTyxvQ0FBVyxHQUFuQixVQUFvQixJQUFZLEVBQUUsVUFBdUI7UUFDdkQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsZ0JBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFqRFUsY0FBYztRQUQxQixpQkFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO3lDQUdWLHlDQUFrQjtZQUNqQiw2Q0FBZ0I7WUFDakIseUNBQWtCO09BSjlCLGNBQWMsQ0FrRDFCO0lBQUQscUJBQUM7Q0FBQSxBQWxERCxDQUFvQywwQkFBVyxHQWtEOUM7QUFsRFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlU2VydmljZSB9IGZyb20gJy4vYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnRDdXN0b20gfSBmcm9tICcuLi9jb3JlL2h0dHAtY2xpZW50LWN1c3RvbS5zZXJ2aWNlJztcbmltcG9ydCB7IENyZWRlbnRpYWxzIH0gZnJvbSAnLi4vbW9kZWxzL2NyZWRlbnRpYWxzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEdsb2JhbEV2ZW50U2VydmljZSB9IGZyb20gJy4vZ2xvYmFsLWV2ZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgYnRvYSB9IGZyb20gJy4uL3V0aWxzL3ZhcmlhYmxlcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBzdG9yYWdlIGZyb20gJ25hdGl2ZXNjcmlwdC1sb2NhbHN0b3JhZ2UnO1xuaW1wb3J0IHsgRW5yb2xsIH0gZnJvbSAnLi4vbW9kZWxzL2Vucm9sbCc7XG5pbXBvcnQgeyBUb2FzdEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3RvYXN0LWhlbHBlci5zZXJ2aWNlJztcblxuY29uc3QgSEFTSCA9ICdoYXNoJztcbmNvbnN0IENSRURFTlRJQUxTID0gJ2NyZWRlbnRpYWxzJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBY2NvdW50U2VydmljZSBleHRlbmRzIEJhc2VTZXJ2aWNlPEFjY291bnRTZXJ2aWNlPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZ2xvYmFsRXZlbnQ6IEdsb2JhbEV2ZW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgaHR0cENsaWVudDogSHR0cENsaWVudEN1c3RvbSxcbiAgICBwcml2YXRlIHRvYXN0SGVwbGVyOiBUb2FzdEhlbHBlclNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoaHR0cENsaWVudCwgJy9hY2Nlc3MnKTtcbiAgfVxuXG4gIGxvZ2luKGNyZWRlbnRpYWw6IENyZWRlbnRpYWxzKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5hY3Rpb24oJy9sb2dpbicsIGNyZWRlbnRpYWwpLnBpcGUoXG4gICAgICB0YXAocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy5zYXZlU2Vzc2lvbihyZXMuY29udGVudC5oYXNoLCBjcmVkZW50aWFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnRvYXN0SGVwbGVyLnNob3dUb2FzdChgJHtyZXMuZXJyb3JzWzBdLmNvZGV9ICR7cmVzLmVycm9yc1swXS5tZXNzYWdlfSBgKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbG9nb3V0KCk6IHZvaWQge1xuICAgIHN0b3JhZ2UuY2xlYXIoKTtcbiAgICB0aGlzLmdsb2JhbEV2ZW50LmRpc2Nvbm5ldGVkLmVtaXQoKTtcbiAgfVxuXG4gIGlzTG9nZ2VkKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGxvZ2dlZDogYm9vbGVhbiA9IHN0b3JhZ2UuZ2V0SXRlbShDUkVERU5USUFMUykgPyB0cnVlIDogZmFsc2U7XG4gICAgcmV0dXJuIGxvZ2dlZDtcbiAgfVxuXG4gIGdldFNlc3Npb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gc3RvcmFnZS5nZXRJdGVtKENSRURFTlRJQUxTKTtcbiAgfVxuXG4gIHNhdmVSZWdpc3RlcihlbnJvbGw6IEVucm9sbCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc2F2ZSgnL2Vucm9sbCcsIGVucm9sbCkucGlwZShcbiAgICAgIHRhcChyZXMgPT4ge1xuICAgICAgICBpZiAoIXJlcy5zdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy50b2FzdEhlcGxlci5zaG93VG9hc3QoYCR7cmVzLmVycm9yc1swXS5jb2RlfSAke3Jlcy5lcnJvcnNbMF0ubWVzc2FnZX0gYCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc2F2ZVNlc3Npb24oaGFzaDogc3RyaW5nLCBjcmVkZW50aWFsOiBDcmVkZW50aWFscyk6IHZvaWQge1xuICAgIHN0b3JhZ2Uuc2V0SXRlbShIQVNILCBoYXNoKTtcbiAgICBzdG9yYWdlLnNldEl0ZW0oQ1JFREVOVElBTFMsIGJ0b2EoY3JlZGVudGlhbCkpO1xuICAgIHRoaXMuZ2xvYmFsRXZlbnQubG9nZ2VkSW4uZW1pdCgpO1xuICB9XG59XG4iXX0=