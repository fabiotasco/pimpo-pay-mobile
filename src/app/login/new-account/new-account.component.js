"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var toast_helper_service_1 = require("~/app/core/toast-helper.service");
var account_service_1 = require("~/app/services/account.service");
var router_1 = require("nativescript-angular/router");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var forms_1 = require("@angular/forms");
var loading_service_1 = require("~/app/services/loading.service");
var NewAccountComponent = /** @class */ (function () {
    function NewAccountComponent(page, toast, accountService, loadingService, router, fb) {
        this.page = page;
        this.toast = toast;
        this.accountService = accountService;
        this.loadingService = loadingService;
        this.router = router;
        this.fb = fb;
        this.isSubmit = false;
        this.isLoading = false;
        this.passwordMismatch = true;
    }
    Object.defineProperty(NewAccountComponent.prototype, "fc", {
        get: function () {
            return this.enrolForm.controls;
        },
        enumerable: true,
        configurable: true
    });
    NewAccountComponent.prototype.ngOnInit = function () {
        this.$isLoading = this.loadingService.$isLoading;
        this.generateOperatorList();
        this.enrolForm = this.fb.group({
            networkOperator: ['Claro', forms_1.Validators.required],
            number: ['', forms_1.Validators.required],
            type: ['CPF', forms_1.Validators.required],
            value: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
    };
    NewAccountComponent.prototype.ngAfterViewInit = function () {
        this.generateOperatorList();
        this.generateDocumentTypeList();
    };
    NewAccountComponent.prototype.doEnroll = function () {
        var _this = this;
        this.isSubmit = true;
        if (this.enrolForm.invalid || this.passwordMismatch) {
            this.toast.showToast('Dados preenchidos incorretamente.');
            return;
        }
        var enroll = this.mountEnroll(this.enrolForm.value);
        this.loadingService.show();
        this.accountService.saveRegister(enroll).subscribe(function (res) {
            if (res.success) {
                _this.loadingService.hide();
                _this.toast.showToast('Conta cadastrada com sucesso');
                _this.router.back();
                return;
            }
            _this.loadingService.hide();
            _this.toast.showToast(res.errors[0].message);
        }, function (err) {
            _this.toast.showToast('Ouve um problema no servidor, tente novamente');
            _this.loadingService.hide();
        });
    };
    NewAccountComponent.prototype.mountEnroll = function (value) {
        var enroll = {
            document: {
                value: value.value,
                type: value.type
            },
            phone: {
                networkOperator: value.networkOperator,
                number: '+55' + value.number
            },
            password: value.password
        };
        return enroll;
    };
    NewAccountComponent.prototype.selectDocumentType = function (event) {
        this.enrolForm.patchValue({
            type: this.documentTypeList.getValue(event.newIndex)
        });
    };
    NewAccountComponent.prototype.selectNetworkOperator = function (event) {
        this.enrolForm.patchValue({
            networkOperator: this.operatorsList.getValue(event.newIndex)
        });
    };
    NewAccountComponent.prototype.validPassword = function (value) {
        var confirmation = value.object.text;
        var password = this.enrolForm.controls['password'].value;
        this.passwordMismatch = confirmation !== password;
    };
    NewAccountComponent.prototype.generateOperatorList = function () {
        var dd = this.page.getViewById('operator-list');
        this.operatorsList = new nativescript_drop_down_1.ValueList([
            { value: 'Claro', display: 'Claro' },
            { value: 'Vivo', display: 'Vivo' },
            { value: 'Tim', display: 'Tim' },
            { value: 'Oi', display: 'Oi' },
            { value: 'Nextel', display: 'Nextel' }
        ]);
        dd.items = this.operatorsList;
        dd.selectedIndex = this.operatorsList.getIndex('Claro');
    };
    NewAccountComponent.prototype.generateDocumentTypeList = function () {
        var doc = this.page.getViewById('doctype-list');
        this.documentTypeList = new nativescript_drop_down_1.ValueList([
            { value: 'CPF', display: 'CPF' },
            { value: 'CNPJ', display: 'CNPJ' }
        ]);
        doc.items = this.documentTypeList;
        doc.selectedIndex = this.documentTypeList.getIndex('CPF');
    };
    NewAccountComponent = __decorate([
        core_1.Component({
            selector: 'ns-new-account',
            templateUrl: './new-account.component.html',
            styleUrls: ['./new-account.component.css'],
            moduleId: module.id,
            providers: [loading_service_1.LoadingService]
        }),
        __metadata("design:paramtypes", [page_1.Page,
            toast_helper_service_1.ToastHelperService,
            account_service_1.AccountService,
            loading_service_1.LoadingService,
            router_1.RouterExtensions,
            forms_1.FormBuilder])
    ], NewAccountComponent);
    return NewAccountComponent;
}());
exports.NewAccountComponent = NewAccountComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LWFjY291bnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3LWFjY291bnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlFO0FBQ2pFLHNEQUFxRDtBQUNyRCx3RUFBcUU7QUFDckUsa0VBQWdFO0FBQ2hFLHNEQUErRDtBQUMvRCxpRUFJZ0M7QUFDaEMsd0NBQW9FO0FBRXBFLGtFQUFnRTtBQVVoRTtJQWVFLDZCQUNVLElBQVUsRUFDVixLQUF5QixFQUN6QixjQUE4QixFQUM5QixjQUE4QixFQUM5QixNQUF3QixFQUN4QixFQUFlO1FBTGYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQWZsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIscUJBQWdCLEdBQUcsSUFBSSxDQUFDO0lBYzVCLENBQUM7SUFYSixzQkFBSSxtQ0FBRTthQUFOO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxDQUFDOzs7T0FBQTtJQVdNLHNDQUFRLEdBQWY7UUFDRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDO1FBQ2pELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDN0IsZUFBZSxFQUFFLENBQUMsT0FBTyxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO1lBQy9DLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLFFBQVEs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QU0sRUFBRTtTQUNuQyxDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNsQyxHQUFHLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQTdIVSxtQkFBbUI7UUFQL0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztZQUMxQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsZ0NBQWMsQ0FBQztTQUM1QixDQUFDO3lDQWlCZ0IsV0FBSTtZQUNILHlDQUFrQjtZQUNULGdDQUFjO1lBQ2QsZ0NBQWM7WUFDdEIseUJBQWdCO1lBQ3BCLG1CQUFXO09BckJkLG1CQUFtQixDQThIL0I7SUFBRCwwQkFBQztDQUFBLEFBOUhELElBOEhDO0FBOUhZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgVG9hc3RIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS90b2FzdC1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJ34vYXBwL3NlcnZpY2VzL2FjY291bnQuc2VydmljZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIFZhbHVlTGlzdCxcbiAgRHJvcERvd24sXG4gIFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhXG59IGZyb20gJ25hdGl2ZXNjcmlwdC1kcm9wLWRvd24nO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEVucm9sbCB9IGZyb20gJ34vYXBwL21vZGVscy9lbnJvbGwnO1xuaW1wb3J0IHsgTG9hZGluZ1NlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy9sb2FkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1uZXctYWNjb3VudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZXctYWNjb3VudC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25ldy1hY2NvdW50LmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgcHJvdmlkZXJzOiBbTG9hZGluZ1NlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE5ld0FjY291bnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBwdWJsaWMgb3BlcmF0b3JzTGlzdDogVmFsdWVMaXN0PHN0cmluZz47XG4gIHB1YmxpYyBkb2N1bWVudFR5cGVMaXN0OiBWYWx1ZUxpc3Q8c3RyaW5nPjtcbiAgcHVibGljIGNvbmZpcm1QYXNzd29yZDogc3RyaW5nO1xuICBwdWJsaWMgZW5yb2xGb3JtOiBGb3JtR3JvdXA7XG5cbiAgcHVibGljIGlzU3VibWl0ID0gZmFsc2U7XG4gIHB1YmxpYyBpc0xvYWRpbmcgPSBmYWxzZTtcbiAgcHVibGljIHBhc3N3b3JkTWlzbWF0Y2ggPSB0cnVlO1xuXG4gICRpc0xvYWRpbmc6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIGdldCBmYygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmVucm9sRm9ybS5jb250cm9scztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIHRvYXN0OiBUb2FzdEhlbHBlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsb2FkaW5nU2VydmljZTogTG9hZGluZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXJcbiAgKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLiRpc0xvYWRpbmcgPSB0aGlzLmxvYWRpbmdTZXJ2aWNlLiRpc0xvYWRpbmc7XG4gICAgdGhpcy5nZW5lcmF0ZU9wZXJhdG9yTGlzdCgpO1xuICAgIHRoaXMuZW5yb2xGb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICBuZXR3b3JrT3BlcmF0b3I6IFsnQ2xhcm8nLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIG51bWJlcjogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIHR5cGU6IFsnQ1BGJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICB2YWx1ZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIHBhc3N3b3JkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZ2VuZXJhdGVPcGVyYXRvckxpc3QoKTtcbiAgICB0aGlzLmdlbmVyYXRlRG9jdW1lbnRUeXBlTGlzdCgpO1xuICB9XG5cbiAgcHVibGljIGRvRW5yb2xsKCk6IHZvaWQge1xuICAgIHRoaXMuaXNTdWJtaXQgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuZW5yb2xGb3JtLmludmFsaWQgfHwgdGhpcy5wYXNzd29yZE1pc21hdGNoKSB7XG4gICAgICB0aGlzLnRvYXN0LnNob3dUb2FzdCgnRGFkb3MgcHJlZW5jaGlkb3MgaW5jb3JyZXRhbWVudGUuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZW5yb2xsID0gdGhpcy5tb3VudEVucm9sbCh0aGlzLmVucm9sRm9ybS52YWx1ZSk7XG4gICAgdGhpcy5sb2FkaW5nU2VydmljZS5zaG93KCk7XG4gICAgdGhpcy5hY2NvdW50U2VydmljZS5zYXZlUmVnaXN0ZXIoZW5yb2xsKS5zdWJzY3JpYmUoXG4gICAgICByZXMgPT4ge1xuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmdTZXJ2aWNlLmhpZGUoKTtcbiAgICAgICAgICB0aGlzLnRvYXN0LnNob3dUb2FzdCgnQ29udGEgY2FkYXN0cmFkYSBjb20gc3VjZXNzbycpO1xuICAgICAgICAgIHRoaXMucm91dGVyLmJhY2soKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2FkaW5nU2VydmljZS5oaWRlKCk7XG4gICAgICAgIHRoaXMudG9hc3Quc2hvd1RvYXN0KHJlcy5lcnJvcnNbMF0ubWVzc2FnZSk7XG4gICAgICB9LFxuICAgICAgZXJyID0+IHtcbiAgICAgICAgdGhpcy50b2FzdC5zaG93VG9hc3QoJ091dmUgdW0gcHJvYmxlbWEgbm8gc2Vydmlkb3IsIHRlbnRlIG5vdmFtZW50ZScpO1xuICAgICAgICB0aGlzLmxvYWRpbmdTZXJ2aWNlLmhpZGUoKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBtb3VudEVucm9sbCh2YWx1ZTogYW55KSB7XG4gICAgY29uc3QgZW5yb2xsOiBFbnJvbGwgPSB7XG4gICAgICBkb2N1bWVudDoge1xuICAgICAgICB2YWx1ZTogdmFsdWUudmFsdWUsXG4gICAgICAgIHR5cGU6IHZhbHVlLnR5cGVcbiAgICAgIH0sXG4gICAgICBwaG9uZToge1xuICAgICAgICBuZXR3b3JrT3BlcmF0b3I6IHZhbHVlLm5ldHdvcmtPcGVyYXRvcixcbiAgICAgICAgbnVtYmVyOiAnKzU1JyArIHZhbHVlLm51bWJlclxuICAgICAgfSxcbiAgICAgIHBhc3N3b3JkOiB2YWx1ZS5wYXNzd29yZFxuICAgIH07XG5cbiAgICByZXR1cm4gZW5yb2xsO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdERvY3VtZW50VHlwZShldmVudDogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcbiAgICB0aGlzLmVucm9sRm9ybS5wYXRjaFZhbHVlKHtcbiAgICAgIHR5cGU6IHRoaXMuZG9jdW1lbnRUeXBlTGlzdC5nZXRWYWx1ZShldmVudC5uZXdJbmRleClcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3ROZXR3b3JrT3BlcmF0b3IoZXZlbnQ6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XG4gICAgdGhpcy5lbnJvbEZvcm0ucGF0Y2hWYWx1ZSh7XG4gICAgICBuZXR3b3JrT3BlcmF0b3I6IHRoaXMub3BlcmF0b3JzTGlzdC5nZXRWYWx1ZShldmVudC5uZXdJbmRleClcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZFBhc3N3b3JkKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBjb25maXJtYXRpb24gPSB2YWx1ZS5vYmplY3QudGV4dDtcbiAgICBjb25zdCBwYXNzd29yZCA9IHRoaXMuZW5yb2xGb3JtLmNvbnRyb2xzWydwYXNzd29yZCddLnZhbHVlO1xuICAgIHRoaXMucGFzc3dvcmRNaXNtYXRjaCA9IGNvbmZpcm1hdGlvbiAhPT0gcGFzc3dvcmQ7XG4gIH1cbiAgcHJpdmF0ZSBnZW5lcmF0ZU9wZXJhdG9yTGlzdCgpOiB2b2lkIHtcbiAgICBsZXQgZGQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQ8RHJvcERvd24+KCdvcGVyYXRvci1saXN0Jyk7XG4gICAgdGhpcy5vcGVyYXRvcnNMaXN0ID0gbmV3IFZhbHVlTGlzdDxzdHJpbmc+KFtcbiAgICAgIHsgdmFsdWU6ICdDbGFybycsIGRpc3BsYXk6ICdDbGFybycgfSxcbiAgICAgIHsgdmFsdWU6ICdWaXZvJywgZGlzcGxheTogJ1Zpdm8nIH0sXG4gICAgICB7IHZhbHVlOiAnVGltJywgZGlzcGxheTogJ1RpbScgfSxcbiAgICAgIHsgdmFsdWU6ICdPaScsIGRpc3BsYXk6ICdPaScgfSxcbiAgICAgIHsgdmFsdWU6ICdOZXh0ZWwnLCBkaXNwbGF5OiAnTmV4dGVsJyB9XG4gICAgXSk7XG5cbiAgICBkZC5pdGVtcyA9IHRoaXMub3BlcmF0b3JzTGlzdDtcbiAgICBkZC5zZWxlY3RlZEluZGV4ID0gdGhpcy5vcGVyYXRvcnNMaXN0LmdldEluZGV4KCdDbGFybycpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW5lcmF0ZURvY3VtZW50VHlwZUxpc3QoKTogdm9pZCB7XG4gICAgbGV0IGRvYyA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZDxEcm9wRG93bj4oJ2RvY3R5cGUtbGlzdCcpO1xuICAgIHRoaXMuZG9jdW1lbnRUeXBlTGlzdCA9IG5ldyBWYWx1ZUxpc3Q8c3RyaW5nPihbXG4gICAgICB7IHZhbHVlOiAnQ1BGJywgZGlzcGxheTogJ0NQRicgfSxcbiAgICAgIHsgdmFsdWU6ICdDTlBKJywgZGlzcGxheTogJ0NOUEonIH1cbiAgICBdKTtcblxuICAgIGRvYy5pdGVtcyA9IHRoaXMuZG9jdW1lbnRUeXBlTGlzdDtcbiAgICBkb2Muc2VsZWN0ZWRJbmRleCA9IHRoaXMuZG9jdW1lbnRUeXBlTGlzdC5nZXRJbmRleCgnQ1BGJyk7XG4gIH1cbn1cbiJdfQ==