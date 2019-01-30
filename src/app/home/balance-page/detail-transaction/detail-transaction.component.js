"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("@angular/router");
var DetailTransactionComponent = /** @class */ (function () {
    function DetailTransactionComponent(page, activetadRoute) {
        this.page = page;
        this.activetadRoute = activetadRoute;
    }
    DetailTransactionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activetadRoute.queryParams.subscribe(function (params) {
            _this.transaction = JSON.parse(params["transaction"]);
        });
    };
    DetailTransactionComponent = __decorate([
        core_1.Component({
            selector: "ns-detail-transaction",
            templateUrl: "./detail-transaction.component.html",
            styleUrls: ["./detail-transaction.component.css"],
            moduleId: module.id
        }),
        __metadata("design:paramtypes", [page_1.Page, router_1.ActivatedRoute])
    ], DetailTransactionComponent);
    return DetailTransactionComponent;
}());
exports.DetailTransactionComponent = DetailTransactionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLXRyYW5zYWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRldGFpbC10cmFuc2FjdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0RBQXFEO0FBQ3JELDBDQUFpRDtBQVNqRDtJQUdFLG9DQUFvQixJQUFVLEVBQVUsY0FBOEI7UUFBbEQsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUFHLENBQUM7SUFFMUUsNkNBQVEsR0FBUjtRQUFBLGlCQUlDO1FBSEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUM5QyxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBVFUsMEJBQTBCO1FBTnRDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFdBQVcsRUFBRSxxQ0FBcUM7WUFDbEQsU0FBUyxFQUFFLENBQUMsb0NBQW9DLENBQUM7WUFDakQsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBSTBCLFdBQUksRUFBMEIsdUJBQWM7T0FIM0QsMEJBQTBCLENBVXRDO0lBQUQsaUNBQUM7Q0FBQSxBQVZELElBVUM7QUFWWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFRyYW5zYWN0aW9uIH0gZnJvbSBcIn4vYXBwL21vZGVscy90cmFuc2FjdGlvblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibnMtZGV0YWlsLXRyYW5zYWN0aW9uXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vZGV0YWlsLXRyYW5zYWN0aW9uLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9kZXRhaWwtdHJhbnNhY3Rpb24uY29tcG9uZW50LmNzc1wiXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZFxufSlcbmV4cG9ydCBjbGFzcyBEZXRhaWxUcmFuc2FjdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgYWN0aXZldGFkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWN0aXZldGFkUm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICB0aGlzLnRyYW5zYWN0aW9uID0gSlNPTi5wYXJzZShwYXJhbXNbXCJ0cmFuc2FjdGlvblwiXSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==