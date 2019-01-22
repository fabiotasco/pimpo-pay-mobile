"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var page_1 = require("tns-core-modules/ui/page/page");
var CurrencyMaskPtComponent = /** @class */ (function () {
    function CurrencyMaskPtComponent(page) {
        this.page = page;
        this.className = 'input-field';
        this.isEnabled = true;
        this.blur = new core_1.EventEmitter();
        this.propagateChange = function (_) { };
    }
    CurrencyMaskPtComponent_1 = CurrencyMaskPtComponent;
    CurrencyMaskPtComponent.prototype.ngOnInit = function () {
        this.fieldValue = this.page.getViewById('fieldValue');
    };
    CurrencyMaskPtComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.inputValue = obj;
        }
    };
    CurrencyMaskPtComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    CurrencyMaskPtComponent.prototype.registerOnTouched = function (fn) { };
    CurrencyMaskPtComponent.prototype.setDisabledState = function (isDisabled) { };
    CurrencyMaskPtComponent.prototype.changeValue = function (event) {
        if (event.object.text) {
            var value = event.object.text;
            value = value.replace(/\D/, '');
            value = value.replace(',', ''); // para conter o bug do replace
            value = value.replace('.', ''); // de nao substituir todos os caracteres.
            value = value.replace('.', '');
            if (value.length === 3) {
                value = value.replace(/(\d{1})(\d{2})/, '$1,$2');
            }
            else if (value.length === 4) {
                value = value.replace(/(\d{2})(\d{2})/, '$1,$2');
            }
            else if (value.length === 5) {
                value = value.replace(/(\d{3})(\d{2})/, '$1,$2');
            }
            else if (value.length === 6) {
                value = value.replace(/(\d{1})(\d{3})(\d{2})/, '$1.$2,$3');
            }
            else if (value.length === 7) {
                value = value.replace(/(\d{2})(\d{3})(\d{2})/, '$1.$2,$3');
            }
            else if (value.length === 8) {
                value = value.replace(/(\d{3})(\d{3})(\d{2})/, '$1.$2,$3');
            }
            else if (value.length === 9) {
                value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3,$4');
            }
            else if (value.length === 10) {
                value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3,$4');
            }
            else if (value.length === 11) {
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3,$4');
            }
            else if (value.length === 12) {
                value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3.$4,$5');
            }
            else {
                value = value.replace(/(\d{10,})(\d{2})/, '$1.$2');
            }
            this.inputValue = value;
            if (this.page.android) {
                this.fieldValue.android.setSelection(this.fieldValue.android.length());
            }
            var resetedValue = this.prepareToPropagate(value);
            this.propagateChange(resetedValue);
        }
    };
    CurrencyMaskPtComponent.prototype.focusOut = function (event) {
        this.blur.emit(event);
    };
    CurrencyMaskPtComponent.prototype.prepareToPropagate = function (value) {
        value = value.replace(/\D/, '');
        value = value.replace(',', ''); // para conter o bug do replace
        value = value.replace('.', ''); // de nao substituir todos os caracteres.
        value = value.replace('.', '');
        var integerPart = value.slice(0, value.length - 2);
        var decimalPart = value.slice(value.length - 2);
        return parseFloat(integerPart + '.' + decimalPart).toFixed(2);
    };
    var CurrencyMaskPtComponent_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CurrencyMaskPtComponent.prototype, "hint", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CurrencyMaskPtComponent.prototype, "className", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CurrencyMaskPtComponent.prototype, "returnKeyType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CurrencyMaskPtComponent.prototype, "isEnabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CurrencyMaskPtComponent.prototype, "colSpan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CurrencyMaskPtComponent.prototype, "row", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CurrencyMaskPtComponent.prototype, "col", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CurrencyMaskPtComponent.prototype, "blur", void 0);
    CurrencyMaskPtComponent = CurrencyMaskPtComponent_1 = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './nativescript-currency-mask.component.html',
            selector: 'TextFieldCurrency',
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return CurrencyMaskPtComponent_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], CurrencyMaskPtComponent);
    return CurrencyMaskPtComponent;
}());
exports.CurrencyMaskPtComponent = CurrencyMaskPtComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlc2NyaXB0LWN1cnJlbmN5LW1hc2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmF0aXZlc2NyaXB0LWN1cnJlbmN5LW1hc2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJGO0FBQzNGLHdDQUF5RTtBQUV6RSxzREFBcUQ7QUFjckQ7SUF5QkUsaUNBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBckI5QixjQUFTLEdBQVcsYUFBYSxDQUFDO1FBSWxDLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFXakIsU0FBSSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBSWxCLG9CQUFlLEdBQUcsVUFBQyxDQUFNLElBQU0sQ0FBQyxDQUFDO0lBRVIsQ0FBQztnQ0F6QnZCLHVCQUF1QjtJQTJCbEMsMENBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELDRDQUFVLEdBQVYsVUFBVyxHQUFRO1FBQ2pCLElBQUksR0FBRyxFQUFFO1lBQ1AsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7U0FDdkI7SUFDSCxDQUFDO0lBRUQsa0RBQWdCLEdBQWhCLFVBQWlCLEVBQU87UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELG1EQUFpQixHQUFqQixVQUFrQixFQUFPLElBQVMsQ0FBQztJQUNuQyxrREFBZ0IsR0FBaEIsVUFBa0IsVUFBbUIsSUFBUyxDQUFDO0lBRS9DLDZDQUFXLEdBQVgsVUFBWSxLQUFVO1FBQ3BCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDckIsSUFBSSxLQUFLLEdBQVcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFdEMsS0FBSyxHQUFHLEtBQUssQ0FBQyxP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LEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLHlCQUFpQjtvQkFDMUIsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLHlCQUF1QixFQUF2QixDQUF1QixDQUFDO29CQUN0RCxLQUFLLEVBQUUsSUFBSTtpQkFDWjthQUNGO1NBQ0YsQ0FBQzt5Q0EwQjBCLFdBQUk7T0F6Qm5CLHVCQUF1QixDQXFHbkM7SUFBRCw4QkFBQztDQUFBLEFBckdELElBcUdDO0FBckdZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZvcndhcmRSZWYsIE9uSW5pdCwgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3VpL3RleHQtZmllbGQnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHRlbXBsYXRlVXJsOiAnLi9uYXRpdmVzY3JpcHQtY3VycmVuY3ktbWFzay5jb21wb25lbnQuaHRtbCcsXG4gIHNlbGVjdG9yOiAnVGV4dEZpZWxkQ3VycmVuY3knLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEN1cnJlbmN5TWFza1B0Q29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEN1cnJlbmN5TWFza1B0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpXG4gIGhpbnQ6IHN0cmluZztcbiAgQElucHV0KClcbiAgY2xhc3NOYW1lOiBzdHJpbmcgPSAnaW5wdXQtZmllbGQnO1xuICBASW5wdXQoKVxuICByZXR1cm5LZXlUeXBlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGlzRW5hYmxlZCA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgY29sU3Bhbjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHJvdzogc3RyaW5nO1xuICBASW5wdXQoKVxuICBjb2w6IHN0cmluZztcblxuICBAT3V0cHV0KClcbiAgYmx1ciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBpbnB1dFZhbHVlOiBzdHJpbmc7XG4gIHByaXZhdGUgZmllbGRWYWx1ZTogVGV4dEZpZWxkO1xuICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmZpZWxkVmFsdWUgPSA8VGV4dEZpZWxkPnRoaXMucGFnZS5nZXRWaWV3QnlJZCgnZmllbGRWYWx1ZScpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xuICAgIGlmIChvYmopIHtcbiAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IG9iajtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge31cbiAgc2V0RGlzYWJsZWRTdGF0ZT8oaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge31cblxuICBjaGFuZ2VWYWx1ZShldmVudDogYW55KSB7XG4gICAgaWYgKGV2ZW50Lm9iamVjdC50ZXh0KSB7XG4gICAgICBsZXQgdmFsdWU6IHN0cmluZyA9IGV2ZW50Lm9iamVjdC50ZXh0O1xuXG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcRC8sICcnKTtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgnLCcsICcnKTsgLy8gcGFyYSBjb250ZXIgbyBidWcgZG8gcmVwbGFjZVxuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCcuJywgJycpOyAvLyBkZSBuYW8gc3Vic3RpdHVpciB0b2RvcyBvcyBjYXJhY3RlcmVzLlxuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCcuJywgJycpO1xuXG4gICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAzKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvKFxcZHsxfSkoXFxkezJ9KS8sICckMSwkMicpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8oXFxkezJ9KShcXGR7Mn0pLywgJyQxLCQyJyk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlLmxlbmd0aCA9PT0gNSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLyhcXGR7M30pKFxcZHsyfSkvLCAnJDEsJDInKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUubGVuZ3RoID09PSA2KSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvKFxcZHsxfSkoXFxkezN9KShcXGR7Mn0pLywgJyQxLiQyLCQzJyk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlLmxlbmd0aCA9PT0gNykge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLyhcXGR7Mn0pKFxcZHszfSkoXFxkezJ9KS8sICckMS4kMiwkMycpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPT09IDgpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8oXFxkezN9KShcXGR7M30pKFxcZHsyfSkvLCAnJDEuJDIsJDMnKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUubGVuZ3RoID09PSA5KSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvKFxcZHsxfSkoXFxkezN9KShcXGR7M30pKFxcZHsyfSkvLCAnJDEuJDIuJDMsJDQnKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUubGVuZ3RoID09PSAxMCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLyhcXGR7Mn0pKFxcZHszfSkoXFxkezN9KShcXGR7Mn0pLywgJyQxLiQyLiQzLCQ0Jyk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMTEpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8oXFxkezN9KShcXGR7M30pKFxcZHszfSkoXFxkezJ9KS8sICckMS4kMi4kMywkNCcpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPT09IDEyKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvKFxcZHsxfSkoXFxkezN9KShcXGR7M30pKFxcZHszfSkoXFxkezJ9KS8sICckMS4kMi4kMy4kNCwkNScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8oXFxkezEwLH0pKFxcZHsyfSkvLCAnJDEuJDInKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5pbnB1dFZhbHVlID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5wYWdlLmFuZHJvaWQpIHtcbiAgICAgICAgdGhpcy5maWVsZFZhbHVlLmFuZHJvaWQuc2V0U2VsZWN0aW9uKHRoaXMuZmllbGRWYWx1ZS5hbmRyb2lkLmxlbmd0aCgpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzZXRlZFZhbHVlID0gdGhpcy5wcmVwYXJlVG9Qcm9wYWdhdGUodmFsdWUpO1xuICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UocmVzZXRlZFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBmb2N1c091dChldmVudDogYW55KSB7XG4gICAgdGhpcy5ibHVyLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlVG9Qcm9wYWdhdGUodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXEQvLCAnJyk7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCcsJywgJycpOyAvLyBwYXJhIGNvbnRlciBvIGJ1ZyBkbyByZXBsYWNlXG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCcuJywgJycpOyAvLyBkZSBuYW8gc3Vic3RpdHVpciB0b2RvcyBvcyBjYXJhY3RlcmVzLlxuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgnLicsICcnKTtcblxuICAgIGNvbnN0IGludGVnZXJQYXJ0ID0gdmFsdWUuc2xpY2UoMCwgdmFsdWUubGVuZ3RoIC0gMik7XG4gICAgY29uc3QgZGVjaW1hbFBhcnQgPSB2YWx1ZS5zbGljZSh2YWx1ZS5sZW5ndGggLSAyKTtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChpbnRlZ2VyUGFydCArICcuJyArIGRlY2ltYWxQYXJ0KS50b0ZpeGVkKDIpO1xuICB9XG59XG4iXX0=