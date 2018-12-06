"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var toast_helper_service_1 = require("../core/toast-helper.service");
var account_service_1 = require("../services/account.service");
var variables_1 = require("../utils/variables");
var LoginPageComponent = /** @class */ (function () {
    function LoginPageComponent(page, toastHelper, accountService) {
        this.page = page;
        this.toastHelper = toastHelper;
        this.accountService = accountService;
        this.proccessing = false;
        this.showRegister = false;
        this.errorMessage = {};
    }
    LoginPageComponent.prototype.ngOnInit = function () {
        this.username = '11564763722';
        this.password = '123456';
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
    LoginPageComponent.prototype.showRegisterForm = function () {
        this.showRegister = true;
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
        __metadata("design:paramtypes", [page_1.Page, toast_helper_service_1.ToastHelperService, account_service_1.AccountService])
    ], LoginPageComponent);
    return LoginPageComponent;
}());
exports.LoginPageComponent = LoginPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXdGO0FBQ3hGLHNEQUFxRDtBQUVyRCxxRUFBa0U7QUFDbEUsK0RBQTZEO0FBRTdELGdEQUEyRTtBQVEzRTtJQWdCRSw0QkFBb0IsSUFBVSxFQUFVLFdBQStCLEVBQVUsY0FBOEI7UUFBM0YsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVAvRyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUVyQixpQkFBWSxHQUFRLEVBQUUsQ0FBQztJQUkyRixDQUFDO0lBRW5ILHFDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLDhCQUFrQixFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtZQUMvQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUV4QixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEI7SUFDSCxDQUFDO0lBRUQsNkNBQWdCLEdBQWhCO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVPLG9DQUFPLEdBQWY7UUFBQSxpQkFtQkM7UUFsQkMsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEMsSUFBTSxXQUFXLEdBQWdCO2dCQUMvQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTthQUN4QixDQUFDO1lBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUM5QyxVQUFBLEdBQUc7Z0JBQ0QsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDM0IsQ0FBQyxFQUNELFVBQUMsR0FBc0I7Z0JBQ3JCLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUNGLENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsa0NBQWtDLENBQUMsQ0FBQztTQUNoRTtJQUNILENBQUM7SUFFTyxxQ0FBUSxHQUFoQjtRQUFBLGlCQThCQztRQTdCQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHO2dCQUNaLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkIsUUFBUSxFQUFFO29CQUNSLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUTtvQkFDcEIsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDbEM7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLE1BQU0sRUFBRSw2QkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO29CQUMzQyxlQUFlLEVBQUUsOEJBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztvQkFDeEQsTUFBTSxFQUFDLFFBQVE7aUJBQ2hCO2FBQ0YsQ0FBQztZQUVGLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQ3JELFVBQUEsR0FBRztnQkFDRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7b0JBQ2YsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNuQixLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2lCQUNsRDtxQkFBTTtvQkFDTCxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQVMsQ0FBQyxDQUFDO29CQUM3RSxLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztpQkFDMUI7WUFDSCxDQUFDLEVBQ0QsVUFBQSxHQUFHLElBQUksT0FBQSxDQUFDLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLEVBQTFCLENBQTBCLENBQ2xDLENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRU8seUNBQVksR0FBcEI7UUFDRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLHFCQUFxQixDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUMxQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxHQUFHLDBCQUEwQixDQUFDO2FBQ2hFO1NBQ0Y7UUFFRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO1NBQzVDO1FBRUQsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQztTQUNyRDtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQztTQUNyRDtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQztTQUN2RDtRQUVELElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7U0FDeEI7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFTyx3Q0FBVyxHQUFuQjtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQWpKVSxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1NBQ3JDLENBQUM7eUNBaUIwQixXQUFJLEVBQXVCLHlDQUFrQixFQUEwQixnQ0FBYztPQWhCcEcsa0JBQWtCLENBa0o5QjtJQUFELHlCQUFDO0NBQUEsQUFsSkQsSUFrSkM7QUFsSlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcbmltcG9ydCB7IENyZWRlbnRpYWxzIH0gZnJvbSAnLi4vbW9kZWxzL2NyZWRlbnRpYWxzJztcbmltcG9ydCB7IFRvYXN0SGVscGVyU2VydmljZSB9IGZyb20gJy4uL2NvcmUvdG9hc3QtaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hY2NvdW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBtb2JpbGVPcGVyYXRvckxpc3QsIGZvcm1hdFBob25lTnVtYmVyIH0gZnJvbSAnLi4vdXRpbHMvdmFyaWFibGVzJztcbmltcG9ydCB7IEVucm9sbCB9IGZyb20gJy4uL21vZGVscy9lbnJvbGwnO1xuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnTG9naW5QYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xvZ2luLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbG9naW4uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIG9wdGlvbnNUeXBlOiBBcnJheTxzdHJpbmc+O1xuICBvcGVyYXRvcmxpc3Q6IEFycmF5PHN0cmluZz47XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIHBhc3N3b3JkOiBzdHJpbmc7XG4gIGNvbmZpcm1QYXNzd29yZDogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIG9wZXJhdG9yOiBzdHJpbmc7XG4gIHBob25lTnVtYmVyOiBzdHJpbmc7XG4gIHByb2NjZXNzaW5nID0gZmFsc2U7XG4gIHNob3dSZWdpc3RlciA9IGZhbHNlO1xuXG4gIGVycm9yTWVzc2FnZTogYW55ID0ge307XG5cbiAgZW5yb2xsOiBFbnJvbGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIHRvYXN0SGVscGVyOiBUb2FzdEhlbHBlclNlcnZpY2UsIHByaXZhdGUgYWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXNlcm5hbWUgPSAnMTE1NjQ3NjM3MjInO1xuICAgIHRoaXMucGFzc3dvcmQgPSAnMTIzNDU2JztcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICB0aGlzLm9wdGlvbnNUeXBlID0gWydDUEYnLCAnQ05QSiddO1xuICAgIHRoaXMub3BlcmF0b3JsaXN0ID0gbW9iaWxlT3BlcmF0b3JMaXN0KCkubWFwKGl0ZW0gPT4ge1xuICAgICAgcmV0dXJuIGl0ZW0udG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN1Ym1pdExvZ2luKCk6IHZvaWQge1xuICAgIHRoaXMucHJvY2Nlc3NpbmcgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuc2hvd1JlZ2lzdGVyKSB7XG4gICAgICB0aGlzLnJlZ2lzdGVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9Mb2dpbigpO1xuICAgIH1cbiAgfVxuXG4gIHNob3dSZWdpc3RlckZvcm0oKSB7XG4gICAgdGhpcy5zaG93UmVnaXN0ZXIgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBkb0xvZ2luKCkge1xuICAgIGlmICh0aGlzLnVzZXJuYW1lICYmIHRoaXMucGFzc3dvcmQpIHtcbiAgICAgIGNvbnN0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscyA9IHtcbiAgICAgICAgdXNlcm5hbWU6IHRoaXMudXNlcm5hbWUsXG4gICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkXG4gICAgICB9O1xuICAgICAgdGhpcy5hY2NvdW50U2VydmljZS5sb2dpbihjcmVkZW50aWFscykuc3Vic2NyaWJlKFxuICAgICAgICByZXMgPT4ge1xuICAgICAgICAgIHRoaXMucHJvY2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2NjZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy50b2FzdEhlbHBlci5zaG93VG9hc3QoZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb2NjZXNzaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnRvYXN0SGVscGVyLnNob3dUb2FzdCgnSW5mb3JtZSBvIGRvY3VtZW50byBlIG8gcGFzc3dvcmQnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyKCkge1xuICAgIGlmICh0aGlzLnZhbGlkYXRlRm9ybSgpKSB7XG4gICAgICB0aGlzLmVucm9sbCA9IHtcbiAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXG4gICAgICAgIGRvY3VtZW50OiB7XG4gICAgICAgICAgdmFsdWU6IHRoaXMudXNlcm5hbWUsXG4gICAgICAgICAgdHlwZTogdGhpcy5vcHRpb25zVHlwZVt0aGlzLnR5cGVdXG4gICAgICAgIH0sXG4gICAgICAgIHBob25lOiB7XG4gICAgICAgICAgbnVtYmVyOiBmb3JtYXRQaG9uZU51bWJlcih0aGlzLnBob25lTnVtYmVyKSxcbiAgICAgICAgICBuZXR3b3JrT3BlcmF0b3I6IG1vYmlsZU9wZXJhdG9yTGlzdCgpW3RoaXMub3BlcmF0b3IgKyAxXSxcbiAgICAgICAgICBzdGF0dXM6J0FjdGl2ZSdcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdGhpcy5hY2NvdW50U2VydmljZS5zYXZlUmVnaXN0ZXIodGhpcy5lbnJvbGwpLnN1YnNjcmliZShcbiAgICAgICAgcmVzID0+IHtcbiAgICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRGaWVsZHMoKTtcbiAgICAgICAgICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KCdVc3XDoXJpbyBjYWRhc3RyYWRvJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KGAke3Jlcy5lcnJvcnNbMF0uY29kZX0gJHtyZXMuZXJyb3JzWzBdLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICB0aGlzLnByb2NjZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4gKHRoaXMucHJvY2Nlc3NpbmcgPSBmYWxzZSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvY2Nlc3NpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHZhbGlkYXRlRm9ybSgpOiBib29sZWFuIHtcbiAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgIGlmICghdGhpcy5wYXNzd29yZCkge1xuICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlLnBhc3N3b3JkID0gJ1ByZWVuY2hhIG8gcGFzc3dvcmQnO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXNzd29yZCkge1xuICAgICAgaWYgKHRoaXMuY29uZmlybVBhc3N3b3JkICE9PSB0aGlzLnBhc3N3b3JkKSB7XG4gICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlLmNvbmZpcm1QYXNzd29yZCA9ICdJbmZvcm1lIG8gbWVzbW8gcGFzc3dvcmQnO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHR5cGUgPSB0aGlzLm9wdGlvbnNUeXBlW3RoaXMudHlwZV07XG4gICAgaWYgKCF0eXBlKSB7XG4gICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UudHlwZSA9ICdQcmVlbmNoYSBvIHRpcG8nO1xuICAgIH1cblxuICAgIGNvbnN0IG9wZXJhdG9yID0gdGhpcy5vcGVyYXRvcmxpc3RbdGhpcy5vcGVyYXRvcl07XG4gICAgaWYgKCFvcGVyYXRvcikge1xuICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlLm9wZXJhdG9yID0gJ1ByZWVuY2hhIGEgb3BlcmFkb3JhJztcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMudXNlcm5hbWUpIHtcbiAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZS51c2VybmFtZSA9ICdQcmVlbmNoYSBvIGRvY3VtZW50byc7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnBob25lTnVtYmVyKSB7XG4gICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UucGhvbmVOdW1iZXIgPSAnUHJlZW5jaGEgbyB0ZWxlZm9uZSc7XG4gICAgfVxuXG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHt9O1xuICAgIH1cblxuICAgIHJldHVybiB2YWxpZDtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRGaWVsZHMoKTogdm9pZCB7XG4gICAgdGhpcy5waG9uZU51bWJlciA9ICcnO1xuICAgIHRoaXMucGFzc3dvcmQgPSAnJztcbiAgICB0aGlzLm9wZXJhdG9yID0gJyc7XG4gICAgdGhpcy50eXBlID0gJyc7XG4gICAgdGhpcy5jb25maXJtUGFzc3dvcmQgPSAnJztcbiAgICB0aGlzLnByb2NjZXNzaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zaG93UmVnaXN0ZXIgPSBmYWxzZTtcbiAgfVxufVxuIl19