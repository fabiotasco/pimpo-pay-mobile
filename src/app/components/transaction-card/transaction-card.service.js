"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var TransactionCardService = /** @class */ (function () {
    function TransactionCardService() {
        this.partOpenSubject = new rxjs_1.BehaviorSubject('amount');
        this.$partOpen = this.partOpenSubject.asObservable();
    }
    TransactionCardService.prototype.open = function (part) {
        this.partOpenSubject.next(part);
    };
    TransactionCardService.prototype.closeAll = function () {
        this.partOpenSubject.next(null);
    };
    TransactionCardService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], TransactionCardService);
    return TransactionCardService;
}());
exports.TransactionCardService = TransactionCardService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24tY2FyZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhbnNhY3Rpb24tY2FyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDZCQUFtRDtBQUtuRDtJQUlFO1FBSFEsb0JBQWUsR0FBRyxJQUFJLHNCQUFlLENBQVMsUUFBUSxDQUFDLENBQUM7UUFDekQsY0FBUyxHQUF1QixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBRTVELENBQUM7SUFFVCxxQ0FBSSxHQUFYLFVBQVksSUFBWTtRQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0seUNBQVEsR0FBZjtRQUNFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFaVSxzQkFBc0I7UUFIbEMsaUJBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7O09BQ1csc0JBQXNCLENBYWxDO0lBQUQsNkJBQUM7Q0FBQSxBQWJELElBYUM7QUFiWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVHJhbnNhY3Rpb25DYXJkU2VydmljZSB7XG4gIHByaXZhdGUgcGFydE9wZW5TdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdhbW91bnQnKTtcbiAgcHVibGljICRwYXJ0T3BlbjogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5wYXJ0T3BlblN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHB1YmxpYyBvcGVuKHBhcnQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucGFydE9wZW5TdWJqZWN0Lm5leHQocGFydCk7XG4gIH1cblxuICBwdWJsaWMgY2xvc2VBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5wYXJ0T3BlblN1YmplY3QubmV4dChudWxsKTtcbiAgfVxufVxuIl19