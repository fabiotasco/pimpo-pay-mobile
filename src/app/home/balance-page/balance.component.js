"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var trasaction_service_1 = require("~/app/services/trasaction.service");
var dialogs = require("tns-core-modules/ui/dialogs");
var router_1 = require("nativescript-angular/router");
var BalancePageComponent = /** @class */ (function () {
    function BalancePageComponent(page, transactionService, router) {
        this.page = page;
        this.transactionService = transactionService;
        this.router = router;
        this.lista = [];
    }
    BalancePageComponent.prototype.ngOnInit = function () {
        this.accountBalance$ = this.transactionService.accountBalance$;
        this.transactions$ = this.transactionService.transactions$;
    };
    BalancePageComponent.prototype.onItemLoad = function ($event) {
        var view = $event.object;
    };
    BalancePageComponent.prototype.cancelTransaction = function (index) {
        dialogs
            .confirm({
            title: "Cancelar Transação",
            message: "Deseja realmente cancelar esta transação?",
            okButtonText: "Sim",
            cancelButtonText: "Cancelar"
        })
            .then(function (result) {
            if (result) {
                dialogs.alert("Transação foi cancelada e seu saldo atualizado");
            }
            else {
            }
        });
    };
    BalancePageComponent.prototype.getTransactionType = function (type) {
        var types = {
            Purchase: "Compra",
            Deposit: "Depósito"
        };
        return types[type];
    };
    BalancePageComponent.prototype.getPaymentType = function (payment) {
        var paymentTypes = {
            Prepaid: "Débito",
            Credit: "Crédito"
        };
        return paymentTypes[payment];
    };
    BalancePageComponent.prototype.onItemTap = function (event, item) {
        var _this = this;
        var view = event.view;
        view.animate({ scale: { x: 1.1, y: 1.1 }, duration: 100 }).then(function () {
            view.animate({ scale: { x: 1, y: 1 }, duration: 100 });
            var transactionString = JSON.stringify(item);
            _this.router.navigate(["home/balance/detail"], {
                queryParams: {
                    transaction: transactionString
                }
            });
        });
    };
    BalancePageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "BalancePage",
            templateUrl: "./balance.component.html",
            styleUrls: ["./balance.component.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page,
            trasaction_service_1.TransactionService,
            router_1.RouterExtensions])
    ], BalancePageComponent);
    return BalancePageComponent;
}());
exports.BalancePageComponent = BalancePageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWxhbmNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBMkQ7QUFFM0Qsd0VBQXVFO0FBR3ZFLHFEQUF1RDtBQUN2RCxzREFBK0Q7QUFRL0Q7SUFLRSw4QkFDVSxJQUFVLEVBQ1Ysa0JBQXNDLEVBQ3RDLE1BQXdCO1FBRnhCLFNBQUksR0FBSixJQUFJLENBQU07UUFDVix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBTGxDLFVBQUssR0FBVSxFQUFFLENBQUM7SUFNZixDQUFDO0lBRUosdUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQztRQUMvRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUM7SUFDN0QsQ0FBQztJQUVELHlDQUFVLEdBQVYsVUFBVyxNQUFNO1FBQ2YsSUFBTSxJQUFJLEdBQWEsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUN2QyxDQUFDO0lBRUQsZ0RBQWlCLEdBQWpCLFVBQWtCLEtBQWE7UUFDN0IsT0FBTzthQUNKLE9BQU8sQ0FBQztZQUNQLEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsT0FBTyxFQUFFLDJDQUEyQztZQUNwRCxZQUFZLEVBQUUsS0FBSztZQUNuQixnQkFBZ0IsRUFBRSxVQUFVO1NBQzdCLENBQUM7YUFDRCxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1YsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO2FBQ2pFO2lCQUFNO2FBQ047UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxpREFBa0IsR0FBbEIsVUFBbUIsSUFBWTtRQUM3QixJQUFNLEtBQUssR0FBRztZQUNaLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLE9BQU8sRUFBRSxVQUFVO1NBQ3BCLENBQUM7UUFFRixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsNkNBQWMsR0FBZCxVQUFlLE9BQWU7UUFDNUIsSUFBTSxZQUFZLEdBQUc7WUFDbkIsT0FBTyxFQUFFLFFBQVE7WUFDakIsTUFBTSxFQUFFLFNBQVM7U0FDbEIsQ0FBQztRQUVGLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCx3Q0FBUyxHQUFULFVBQVUsS0FBVSxFQUFFLElBQWlCO1FBQXZDLGlCQVlDO1FBWEMsSUFBTSxJQUFJLEdBQVMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUU5QixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzlELElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN2RCxJQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO2dCQUM1QyxXQUFXLEVBQUU7b0JBQ1gsV0FBVyxFQUFFLGlCQUFpQjtpQkFDL0I7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFsRVUsb0JBQW9CO1FBTmhDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUN2QyxDQUFDO3lDQU9nQixXQUFJO1lBQ1UsdUNBQWtCO1lBQzlCLHlCQUFnQjtPQVJ2QixvQkFBb0IsQ0FtRWhDO0lBQUQsMkJBQUM7Q0FBQSxBQW5FRCxJQW1FQztBQW5FWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQYWdlLCBWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlXCI7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gXCJ+L2FwcC9tb2RlbHMvdHJhbnNhY3Rpb25cIjtcbmltcG9ydCB7IFRyYW5zYWN0aW9uU2VydmljZSB9IGZyb20gXCJ+L2FwcC9zZXJ2aWNlcy90cmFzYWN0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tIFwidWkvbGlzdC12aWV3XCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogXCJCYWxhbmNlUGFnZVwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2JhbGFuY2UuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2JhbGFuY2UuY29tcG9uZW50LmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBCYWxhbmNlUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHRyYW5zYWN0aW9ucyQ6IE9ic2VydmFibGU8VHJhbnNhY3Rpb25bXT47XG4gIGFjY291bnRCYWxhbmNlJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBsaXN0YTogYW55W10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvblNlcnZpY2U6IFRyYW5zYWN0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9uc1xuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hY2NvdW50QmFsYW5jZSQgPSB0aGlzLnRyYW5zYWN0aW9uU2VydmljZS5hY2NvdW50QmFsYW5jZSQ7XG4gICAgdGhpcy50cmFuc2FjdGlvbnMkID0gdGhpcy50cmFuc2FjdGlvblNlcnZpY2UudHJhbnNhY3Rpb25zJDtcbiAgfVxuXG4gIG9uSXRlbUxvYWQoJGV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgdmlldzogTGlzdFZpZXcgPSAkZXZlbnQub2JqZWN0O1xuICB9XG5cbiAgY2FuY2VsVHJhbnNhY3Rpb24oaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGRpYWxvZ3NcbiAgICAgIC5jb25maXJtKHtcbiAgICAgICAgdGl0bGU6IFwiQ2FuY2VsYXIgVHJhbnNhw6fDo29cIixcbiAgICAgICAgbWVzc2FnZTogXCJEZXNlamEgcmVhbG1lbnRlIGNhbmNlbGFyIGVzdGEgdHJhbnNhw6fDo28/XCIsXG4gICAgICAgIG9rQnV0dG9uVGV4dDogXCJTaW1cIixcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxhclwiXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoXCJUcmFuc2HDp8OjbyBmb2kgY2FuY2VsYWRhIGUgc2V1IHNhbGRvIGF0dWFsaXphZG9cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgZ2V0VHJhbnNhY3Rpb25UeXBlKHR5cGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHR5cGVzID0ge1xuICAgICAgUHVyY2hhc2U6IFwiQ29tcHJhXCIsXG4gICAgICBEZXBvc2l0OiBcIkRlcMOzc2l0b1wiXG4gICAgfTtcblxuICAgIHJldHVybiB0eXBlc1t0eXBlXTtcbiAgfVxuXG4gIGdldFBheW1lbnRUeXBlKHBheW1lbnQ6IHN0cmluZykge1xuICAgIGNvbnN0IHBheW1lbnRUeXBlcyA9IHtcbiAgICAgIFByZXBhaWQ6IFwiRMOpYml0b1wiLFxuICAgICAgQ3JlZGl0OiBcIkNyw6lkaXRvXCJcbiAgICB9O1xuXG4gICAgcmV0dXJuIHBheW1lbnRUeXBlc1twYXltZW50XTtcbiAgfVxuXG4gIG9uSXRlbVRhcChldmVudDogYW55LCBpdGVtOiBUcmFuc2FjdGlvbik6IHZvaWQge1xuICAgIGNvbnN0IHZpZXc6IFZpZXcgPSBldmVudC52aWV3O1xuXG4gICAgdmlldy5hbmltYXRlKHsgc2NhbGU6IHsgeDogMS4xLCB5OiAxLjEgfSwgZHVyYXRpb246IDEwMCB9KS50aGVuKCgpID0+IHtcbiAgICAgIHZpZXcuYW5pbWF0ZSh7IHNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgZHVyYXRpb246IDEwMCB9KTtcbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoaXRlbSk7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJob21lL2JhbGFuY2UvZGV0YWlsXCJdLCB7XG4gICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgdHJhbnNhY3Rpb246IHRyYW5zYWN0aW9uU3RyaW5nXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=