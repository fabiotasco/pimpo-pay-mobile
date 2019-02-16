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
            _this.router.navigate(["detail"], {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWxhbmNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBMkQ7QUFFM0Qsd0VBQXVFO0FBR3ZFLHFEQUF1RDtBQUN2RCxzREFBK0Q7QUFRL0Q7SUFLRSw4QkFDVSxJQUFVLEVBQ1Ysa0JBQXNDLEVBQ3RDLE1BQXdCO1FBRnhCLFNBQUksR0FBSixJQUFJLENBQU07UUFDVix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBTGxDLFVBQUssR0FBVSxFQUFFLENBQUM7SUFNZixDQUFDO0lBRUosdUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQztRQUMvRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUM7SUFDN0QsQ0FBQztJQUVELHlDQUFVLEdBQVYsVUFBVyxNQUFNO1FBQ2YsSUFBTSxJQUFJLEdBQWEsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUN2QyxDQUFDO0lBRUQsZ0RBQWlCLEdBQWpCLFVBQWtCLEtBQWE7UUFDN0IsT0FBTzthQUNKLE9BQU8sQ0FBQztZQUNQLEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsT0FBTyxFQUFFLDJDQUEyQztZQUNwRCxZQUFZLEVBQUUsS0FBSztZQUNuQixnQkFBZ0IsRUFBRSxVQUFVO1NBQzdCLENBQUM7YUFDRCxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1YsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO2FBQ2pFO2lCQUFNO2FBQ047UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxpREFBa0IsR0FBbEIsVUFBbUIsSUFBWTtRQUM3QixJQUFNLEtBQUssR0FBRztZQUNaLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLE9BQU8sRUFBRSxVQUFVO1NBQ3BCLENBQUM7UUFFRixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsNkNBQWMsR0FBZCxVQUFlLE9BQWU7UUFDNUIsSUFBTSxZQUFZLEdBQUc7WUFDbkIsT0FBTyxFQUFFLFFBQVE7WUFDakIsTUFBTSxFQUFFLFNBQVM7U0FDbEIsQ0FBQztRQUVGLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCx3Q0FBUyxHQUFULFVBQVUsS0FBVSxFQUFFLElBQWlCO1FBQXZDLGlCQVlDO1FBWEMsSUFBTSxJQUFJLEdBQVMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUU5QixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzlELElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN2RCxJQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDL0IsV0FBVyxFQUFFO29CQUNYLFdBQVcsRUFBRSxpQkFBaUI7aUJBQy9CO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBbEVVLG9CQUFvQjtRQU5oQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDdkMsQ0FBQzt5Q0FPZ0IsV0FBSTtZQUNVLHVDQUFrQjtZQUM5Qix5QkFBZ0I7T0FSdkIsb0JBQW9CLENBbUVoQztJQUFELDJCQUFDO0NBQUEsQUFuRUQsSUFtRUM7QUFuRVksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGFnZSwgVmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZVwiO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tIFwifi9hcHAvbW9kZWxzL3RyYW5zYWN0aW9uXCI7XG5pbXBvcnQgeyBUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tIFwifi9hcHAvc2VydmljZXMvdHJhc2FjdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IExpc3RWaWV3IH0gZnJvbSBcInVpL2xpc3Qtdmlld1wiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6IFwiQmFsYW5jZVBhZ2VcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9iYWxhbmNlLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9iYWxhbmNlLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQmFsYW5jZVBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICB0cmFuc2FjdGlvbnMkOiBPYnNlcnZhYmxlPFRyYW5zYWN0aW9uW10+O1xuICBhY2NvdW50QmFsYW5jZSQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgbGlzdGE6IGFueVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgdHJhbnNhY3Rpb25TZXJ2aWNlOiBUcmFuc2FjdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnNcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWNjb3VudEJhbGFuY2UkID0gdGhpcy50cmFuc2FjdGlvblNlcnZpY2UuYWNjb3VudEJhbGFuY2UkO1xuICAgIHRoaXMudHJhbnNhY3Rpb25zJCA9IHRoaXMudHJhbnNhY3Rpb25TZXJ2aWNlLnRyYW5zYWN0aW9ucyQ7XG4gIH1cblxuICBvbkl0ZW1Mb2FkKCRldmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHZpZXc6IExpc3RWaWV3ID0gJGV2ZW50Lm9iamVjdDtcbiAgfVxuXG4gIGNhbmNlbFRyYW5zYWN0aW9uKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBkaWFsb2dzXG4gICAgICAuY29uZmlybSh7XG4gICAgICAgIHRpdGxlOiBcIkNhbmNlbGFyIFRyYW5zYcOnw6NvXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiRGVzZWphIHJlYWxtZW50ZSBjYW5jZWxhciBlc3RhIHRyYW5zYcOnw6NvP1wiLFxuICAgICAgICBva0J1dHRvblRleHQ6IFwiU2ltXCIsXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsYXJcIlxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICBkaWFsb2dzLmFsZXJ0KFwiVHJhbnNhw6fDo28gZm9pIGNhbmNlbGFkYSBlIHNldSBzYWxkbyBhdHVhbGl6YWRvXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIGdldFRyYW5zYWN0aW9uVHlwZSh0eXBlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB0eXBlcyA9IHtcbiAgICAgIFB1cmNoYXNlOiBcIkNvbXByYVwiLFxuICAgICAgRGVwb3NpdDogXCJEZXDDs3NpdG9cIlxuICAgIH07XG5cbiAgICByZXR1cm4gdHlwZXNbdHlwZV07XG4gIH1cblxuICBnZXRQYXltZW50VHlwZShwYXltZW50OiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYXltZW50VHlwZXMgPSB7XG4gICAgICBQcmVwYWlkOiBcIkTDqWJpdG9cIixcbiAgICAgIENyZWRpdDogXCJDcsOpZGl0b1wiXG4gICAgfTtcblxuICAgIHJldHVybiBwYXltZW50VHlwZXNbcGF5bWVudF07XG4gIH1cblxuICBvbkl0ZW1UYXAoZXZlbnQ6IGFueSwgaXRlbTogVHJhbnNhY3Rpb24pOiB2b2lkIHtcbiAgICBjb25zdCB2aWV3OiBWaWV3ID0gZXZlbnQudmlldztcblxuICAgIHZpZXcuYW5pbWF0ZSh7IHNjYWxlOiB7IHg6IDEuMSwgeTogMS4xIH0sIGR1cmF0aW9uOiAxMDAgfSkudGhlbigoKSA9PiB7XG4gICAgICB2aWV3LmFuaW1hdGUoeyBzY2FsZTogeyB4OiAxLCB5OiAxIH0sIGR1cmF0aW9uOiAxMDAgfSk7XG4gICAgICBjb25zdCB0cmFuc2FjdGlvblN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGl0ZW0pO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiZGV0YWlsXCJdLCB7XG4gICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgdHJhbnNhY3Rpb246IHRyYW5zYWN0aW9uU3RyaW5nXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=