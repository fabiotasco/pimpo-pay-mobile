"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var base_service_1 = require("./base.service");
var http_client_custom_service_1 = require("../core/http-client-custom.service");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var TransactionService = /** @class */ (function (_super) {
    __extends(TransactionService, _super);
    function TransactionService(httpClient) {
        var _this = _super.call(this, httpClient, '/transactions') || this;
        _this.httpClient = httpClient;
        _this.subjectBalance = new rxjs_1.BehaviorSubject(0);
        _this.accountBalance$ = _this.subjectBalance.asObservable();
        _this.subjectTransactions = new rxjs_1.BehaviorSubject([]);
        _this.transactions$ = _this.subjectTransactions.asObservable();
        return _this;
    }
    TransactionService.prototype.executePurchase = function (purchase) {
        var _this = this;
        return this.save('/purchase', purchase).pipe(operators_1.tap(function (res) {
            if (res.success) {
                _this.getBalance();
            }
        }));
    };
    TransactionService.prototype.executeTransfer = function (transfer) {
        var _this = this;
        return this.save('/transfer', transfer).pipe(operators_1.tap(function (res) {
            if (res.success) {
                _this.getBalance();
            }
        }));
    };
    TransactionService.prototype.executeDeposit = function (deposit) {
        var _this = this;
        return this.save('/deposit', deposit).pipe(operators_1.tap(function (res) {
            if (res.success) {
                _this.getBalance();
            }
        }));
    };
    TransactionService.prototype.executeCancel = function (idTransacion) {
        return this.deactivate('/' + idTransacion + '/cancel');
    };
    TransactionService.prototype.getBalance = function () {
        var _this = this;
        return this.search('/statement', { page: 0, size: 10 }).pipe(operators_1.tap(function (res) {
            if (res.success) {
                _this.subjectBalance.next(res.content.balance);
                _this.subjectTransactions.next(res.content.transactions);
            }
        }));
    };
    TransactionService = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [http_client_custom_service_1.HttpClientCustom])
    ], TransactionService);
    return TransactionService;
}(base_service_1.BaseService));
exports.TransactionService = TransactionService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhc2FjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhc2FjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLCtDQUE2QztBQUM3QyxpRkFBc0U7QUFFdEUsNkJBQW1EO0FBQ25ELDRDQUEwQztBQU0xQztJQUF3QyxzQ0FBVztJQVVqRCw0QkFBc0IsVUFBNEI7UUFBbEQsWUFDRSxrQkFBTSxVQUFVLEVBQUUsZUFBZSxDQUFDLFNBQ25DO1FBRnFCLGdCQUFVLEdBQVYsVUFBVSxDQUFrQjtRQVQxQyxvQkFBYyxHQUE0QixJQUFJLHNCQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekUscUJBQWUsR0FBdUIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNqRSx5QkFBbUIsR0FFdkIsSUFBSSxzQkFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLG1CQUFhLEdBRVQsS0FBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxDQUFDOztJQUk1QyxDQUFDO0lBRUQsNENBQWUsR0FBZixVQUFnQixRQUFrQjtRQUFsQyxpQkFRQztRQVBDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUMxQyxlQUFHLENBQUMsVUFBQyxHQUFRO1lBQ1gsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNuQjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsNENBQWUsR0FBZixVQUFnQixRQUFrQjtRQUFsQyxpQkFRQztRQVBDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUMxQyxlQUFHLENBQUMsVUFBQyxHQUFRO1lBQ1gsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNuQjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsMkNBQWMsR0FBZCxVQUFlLE9BQWdCO1FBQS9CLGlCQVFDO1FBUEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3hDLGVBQUcsQ0FBQyxVQUFDLEdBQVE7WUFDWCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2YsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ25CO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCwwQ0FBYSxHQUFiLFVBQWMsWUFBb0I7UUFDaEMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxZQUFZLEdBQUcsU0FBUyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELHVDQUFVLEdBQVY7UUFBQSxpQkFTQztRQVJDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDMUQsZUFBRyxDQUFDLFVBQUEsR0FBRztZQUNMLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFDZixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM5QyxLQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDekQ7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQXpEVSxrQkFBa0I7UUFEOUIsaUJBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQzt5Q0FXQyw2Q0FBZ0I7T0FWdkMsa0JBQWtCLENBMEQ5QjtJQUFELHlCQUFDO0NBQUEsQUExREQsQ0FBd0MsMEJBQVcsR0EwRGxEO0FBMURZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudEN1c3RvbSB9IGZyb20gJy4uL2NvcmUvaHR0cC1jbGllbnQtY3VzdG9tLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHVyY2hhc2UgfSBmcm9tICcuLi9tb2RlbHMvcHVyY2hhc2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERlcG9zaXQgfSBmcm9tICcuLi9tb2RlbHMvZGVwb3NpdCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJy4uL21vZGVscy90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBUcmFuc2ZlciB9IGZyb20gJy4uL21vZGVscy90cmFuc2Zlcic7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgVHJhbnNhY3Rpb25TZXJ2aWNlIGV4dGVuZHMgQmFzZVNlcnZpY2Uge1xuICBwcml2YXRlIHN1YmplY3RCYWxhbmNlOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG4gIGFjY291bnRCYWxhbmNlJDogT2JzZXJ2YWJsZTxudW1iZXI+ID0gdGhpcy5zdWJqZWN0QmFsYW5jZS5hc09ic2VydmFibGUoKTtcbiAgcHJpdmF0ZSBzdWJqZWN0VHJhbnNhY3Rpb25zOiBCZWhhdmlvclN1YmplY3Q8XG4gICAgVHJhbnNhY3Rpb25bXVxuICA+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG4gIHRyYW5zYWN0aW9ucyQ6IE9ic2VydmFibGU8XG4gICAgVHJhbnNhY3Rpb25bXVxuICA+ID0gdGhpcy5zdWJqZWN0VHJhbnNhY3Rpb25zLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwQ2xpZW50OiBIdHRwQ2xpZW50Q3VzdG9tKSB7XG4gICAgc3VwZXIoaHR0cENsaWVudCwgJy90cmFuc2FjdGlvbnMnKTtcbiAgfVxuXG4gIGV4ZWN1dGVQdXJjaGFzZShwdXJjaGFzZTogUHVyY2hhc2UpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnNhdmUoJy9wdXJjaGFzZScsIHB1cmNoYXNlKS5waXBlKFxuICAgICAgdGFwKChyZXM6IGFueSkgPT4ge1xuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLmdldEJhbGFuY2UoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZXhlY3V0ZVRyYW5zZmVyKHRyYW5zZmVyOiBUcmFuc2Zlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc2F2ZSgnL3RyYW5zZmVyJywgdHJhbnNmZXIpLnBpcGUoXG4gICAgICB0YXAoKHJlczogYW55KSA9PiB7XG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuZ2V0QmFsYW5jZSgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBleGVjdXRlRGVwb3NpdChkZXBvc2l0OiBEZXBvc2l0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5zYXZlKCcvZGVwb3NpdCcsIGRlcG9zaXQpLnBpcGUoXG4gICAgICB0YXAoKHJlczogYW55KSA9PiB7XG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuZ2V0QmFsYW5jZSgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBleGVjdXRlQ2FuY2VsKGlkVHJhbnNhY2lvbjogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5kZWFjdGl2YXRlKCcvJyArIGlkVHJhbnNhY2lvbiArICcvY2FuY2VsJyk7XG4gIH1cblxuICBnZXRCYWxhbmNlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoKCcvc3RhdGVtZW50JywgeyBwYWdlOiAwLCBzaXplOiAxMCB9KS5waXBlKFxuICAgICAgdGFwKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuc3ViamVjdEJhbGFuY2UubmV4dChyZXMuY29udGVudC5iYWxhbmNlKTtcbiAgICAgICAgICB0aGlzLnN1YmplY3RUcmFuc2FjdGlvbnMubmV4dChyZXMuY29udGVudC50cmFuc2FjdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==