"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("@angular/router");
var variables_1 = require("~/app/utils/variables");
var trasaction_service_1 = require("~/app/services/trasaction.service");
var dialogs_1 = require("tns-core-modules/ui/dialogs/dialogs");
var toast_helper_service_1 = require("~/app/core/toast-helper.service");
var router_2 = require("nativescript-angular/router");
var DetailTransactionComponent = /** @class */ (function () {
    function DetailTransactionComponent(page, activetadRoute, router, trasactionService, toast) {
        this.page = page;
        this.activetadRoute = activetadRoute;
        this.router = router;
        this.trasactionService = trasactionService;
        this.toast = toast;
        this.transactionStatus = variables_1.TransactionStatus;
        this.isDeposit = false;
    }
    DetailTransactionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activetadRoute.queryParams.subscribe(function (params) {
            _this.transaction = JSON.parse(params['transaction']);
            _this.transactionType =
                _this.transaction.type === 'Deposit' ? 'Depósito' : 'Compra';
            _this.isDeposit = _this.transaction.type === 'Deposit';
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
            message: 'Cancelar Transação',
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
                    var error = {
                        message: 'Não foi possivel cancelar a transação',
                        title: res.errors[0].code,
                        okButtonText: 'Ok',
                        cancelable: false
                    };
                    dialogs_1.alert(error);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLXRyYW5zYWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRldGFpbC10cmFuc2FjdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0RBQTJEO0FBQzNELDBDQUFpRDtBQUVqRCxtREFBMEQ7QUFFMUQsd0VBQXVFO0FBQ3ZFLCtEQUs2QztBQUM3Qyx3RUFBcUU7QUFDckUsc0RBQStEO0FBUS9EO0lBTUUsb0NBQ1UsSUFBVSxFQUNWLGNBQThCLEVBQzlCLE1BQXdCLEVBQ3hCLGlCQUFxQyxFQUNyQyxLQUF5QjtRQUp6QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBb0I7UUFDckMsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFUbkMsc0JBQWlCLEdBQUcsNkJBQWlCLENBQUM7UUFFdEMsY0FBUyxHQUFHLEtBQUssQ0FBQztJQVFmLENBQUM7SUFFSiw2Q0FBUSxHQUFSO1FBQUEsaUJBUUM7UUFQQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQzlDLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUVyRCxLQUFJLENBQUMsZUFBZTtnQkFDbEIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUM5RCxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwyQ0FBTSxHQUFOO1FB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QUUsdUJBQXVCO1lBQ2pDLFdBQVcsRUFBRSxxQ0FBcUM7WUFDbEQsU0FBUyxFQUFFLENBQUMsb0NBQW9DLENBQUM7WUFDakQsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBUWdCLFdBQUk7WUFDTSx1QkFBYztZQUN0Qix5QkFBZ0I7WUFDTCx1Q0FBa0I7WUFDOUIseUNBQWtCO09BWHhCLDBCQUEwQixDQTRHdEM7SUFBRCxpQ0FBQztDQUFBLEFBNUdELElBNEdDO0FBNUdZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlLCBWaWV3IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICd+L2FwcC9tb2RlbHMvdHJhbnNhY3Rpb24nO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25TdGF0dXMgfSBmcm9tICd+L2FwcC91dGlscy92YXJpYWJsZXMnO1xuXG5pbXBvcnQgeyBUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy90cmFzYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIGNvbmZpcm0sXG4gIEFsZXJ0T3B0aW9ucyxcbiAgYWxlcnRcbn0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzL2RpYWxvZ3MnO1xuaW1wb3J0IHsgVG9hc3RIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS90b2FzdC1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtZGV0YWlsLXRyYW5zYWN0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RldGFpbC10cmFuc2FjdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2RldGFpbC10cmFuc2FjdGlvbi5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWRcbn0pXG5leHBvcnQgY2xhc3MgRGV0YWlsVHJhbnNhY3Rpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICB0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb247XG4gIHRyYW5zYWN0aW9uU3RhdHVzID0gVHJhbnNhY3Rpb25TdGF0dXM7XG4gIHRyYW5zYWN0aW9uVHlwZTogc3RyaW5nO1xuICBpc0RlcG9zaXQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSBhY3RpdmV0YWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHJpdmF0ZSB0cmFzYWN0aW9uU2VydmljZTogVHJhbnNhY3Rpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgdG9hc3Q6IFRvYXN0SGVscGVyU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hY3RpdmV0YWRSb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgIHRoaXMudHJhbnNhY3Rpb24gPSBKU09OLnBhcnNlKHBhcmFtc1sndHJhbnNhY3Rpb24nXSk7XG5cbiAgICAgIHRoaXMudHJhbnNhY3Rpb25UeXBlID1cbiAgICAgICAgdGhpcy50cmFuc2FjdGlvbi50eXBlID09PSAnRGVwb3NpdCcgPyAnRGVww7NzaXRvJyA6ICdDb21wcmEnO1xuICAgICAgdGhpcy5pc0RlcG9zaXQgPSB0aGlzLnRyYW5zYWN0aW9uLnR5cGUgPT09ICdEZXBvc2l0JztcbiAgICB9KTtcbiAgfVxuXG4gIGdvQmFjaygpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRlci5iYWNrKCk7XG4gIH1cblxuICBjYW5jZWxUcmFuc2FjdGlvbihldmVudDogYW55KTogdm9pZCB7XG4gICAgY29uc3QgYnRuVmlldzogVmlldyA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgnYnRuQ2FuY2VsJyk7XG4gICAgYnRuVmlldy5hbmltYXRlKHsgc2NhbGU6IHsgeDogMC45LCB5OiAwLjkgfSwgZHVyYXRpb246IDEwMCB9KS50aGVuKCgpID0+IHtcbiAgICAgIGJ0blZpZXcuYW5pbWF0ZSh7IHNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgZHVyYXRpb246IDEwMCB9KTtcbiAgICB9KTtcbiAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdWb2x0YXInLFxuICAgICAgbWVzc2FnZTogJ0NhbmNlbGFyIFRyYW5zYcOnw6NvJyxcbiAgICAgIHRpdGxlOiAnVHJhbnNhw6fDo28nLFxuICAgICAgb2tCdXR0b25UZXh0OiAnQ29uZmlybWFyJyxcbiAgICAgIGNhbmNlbGFibGU6IGZhbHNlXG4gICAgfTtcblxuICAgIGNvbmZpcm0ob3B0aW9ucykudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKHJlcykge1xuICAgICAgICB0aGlzLnRyYXNhY3Rpb25TZXJ2aWNlXG4gICAgICAgICAgLmV4ZWN1dGVDYW5jZWwodGhpcy50cmFuc2FjdGlvbi5pZClcbiAgICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgdGhpcy50b2FzdC5zaG93VG9hc3QoJ1RyYW5zYcOnYW8gQ2FuY2VsYWRhJyk7XG4gICAgICAgICAgICAgIHRoaXMucm91dGVyLmJhY2soKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBlcnJvcjogQWxlcnRPcHRpb25zID0ge1xuICAgICAgICAgICAgICBtZXNzYWdlOiAnTsOjbyBmb2kgcG9zc2l2ZWwgY2FuY2VsYXIgYSB0cmFuc2HDp8OjbycsXG4gICAgICAgICAgICAgIHRpdGxlOiByZXMuZXJyb3JzWzBdLmNvZGUsXG4gICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogJ09rJyxcbiAgICAgICAgICAgICAgY2FuY2VsYWJsZTogZmFsc2VcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldFRyYW5zYWN0aW9uU3RhdHVzQ29sb3Ioc3RhdHVzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNvbG9ycyA9IHtcbiAgICAgIEFVVEhPUklaRUQ6ICcjMDA0Yzk5JyxcbiAgICAgIC8qKiBOZWdhZGEgKi9cbiAgICAgIERFTklFRDogJyNjYzAwMDAnLFxuXG4gICAgICAvKiogQ2FuY2VsYWRhICovXG4gICAgICBDQU5DRUxMRUQ6ICcjY2MwMDAwJyxcblxuICAgICAgLyoqIExpcXVpZGFkYSAqL1xuICAgICAgU0VUVExFRDogJyMwMDk5MDAnLFxuXG4gICAgICAvKiogRGlzcHV0YWRhICovXG4gICAgICBESVNQVVRFRDogJ0RJU1BVVEVEJyxcblxuICAgICAgLyoqIERpc3B1dGEgcmVzcG9uZGlkYSAqL1xuICAgICAgRElTUFVURV9SRVNQT05ERUQ6ICdESVNQVVRFX1JFU1BPTkRFRCdcbiAgICB9O1xuXG4gICAgcmV0dXJuIGNvbG9yc1tzdGF0dXMudG9Mb2NhbGVVcHBlckNhc2UoKV07XG4gIH1cblxuICBnZXRUcmFuc2FjdGlvbk5hbWUoc3RhdHVzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNvbG9ycyA9IHtcbiAgICAgIEFVVEhPUklaRUQ6ICdBdXRvcml6YWRvJyxcbiAgICAgIC8qKiBOZWdhZGEgKi9cbiAgICAgIERFTklFRDogJ05lZ2FkYScsXG5cbiAgICAgIC8qKiBDYW5jZWxhZGEgKi9cbiAgICAgIENBTkNFTExFRDogJ0NhbmNlbGFkYScsXG5cbiAgICAgIC8qKiBMaXF1aWRhZGEgKi9cbiAgICAgIFNFVFRMRUQ6ICdMaXF1aWRhZGEnLFxuXG4gICAgICAvKiogRGlzcHV0YWRhICovXG4gICAgICBESVNQVVRFRDogJ0Rpc3B1dGFkYScsXG5cbiAgICAgIC8qKiBEaXNwdXRhIHJlc3BvbmRpZGEgKi9cbiAgICAgIERJU1BVVEVfUkVTUE9OREVEOiAnRGlzcHV0YSByZXNwb25kaWRhJ1xuICAgIH07XG5cbiAgICByZXR1cm4gY29sb3JzW3N0YXR1cy50b1VwcGVyQ2FzZSgpXTtcbiAgfVxufVxuIl19