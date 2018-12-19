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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhc2FjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhc2FjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLCtDQUE2QztBQUM3QyxpRkFBc0U7QUFFdEUsNkJBQW1EO0FBQ25ELDRDQUEwQztBQUkxQztJQUF3QyxzQ0FBVztJQUlqRCw0QkFBc0IsVUFBNEI7UUFBbEQsWUFDRSxrQkFBTSxVQUFVLEVBQUUsZUFBZSxDQUFDLFNBQ25DO1FBRnFCLGdCQUFVLEdBQVYsVUFBVSxDQUFrQjtRQUgxQyxhQUFPLEdBQTRCLElBQUksc0JBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxxQkFBZSxHQUF1QixLQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDOztJQUlsRSxDQUFDO0lBRUQsNENBQWUsR0FBZixVQUFnQixRQUFrQjtRQUFsQyxpQkFRQztRQVBDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUMxQyxlQUFHLENBQUMsVUFBQyxHQUFRO1lBQ1gsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNuQjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsMkNBQWMsR0FBZCxVQUFlLE9BQWdCO1FBQS9CLGlCQVFDO1FBUEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3hDLGVBQUcsQ0FBQyxVQUFDLEdBQVE7WUFDWCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2YsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ25CO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCx1Q0FBVSxHQUFWO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsTUFBTSxDQUFDLDBCQUEwQixFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFXO1lBQ2xGLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDbEIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMzQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQWxDVSxrQkFBa0I7UUFEOUIsaUJBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQzt5Q0FLQyw2Q0FBZ0I7T0FKdkMsa0JBQWtCLENBbUM5QjtJQUFELHlCQUFDO0NBQUEsQUFuQ0QsQ0FBd0MsMEJBQVcsR0FtQ2xEO0FBbkNZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudEN1c3RvbSB9IGZyb20gJy4uL2NvcmUvaHR0cC1jbGllbnQtY3VzdG9tLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHVyY2hhc2UgfSBmcm9tICcuLi9tb2RlbHMvcHVyY2hhc2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERlcG9zaXQgfSBmcm9tICcuLi9tb2RlbHMvZGVwb3NpdCc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgVHJhbnNhY3Rpb25TZXJ2aWNlIGV4dGVuZHMgQmFzZVNlcnZpY2Uge1xuICBwcml2YXRlIHN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcbiAgYWNjb3VudEJhbGFuY2UkOiBPYnNlcnZhYmxlPG51bWJlcj4gPSB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGh0dHBDbGllbnQ6IEh0dHBDbGllbnRDdXN0b20pIHtcbiAgICBzdXBlcihodHRwQ2xpZW50LCAnL3RyYW5zYWN0aW9ucycpO1xuICB9XG5cbiAgZXhlY3V0ZVB1cmNoYXNlKHB1cmNoYXNlOiBQdXJjaGFzZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuc2F2ZSgnL3B1cmNoYXNlJywgcHVyY2hhc2UpLnBpcGUoXG4gICAgICB0YXAoKHJlczogYW55KSA9PiB7XG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuZ2V0QmFsYW5jZSgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBleGVjdXRlRGVwb3NpdChkZXBvc2l0OiBEZXBvc2l0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5zYXZlKCcvZGVwb3NpdCcsIGRlcG9zaXQpLnBpcGUoXG4gICAgICB0YXAoKHJlczogYW55KSA9PiB7XG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuZ2V0QmFsYW5jZSgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRCYWxhbmNlKCk6IHZvaWQge1xuICAgIHRoaXMuc2VhcmNoKCcvc3RhdGVtZW50P3BhZ2U9MCZzaXplPTEnLCB7IHBhZ2U6IDAsIHNpemU6IDEgfSkuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgIHRoaXMuc3ViamVjdC5uZXh0KHJlc3VsdC5jb250ZW50LmJhbGFuY2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=