"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var page_1 = require("tns-core-modules/ui/page/page");
var PhoneMaskComponent = /** @class */ (function () {
    function PhoneMaskComponent(page) {
        this.page = page;
        this.className = 'input-field';
        this.isEnabled = true;
        this.blur = new core_1.EventEmitter();
        this.propagateChange = function (_) { };
    }
    PhoneMaskComponent_1 = PhoneMaskComponent;
    PhoneMaskComponent.prototype.ngOnInit = function () {
        this.fieldValue = this.page.getViewById('fieldValue');
    };
    PhoneMaskComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.inputValue = obj;
        }
    };
    PhoneMaskComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    PhoneMaskComponent.prototype.registerOnTouched = function (fn) { };
    PhoneMaskComponent.prototype.setDisabledState = function (isDisabled) { };
    PhoneMaskComponent.prototype.changeValue = function (event) {
        if (event.object.text) {
            var v = event.object.text;
            v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
            if (v.length <= 5) {
                v = v.replace(/^(\d{2})(\d{1,3})/, '($1) $2'); // Separa o DDD do telefone
            }
            else if (v.length > 6 && v.length <= 10) {
                v = v.replace(/(\d{2})(\d{1,4})(\d{1,4})/, '($1) $2-$3'); // Separa o DDD e ajusta os digitos do celular
            }
            else {
                v = v.replace(/(\d{2})(\d{1,5})(\d{1,4})/, '($1) $2-$3'); // Separa o DDD e ajusta os digitos do celular
            }
            if (v.length === 0) {
                return null;
            }
            this.inputValue = v;
            if (this.page.android) {
                this.fieldValue.android.setSelection(this.fieldValue.android.length());
            }
            var resetedValue = this.prepareToPropagate(v);
            this.propagateChange(resetedValue);
        }
    };
    PhoneMaskComponent.prototype.focusOut = function (event) {
        this.blur.emit(event);
    };
    PhoneMaskComponent.prototype.prepareToPropagate = function (value) {
        value = value.replace(/\D/, '').trim();
        value = value.replace(/\D/, '').trim();
        value = value.replace(' ', '').trim();
        value = value.replace('-', '').trim(); // para conter o bug do replace
        return value;
    };
    var PhoneMaskComponent_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PhoneMaskComponent.prototype, "hint", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PhoneMaskComponent.prototype, "className", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PhoneMaskComponent.prototype, "returnKeyType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PhoneMaskComponent.prototype, "isEnabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], PhoneMaskComponent.prototype, "fontSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PhoneMaskComponent.prototype, "colSpan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PhoneMaskComponent.prototype, "row", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PhoneMaskComponent.prototype, "col", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], PhoneMaskComponent.prototype, "blur", void 0);
    PhoneMaskComponent = PhoneMaskComponent_1 = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './nativescript-phone-mask.component.html',
            selector: 'TextFieldPhone',
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return PhoneMaskComponent_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], PhoneMaskComponent);
    return PhoneMaskComponent;
}());
exports.PhoneMaskComponent = PhoneMaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlc2NyaXB0LXBob25lLW1hc2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmF0aXZlc2NyaXB0LXBob25lLW1hc2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBT3VCO0FBQ3ZCLHdDQUF5RTtBQUV6RSxzREFBcUQ7QUFjckQ7SUF5QkUsNEJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBckI5QixjQUFTLEdBQVcsYUFBYSxDQUFDO1FBSWxDLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFXakIsU0FBSSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBSWxCLG9CQUFlLEdBQUcsVUFBQyxDQUFNLElBQU0sQ0FBQyxDQUFDO0lBRVIsQ0FBQzsyQkF6QnZCLGtCQUFrQjtJQTJCN0IscUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELHVDQUFVLEdBQVYsVUFBVyxHQUFRO1FBQ2pCLElBQUksR0FBRyxFQUFFO1lBQ1AsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7U0FDdkI7SUFDSCxDQUFDO0lBRUQsNkNBQWdCLEdBQWhCLFVBQWlCLEVBQU87UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELDhDQUFpQixHQUFqQixVQUFrQixFQUFPLElBQVMsQ0FBQztJQUNuQyw2Q0FBZ0IsR0FBaEIsVUFBa0IsVUFBbUIsSUFBUyxDQUFDO0lBRS9DLHdDQUFXLEdBQVgsVUFBWSxLQUFVO1FBQ3BCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLEdBQVcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFbEMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsaUNBQWlDO1lBRTNELElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ2pCLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsMkJBQTJCO2FBQzNFO2lCQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUU7Z0JBQ3pDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLDJCQUEyQixFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsOENBQThDO2FBQ3pHO2lCQUFNO2dCQUNMLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLDJCQUEyQixFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsOENBQThDO2FBQ3pHO1lBRUQsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDbEIsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQ3hFO1lBRUQsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7SUFDSCxDQUFDO0lBRUQscUNBQVEsR0FBUixVQUFTLEtBQVU7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVPLCtDQUFrQixHQUExQixVQUEyQixLQUFhO1FBQ3RDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLCtCQUErQjtRQUV0RSxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7O0lBakZEO1FBREMsWUFBSyxFQUFFOztvREFDSztJQUViO1FBREMsWUFBSyxFQUFFOzt5REFDMEI7SUFFbEM7UUFEQyxZQUFLLEVBQUU7OzZEQUNjO0lBRXRCO1FBREMsWUFBSyxFQUFFOzt5REFDUztJQUNSO1FBQVIsWUFBSyxFQUFFOzt3REFBa0I7SUFFMUI7UUFEQyxZQUFLLEVBQUU7O3VEQUNRO0lBR2hCO1FBREMsWUFBSyxFQUFFOzttREFDSTtJQUVaO1FBREMsWUFBSyxFQUFFOzttREFDSTtJQUdaO1FBREMsYUFBTSxFQUFFOztvREFDaUI7SUFuQmYsa0JBQWtCO1FBWjlCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDBDQUEwQztZQUN2RCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUseUJBQWlCO29CQUMxQixXQUFXLEVBQUUsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsb0JBQWtCLEVBQWxCLENBQWtCLENBQUM7b0JBQ2pELEtBQUssRUFBRSxJQUFJO2lCQUNaO2FBQ0Y7U0FDRixDQUFDO3lDQTBCMEIsV0FBSTtPQXpCbkIsa0JBQWtCLENBb0Y5QjtJQUFELHlCQUFDO0NBQUEsQUFwRkQsSUFvRkM7QUFwRlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgZm9yd2FyZFJlZixcbiAgT25Jbml0LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC1maWVsZCc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgdGVtcGxhdGVVcmw6ICcuL25hdGl2ZXNjcmlwdC1waG9uZS1tYXNrLmNvbXBvbmVudC5odG1sJyxcbiAgc2VsZWN0b3I6ICdUZXh0RmllbGRQaG9uZScsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUGhvbmVNYXNrQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFBob25lTWFza0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKVxuICBoaW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGNsYXNzTmFtZTogc3RyaW5nID0gJ2lucHV0LWZpZWxkJztcbiAgQElucHV0KClcbiAgcmV0dXJuS2V5VHlwZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBpc0VuYWJsZWQgPSB0cnVlO1xuICBASW5wdXQoKSBmb250U2l6ZTogbnVtYmVyO1xuICBASW5wdXQoKVxuICBjb2xTcGFuOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgcm93OiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGNvbDogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKVxuICBibHVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGlucHV0VmFsdWU6IHN0cmluZztcbiAgcHJpdmF0ZSBmaWVsZFZhbHVlOiBUZXh0RmllbGQ7XG4gIHByaXZhdGUgcHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZmllbGRWYWx1ZSA9IDxUZXh0RmllbGQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKCdmaWVsZFZhbHVlJyk7XG4gIH1cblxuICB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XG4gICAgaWYgKG9iaikge1xuICAgICAgdGhpcy5pbnB1dFZhbHVlID0gb2JqO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7fVxuICBzZXREaXNhYmxlZFN0YXRlPyhpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7fVxuXG4gIGNoYW5nZVZhbHVlKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAoZXZlbnQub2JqZWN0LnRleHQpIHtcbiAgICAgIGxldCB2OiBzdHJpbmcgPSBldmVudC5vYmplY3QudGV4dDtcblxuICAgICAgdiA9IHYucmVwbGFjZSgvXFxEL2csICcnKTsgLy8gUmVtb3ZlIHR1ZG8gbyBxdWUgbsOjbyDDqSBkw61naXRvXG5cbiAgICAgIGlmICh2Lmxlbmd0aCA8PSA1KSB7XG4gICAgICAgIHYgPSB2LnJlcGxhY2UoL14oXFxkezJ9KShcXGR7MSwzfSkvLCAnKCQxKSAkMicpOyAvLyBTZXBhcmEgbyBEREQgZG8gdGVsZWZvbmVcbiAgICAgIH0gZWxzZSBpZiAodi5sZW5ndGggPiA2ICYmIHYubGVuZ3RoIDw9IDEwKSB7XG4gICAgICAgIHYgPSB2LnJlcGxhY2UoLyhcXGR7Mn0pKFxcZHsxLDR9KShcXGR7MSw0fSkvLCAnKCQxKSAkMi0kMycpOyAvLyBTZXBhcmEgbyBEREQgZSBhanVzdGEgb3MgZGlnaXRvcyBkbyBjZWx1bGFyXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2ID0gdi5yZXBsYWNlKC8oXFxkezJ9KShcXGR7MSw1fSkoXFxkezEsNH0pLywgJygkMSkgJDItJDMnKTsgLy8gU2VwYXJhIG8gREREIGUgYWp1c3RhIG9zIGRpZ2l0b3MgZG8gY2VsdWxhclxuICAgICAgfVxuXG4gICAgICBpZiAodi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IHY7XG4gICAgICBpZiAodGhpcy5wYWdlLmFuZHJvaWQpIHtcbiAgICAgICAgdGhpcy5maWVsZFZhbHVlLmFuZHJvaWQuc2V0U2VsZWN0aW9uKHRoaXMuZmllbGRWYWx1ZS5hbmRyb2lkLmxlbmd0aCgpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzZXRlZFZhbHVlID0gdGhpcy5wcmVwYXJlVG9Qcm9wYWdhdGUodik7XG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShyZXNldGVkVmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGZvY3VzT3V0KGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmJsdXIuZW1pdChldmVudCk7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVUb1Byb3BhZ2F0ZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcRC8sICcnKS50cmltKCk7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXEQvLCAnJykudHJpbSgpO1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgnICcsICcnKS50cmltKCk7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCctJywgJycpLnRyaW0oKTsgLy8gcGFyYSBjb250ZXIgbyBidWcgZG8gcmVwbGFjZVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iXX0=