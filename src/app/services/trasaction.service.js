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
    TransactionService.prototype.executeCancel = function (idTransacion) {
        return this.deactivate('/' + idTransacion + '/cancel');
    };
    TransactionService.prototype.getBalance = function () {
        var _this = this;
        this.search('/statement', { page: 0, size: 10 }).subscribe(function (result) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhc2FjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhc2FjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLCtDQUE2QztBQUM3QyxpRkFBc0U7QUFFdEUsNkJBQW1EO0FBQ25ELDRDQUEwQztBQUsxQztJQUF3QyxzQ0FBVztJQVVqRCw0QkFBc0IsVUFBNEI7UUFBbEQsWUFDRSxrQkFBTSxVQUFVLEVBQUUsZUFBZSxDQUFDLFNBQ25DO1FBRnFCLGdCQUFVLEdBQVYsVUFBVSxDQUFrQjtRQVQxQyxvQkFBYyxHQUE0QixJQUFJLHNCQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekUscUJBQWUsR0FBdUIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNqRSx5QkFBbUIsR0FFdkIsSUFBSSxzQkFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLG1CQUFhLEdBRVQsS0FBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxDQUFDOztJQUk1QyxDQUFDO0lBRUQsNENBQWUsR0FBZixVQUFnQixRQUFrQjtRQUFsQyxpQkFRQztRQVBDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUMxQyxlQUFHLENBQUMsVUFBQyxHQUFRO1lBQ1gsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNuQjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsMkNBQWMsR0FBZCxVQUFlLE9BQWdCO1FBQS9CLGlCQVFDO1FBUEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3hDLGVBQUcsQ0FBQyxVQUFDLEdBQVE7WUFDWCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2YsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ25CO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCwwQ0FBYSxHQUFiLFVBQWMsWUFBb0I7UUFDaEMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxZQUFZLEdBQUcsU0FBUyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELHVDQUFVLEdBQVY7UUFBQSxpQkFTQztRQVJDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQ3hELFVBQUMsTUFBVztZQUNWLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDbEIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakQsS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzVEO1FBQ0gsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBL0NVLGtCQUFrQjtRQUQ5QixpQkFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO3lDQVdDLDZDQUFnQjtPQVZ2QyxrQkFBa0IsQ0FnRDlCO0lBQUQseUJBQUM7Q0FBQSxBQWhERCxDQUF3QywwQkFBVyxHQWdEbEQ7QUFoRFksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZVNlcnZpY2UgfSBmcm9tICcuL2Jhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50Q3VzdG9tIH0gZnJvbSAnLi4vY29yZS9odHRwLWNsaWVudC1jdXN0b20uc2VydmljZSc7XG5pbXBvcnQgeyBQdXJjaGFzZSB9IGZyb20gJy4uL21vZGVscy9wdXJjaGFzZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGVwb3NpdCB9IGZyb20gJy4uL21vZGVscy9kZXBvc2l0JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL3RyYW5zYWN0aW9uJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBUcmFuc2FjdGlvblNlcnZpY2UgZXh0ZW5kcyBCYXNlU2VydmljZSB7XG4gIHByaXZhdGUgc3ViamVjdEJhbGFuY2U6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcbiAgYWNjb3VudEJhbGFuY2UkOiBPYnNlcnZhYmxlPG51bWJlcj4gPSB0aGlzLnN1YmplY3RCYWxhbmNlLmFzT2JzZXJ2YWJsZSgpO1xuICBwcml2YXRlIHN1YmplY3RUcmFuc2FjdGlvbnM6IEJlaGF2aW9yU3ViamVjdDxcbiAgICBUcmFuc2FjdGlvbltdXG4gID4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcbiAgdHJhbnNhY3Rpb25zJDogT2JzZXJ2YWJsZTxcbiAgICBUcmFuc2FjdGlvbltdXG4gID4gPSB0aGlzLnN1YmplY3RUcmFuc2FjdGlvbnMuYXNPYnNlcnZhYmxlKCk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGh0dHBDbGllbnQ6IEh0dHBDbGllbnRDdXN0b20pIHtcbiAgICBzdXBlcihodHRwQ2xpZW50LCAnL3RyYW5zYWN0aW9ucycpO1xuICB9XG5cbiAgZXhlY3V0ZVB1cmNoYXNlKHB1cmNoYXNlOiBQdXJjaGFzZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc2F2ZSgnL3B1cmNoYXNlJywgcHVyY2hhc2UpLnBpcGUoXG4gICAgICB0YXAoKHJlczogYW55KSA9PiB7XG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuZ2V0QmFsYW5jZSgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBleGVjdXRlRGVwb3NpdChkZXBvc2l0OiBEZXBvc2l0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5zYXZlKCcvZGVwb3NpdCcsIGRlcG9zaXQpLnBpcGUoXG4gICAgICB0YXAoKHJlczogYW55KSA9PiB7XG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuZ2V0QmFsYW5jZSgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBleGVjdXRlQ2FuY2VsKGlkVHJhbnNhY2lvbjogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5kZWFjdGl2YXRlKCcvJyArIGlkVHJhbnNhY2lvbiArICcvY2FuY2VsJyk7XG4gIH1cblxuICBnZXRCYWxhbmNlKCk6IHZvaWQge1xuICAgIHRoaXMuc2VhcmNoKCcvc3RhdGVtZW50JywgeyBwYWdlOiAwLCBzaXplOiAxMCB9KS5zdWJzY3JpYmUoXG4gICAgICAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy5zdWJqZWN0QmFsYW5jZS5uZXh0KHJlc3VsdC5jb250ZW50LmJhbGFuY2UpO1xuICAgICAgICAgIHRoaXMuc3ViamVjdFRyYW5zYWN0aW9ucy5uZXh0KHJlc3VsdC5jb250ZW50LnRyYW5zYWN0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICB9XG59XG4iXX0=