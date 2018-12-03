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
        console.log(req.url);
        if (this.accountService.isLogged()) {
            headers = req.headers
                .set('Authorization', 'Basic ' + this.accountService.getSession())
                .set('Content-Type', 'application/json');
        }
        else if (variables_1.openRoute(req.url)) {
            var token = variables_1.btoa({ username: 'Pimpo Pay', password: 'Pimpo Pay Test' });
            headers = req.headers.set('Authorization', 'Basic ' + token).set('Content-Type', 'application/json');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh0dHAuaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFHM0MsK0RBQTZEO0FBQzdELGdEQUFxRDtBQUdyRDtJQUNFLDJCQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFBRyxDQUFDO0lBRXRELHFDQUFTLEdBQVQsVUFBVSxHQUFxQixFQUFFLElBQWlCO1FBQ2hELElBQUksT0FBb0IsQ0FBQztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDbEMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPO2lCQUNsQixHQUFHLENBQUMsZUFBZSxFQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO2lCQUNqRSxHQUFHLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDNUM7YUFBTSxJQUFJLHFCQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLElBQU0sS0FBSyxHQUFHLGdCQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7WUFDMUUsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3RHO1FBRUQsSUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsQ0FBQztRQUN2QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQWpCVSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTt5Q0FFeUIsZ0NBQWM7T0FEdkMsaUJBQWlCLENBa0I3QjtJQUFELHdCQUFDO0NBQUEsQUFsQkQsSUFrQkM7QUFsQlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwSW50ZXJjZXB0b3IsIEh0dHBIYW5kbGVyLCBIdHRwUmVxdWVzdCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2FjY291bnQuc2VydmljZSc7XG5pbXBvcnQgeyBvcGVuUm91dGUsIGJ0b2EgfSBmcm9tICcuLi91dGlscy92YXJpYWJsZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGVhZGVySW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSkge31cblxuICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBsZXQgaGVhZGVyczogSHR0cEhlYWRlcnM7XG4gICAgY29uc29sZS5sb2cocmVxLnVybCk7XG4gICAgaWYgKHRoaXMuYWNjb3VudFNlcnZpY2UuaXNMb2dnZWQoKSkge1xuICAgICAgaGVhZGVycyA9IHJlcS5oZWFkZXJzXG4gICAgICAgIC5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIHRoaXMuYWNjb3VudFNlcnZpY2UuZ2V0U2Vzc2lvbigpKVxuICAgICAgICAuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIH0gZWxzZSBpZiAob3BlblJvdXRlKHJlcS51cmwpKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IGJ0b2EoeyB1c2VybmFtZTogJ1BpbXBvIFBheScsIHBhc3N3b3JkOiAnUGltcG8gUGF5IFRlc3QnIH0pO1xuICAgICAgaGVhZGVycyA9IHJlcS5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgdG9rZW4pLnNldCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICB9XG5cbiAgICBjb25zdCBhdXRoUmVxID0gcmVxLmNsb25lKHsgaGVhZGVycyB9KTtcbiAgICByZXR1cm4gbmV4dC5oYW5kbGUoYXV0aFJlcSk7XG4gIH1cbn1cbiJdfQ==