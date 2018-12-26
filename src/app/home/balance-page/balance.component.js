"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var trasaction_service_1 = require("~/app/services/trasaction.service");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var BalancePageComponent = /** @class */ (function () {
    function BalancePageComponent(page, transactionService) {
        this.page = page;
        this.transactionService = transactionService;
    }
    BalancePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.actionBarHidden = true;
        this.transactionService.transactions$.subscribe(function (res) {
            _this.transactions$ = new observable_array_1.ObservableArray(res);
        });
    };
    BalancePageComponent.prototype.onItemLoad = function ($event) {
        console.log('Item Load', $event.object);
    };
    BalancePageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'BalancePage',
            templateUrl: './balance.component.html',
            styleUrls: ['./balance.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page, trasaction_service_1.TransactionService])
    ], BalancePageComponent);
    return BalancePageComponent;
}());
exports.BalancePageComponent = BalancePageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWxhbmNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBcUQ7QUFHckQsd0VBQXVFO0FBQ3ZFLDRGQUEwRjtBQVExRjtJQUdFLDhCQUFvQixJQUFVLEVBQVUsa0JBQXNDO1FBQTFELFNBQUksR0FBSixJQUFJLENBQU07UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBQUcsQ0FBQztJQUVsRix1Q0FBUSxHQUFSO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ2pELEtBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHlDQUFVLEdBQVYsVUFBVyxNQUFNO1FBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFkVSxvQkFBb0I7UUFOaEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ3ZDLENBQUM7eUNBSTBCLFdBQUksRUFBOEIsdUNBQWtCO09BSG5FLG9CQUFvQixDQWVoQztJQUFELDJCQUFDO0NBQUEsQUFmRCxJQWVDO0FBZlksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ34vYXBwL21vZGVscy90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy90cmFzYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ0JhbGFuY2VQYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2JhbGFuY2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9iYWxhbmNlLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBCYWxhbmNlUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHRyYW5zYWN0aW9ucyQ6IE9ic2VydmFibGVBcnJheTxUcmFuc2FjdGlvbj47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIHRyYW5zYWN0aW9uU2VydmljZTogVHJhbnNhY3Rpb25TZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIHRoaXMudHJhbnNhY3Rpb25TZXJ2aWNlLnRyYW5zYWN0aW9ucyQuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICB0aGlzLnRyYW5zYWN0aW9ucyQgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KHJlcyk7XG4gICAgfSk7XG4gIH1cblxuICBvbkl0ZW1Mb2FkKCRldmVudCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdJdGVtIExvYWQnLCAkZXZlbnQub2JqZWN0KTtcbiAgfVxufVxuIl19