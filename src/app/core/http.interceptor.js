"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var account_service_1 = require("../services/account.service");
var variables_1 = require("../utils/variables");
var HeaderInterceptor = /** @class */ (function () {
    function HeaderInterceptor(accountService) {
        this.accountService = accountService;
    }
    HeaderInterceptor.prototype.intercept = function (req, next) {
        var headers;
        if (this.accountService.isLogged()) {
            headers = req.headers
                .set('Authorization', 'Basic ' + this.accountService.getSession())
                .set('Content-Type', 'application/json');
        }
        else if (variables_1.openRoute(req.url)) {
            var token = variables_1.btoa({ username: 'Pimpo Pay', password: 'Pimpo Pay Test' });
            headers = req.headers
                .set('Authorization', 'Basic ' + token)
                .set('Content-Type', 'application/json');
        }
        var authReq = req.clone({ headers: headers });
        return next.handle(authReq);
    };
    HeaderInterceptor = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [account_service_1.AccountService])
    ], HeaderInterceptor);
    return HeaderInterceptor;
}());
exports.HeaderInterceptor = HeaderInterceptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh0dHAuaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFTM0MsK0RBQTZEO0FBQzdELGdEQUFxRDtBQUdyRDtJQUNFLDJCQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFBRyxDQUFDO0lBRXRELHFDQUFTLEdBQVQsVUFDRSxHQUFxQixFQUNyQixJQUFpQjtRQUVqQixJQUFJLE9BQW9CLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2xDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTztpQkFDbEIsR0FBRyxDQUFDLGVBQWUsRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztpQkFDakUsR0FBRyxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1NBQzVDO2FBQU0sSUFBSSxxQkFBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM3QixJQUFNLEtBQUssR0FBRyxnQkFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1lBQzFFLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTztpQkFDbEIsR0FBRyxDQUFDLGVBQWUsRUFBRSxRQUFRLEdBQUcsS0FBSyxDQUFDO2lCQUN0QyxHQUFHLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDNUM7UUFFRCxJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBckJVLGlCQUFpQjtRQUQ3QixpQkFBVSxFQUFFO3lDQUV5QixnQ0FBYztPQUR2QyxpQkFBaUIsQ0FzQjdCO0lBQUQsd0JBQUM7Q0FBQSxBQXRCRCxJQXNCQztBQXRCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBIdHRwRXZlbnQsXG4gIEh0dHBJbnRlcmNlcHRvcixcbiAgSHR0cEhhbmRsZXIsXG4gIEh0dHBSZXF1ZXN0LFxuICBIdHRwSGVhZGVyc1xufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2FjY291bnQuc2VydmljZSc7XG5pbXBvcnQgeyBvcGVuUm91dGUsIGJ0b2EgfSBmcm9tICcuLi91dGlscy92YXJpYWJsZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGVhZGVySW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSkge31cblxuICBpbnRlcmNlcHQoXG4gICAgcmVxOiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIG5leHQ6IEh0dHBIYW5kbGVyXG4gICk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBsZXQgaGVhZGVyczogSHR0cEhlYWRlcnM7XG4gICAgaWYgKHRoaXMuYWNjb3VudFNlcnZpY2UuaXNMb2dnZWQoKSkge1xuICAgICAgaGVhZGVycyA9IHJlcS5oZWFkZXJzXG4gICAgICAgIC5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIHRoaXMuYWNjb3VudFNlcnZpY2UuZ2V0U2Vzc2lvbigpKVxuICAgICAgICAuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIH0gZWxzZSBpZiAob3BlblJvdXRlKHJlcS51cmwpKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IGJ0b2EoeyB1c2VybmFtZTogJ1BpbXBvIFBheScsIHBhc3N3b3JkOiAnUGltcG8gUGF5IFRlc3QnIH0pO1xuICAgICAgaGVhZGVycyA9IHJlcS5oZWFkZXJzXG4gICAgICAgIC5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIHRva2VuKVxuICAgICAgICAuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIH1cblxuICAgIGNvbnN0IGF1dGhSZXEgPSByZXEuY2xvbmUoeyBoZWFkZXJzIH0pO1xuICAgIHJldHVybiBuZXh0LmhhbmRsZShhdXRoUmVxKTtcbiAgfVxufVxuIl19