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
                _this.saveSession(res.content, credential);
                _this.subject.next(res.content);
            }
            else {
                _this.toastHepler.showToast(res.errors[0].code + " " + res.errors[0].message);
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
    AccountService.prototype.saveSession = function (content, credential) {
        storage.setItem(HASH, content.hash);
        storage.setItem(variables_1.ACCESS, content.contracts[0].contractType);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWNjb3VudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLCtDQUE2QztBQUM3QyxpRkFBc0U7QUFFdEUsNkJBQW1EO0FBQ25ELCtEQUE0RDtBQUM1RCxnREFBa0Q7QUFDbEQsNENBQXFDO0FBQ3JDLG1EQUFxRDtBQUVyRCxxRUFBa0U7QUFDbEUsaURBQStDO0FBRS9DLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQztBQUNwQixJQUFNLFdBQVcsR0FBRyxhQUFhLENBQUM7QUFHbEM7SUFBb0Msa0NBQVc7SUFJN0Msd0JBQ1UsV0FBK0IsRUFDN0IsVUFBNEIsRUFDOUIsV0FBK0I7UUFIekMsWUFLRSxrQkFBTSxVQUFVLEVBQUUsU0FBUyxDQUFDLFNBQzdCO1FBTFMsaUJBQVcsR0FBWCxXQUFXLENBQW9CO1FBQzdCLGdCQUFVLEdBQVYsVUFBVSxDQUFrQjtRQUM5QixpQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFOakMsYUFBTyxHQUFHLElBQUksc0JBQWUsQ0FBQyxJQUFJLG9CQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELGVBQVMsR0FBeUIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7SUFROUQsQ0FBQztJQUVELDhCQUFLLEdBQUwsVUFBTSxVQUF1QjtRQUE3QixpQkFhQztRQVpDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUMzQyxlQUFHLENBQUMsVUFBQSxHQUFHO1lBQ0wsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDMUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2hDO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUNyQixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQVMsQ0FDakQsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQ0UsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksb0JBQVEsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDRSxJQUFNLE1BQU0sR0FBWSxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNwRSxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsbUNBQVUsR0FBVjtRQUNFLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQscUNBQVksR0FBWixVQUFhLE1BQWM7UUFBM0IsaUJBVUM7UUFUQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FDdEMsZUFBRyxDQUFDLFVBQUEsR0FBRztZQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNoQixLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FDckIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLE1BQUcsQ0FDbEQsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFTyxvQ0FBVyxHQUFuQixVQUFvQixPQUFZLEVBQUUsVUFBdUI7UUFDdkQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxPQUFPLENBQUMsa0JBQU0sRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNELE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLGdCQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBM0RVLGNBQWM7UUFEMUIsaUJBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQzt5Q0FNVix5Q0FBa0I7WUFDakIsNkNBQWdCO1lBQ2pCLHlDQUFrQjtPQVA5QixjQUFjLENBNEQxQjtJQUFELHFCQUFDO0NBQUEsQUE1REQsQ0FBb0MsMEJBQVcsR0E0RDlDO0FBNURZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZVNlcnZpY2UgfSBmcm9tICcuL2Jhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50Q3VzdG9tIH0gZnJvbSAnLi4vY29yZS9odHRwLWNsaWVudC1jdXN0b20uc2VydmljZSc7XG5pbXBvcnQgeyBDcmVkZW50aWFscyB9IGZyb20gJy4uL21vZGVscy9jcmVkZW50aWFscyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEdsb2JhbEV2ZW50U2VydmljZSB9IGZyb20gJy4vZ2xvYmFsLWV2ZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgYnRvYSwgQUNDRVNTIH0gZnJvbSAnLi4vdXRpbHMvdmFyaWFibGVzJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIHN0b3JhZ2UgZnJvbSAnbmF0aXZlc2NyaXB0LWxvY2Fsc3RvcmFnZSc7XG5pbXBvcnQgeyBFbnJvbGwgfSBmcm9tICcuLi9tb2RlbHMvZW5yb2xsJztcbmltcG9ydCB7IFRvYXN0SGVscGVyU2VydmljZSB9IGZyb20gJy4uL2NvcmUvdG9hc3QtaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tICcuLi9tb2RlbHMvdXNlci1kYXRhJztcblxuY29uc3QgSEFTSCA9ICdoYXNoJztcbmNvbnN0IENSRURFTlRJQUxTID0gJ2NyZWRlbnRpYWxzJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBY2NvdW50U2VydmljZSBleHRlbmRzIEJhc2VTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBzdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdChuZXcgVXNlckRhdGEoKSk7XG4gIHVzZXJEYXRhJDogT2JzZXJ2YWJsZTxVc2VyRGF0YT4gPSB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBnbG9iYWxFdmVudDogR2xvYmFsRXZlbnRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBodHRwQ2xpZW50OiBIdHRwQ2xpZW50Q3VzdG9tLFxuICAgIHByaXZhdGUgdG9hc3RIZXBsZXI6IFRvYXN0SGVscGVyU2VydmljZVxuICApIHtcbiAgICBzdXBlcihodHRwQ2xpZW50LCAnL2FjY2VzcycpO1xuICB9XG5cbiAgbG9naW4oY3JlZGVudGlhbDogQ3JlZGVudGlhbHMpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmFjdGlvbignL2xvZ2luJywgY3JlZGVudGlhbCkucGlwZShcbiAgICAgIHRhcChyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLnNhdmVTZXNzaW9uKHJlcy5jb250ZW50LCBjcmVkZW50aWFsKTtcbiAgICAgICAgICB0aGlzLnN1YmplY3QubmV4dChyZXMuY29udGVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy50b2FzdEhlcGxlci5zaG93VG9hc3QoXG4gICAgICAgICAgICBgJHtyZXMuZXJyb3JzWzBdLmNvZGV9ICR7cmVzLmVycm9yc1swXS5tZXNzYWdlfWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBsb2dvdXQoKTogdm9pZCB7XG4gICAgc3RvcmFnZS5jbGVhcigpO1xuICAgIHRoaXMuZ2xvYmFsRXZlbnQuZGlzY29ubmV0ZWQuZW1pdCgpO1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KG5ldyBVc2VyRGF0YSgpKTtcbiAgfVxuXG4gIGlzTG9nZ2VkKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGxvZ2dlZDogYm9vbGVhbiA9IHN0b3JhZ2UuZ2V0SXRlbShDUkVERU5USUFMUykgPyB0cnVlIDogZmFsc2U7XG4gICAgcmV0dXJuIGxvZ2dlZDtcbiAgfVxuXG4gIGdldFNlc3Npb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gc3RvcmFnZS5nZXRJdGVtKENSRURFTlRJQUxTKTtcbiAgfVxuXG4gIHNhdmVSZWdpc3RlcihlbnJvbGw6IEVucm9sbCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc2F2ZSgnL2Vucm9sbCcsIGVucm9sbCkucGlwZShcbiAgICAgIHRhcChyZXMgPT4ge1xuICAgICAgICBpZiAoIXJlcy5zdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy50b2FzdEhlcGxlci5zaG93VG9hc3QoXG4gICAgICAgICAgICBgJHtyZXMuZXJyb3JzWzBdLmNvZGV9ICR7cmVzLmVycm9yc1swXS5tZXNzYWdlfSBgXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzYXZlU2Vzc2lvbihjb250ZW50OiBhbnksIGNyZWRlbnRpYWw6IENyZWRlbnRpYWxzKTogdm9pZCB7XG4gICAgc3RvcmFnZS5zZXRJdGVtKEhBU0gsIGNvbnRlbnQuaGFzaCk7XG4gICAgc3RvcmFnZS5zZXRJdGVtKEFDQ0VTUywgY29udGVudC5jb250cmFjdHNbMF0uY29udHJhY3RUeXBlKTtcbiAgICBzdG9yYWdlLnNldEl0ZW0oQ1JFREVOVElBTFMsIGJ0b2EoY3JlZGVudGlhbCkpO1xuICAgIHRoaXMuZ2xvYmFsRXZlbnQubG9nZ2VkSW4uZW1pdCgpO1xuICB9XG59XG4iXX0=