"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var toast_helper_service_1 = require("./toast-helper.service");
var HttpClientCustom = /** @class */ (function () {
    function HttpClientCustom(httpClient, toastHelper) {
        this.httpClient = httpClient;
        this.toastHelper = toastHelper;
    }
    HttpClientCustom.prototype.search = function (url, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        var httpOptions = this.buildHttpOptions(params, headers);
        return this.httpClient.get(url, {
            headers: httpOptions.headers,
            params: httpOptions.params,
            withCredentials: true
        });
    };
    HttpClientCustom.prototype.find = function (url, key, headers) {
        if (headers === void 0) { headers = {}; }
        var httpOptions = this.buildHttpOptions(null, headers);
        return this.httpClient.get(url + "/" + key, {
            headers: httpOptions.headers,
            withCredentials: true
        });
    };
    HttpClientCustom.prototype.save = function (url, persistObj, primaryKey, headers) {
        var _this = this;
        if (primaryKey === void 0) { primaryKey = null; }
        if (headers === void 0) { headers = {}; }
        var httpOptions = this.buildHttpOptions(null, headers);
        var key = this.getPrimaryKeyValue(primaryKey, persistObj);
        if (!key) {
            return this.httpClient
                .post(url, persistObj, {
                headers: httpOptions.headers,
                withCredentials: true
            })
                .pipe(operators_1.catchError(function (err) { return _this.errorHandler(err); }));
        }
        else {
            return this.httpClient
                .put(url, persistObj, {
                headers: httpOptions.headers,
                withCredentials: true
            })
                .pipe(operators_1.catchError(function (err) { return _this.errorHandler(err); }));
        }
    };
    HttpClientCustom.prototype.action = function (url, data, headers) {
        var _this = this;
        if (headers === void 0) { headers = {}; }
        var httpOptions = this.buildHttpOptions(null, headers);
        return this.httpClient
            .post(url, data, { headers: httpOptions.headers })
            .pipe(operators_1.catchError(function (err) { return _this.errorHandler(err); }));
    };
    HttpClientCustom.prototype.deactivate = function (url, headers) {
        var _this = this;
        if (headers === void 0) { headers = {}; }
        var httpOptions = this.buildHttpOptions(null, headers);
        return this.httpClient
            .delete("" + url, {
            headers: httpOptions.headers,
            params: httpOptions.params,
            withCredentials: true
        })
            .pipe(operators_1.catchError(function (err) { return _this.errorHandler(err); }));
    };
    HttpClientCustom.prototype.buildHttpOptions = function (params, headers) {
        var httpParams = new http_1.HttpParams();
        var httpHeaders = new http_1.HttpHeaders();
        if (params) {
            Object.keys(params).forEach(function (key) {
                httpParams = httpParams.append(key, params[key]);
            });
        }
        if (headers) {
            Object.keys(headers).forEach(function (key) {
                httpHeaders = httpHeaders.append(key, headers[key]);
            });
        }
        return {
            params: httpParams,
            headers: httpHeaders
        };
    };
    HttpClientCustom.prototype.getPrimaryKeyValue = function (primaryKey, persistObj) {
        var value = persistObj.id;
        if (primaryKey) {
            Object.keys(persistObj).forEach(function (key) {
                if (key === primaryKey) {
                    value = persistObj[key];
                }
            });
        }
        return value;
    };
    HttpClientCustom.prototype.errorHandler = function (err) {
        this.toastHelper.showToast(err.status + " " + err.statusText);
        return err.message;
    };
    HttpClientCustom = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [http_1.HttpClient,
            toast_helper_service_1.ToastHelperService])
    ], HttpClientCustom);
    return HttpClientCustom;
}());
exports.HttpClientCustom = HttpClientCustom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jbGllbnQtY3VzdG9tLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodHRwLWNsaWVudC1jdXN0b20uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw2Q0FBMkU7QUFHM0UsNENBQTRDO0FBQzVDLCtEQUE0RDtBQUc1RDtJQUNFLDBCQUNTLFVBQXNCLEVBQ3JCLFdBQStCO1FBRGhDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDckIsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO0lBQ3RDLENBQUM7SUFFRyxpQ0FBTSxHQUFiLFVBQ0UsR0FBRyxFQUNILE1BQWdCLEVBQ2hCLE9BQWlCO1FBRGpCLHVCQUFBLEVBQUEsV0FBZ0I7UUFDaEIsd0JBQUEsRUFBQSxZQUFpQjtRQUVqQixJQUFJLFdBQVcsR0FBZ0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV0RSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFNLEdBQUcsRUFBRTtZQUNuQyxPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU87WUFDNUIsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNO1lBQzFCLGVBQWUsRUFBRSxJQUFJO1NBQ3RCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSwrQkFBSSxHQUFYLFVBQVksR0FBRyxFQUFFLEdBQVEsRUFBRSxPQUFpQjtRQUFqQix3QkFBQSxFQUFBLFlBQWlCO1FBQzFDLElBQUksV0FBVyxHQUFnQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXBFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQVMsR0FBRyxTQUFJLEdBQUssRUFBRTtZQUMvQyxPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU87WUFDNUIsZUFBZSxFQUFFLElBQUk7U0FDdEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLCtCQUFJ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Y2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zLCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL2h0dHAtb3B0aW9ucyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVG9hc3RIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi90b2FzdC1oZWxwZXIuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgSHR0cENsaWVudEN1c3RvbSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgdG9hc3RIZWxwZXI6IFRvYXN0SGVscGVyU2VydmljZVxuICApIHt9XG5cbiAgcHVibGljIHNlYXJjaChcbiAgICB1cmwsXG4gICAgcGFyYW1zOiBhbnkgPSB7fSxcbiAgICBoZWFkZXJzOiBhbnkgPSB7fVxuICApOiBPYnNlcnZhYmxlPEFycmF5PGFueT4+IHtcbiAgICBsZXQgaHR0cE9wdGlvbnM6IEh0dHBPcHRpb25zID0gdGhpcy5idWlsZEh0dHBPcHRpb25zKHBhcmFtcywgaGVhZGVycyk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LmdldDxhbnk+KHVybCwge1xuICAgICAgaGVhZGVyczogaHR0cE9wdGlvbnMuaGVhZGVycyxcbiAgICAgIHBhcmFtczogaHR0cE9wdGlvbnMucGFyYW1zLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZmluZCh1cmwsIGtleTogYW55LCBoZWFkZXJzOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8T2JqZWN0PiB7XG4gICAgbGV0IGh0dHBPcHRpb25zOiBIdHRwT3B0aW9ucyA9IHRoaXMuYnVpbGRIdHRwT3B0aW9ucyhudWxsLCBoZWFkZXJzKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0PGFueT4oYCR7dXJsfS8ke2tleX1gLCB7XG4gICAgICBoZWFkZXJzOiBodHRwT3B0aW9ucy5oZWFkZXJzLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc2F2ZShcbiAgICB1cmwsXG4gICAgcGVyc2lzdE9iajogYW55LFxuICAgIHByaW1hcnlLZXk6IHN0cmluZyA9IG51bGwsXG4gICAgaGVhZGVyczogYW55ID0ge31cbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgaHR0cE9wdGlvbnM6IEh0dHBPcHRpb25zID0gdGhpcy5idWlsZEh0dHBPcHRpb25zKG51bGwsIGhlYWRlcnMpO1xuICAgIGNvbnN0IGtleSA9IHRoaXMuZ2V0UHJpbWFyeUtleVZhbHVlKHByaW1hcnlLZXksIHBlcnNpc3RPYmopO1xuXG4gICAgaWYgKCFrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnRcbiAgICAgICAgLnBvc3Q8YW55Pih1cmwsIHBlcnNpc3RPYmosIHtcbiAgICAgICAgICBoZWFkZXJzOiBodHRwT3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgICAucGlwZShjYXRjaEVycm9yKGVyciA9PiB0aGlzLmVycm9ySGFuZGxlcihlcnIpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnRcbiAgICAgICAgLnB1dDxhbnk+KHVybCwgcGVyc2lzdE9iaiwge1xuICAgICAgICAgIGhlYWRlcnM6IGh0dHBPcHRpb25zLmhlYWRlcnMsXG4gICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIC5waXBlKGNhdGNoRXJyb3IoZXJyID0+IHRoaXMuZXJyb3JIYW5kbGVyKGVycikpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWN0aW9uKHVybCwgZGF0YTogYW55LCBoZWFkZXJzOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IGh0dHBPcHRpb25zOiBIdHRwT3B0aW9ucyA9IHRoaXMuYnVpbGRIdHRwT3B0aW9ucyhudWxsLCBoZWFkZXJzKTtcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50XG4gICAgICAucG9zdDxhbnk+KHVybCwgZGF0YSwgeyBoZWFkZXJzOiBodHRwT3B0aW9ucy5oZWFkZXJzIH0pXG4gICAgICAucGlwZShjYXRjaEVycm9yKGVyciA9PiB0aGlzLmVycm9ySGFuZGxlcihlcnIpKSk7XG4gIH1cblxuICBwdWJsaWMgZGVhY3RpdmF0ZSh1cmw6IHN0cmluZywgaGVhZGVyczogYW55ID0ge30pOiBPYnNlcnZhYmxlPE9iamVjdD4ge1xuICAgIGxldCBodHRwT3B0aW9uczogSHR0cE9wdGlvbnMgPSB0aGlzLmJ1aWxkSHR0cE9wdGlvbnMobnVsbCwgaGVhZGVycyk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudFxuICAgICAgLmRlbGV0ZTxhbnk+KGAke3VybH1gLCB7XG4gICAgICAgIGhlYWRlcnM6IGh0dHBPcHRpb25zLmhlYWRlcnMsXG4gICAgICAgIHBhcmFtczogaHR0cE9wdGlvbnMucGFyYW1zLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWVcbiAgICAgIH0pXG4gICAgICAucGlwZShjYXRjaEVycm9yKGVyciA9PiB0aGlzLmVycm9ySGFuZGxlcihlcnIpKSk7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkSHR0cE9wdGlvbnMocGFyYW1zOiBhbnksIGhlYWRlcnM6IGFueSk6IEh0dHBPcHRpb25zIHtcbiAgICBsZXQgaHR0cFBhcmFtczogSHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgbGV0IGh0dHBIZWFkZXJzOiBIdHRwSGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuXG4gICAgaWYgKHBhcmFtcykge1xuICAgICAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLmFwcGVuZChrZXksIHBhcmFtc1trZXldKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChoZWFkZXJzKSB7XG4gICAgICBPYmplY3Qua2V5cyhoZWFkZXJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGh0dHBIZWFkZXJzID0gaHR0cEhlYWRlcnMuYXBwZW5kKGtleSwgaGVhZGVyc1trZXldKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBwYXJhbXM6IGh0dHBQYXJhbXMsXG4gICAgICBoZWFkZXJzOiBodHRwSGVhZGVyc1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldFByaW1hcnlLZXlWYWx1ZShwcmltYXJ5S2V5OiBzdHJpbmcsIHBlcnNpc3RPYmo6IGFueSkge1xuICAgIGxldCB2YWx1ZSA9IHBlcnNpc3RPYmouaWQ7XG5cbiAgICBpZiAocHJpbWFyeUtleSkge1xuICAgICAgT2JqZWN0LmtleXMocGVyc2lzdE9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAoa2V5ID09PSBwcmltYXJ5S2V5KSB7XG4gICAgICAgICAgdmFsdWUgPSBwZXJzaXN0T2JqW2tleV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgZXJyb3JIYW5kbGVyKGVycikge1xuICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KGAke2Vyci5zdGF0dXN9ICR7ZXJyLnN0YXR1c1RleHR9YCk7XG4gICAgcmV0dXJuIGVyci5tZXNzYWdlO1xuICB9XG59XG4iXX0=