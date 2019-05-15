"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var page_1 = require("tns-core-modules/ui/page/page");
var NativescriptDocumentMaskComponent = /** @class */ (function () {
    function NativescriptDocumentMaskComponent(page) {
        this.page = page;
        this.type = DocumentType.CPF;
        this.required = false;
        this.value = '';
    }
    NativescriptDocumentMaskComponent_1 = NativescriptDocumentMaskComponent;
    NativescriptDocumentMaskComponent.prototype.ngOnInit = function () { };
    NativescriptDocumentMaskComponent.prototype.changeEvent = function (event) {
        var noFormatText = '';
        var defaultValue;
        if (event.object.text) {
            defaultValue = event.object.text;
            noFormatText = event.object.text.replace(/\D/g, '');
        }
        if (noFormatText.length <= 11 && this.type !== DocumentType.PHONE) {
            this.type = DocumentType.CPF;
        }
        else if (noFormatText.length > 11 &&
            noFormatText.length <= 15 &&
            this.type !== DocumentType.PHONE) {
            this.type = DocumentType.CNPJ;
        }
        else if (this.type !== DocumentType.PHONE) {
            return;
        }
        if (this.type === DocumentType.CPF) {
            this.value = this.formatToCpf(noFormatText);
            this.setFocusPositionToFinish();
            this.propagateOnChange(this.value.replace(/\D/g, ''));
        }
        else if (this.type === DocumentType.CNPJ) {
            this.value = this.formatToCnpj(noFormatText);
            this.setFocusPositionToFinish();
            this.propagateOnChange(this.value.replace(/\D/g, ''));
        }
        else if (this.type === DocumentType.PHONE) {
            this.value = this.formatToPhone(noFormatText);
            this.setFocusPositionToFinish();
            this.propagateOnChange(this.value.replace(/\D/g, ''));
        }
    };
    NativescriptDocumentMaskComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.value =
                obj.length === 11 ? this.formatToCpf(obj) : this.formatToCnpj(obj);
        }
    };
    NativescriptDocumentMaskComponent.prototype.registerOnChange = function (fn) {
        this.propagateOnChange = fn;
    };
    NativescriptDocumentMaskComponent.prototype.registerOnTouched = function (fn) {
        // todo
    };
    NativescriptDocumentMaskComponent.prototype.setDisabledState = function (isDisabled) {
        // todo
    };
    NativescriptDocumentMaskComponent.prototype.getMaxSize = function () {
        var sizes = {
            cpf: 18,
            cnpj: 18,
            phone: 13
        };
        return sizes[this.type.toString()];
    };
    NativescriptDocumentMaskComponent.prototype.formatToCpf = function (v) {
        v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
        v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
        // de novo (para o segundo bloco de números)
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen entre o terceiro e o quarto dígitos
        return v;
    };
    NativescriptDocumentMaskComponent.prototype.formatToCnpj = function (v) {
        v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
        v = v.replace(/^(\d{2})(\d)/, '$1.$2'); // Coloca ponto entre o segundo e o terceiro dígitos
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Coloca ponto entre o quinto e o sexto dígitos
        v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); // Coloca uma barra entre o oitavo e o nono dígitos
        v = v.replace(/(\d{4})(\d)/, '$1-$2'); // Coloca um hífen depois do bloco de quatro dígitos
        return v;
    };
    NativescriptDocumentMaskComponent.prototype.formatToPhone = function (v) {
        v = v.replace(/\D/g, '').trim(); // Remove tudo o que não é dígito
        if (v.length <= 7) {
            v = v.replace(/^(\d{2})(\d{1,4})/, '$1 $2'); // Separa o DDD do telefone
        }
        else if (v.length > 7) {
            v = v.replace(/(\d{2})(\d{1,5})(\d{1,4})/, '$1 $2-$3'); // Separa o DDD e ajusta os digitos do celular
        }
        return v;
    };
    NativescriptDocumentMaskComponent.prototype.setFocusPositionToFinish = function () {
        var textField = this.page.getViewById(this.id);
        if (textField && this.page.android) {
            textField.android.setSelection(textField.android.length());
        }
    };
    var NativescriptDocumentMaskComponent_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NativescriptDocumentMaskComponent.prototype, "className", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NativescriptDocumentMaskComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NativescriptDocumentMaskComponent.prototype, "row", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NativescriptDocumentMaskComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NativescriptDocumentMaskComponent.prototype, "col", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NativescriptDocumentMaskComponent.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NativescriptDocumentMaskComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NativescriptDocumentMaskComponent.prototype, "hint", void 0);
    NativescriptDocumentMaskComponent = NativescriptDocumentMaskComponent_1 = __decorate([
        core_1.Component({
            selector: 'TextFieldDocument',
            templateUrl: './nativescript-document-mask.component.html',
            moduleId: module.id,
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return NativescriptDocumentMaskComponent_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], NativescriptDocumentMaskComponent);
    return NativescriptDocumentMaskComponent;
}());
exports.NativescriptDocumentMaskComponent = NativescriptDocumentMaskComponent;
var DocumentType;
(function (DocumentType) {
    DocumentType["CPF"] = "cpf";
    DocumentType["CNPJ"] = "cnpj";
    DocumentType["PHONE"] = "phone";
})(DocumentType = exports.DocumentType || (exports.DocumentType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlc2NyaXB0LWRvY3VtZW50LW1hc2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmF0aXZlc2NyaXB0LWRvY3VtZW50LW1hc2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXFFO0FBQ3JFLHdDQUF5RTtBQUV6RSxzREFBcUQ7QUFjckQ7SUFhRSwyQ0FBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFWckIsU0FBSSxHQUFpQixZQUFZLENBQUMsR0FBRyxDQUFDO1FBSXRDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFJMUIsVUFBSyxHQUFHLEVBQUUsQ0FBQztJQUVzQixDQUFDOzBDQWJ2QixpQ0FBaUM7SUFlNUMsb0RBQVEsR0FBUixjQUFrQixDQUFDO0lBR25CLHVEQUFXLEdBQVgsVUFBWSxLQUFVO1FBQ3BCLElBQUksWUFBWSxHQUFXLEVBQUUsQ0FBQztRQUM5QixJQUFJLFlBQVksQ0FBQztRQUNqQixJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ3JCLFlBQVksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNqQyxZQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNyRDtRQUVELElBQUksWUFBWSxDQUFDLE1BQU0sSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsS0FBSyxFQUFFO1lBQ2pFLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQztTQUM5QjthQUFNLElBQ0wsWUFBWSxDQUFDLE1BQU0sR0FBRyxFQUFFO1lBQ3hCLFlBQVksQ0FBQyxNQUFNLElBQUksRUFBRTtZQUN6QixJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxLQUFLLEVBQ2hDO1lBQ0EsSUFBSSxDQUFDLElB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Q0FBQyxPQUFPLEVBQUU7WUFDbEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQzVEO0lBQ0gsQ0FBQzs7SUFoSFE7UUFBUixZQUFLLEVBQUU7O3dFQUFtQjtJQUNsQjtRQUFSLFlBQUssRUFBRTs7bUVBQXVDO0lBQ3RDO1FBQVIsWUFBSyxFQUFFOztrRUFBYTtJQUNaO1FBQVIsWUFBSyxFQUFFOztpRUFBWTtJQUNYO1FBQVIsWUFBSyxFQUFFOztrRUFBYTtJQUNaO1FBQVIsWUFBSyxFQUFFOzt1RUFBa0I7SUFDakI7UUFBUixZQUFLLEVBQUU7O21FQUFjO0lBQ2I7UUFBUixZQUFLLEVBQUU7O21FQUFjO0lBVFgsaUNBQWlDO1FBWjdDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSw2Q0FBNkM7WUFDMUQsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUseUJBQWlCO29CQUMxQixXQUFXLEVBQUUsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsbUNBQWlDLEVBQWpDLENBQWlDLENBQUM7b0JBQ2hFLEtBQUssRUFBRSxJQUFJO2lCQUNaO2FBQ0Y7U0FDRixDQUFDO3lDQWMwQixXQUFJO09BYm5CLGlDQUFpQyxDQW1IN0M7SUFBRCx3Q0FBQztDQUFBLEFBbkhELElBbUhDO0FBbkhZLDhFQUFpQztBQXFIOUMsSUFBWSxZQUlYO0FBSkQsV0FBWSxZQUFZO0lBQ3RCLDJCQUFXLENBQUE7SUFDWCw2QkFBYSxDQUFBO0lBQ2IsK0JBQWUsQ0FBQTtBQUNqQixDQUFDLEVBSlcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFJdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC1maWVsZC90ZXh0LWZpZWxkJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1RleHRGaWVsZERvY3VtZW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuL25hdGl2ZXNjcmlwdC1kb2N1bWVudC1tYXNrLmNvbXBvbmVudC5odG1sJyxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOYXRpdmVzY3JpcHREb2N1bWVudE1hc2tDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmF0aXZlc2NyaXB0RG9jdW1lbnRNYXNrQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpIGNsYXNzTmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSB0eXBlOiBEb2N1bWVudFR5cGUgPSBEb2N1bWVudFR5cGUuQ1BGO1xuICBASW5wdXQoKSByb3c6IG51bWJlcjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgY29sOiBudW1iZXI7XG4gIEBJbnB1dCgpIHJlcXVpcmVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgaGludDogc3RyaW5nO1xuXG4gIHZhbHVlID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cbiAgcHJpdmF0ZSBwcm9wYWdhdGVPbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG5cbiAgY2hhbmdlRXZlbnQoZXZlbnQ6IGFueSkge1xuICAgIGxldCBub0Zvcm1hdFRleHQ6IHN0cmluZyA9ICcnO1xuICAgIGxldCBkZWZhdWx0VmFsdWU7XG4gICAgaWYgKGV2ZW50Lm9iamVjdC50ZXh0KSB7XG4gICAgICBkZWZhdWx0VmFsdWUgPSBldmVudC5vYmplY3QudGV4dDtcbiAgICAgIG5vRm9ybWF0VGV4dCA9IGV2ZW50Lm9iamVjdC50ZXh0LnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gICAgfVxuXG4gICAgaWYgKG5vRm9ybWF0VGV4dC5sZW5ndGggPD0gMTEgJiYgdGhpcy50eXBlICE9PSBEb2N1bWVudFR5cGUuUEhPTkUpIHtcbiAgICAgIHRoaXMudHlwZSA9IERvY3VtZW50VHlwZS5DUEY7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIG5vRm9ybWF0VGV4dC5sZW5ndGggPiAxMSAmJlxuICAgICAgbm9Gb3JtYXRUZXh0Lmxlbmd0aCA8PSAxNSAmJlxuICAgICAgdGhpcy50eXBlICE9PSBEb2N1bWVudFR5cGUuUEhPTkVcbiAgICApIHtcbiAgICAgIHRoaXMudHlwZSA9IERvY3VtZW50VHlwZS5DTlBKO1xuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlICE9PSBEb2N1bWVudFR5cGUuUEhPTkUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy50eXBlID09PSBEb2N1bWVudFR5cGUuQ1BGKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5mb3JtYXRUb0NwZihub0Zvcm1hdFRleHQpO1xuICAgICAgdGhpcy5zZXRGb2N1c1Bvc2l0aW9uVG9GaW5pc2goKTtcbiAgICAgIHRoaXMucHJvcGFnYXRlT25DaGFuZ2UodGhpcy52YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gRG9jdW1lbnRUeXBlLkNOUEopIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmZvcm1hdFRvQ25waihub0Zvcm1hdFRleHQpO1xuICAgICAgdGhpcy5zZXRGb2N1c1Bvc2l0aW9uVG9GaW5pc2goKTtcbiAgICAgIHRoaXMucHJvcGFnYXRlT25DaGFuZ2UodGhpcy52YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gRG9jdW1lbnRUeXBlLlBIT05FKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5mb3JtYXRUb1Bob25lKG5vRm9ybWF0VGV4dCk7XG4gICAgICB0aGlzLnNldEZvY3VzUG9zaXRpb25Ub0ZpbmlzaCgpO1xuICAgICAgdGhpcy5wcm9wYWdhdGVPbkNoYW5nZSh0aGlzLnZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJykpO1xuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUob2JqOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAob2JqKSB7XG4gICAgICB0aGlzLnZhbHVlID1cbiAgICAgICAgb2JqLmxlbmd0aCA9PT0gMTEgPyB0aGlzLmZvcm1hdFRvQ3BmKG9iaikgOiB0aGlzLmZvcm1hdFRvQ25waihvYmopO1xuICAgIH1cbiAgfVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnByb3BhZ2F0ZU9uQ2hhbmdlID0gZm47XG4gIH1cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIC8vIHRvZG9cbiAgfVxuICBzZXREaXNhYmxlZFN0YXRlPyhpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgLy8gdG9kb1xuICB9XG5cbiAgcHVibGljIGdldE1heFNpemUoKTogc3RyaW5nIHtcbiAgICBjb25zdCBzaXplcyA9IHtcbiAgICAgIGNwZjogMTgsXG4gICAgICBjbnBqOiAxOCxcbiAgICAgIHBob25lOiAxM1xuICAgIH07XG5cbiAgICByZXR1cm4gc2l6ZXNbdGhpcy50eXBlLnRvU3RyaW5nKCldO1xuICB9XG4gIHByaXZhdGUgZm9ybWF0VG9DcGYodjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB2ID0gdi5yZXBsYWNlKC9cXEQvZywgJycpOyAvLyBSZW1vdmUgdHVkbyBvIHF1ZSBuw6NvIMOpIGTDrWdpdG9cbiAgICB2ID0gdi5yZXBsYWNlKC8oXFxkezN9KShcXGQpLywgJyQxLiQyJyk7IC8vIENvbG9jYSB1bSBwb250byBlbnRyZSBvIHRlcmNlaXJvIGUgbyBxdWFydG8gZMOtZ2l0b3NcbiAgICB2ID0gdi5yZXBsYWNlKC8oXFxkezN9KShcXGQpLywgJyQxLiQyJyk7IC8vIENvbG9jYSB1bSBwb250byBlbnRyZSBvIHRlcmNlaXJvIGUgbyBxdWFydG8gZMOtZ2l0b3NcbiAgICAvLyBkZSBub3ZvIChwYXJhIG8gc2VndW5kbyBibG9jbyBkZSBuw7ptZXJvcylcbiAgICB2ID0gdi5yZXBsYWNlKC8oXFxkezN9KShcXGR7MSwyfSkkLywgJyQxLSQyJyk7IC8vIENvbG9jYSB1bSBow61mZW4gZW50cmUgbyB0ZXJjZWlybyBlIG8gcXVhcnRvIGTDrWdpdG9zXG5cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0VG9DbnBqKHY6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdiA9IHYucmVwbGFjZSgvXFxEL2csICcnKTsgLy8gUmVtb3ZlIHR1ZG8gbyBxdWUgbsOjbyDDqSBkw61naXRvXG4gICAgdiA9IHYucmVwbGFjZSgvXihcXGR7Mn0pKFxcZCkvLCAnJDEuJDInKTsgLy8gQ29sb2NhIHBvbnRvIGVudHJlIG8gc2VndW5kbyBlIG8gdGVyY2Vpcm8gZMOtZ2l0b3NcbiAgICB2ID0gdi5yZXBsYWNlKC9eKFxcZHsyfSlcXC4oXFxkezN9KShcXGQpLywgJyQxLiQyLiQzJyk7IC8vIENvbG9jYSBwb250byBlbnRyZSBvIHF1aW50byBlIG8gc2V4dG8gZMOtZ2l0b3NcbiAgICB2ID0gdi5yZXBsYWNlKC9cXC4oXFxkezN9KShcXGQpLywgJy4kMS8kMicpOyAvLyBDb2xvY2EgdW1hIGJhcnJhIGVudHJlIG8gb2l0YXZvIGUgbyBub25vIGTDrWdpdG9zXG4gICAgdiA9IHYucmVwbGFjZSgvKFxcZHs0fSkoXFxkKS8sICckMS0kMicpOyAvLyBDb2xvY2EgdW0gaMOtZmVuIGRlcG9pcyBkbyBibG9jbyBkZSBxdWF0cm8gZMOtZ2l0b3NcbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0VG9QaG9uZSh2OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHYgPSB2LnJlcGxhY2UoL1xcRC9nLCAnJykudHJpbSgpOyAvLyBSZW1vdmUgdHVkbyBvIHF1ZSBuw6NvIMOpIGTDrWdpdG9cblxuICAgIGlmICh2Lmxlbmd0aCA8PSA3KSB7XG4gICAgICB2ID0gdi5yZXBsYWNlKC9eKFxcZHsyfSkoXFxkezEsNH0pLywgJyQxICQyJyk7IC8vIFNlcGFyYSBvIERERCBkbyB0ZWxlZm9uZVxuICAgIH0gZWxzZSBpZiAodi5sZW5ndGggPiA3KSB7XG4gICAgICB2ID0gdi5yZXBsYWNlKC8oXFxkezJ9KShcXGR7MSw1fSkoXFxkezEsNH0pLywgJyQxICQyLSQzJyk7IC8vIFNlcGFyYSBvIERERCBlIGFqdXN0YSBvcyBkaWdpdG9zIGRvIGNlbHVsYXJcbiAgICB9XG5cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Rm9jdXNQb3NpdGlvblRvRmluaXNoKCk6IHZvaWQge1xuICAgIGNvbnN0IHRleHRGaWVsZCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCh0aGlzLmlkKTtcbiAgICBpZiAodGV4dEZpZWxkICYmIHRoaXMucGFnZS5hbmRyb2lkKSB7XG4gICAgICB0ZXh0RmllbGQuYW5kcm9pZC5zZXRTZWxlY3Rpb24odGV4dEZpZWxkLmFuZHJvaWQubGVuZ3RoKCkpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZW51bSBEb2N1bWVudFR5cGUge1xuICBDUEYgPSAnY3BmJyxcbiAgQ05QSiA9ICdjbnBqJyxcbiAgUEhPTkUgPSAncGhvbmUnXG59XG4iXX0=