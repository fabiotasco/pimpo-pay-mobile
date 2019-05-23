"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var page_1 = require("tns-core-modules/ui/page/page");
var NativescriptDocumentMaskComponent = /** @class */ (function () {
    function NativescriptDocumentMaskComponent(page) {
        this.page = page;
        this.type = DocumentType.CPF;
        this.returnKeyType = 'next';
        this.fieldId = 'default';
        this.required = false;
        this.name = 'default';
        this.fieldHint = 'Conteudo';
        this.returnPress = new core_1.EventEmitter();
        this.onTextChange = new core_1.EventEmitter();
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
        this.onTextChange.emit(noFormatText);
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
            this.propagateOnChange(noFormatText);
        }
    };
    NativescriptDocumentMaskComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.value =
                obj.length === 11 ? this.formatToCpf(obj) : this.formatToCnpj(obj);
        }
    };
    NativescriptDocumentMaskComponent.prototype.returnKeyPress = function (event) {
        this.returnPress.emit(event);
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
        var textField = this.page.getViewById(this.fieldId);
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
        __metadata("design:type", Object)
    ], NativescriptDocumentMaskComponent.prototype, "returnKeyType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NativescriptDocumentMaskComponent.prototype, "fieldId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NativescriptDocumentMaskComponent.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NativescriptDocumentMaskComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NativescriptDocumentMaskComponent.prototype, "fieldHint", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NativescriptDocumentMaskComponent.prototype, "returnPress", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NativescriptDocumentMaskComponent.prototype, "onTextChange", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlc2NyaXB0LWRvY3VtZW50LW1hc2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmF0aXZlc2NyaXB0LWRvY3VtZW50LW1hc2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBT3VCO0FBQ3ZCLHdDQUF5RTtBQUV6RSxzREFBcUQ7QUFjckQ7SUFrQkUsMkNBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBZnJCLFNBQUksR0FBaUIsWUFBWSxDQUFDLEdBQUcsQ0FBQztRQUN0QyxrQkFBYSxHQUFHLE1BQU0sQ0FBQztRQUN2QixZQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3BCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsU0FBSSxHQUFHLFNBQVMsQ0FBQztRQUNqQixjQUFTLEdBQUcsVUFBVSxDQUFDO1FBR2hDLGdCQUFXLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFHakMsaUJBQVksR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUVsQyxVQUFLLEdBQUcsRUFBRSxDQUFDO0lBRXNCLENBQUM7MENBbEJ2QixpQ0FBaUM7SUFvQjVDLG9EQUFRLEdBQVIsY0FBa0IsQ0FBQztJQUduQix1REFBVyxHQUFYLFVBQVksS0FBVTtRQUNwQixJQUFJLFlBQVksR0FBVyxFQUFFLENBQUM7UUFDOUIsSUFBSSxZQUFpQixDQUFDO1FBQ3RCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDckIsWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2pDLFlBQVksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFckMsSUFBSSxZQUFZLENBQUMsTUFBTSxJ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QUFDO3lDQW1CMEIsV0FBSTtPQWxCbkIsaUNBQWlDLENBNkg3QztJQUFELHdDQUFDO0NBQUEsQUE3SEQsSUE2SEM7QUE3SFksOEVBQWlDO0FBK0g5QyxJQUFZLFlBSVg7QUFKRCxXQUFZLFlBQVk7SUFDdEIsMkJBQVcsQ0FBQTtJQUNYLDZCQUFhLENBQUE7SUFDYiwrQkFBZSxDQUFBO0FBQ2pCLENBQUMsRUFKVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQUl2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgZm9yd2FyZFJlZixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtZmllbGQvdGV4dC1maWVsZCc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdUZXh0RmllbGREb2N1bWVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9uYXRpdmVzY3JpcHQtZG9jdW1lbnQtbWFzay5jb21wb25lbnQuaHRtbCcsXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmF0aXZlc2NyaXB0RG9jdW1lbnRNYXNrQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5hdGl2ZXNjcmlwdERvY3VtZW50TWFza0NvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKSBjbGFzc05hbWU6IHN0cmluZztcbiAgQElucHV0KCkgdHlwZTogRG9jdW1lbnRUeXBlID0gRG9jdW1lbnRUeXBlLkNQRjtcbiAgQElucHV0KCkgcmV0dXJuS2V5VHlwZSA9ICduZXh0JztcbiAgQElucHV0KCkgZmllbGRJZCA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgcmVxdWlyZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgbmFtZSA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgZmllbGRIaW50ID0gJ0NvbnRldWRvJztcblxuICBAT3V0cHV0KClcbiAgcmV0dXJuUHJlc3MgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpXG4gIG9uVGV4dENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICB2YWx1ZSA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHt9XG4gIHByaXZhdGUgcHJvcGFnYXRlT25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuXG4gIGNoYW5nZUV2ZW50KGV2ZW50OiBhbnkpIHtcbiAgICBsZXQgbm9Gb3JtYXRUZXh0OiBzdHJpbmcgPSAnJztcbiAgICBsZXQgZGVmYXVsdFZhbHVlOiBhbnk7XG4gICAgaWYgKGV2ZW50Lm9iamVjdC50ZXh0KSB7XG4gICAgICBkZWZhdWx0VmFsdWUgPSBldmVudC5vYmplY3QudGV4dDtcbiAgICAgIG5vRm9ybWF0VGV4dCA9IGV2ZW50Lm9iamVjdC50ZXh0LnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gICAgfVxuICAgIHRoaXMub25UZXh0Q2hhbmdlLmVtaXQobm9Gb3JtYXRUZXh0KTtcblxuICAgIGlmIChub0Zvcm1hdFRleHQubGVuZ3RoIDw9IDExICYmIHRoaXMudHlwZSAhPT0gRG9jdW1lbnRUeXBlLlBIT05FKSB7XG4gICAgICB0aGlzLnR5cGUgPSBEb2N1bWVudFR5cGUuQ1BGO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBub0Zvcm1hdFRleHQubGVuZ3RoID4gMTEgJiZcbiAgICAgIG5vRm9ybWF0VGV4dC5sZW5ndGggPD0gMTUgJiZcbiAgICAgIHRoaXMudHlwZSAhPT0gRG9jdW1lbnRUeXBlLlBIT05FXG4gICAgKSB7XG4gICAgICB0aGlzLnR5cGUgPSBEb2N1bWVudFR5cGUuQ05QSjtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSAhPT0gRG9jdW1lbnRUeXBlLlBIT05FKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gRG9jdW1lbnRUeXBlLkNQRikge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZm9ybWF0VG9DcGYobm9Gb3JtYXRUZXh0KTtcbiAgICAgIHRoaXMuc2V0Rm9jdXNQb3NpdGlvblRvRmluaXNoKCk7XG4gICAgICB0aGlzLnByb3BhZ2F0ZU9uQ2hhbmdlKHRoaXMudmFsdWUucmVwbGFjZSgvXFxEL2csICcnKSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IERvY3VtZW50VHlwZS5DTlBKKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5mb3JtYXRUb0NucGoobm9Gb3JtYXRUZXh0KTtcbiAgICAgIHRoaXMuc2V0Rm9jdXNQb3NpdGlvblRvRmluaXNoKCk7XG4gICAgICB0aGlzLnByb3BhZ2F0ZU9uQ2hhbmdlKHRoaXMudmFsdWUucmVwbGFjZSgvXFxEL2csICcnKSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IERvY3VtZW50VHlwZS5QSE9ORSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZm9ybWF0VG9QaG9uZShub0Zvcm1hdFRleHQpO1xuICAgICAgdGhpcy5zZXRGb2N1c1Bvc2l0aW9uVG9GaW5pc2goKTtcbiAgICAgIHRoaXMucHJvcGFnYXRlT25DaGFuZ2Uobm9Gb3JtYXRUZXh0KTtcbiAgICB9XG4gIH1cblxuICB3cml0ZVZhbHVlKG9iajogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKG9iaikge1xuICAgICAgdGhpcy52YWx1ZSA9XG4gICAgICAgIG9iai5sZW5ndGggPT09IDExID8gdGhpcy5mb3JtYXRUb0NwZihvYmopIDogdGhpcy5mb3JtYXRUb0NucGoob2JqKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm5LZXlQcmVzcyhldmVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5yZXR1cm5QcmVzcy5lbWl0KGV2ZW50KTtcbiAgfVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnByb3BhZ2F0ZU9uQ2hhbmdlID0gZm47XG4gIH1cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIC8vIHRvZG9cbiAgfVxuICBzZXREaXNhYmxlZFN0YXRlPyhpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgLy8gdG9kb1xuICB9XG5cbiAgcHVibGljIGdldE1heFNpemUoKTogc3RyaW5nIHtcbiAgICBjb25zdCBzaXplcyA9IHtcbiAgICAgIGNwZjogMTgsXG4gICAgICBjbnBqOiAxOCxcbiAgICAgIHBob25lOiAxM1xuICAgIH07XG5cbiAgICByZXR1cm4gc2l6ZXNbdGhpcy50eXBlLnRvU3RyaW5nKCldO1xuICB9XG4gIHByaXZhdGUgZm9ybWF0VG9DcGYodjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB2ID0gdi5yZXBsYWNlKC9cXEQvZywgJycpOyAvLyBSZW1vdmUgdHVkbyBvIHF1ZSBuw6NvIMOpIGTDrWdpdG9cbiAgICB2ID0gdi5yZXBsYWNlKC8oXFxkezN9KShcXGQpLywgJyQxLiQyJyk7IC8vIENvbG9jYSB1bSBwb250byBlbnRyZSBvIHRlcmNlaXJvIGUgbyBxdWFydG8gZMOtZ2l0b3NcbiAgICB2ID0gdi5yZXBsYWNlKC8oXFxkezN9KShcXGQpLywgJyQxLiQyJyk7IC8vIENvbG9jYSB1bSBwb250byBlbnRyZSBvIHRlcmNlaXJvIGUgbyBxdWFydG8gZMOtZ2l0b3NcbiAgICAvLyBkZSBub3ZvIChwYXJhIG8gc2VndW5kbyBibG9jbyBkZSBuw7ptZXJvcylcbiAgICB2ID0gdi5yZXBsYWNlKC8oXFxkezN9KShcXGR7MSwyfSkkLywgJyQxLSQyJyk7IC8vIENvbG9jYSB1bSBow61mZW4gZW50cmUgbyB0ZXJjZWlybyBlIG8gcXVhcnRvIGTDrWdpdG9zXG5cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0VG9DbnBqKHY6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdiA9IHYucmVwbGFjZSgvXFxEL2csICcnKTsgLy8gUmVtb3ZlIHR1ZG8gbyBxdWUgbsOjbyDDqSBkw61naXRvXG4gICAgdiA9IHYucmVwbGFjZSgvXihcXGR7Mn0pKFxcZCkvLCAnJDEuJDInKTsgLy8gQ29sb2NhIHBvbnRvIGVudHJlIG8gc2VndW5kbyBlIG8gdGVyY2Vpcm8gZMOtZ2l0b3NcbiAgICB2ID0gdi5yZXBsYWNlKC9eKFxcZHsyfSlcXC4oXFxkezN9KShcXGQpLywgJyQxLiQyLiQzJyk7IC8vIENvbG9jYSBwb250byBlbnRyZSBvIHF1aW50byBlIG8gc2V4dG8gZMOtZ2l0b3NcbiAgICB2ID0gdi5yZXBsYWNlKC9cXC4oXFxkezN9KShcXGQpLywgJy4kMS8kMicpOyAvLyBDb2xvY2EgdW1hIGJhcnJhIGVudHJlIG8gb2l0YXZvIGUgbyBub25vIGTDrWdpdG9zXG4gICAgdiA9IHYucmVwbGFjZSgvKFxcZHs0fSkoXFxkKS8sICckMS0kMicpOyAvLyBDb2xvY2EgdW0gaMOtZmVuIGRlcG9pcyBkbyBibG9jbyBkZSBxdWF0cm8gZMOtZ2l0b3NcbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0VG9QaG9uZSh2OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHYgPSB2LnJlcGxhY2UoL1xcRC9nLCAnJykudHJpbSgpOyAvLyBSZW1vdmUgdHVkbyBvIHF1ZSBuw6NvIMOpIGTDrWdpdG9cblxuICAgIGlmICh2Lmxlbmd0aCA8PSA3KSB7XG4gICAgICB2ID0gdi5yZXBsYWNlKC9eKFxcZHsyfSkoXFxkezEsNH0pLywgJyQxICQyJyk7IC8vIFNlcGFyYSBvIERERCBkbyB0ZWxlZm9uZVxuICAgIH0gZWxzZSBpZiAodi5sZW5ndGggPiA3KSB7XG4gICAgICB2ID0gdi5yZXBsYWNlKC8oXFxkezJ9KShcXGR7MSw1fSkoXFxkezEsNH0pLywgJyQxICQyLSQzJyk7IC8vIFNlcGFyYSBvIERERCBlIGFqdXN0YSBvcyBkaWdpdG9zIGRvIGNlbHVsYXJcbiAgICB9XG5cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Rm9jdXNQb3NpdGlvblRvRmluaXNoKCk6IHZvaWQge1xuICAgIGNvbnN0IHRleHRGaWVsZCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCh0aGlzLmZpZWxkSWQpO1xuICAgIGlmICh0ZXh0RmllbGQgJiYgdGhpcy5wYWdlLmFuZHJvaWQpIHtcbiAgICAgIHRleHRGaWVsZC5hbmRyb2lkLnNldFNlbGVjdGlvbih0ZXh0RmllbGQuYW5kcm9pZC5sZW5ndGgoKSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBlbnVtIERvY3VtZW50VHlwZSB7XG4gIENQRiA9ICdjcGYnLFxuICBDTlBKID0gJ2NucGonLFxuICBQSE9ORSA9ICdwaG9uZSdcbn1cbiJdfQ==