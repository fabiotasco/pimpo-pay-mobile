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
        _this.subject = new rxjs_1.BehaviorSubject(0);
        _this.accountBalance$ = _this.subject.asObservable();
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
    TransactionService.prototype.getBalance = function () {
        var _this = this;
        this.search('/statement?page=0&size=1', { page: 0, size: 1 }).subscribe(function (result) {
            if (result.success) {
                _this.subject.next(result.content.balance);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhc2FjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhc2FjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLCtDQUE2QztBQUM3QyxpRkFBc0U7QUFFdEUsNkJBQW1EO0FBQ25ELDRDQUEwQztBQUcxQztJQUF3QyxzQ0FBK0I7SUFJckUsNEJBQXNCLFVBQTRCO1FBQWxELFlBQ0Usa0JBQU0sVUFBVSxFQUFFLGVBQWUsQ0FBQyxTQUNuQztRQUZxQixnQkFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFIMUMsYUFBTyxHQUE0QixJQUFJLHNCQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUscUJBQWUsR0FBdUIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7SUFJbEUsQ0FBQztJQUVELDRDQUFlLEdBQWYsVUFBZ0IsUUFBa0I7UUFBbEMsaUJBUUM7UUFQQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FDMUMsZUFBRyxDQUFDLFVBQUMsR0FBUTtZQUNYLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFDZixLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDbkI7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELHVDQUFVLEdBQVY7UUFBQSxpQkFNQztRQUxDLElBQUksQ0FBQyxNQUFNLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQVc7WUFDbEYsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUNsQixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzNDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBeEJVLGtCQUFrQjtRQUQ5QixpQkFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO3lDQUtDLDZDQUFnQjtPQUp2QyxrQkFBa0IsQ0F5QjlCO0lBQUQseUJBQUM7Q0FBQSxBQXpCRCxDQUF3QywwQkFBVyxHQXlCbEQ7QUF6QlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZVNlcnZpY2UgfSBmcm9tICcuL2Jhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50Q3VzdG9tIH0gZnJvbSAnLi4vY29yZS9odHRwLWNsaWVudC1jdXN0b20uc2VydmljZSc7XG5pbXBvcnQgeyBQdXJjaGFzZSB9IGZyb20gJy4uL21vZGVscy9wdXJjaGFzZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFRyYW5zYWN0aW9uU2VydmljZSBleHRlbmRzIEJhc2VTZXJ2aWNlPFRyYW5zYWN0aW9uU2VydmljZT4ge1xuICBwcml2YXRlIHN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcbiAgYWNjb3VudEJhbGFuY2UkOiBPYnNlcnZhYmxlPG51bWJlcj4gPSB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGh0dHBDbGllbnQ6IEh0dHBDbGllbnRDdXN0b20pIHtcbiAgICBzdXBlcihodHRwQ2xpZW50LCAnL3RyYW5zYWN0aW9ucycpO1xuICB9XG5cbiAgZXhlY3V0ZVB1cmNoYXNlKHB1cmNoYXNlOiBQdXJjaGFzZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc2F2ZSgnL3B1cmNoYXNlJywgcHVyY2hhc2UpLnBpcGUoXG4gICAgICB0YXAoKHJlczogYW55KSA9PiB7XG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuZ2V0QmFsYW5jZSgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRCYWxhbmNlKCk6IHZvaWQge1xuICAgIHRoaXMuc2VhcmNoKCcvc3RhdGVtZW50P3BhZ2U9MCZzaXplPTEnLCB7IHBhZ2U6IDAsIHNpemU6IDEgfSkuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgIHRoaXMuc3ViamVjdC5uZXh0KHJlc3VsdC5jb250ZW50LmJhbGFuY2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=