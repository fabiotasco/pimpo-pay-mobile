"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var LoadingService = /** @class */ (function () {
    function LoadingService() {
        this.loadingSubject = new rxjs_1.BehaviorSubject(false);
        this.$isLoading = this.loadingSubject.asObservable();
    }
    LoadingService.prototype.show = function () {
        if (!this.loadingSubject.getValue()) {
            this.loadingSubject.next(true);
        }
    };
    LoadingService.prototype.hide = function () {
        if (this.loadingSubject.getValue()) {
            this.loadingSubject.next(false);
        }
    };
    LoadingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], LoadingService);
    return LoadingService;
}());
exports.LoadingService = LoadingService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9hZGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDZCQUFtRDtBQUduRDtJQUlFO1FBSFEsbUJBQWMsR0FBRyxJQUFJLHNCQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFDN0QsZUFBVSxHQUF3QixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBRXRELENBQUM7SUFFVCw2QkFBSSxHQUFYO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBRU0sNkJBQUksR0FBWDtRQUNFLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUM7SUFoQlUsY0FBYztRQUQxQixpQkFBVSxFQUFFOztPQUNBLGNBQWMsQ0FpQjFCO0lBQUQscUJBQUM7Q0FBQSxBQWpCRCxJQWlCQztBQWpCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9hZGluZ1NlcnZpY2Uge1xuICBwcml2YXRlIGxvYWRpbmdTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICRpc0xvYWRpbmc6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLmxvYWRpbmdTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBwdWJsaWMgc2hvdygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubG9hZGluZ1N1YmplY3QuZ2V0VmFsdWUoKSkge1xuICAgICAgdGhpcy5sb2FkaW5nU3ViamVjdC5uZXh0KHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxvYWRpbmdTdWJqZWN0LmdldFZhbHVlKCkpIHtcbiAgICAgIHRoaXMubG9hZGluZ1N1YmplY3QubmV4dChmYWxzZSk7XG4gICAgfVxuICB9XG59XG4iXX0=