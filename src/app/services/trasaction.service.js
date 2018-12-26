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
    TransactionService.prototype.executeDeposit = function (deposit) {
        var _this = this;
        return this.save('/deposit', deposit).pipe(operators_1.tap(function (res) {
            if (res.success) {
                _this.getBalance();
            }
        }));
    };
    TransactionService.prototype.getBalance = function () {
        var _this = this;
        this.search('/statement', { page: 0, size: 1 }).subscribe(function (result) {
            if (result.success) {
                _this.subjectBalance.next(result.content.balance);
                _this.subjectTransactions.next(result.content.transactions);
            }
        });
    };
    TransactionService = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [http_client_custom_service_1.HttpClientCustom])
    ], TransactionService);
    return TransactionService;
}(base_service_1.BaseService));
exports.TransactionService = TransactionService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhc2FjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhc2FjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLCtDQUE2QztBQUM3QyxpRkFBc0U7QUFFdEUsNkJBQW1EO0FBQ25ELDRDQUEwQztBQUsxQztJQUF3QyxzQ0FBVztJQU1qRCw0QkFBc0IsVUFBNEI7UUFBbEQsWUFDRSxrQkFBTSxVQUFVLEVBQUUsZUFBZSxDQUFDLFNBQ25DO1FBRnFCLGdCQUFVLEdBQVYsVUFBVSxDQUFrQjtRQUwxQyxvQkFBYyxHQUE0QixJQUFJLHNCQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekUscUJBQWUsR0FBdUIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNqRSx5QkFBbUIsR0FBbUMsSUFBSSxzQkFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RGLG1CQUFhLEdBQThCLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7SUFJbkYsQ0FBQztJQUVELDRDQUFlLEdBQWYsVUFBZ0IsUUFBa0I7UUFBbEMsaUJBUUM7UUFQQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FDMUMsZUFBRyxDQUFDLFVBQUMsR0FBUTtZQUNYLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFDZixLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDbkI7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELDJDQUFjLEdBQWQsVUFBZSxPQUFnQjtRQUEvQixpQkFRQztRQVBDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUN4QyxlQUFHLENBQUMsVUFBQyxHQUFRO1lBQ1gsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNuQjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsdUNBQVUsR0FBVjtRQUFBLGlCQU9DO1FBTkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQVc7WUFDcEUsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUNsQixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNqRCxLQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDNUQ7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFyQ1Usa0JBQWtCO1FBRDlCLGlCQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7eUNBT0MsNkNBQWdCO09BTnZDLGtCQUFrQixDQXNDOUI7SUFBRCx5QkFBQztDQUFBLEFBdENELENBQXdDLDBCQUFXLEdBc0NsRDtBQXRDWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlU2VydmljZSB9IGZyb20gJy4vYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnRDdXN0b20gfSBmcm9tICcuLi9jb3JlL2h0dHAtY2xpZW50LWN1c3RvbS5zZXJ2aWNlJztcbmltcG9ydCB7IFB1cmNoYXNlIH0gZnJvbSAnLi4vbW9kZWxzL3B1cmNoYXNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEZXBvc2l0IH0gZnJvbSAnLi4vbW9kZWxzL2RlcG9zaXQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICcuLi9tb2RlbHMvdHJhbnNhY3Rpb24nO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFRyYW5zYWN0aW9uU2VydmljZSBleHRlbmRzIEJhc2VTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBzdWJqZWN0QmFsYW5jZTogQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KDApO1xuICBhY2NvdW50QmFsYW5jZSQ6IE9ic2VydmFibGU8bnVtYmVyPiA9IHRoaXMuc3ViamVjdEJhbGFuY2UuYXNPYnNlcnZhYmxlKCk7XG4gIHByaXZhdGUgc3ViamVjdFRyYW5zYWN0aW9uczogQmVoYXZpb3JTdWJqZWN0PFRyYW5zYWN0aW9uW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG4gIHRyYW5zYWN0aW9ucyQ6IE9ic2VydmFibGU8VHJhbnNhY3Rpb25bXT4gPSB0aGlzLnN1YmplY3RUcmFuc2FjdGlvbnMuYXNPYnNlcnZhYmxlKCk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGh0dHBDbGllbnQ6IEh0dHBDbGllbnRDdXN0b20pIHtcbiAgICBzdXBlcihodHRwQ2xpZW50LCAnL3RyYW5zYWN0aW9ucycpO1xuICB9XG5cbiAgZXhlY3V0ZVB1cmNoYXNlKHB1cmNoYXNlOiBQdXJjaGFzZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc2F2ZSgnL3B1cmNoYXNlJywgcHVyY2hhc2UpLnBpcGUoXG4gICAgICB0YXAoKHJlczogYW55KSA9PiB7XG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuZ2V0QmFsYW5jZSgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBleGVjdXRlRGVwb3NpdChkZXBvc2l0OiBEZXBvc2l0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5zYXZlKCcvZGVwb3NpdCcsIGRlcG9zaXQpLnBpcGUoXG4gICAgICB0YXAoKHJlczogYW55KSA9PiB7XG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuZ2V0QmFsYW5jZSgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRCYWxhbmNlKCk6IHZvaWQge1xuICAgIHRoaXMuc2VhcmNoKCcvc3RhdGVtZW50JywgeyBwYWdlOiAwLCBzaXplOiAxIH0pLnN1YnNjcmliZSgocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICB0aGlzLnN1YmplY3RCYWxhbmNlLm5leHQocmVzdWx0LmNvbnRlbnQuYmFsYW5jZSk7XG4gICAgICAgIHRoaXMuc3ViamVjdFRyYW5zYWN0aW9ucy5uZXh0KHJlc3VsdC5jb250ZW50LnRyYW5zYWN0aW9ucyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==