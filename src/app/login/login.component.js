"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var toast_helper_service_1 = require("../core/toast-helper.service");
var account_service_1 = require("../services/account.service");
var variables_1 = require("../utils/variables");
var router_1 = require("@angular/router");
var LoginPageComponent = /** @class */ (function () {
    function LoginPageComponent(page, toastHelper, accountService, router) {
        this.page = page;
        this.toastHelper = toastHelper;
        this.accountService = accountService;
        this.router = router;
        this.proccessing = false;
        this.showRegister = false;
        this.errorMessage = {};
    }
    LoginPageComponent.prototype.ngOnInit = function () {
        this.username = '48328826000100';
        this.password = 'kayrossxp';
        this.page.actionBarHidden = true;
        this.optionsType = ['CPF', 'CNPJ'];
        this.operatorlist = variables_1.mobileOperatorList().map(function (item) {
            return item.toLocaleUpperCase();
        });
    };
    LoginPageComponent.prototype.submitLogin = function () {
        this.proccessing = true;
        if (this.showRegister) {
            this.register();
        }
        else {
            this.doLogin();
        }
    };
    LoginPageComponent.prototype.showRegisterForm = function (event) {
        var _this = this;
        var view = event.view;
        view.animate({ scale: { x: 1, y: 1.2 }, duration: 200 }).then(function () {
            view.animate({ scale: { x: 1, y: 1 }, duration: 200 });
            _this.router.navigate(['new-account']);
        });
    };
    LoginPageComponent.prototype.doLogin = function () {
        var _this = this;
        if (this.username && this.password) {
            var credentials = {
                username: this.username,
                password: this.password
            };
            this.accountService.login(credentials).subscribe(function (res) {
                _this.proccessing = false;
            }, function (err) {
                _this.proccessing = false;
                _this.toastHelper.showToast(err.message);
            });
        }
        else {
            this.proccessing = false;
            this.toastHelper.showToast('Informe o documento e o password');
        }
    };
    LoginPageComponent.prototype.register = function () {
        var _this = this;
        if (this.validateForm()) {
            this.enroll = {
                password: this.password,
                document: {
                    value: this.username,
                    type: this.optionsType[this.type]
                },
                phone: {
                    number: variables_1.formatPhoneNumber(this.phoneNumber),
                    networkOperator: variables_1.mobileOperatorList()[this.operator + 1],
                    status: 'Active'
                }
            };
            this.accountService.saveRegister(this.enroll).subscribe(function (res) {
                if (res.success) {
                    _this.resetFields();
                    _this.toastHelper.showToast('Usuário cadastrado');
                }
                else {
                    _this.toastHelper.showToast(res.errors[0].code + " " + res.errors[0].message);
                    _this.proccessing = false;
                }
            }, function (err) { return (_this.proccessing = false); });
        }
        else {
            this.proccessing = false;
        }
    };
    LoginPageComponent.prototype.validateForm = function () {
        var valid = true;
        if (!this.password) {
            valid = false;
            this.errorMessage.password = 'Preencha o password';
        }
        if (this.password) {
            if (this.confirmPassword !== this.password) {
                valid = false;
                this.errorMessage.confirmPassword = 'Informe o mesmo password';
            }
        }
        var type = this.optionsType[this.type];
        if (!type) {
            valid = false;
            this.errorMessage.type = 'Preencha o tipo';
        }
        var operator = this.operatorlist[this.operator];
        if (!operator) {
            valid = false;
            this.errorMessage.operator = 'Preencha a operadora';
        }
        if (!this.username) {
            valid = false;
            this.errorMessage.username = 'Preencha o documento';
        }
        if (!this.phoneNumber) {
            valid = false;
            this.errorMessage.phoneNumber = 'Preencha o telefone';
        }
        if (valid) {
            this.errorMessage = {};
        }
        return valid;
    };
    LoginPageComponent.prototype.resetFields = function () {
        this.phoneNumber = '';
        this.password = '';
        this.operator = '';
        this.type = '';
        this.confirmPassword = '';
        this.proccessing = false;
        this.showRegister = false;
    };
    LoginPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'LoginPage',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            toast_helper_service_1.ToastHelperService,
            account_service_1.AccountService,
            router_1.Router])
    ], LoginPageComponent);
    return LoginPageComponent;
}());
exports.LoginPageComponent = LoginPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXdGO0FBQ3hGLHNEQUEyRDtBQUUzRCxxRUFBa0U7QUFDbEUsK0RBQTZEO0FBRTdELGdEQUEyRTtBQUUzRSwwQ0FBeUM7QUFRekM7SUFnQkUsNEJBQ1UsSUFBVSxFQUNWLFdBQStCLEVBQy9CLGNBQThCLEVBQzlCLE1BQWM7UUFIZCxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBWHhCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLGlCQUFZLEdBQVEsRUFBRSxDQUFDO0lBU3BCLENBQUM7SUFFSixxQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLDhCQUFrQixFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtZQUMvQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUV4QixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCO2FBQU07WUFDTCxJ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QyxRQUFRLEdBQUcsc0JBQXNCLENBQUM7U0FDckQ7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ2QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcscUJBQXFCLENBQUM7U0FDdkQ7UUFFRCxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1NBQ3hCO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU8sd0NBQVcsR0FBbkI7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUEzSlUsa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUNyQyxDQUFDO3lDQWtCZ0IsV0FBSTtZQUNHLHlDQUFrQjtZQUNmLGdDQUFjO1lBQ3RCLGVBQU07T0FwQmIsa0JBQWtCLENBNEo5QjtJQUFELHlCQUFDO0NBQUEsQUE1SkQsSUE0SkM7QUE1SlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZSwgVmlldyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcbmltcG9ydCB7IENyZWRlbnRpYWxzIH0gZnJvbSAnLi4vbW9kZWxzL2NyZWRlbnRpYWxzJztcbmltcG9ydCB7IFRvYXN0SGVscGVyU2VydmljZSB9IGZyb20gJy4uL2NvcmUvdG9hc3QtaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hY2NvdW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBtb2JpbGVPcGVyYXRvckxpc3QsIGZvcm1hdFBob25lTnVtYmVyIH0gZnJvbSAnLi4vdXRpbHMvdmFyaWFibGVzJztcbmltcG9ydCB7IEVucm9sbCB9IGZyb20gJy4uL21vZGVscy9lbnJvbGwnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnTG9naW5QYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xvZ2luLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbG9naW4uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIG9wdGlvbnNUeXBlOiBBcnJheTxzdHJpbmc+O1xuICBvcGVyYXRvcmxpc3Q6IEFycmF5PHN0cmluZz47XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIHBhc3N3b3JkOiBzdHJpbmc7XG4gIGNvbmZpcm1QYXNzd29yZDogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIG9wZXJhdG9yOiBzdHJpbmc7XG4gIHBob25lTnVtYmVyOiBzdHJpbmc7XG4gIHByb2NjZXNzaW5nID0gZmFsc2U7XG4gIHNob3dSZWdpc3RlciA9IGZhbHNlO1xuXG4gIGVycm9yTWVzc2FnZTogYW55ID0ge307XG5cbiAgZW5yb2xsOiBFbnJvbGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgdG9hc3RIZWxwZXI6IFRvYXN0SGVscGVyU2VydmljZSxcbiAgICBwcml2YXRlIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVzZXJuYW1lID0gJzQ4MzI4ODI2MDAwMTAwJztcbiAgICB0aGlzLnBhc3N3b3JkID0gJ2theXJvc3N4cCc7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgdGhpcy5vcHRpb25zVHlwZSA9IFsnQ1BGJywgJ0NOUEonXTtcbiAgICB0aGlzLm9wZXJhdG9ybGlzdCA9IG1vYmlsZU9wZXJhdG9yTGlzdCgpLm1hcChpdGVtID0+IHtcbiAgICAgIHJldHVybiBpdGVtLnRvTG9jYWxlVXBwZXJDYXNlKCk7XG4gICAgfSk7XG4gIH1cblxuICBzdWJtaXRMb2dpbigpOiB2b2lkIHtcbiAgICB0aGlzLnByb2NjZXNzaW5nID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLnNob3dSZWdpc3Rlcikge1xuICAgICAgdGhpcy5yZWdpc3RlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvTG9naW4oKTtcbiAgICB9XG4gIH1cblxuICBzaG93UmVnaXN0ZXJGb3JtKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCB2aWV3OiBWaWV3ID0gZXZlbnQudmlldztcblxuICAgIHZpZXcuYW5pbWF0ZSh7IHNjYWxlOiB7IHg6IDEsIHk6IDEuMiB9LCBkdXJhdGlvbjogMjAwIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdmlldy5hbmltYXRlKHsgc2NhbGU6IHsgeDogMSwgeTogMSB9LCBkdXJhdGlvbjogMjAwIH0pO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWyduZXctYWNjb3VudCddKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZG9Mb2dpbigpIHtcbiAgICBpZiAodGhpcy51c2VybmFtZSAmJiB0aGlzLnBhc3N3b3JkKSB7XG4gICAgICBjb25zdCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSB7XG4gICAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJuYW1lLFxuICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZFxuICAgICAgfTtcbiAgICAgIHRoaXMuYWNjb3VudFNlcnZpY2UubG9naW4oY3JlZGVudGlhbHMpLnN1YnNjcmliZShcbiAgICAgICAgcmVzID0+IHtcbiAgICAgICAgICB0aGlzLnByb2NjZXNzaW5nID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnI6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9jY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KGVyci5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9jY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgdGhpcy50b2FzdEhlbHBlci5zaG93VG9hc3QoJ0luZm9ybWUgbyBkb2N1bWVudG8gZSBvIHBhc3N3b3JkJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3RlcigpIHtcbiAgICBpZiAodGhpcy52YWxpZGF0ZUZvcm0oKSkge1xuICAgICAgdGhpcy5lbnJvbGwgPSB7XG4gICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLFxuICAgICAgICBkb2N1bWVudDoge1xuICAgICAgICAgIHZhbHVlOiB0aGlzLnVzZXJuYW1lLFxuICAgICAgICAgIHR5cGU6IHRoaXMub3B0aW9uc1R5cGVbdGhpcy50eXBlXVxuICAgICAgICB9LFxuICAgICAgICBwaG9uZToge1xuICAgICAgICAgIG51bWJlcjogZm9ybWF0UGhvbmVOdW1iZXIodGhpcy5waG9uZU51bWJlciksXG4gICAgICAgICAgbmV0d29ya09wZXJhdG9yOiBtb2JpbGVPcGVyYXRvckxpc3QoKVt0aGlzLm9wZXJhdG9yICsgMV0sXG4gICAgICAgICAgc3RhdHVzOiAnQWN0aXZlJ1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB0aGlzLmFjY291bnRTZXJ2aWNlLnNhdmVSZWdpc3Rlcih0aGlzLmVucm9sbCkuc3Vic2NyaWJlKFxuICAgICAgICByZXMgPT4ge1xuICAgICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICAgICAgdGhpcy5yZXNldEZpZWxkcygpO1xuICAgICAgICAgICAgdGhpcy50b2FzdEhlbHBlci5zaG93VG9hc3QoJ1VzdcOhcmlvIGNhZGFzdHJhZG8nKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50b2FzdEhlbHBlci5zaG93VG9hc3QoYCR7cmVzLmVycm9yc1swXS5jb2RlfSAke3Jlcy5lcnJvcnNbMF0ubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIHRoaXMucHJvY2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiAodGhpcy5wcm9jY2Vzc2luZyA9IGZhbHNlKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9jY2Vzc2luZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdmFsaWRhdGVGb3JtKCk6IGJvb2xlYW4ge1xuICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgaWYgKCF0aGlzLnBhc3N3b3JkKSB7XG4gICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UucGFzc3dvcmQgPSAnUHJlZW5jaGEgbyBwYXNzd29yZCc7XG4gICAgfVxuICAgIGlmICh0aGlzLnBhc3N3b3JkKSB7XG4gICAgICBpZiAodGhpcy5jb25maXJtUGFzc3dvcmQgIT09IHRoaXMucGFzc3dvcmQpIHtcbiAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UuY29uZmlybVBhc3N3b3JkID0gJ0luZm9ybWUgbyBtZXNtbyBwYXNzd29yZCc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdHlwZSA9IHRoaXMub3B0aW9uc1R5cGVbdGhpcy50eXBlXTtcbiAgICBpZiAoIXR5cGUpIHtcbiAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZS50eXBlID0gJ1ByZWVuY2hhIG8gdGlwbyc7XG4gICAgfVxuXG4gICAgY29uc3Qgb3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9ybGlzdFt0aGlzLm9wZXJhdG9yXTtcbiAgICBpZiAoIW9wZXJhdG9yKSB7XG4gICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2Uub3BlcmF0b3IgPSAnUHJlZW5jaGEgYSBvcGVyYWRvcmEnO1xuICAgIH1cblxuICAgIGlmICghdGhpcy51c2VybmFtZSkge1xuICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlLnVzZXJuYW1lID0gJ1ByZWVuY2hhIG8gZG9jdW1lbnRvJztcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMucGhvbmVOdW1iZXIpIHtcbiAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZS5waG9uZU51bWJlciA9ICdQcmVlbmNoYSBvIHRlbGVmb25lJztcbiAgICB9XG5cbiAgICBpZiAodmFsaWQpIHtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0ge307XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldEZpZWxkcygpOiB2b2lkIHtcbiAgICB0aGlzLnBob25lTnVtYmVyID0gJyc7XG4gICAgdGhpcy5wYXNzd29yZCA9ICcnO1xuICAgIHRoaXMub3BlcmF0b3IgPSAnJztcbiAgICB0aGlzLnR5cGUgPSAnJztcbiAgICB0aGlzLmNvbmZpcm1QYXNzd29yZCA9ICcnO1xuICAgIHRoaXMucHJvY2Nlc3NpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dSZWdpc3RlciA9IGZhbHNlO1xuICB9XG59XG4iXX0=