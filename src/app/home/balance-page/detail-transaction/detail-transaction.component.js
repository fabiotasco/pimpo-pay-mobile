"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("@angular/router");
var variables_1 = require("~/app/utils/variables");
var router_2 = require("nativescript-angular/router");
var trasaction_service_1 = require("~/app/services/trasaction.service");
var dialogs_1 = require("tns-core-modules/ui/dialogs/dialogs");
var toast_helper_service_1 = require("~/app/core/toast-helper.service");
var DetailTransactionComponent = /** @class */ (function () {
    function DetailTransactionComponent(page, activetadRoute, router, trasactionService, toast) {
        this.page = page;
        this.activetadRoute = activetadRoute;
        this.router = router;
        this.trasactionService = trasactionService;
        this.toast = toast;
        this.transactionStatus = variables_1.TransactionStatus;
    }
    DetailTransactionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activetadRoute.queryParams.subscribe(function (params) {
            _this.transaction = JSON.parse(params['transaction']);
        });
    };
    DetailTransactionComponent.prototype.goBack = function () {
        this.router.back();
    };
    DetailTransactionComponent.prototype.cancelTransaction = function (event) {
        var _this = this;
        var btnView = this.page.getViewById('btnCancel');
        btnView.animate({ scale: { x: 0.9, y: 0.9 }, duration: 100 }).then(function () {
            btnView.animate({ scale: { x: 1, y: 1 }, duration: 100 });
        });
        var options = {
            cancelButtonText: 'Voltar',
            message: 'Cancelar Transaçao',
            title: 'Transação',
            okButtonText: 'Confirmar',
            cancelable: false
        };
        dialogs_1.confirm(options).then(function (res) {
            if (res) {
                _this.trasactionService
                    .executeCancel(_this.transaction.id)
                    .subscribe(function (res) {
                    if (res.success) {
                        _this.toast.showToast('Transaçao Cancelada');
                        _this.router.back();
                        return;
                    }
                    _this.toast.showToast(res.errors[0].code + ' - ' + res.errors[0].message);
                });
            }
        });
    };
    DetailTransactionComponent.prototype.getTransactionStatusColor = function (status) {
        var colors = {
            AUTHORIZED: '#004c99',
            /** Negada */
            DENIED: '#cc0000',
            /** Cancelada */
            CANCELLED: '#cc0000',
            /** Liquidada */
            SETTLED: '#009900',
            /** Disputada */
            DISPUTED: 'DISPUTED',
            /** Disputa respondida */
            DISPUTE_RESPONDED: 'DISPUTE_RESPONDED'
        };
        return colors[status.toLocaleUpperCase()];
    };
    DetailTransactionComponent.prototype.getTransactionName = function (status) {
        var colors = {
            AUTHORIZED: 'Autorizado',
            /** Negada */
            DENIED: 'Negada',
            /** Cancelada */
            CANCELLED: 'Cancelada',
            /** Liquidada */
            SETTLED: 'Liquidada',
            /** Disputada */
            DISPUTED: 'Disputada',
            /** Disputa respondida */
            DISPUTE_RESPONDED: 'Disputa respondida'
        };
        return colors[status.toUpperCase()];
    };
    DetailTransactionComponent = __decorate([
        core_1.Component({
            selector: 'ns-detail-transaction',
            templateUrl: './detail-transaction.component.html',
            styleUrls: ['./detail-transaction.component.css'],
            moduleId: module.id
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.ActivatedRoute,
            router_2.RouterExtensions,
            trasaction_service_1.TransactionService,
            toast_helper_service_1.ToastHelperService])
    ], DetailTransactionComponent);
    return DetailTransactionComponent;
}());
exports.DetailTransactionComponent = DetailTransactionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLXRyYW5zYWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRldGFpbC10cmFuc2FjdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0RBQTJEO0FBQzNELDBDQUFpRDtBQUVqRCxtREFBMEQ7QUFDMUQsc0RBQStEO0FBRS9ELHdFQUF1RTtBQUN2RSwrREFBOEU7QUFDOUUsd0VBQXFFO0FBUXJFO0lBR0Usb0NBQ1UsSUFBVSxFQUNWLGNBQThCLEVBQzlCLE1BQXdCLEVBQ3hCLGlCQUFxQyxFQUNyQyxLQUF5QjtRQUp6QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBb0I7UUFDckMsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFObkMsc0JBQWlCLEdBQUcsNkJBQWlCLENBQUM7SUFPbkMsQ0FBQztJQUVKLDZDQUFRLEdBQVI7UUFBQSxpQkFJQztRQUhDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDOUMsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDJDQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxzREFBaUIsR0FBakIsVUFBa0IsS0FBVTtRQUE1QixpQkE4QkM7UUE3QkMsSUFBTSxPQUFPLEdBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxF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IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlLCBWaWV3IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICd+L2FwcC9tb2RlbHMvdHJhbnNhY3Rpb24nO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25TdGF0dXMgfSBmcm9tICd+L2FwcC91dGlscy92YXJpYWJsZXMnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFRyYW5zYWN0aW9uU2VydmljZSB9IGZyb20gJ34vYXBwL3NlcnZpY2VzL3RyYXNhY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBDb25maXJtT3B0aW9ucywgY29uZmlybSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9ncy9kaWFsb2dzJztcbmltcG9ydCB7IFRvYXN0SGVscGVyU2VydmljZSB9IGZyb20gJ34vYXBwL2NvcmUvdG9hc3QtaGVscGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1kZXRhaWwtdHJhbnNhY3Rpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vZGV0YWlsLXRyYW5zYWN0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZGV0YWlsLXRyYW5zYWN0aW9uLmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZFxufSlcbmV4cG9ydCBjbGFzcyBEZXRhaWxUcmFuc2FjdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbjtcbiAgdHJhbnNhY3Rpb25TdGF0dXMgPSBUcmFuc2FjdGlvblN0YXR1cztcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgYWN0aXZldGFkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHByaXZhdGUgdHJhc2FjdGlvblNlcnZpY2U6IFRyYW5zYWN0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHRvYXN0OiBUb2FzdEhlbHBlclNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWN0aXZldGFkUm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICB0aGlzLnRyYW5zYWN0aW9uID0gSlNPTi5wYXJzZShwYXJhbXNbJ3RyYW5zYWN0aW9uJ10pO1xuICAgIH0pO1xuICB9XG5cbiAgZ29CYWNrKCk6IHZvaWQge1xuICAgIHRoaXMucm91dGVyLmJhY2soKTtcbiAgfVxuXG4gIGNhbmNlbFRyYW5zYWN0aW9uKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBidG5WaWV3OiBWaWV3ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdidG5DYW5jZWwnKTtcbiAgICBidG5WaWV3LmFuaW1hdGUoeyBzY2FsZTogeyB4OiAwLjksIHk6IDAuOSB9LCBkdXJhdGlvbjogMTAwIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgYnRuVmlldy5hbmltYXRlKHsgc2NhbGU6IHsgeDogMSwgeTogMSB9LCBkdXJhdGlvbjogMTAwIH0pO1xuICAgIH0pO1xuICAgIGNvbnN0IG9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ1ZvbHRhcicsXG4gICAgICBtZXNzYWdlOiAnQ2FuY2VsYXIgVHJhbnNhw6dhbycsXG4gICAgICB0aXRsZTogJ1RyYW5zYcOnw6NvJyxcbiAgICAgIG9rQnV0dG9uVGV4dDogJ0NvbmZpcm1hcicsXG4gICAgICBjYW5jZWxhYmxlOiBmYWxzZVxuICAgIH07XG5cbiAgICBjb25maXJtKG9wdGlvbnMpLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgdGhpcy50cmFzYWN0aW9uU2VydmljZVxuICAgICAgICAgIC5leGVjdXRlQ2FuY2VsKHRoaXMudHJhbnNhY3Rpb24uaWQpXG4gICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgIHRoaXMudG9hc3Quc2hvd1RvYXN0KCdUcmFuc2HDp2FvIENhbmNlbGFkYScpO1xuICAgICAgICAgICAgICB0aGlzLnJvdXRlci5iYWNrKCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50b2FzdC5zaG93VG9hc3QoXG4gICAgICAgICAgICAgIHJlcy5lcnJvcnNbMF0uY29kZSArICcgLSAnICsgcmVzLmVycm9yc1swXS5tZXNzYWdlXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0VHJhbnNhY3Rpb25TdGF0dXNDb2xvcihzdGF0dXM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgY29sb3JzID0ge1xuICAgICAgQVVUSE9SSVpFRDogJyMwMDRjOTknLFxuICAgICAgLyoqIE5lZ2FkYSAqL1xuICAgICAgREVOSUVEOiAnI2NjMDAwMCcsXG5cbiAgICAgIC8qKiBDYW5jZWxhZGEgKi9cbiAgICAgIENBTkNFTExFRDogJyNjYzAwMDAnLFxuXG4gICAgICAvKiogTGlxdWlkYWRhICovXG4gICAgICBTRVRUTEVEOiAnIzAwOTkwMCcsXG5cbiAgICAgIC8qKiBEaXNwdXRhZGEgKi9cbiAgICAgIERJU1BVVEVEOiAnRElTUFVURUQnLFxuXG4gICAgICAvKiogRGlzcHV0YSByZXNwb25kaWRhICovXG4gICAgICBESVNQVVRFX1JFU1BPTkRFRDogJ0RJU1BVVEVfUkVTUE9OREVEJ1xuICAgIH07XG5cbiAgICByZXR1cm4gY29sb3JzW3N0YXR1cy50b0xvY2FsZVVwcGVyQ2FzZSgpXTtcbiAgfVxuXG4gIGdldFRyYW5zYWN0aW9uTmFtZShzdGF0dXM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgY29sb3JzID0ge1xuICAgICAgQVVUSE9SSVpFRDogJ0F1dG9yaXphZG8nLFxuICAgICAgLyoqIE5lZ2FkYSAqL1xuICAgICAgREVOSUVEOiAnTmVnYWRhJyxcblxuICAgICAgLyoqIENhbmNlbGFkYSAqL1xuICAgICAgQ0FOQ0VMTEVEOiAnQ2FuY2VsYWRhJyxcblxuICAgICAgLyoqIExpcXVpZGFkYSAqL1xuICAgICAgU0VUVExFRDogJ0xpcXVpZGFkYScsXG5cbiAgICAgIC8qKiBEaXNwdXRhZGEgKi9cbiAgICAgIERJU1BVVEVEOiAnRGlzcHV0YWRhJyxcblxuICAgICAgLyoqIERpc3B1dGEgcmVzcG9uZGlkYSAqL1xuICAgICAgRElTUFVURV9SRVNQT05ERUQ6ICdEaXNwdXRhIHJlc3BvbmRpZGEnXG4gICAgfTtcblxuICAgIHJldHVybiBjb2xvcnNbc3RhdHVzLnRvVXBwZXJDYXNlKCldO1xuICB9XG59XG4iXX0=