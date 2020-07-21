(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/ShoppingCartService.ts":
/*!****************************************!*\
  !*** ./src/app/ShoppingCartService.ts ***!
  \****************************************/
/*! exports provided: ShoppingCartService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShoppingCartService", function() { return ShoppingCartService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var contentful__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful */ "../node_modules/contentful/dist/es-modules/contentful.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/data-storage.service */ "./src/app/shared/data-storage.service.ts");





const CONFIG = {
    space: 'msp0xh0f2n25',
    accessToken: 'jtoAoXj8tbL2e7qO-9LCyzXvE2qLB5rAup-fk_C9aLk',
    contentTypeIds: {
        product: '',
    },
};
class ShoppingCartService {
    constructor(dataStoreService) {
        this.dataStoreService = dataStoreService;
        this.inCart = [];
        this.addedItemsChanged = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](this.inCart);
        this.allPriceChanged = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.numberOfItemsChanged = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.cdaClient = Object(contentful__WEBPACK_IMPORTED_MODULE_1__["createClient"])({
            space: CONFIG.space,
            accessToken: CONFIG.accessToken,
        });
    }
    getProducts(query) {
        return this.cdaClient
            .getEntries(Object.assign({
            content_type: CONFIG.contentTypeIds,
        }, query))
            .then((res) => this.setItems(res.items));
    }
    setItems(items) {
        this.shoppingCart = items
            .map((item) => {
            const { id, label, price, name } = item.fields;
            const image = item.fields.image.fields.file.url;
            return { id, name, label, price, image, amount: 1 };
        })
            .reverse();
        this.dataStoreService.saveProducts(this.shoppingCart);
        this.inCart = this.getAllCart();
        this.setCartValue();
    }
    addProduct(id) {
        const itemInCart = this.inCart.findIndex((item) => item.id === id);
        if (itemInCart !== -1) {
            this.inCart[itemInCart].amount = this.inCart[itemInCart].amount + 1;
            this.emitChangedData();
        }
        else {
            const addedItem = this.shoppingCart.find((item) => item.id === id);
            this.inCart.push(addedItem);
            this.emitChangedData();
        }
    }
    deleteProduct(id) {
        const itemInCart = this.inCart.findIndex((item) => item.id === id);
        if (this.inCart[itemInCart]) {
            if (this.inCart[itemInCart].amount === 1) {
                this.removeGroup(id);
            }
            else {
                this.inCart[itemInCart].amount = this.inCart[itemInCart].amount - 1;
            }
            this.emitChangedData();
        }
    }
    removeGroup(id) {
        const itemNumber = this.inCart.findIndex((item) => item.id === id);
        this.inCart.splice(itemNumber, 1);
        this.emitChangedData();
    }
    removeAll() {
        this.inCart.splice(0, this.inCart.length);
        this.emitChangedData();
    }
    getAllProducts() {
        return this.dataStoreService.getProducts();
    }
    getAllCart() {
        return this.dataStoreService.getCart();
    }
    setCartValue() {
        let amountTotal = 0;
        let priceTotal = 0;
        if (this.inCart.length > 0) {
            this.inCart.map((item) => {
                amountTotal += item.amount;
                priceTotal += item.price * item.amount;
            });
            this.allPriceChanged.next(priceTotal);
            this.numberOfItemsChanged.next(amountTotal);
            this.dataStoreService.saveAmounts({ priceTotal, amountTotal });
        }
        else {
            this.allPriceChanged.next(0);
            this.numberOfItemsChanged.next(amountTotal);
            this.dataStoreService.saveAmounts({ priceTotal: 0, amountTotal: 0 });
        }
    }
    emitChangedData() {
        this.addedItemsChanged.next(this.inCart.slice());
        this.dataStoreService.saveCart(this.inCart);
        this.setCartValue();
    }
    getAmountsOfAllPricesAndItems() {
        return this.dataStoreService.getAmounts();
    }
}
ShoppingCartService.ɵfac = function ShoppingCartService_Factory(t) { return new (t || ShoppingCartService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_shared_data_storage_service__WEBPACK_IMPORTED_MODULE_3__["DataStorageService"])); };
ShoppingCartService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ShoppingCartService, factory: ShoppingCartService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ShoppingCartService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_3__["DataStorageService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/app-animations.ts":
/*!***********************************!*\
  !*** ./src/app/app-animations.ts ***!
  \***********************************/
/*! exports provided: slider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slider", function() { return slider; });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/__ivy_ngcc__/fesm2015/animations.js");

const slider = Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('routeAnimations', [
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('* => isLeft', slideTo('left')),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('* => isRight', slideTo('right')),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('isRight => *', slideTo('left')),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('isLeft => *', slideTo('right')),
]);
function slideTo(direction) {
    const optional = { optional: true };
    return [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter, :leave', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                position: 'absolute',
                top: 0,
                [direction]: 0,
                width: '100%',
            }),
        ], optional),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ [direction]: '-100%' })]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["group"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':leave', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('600ms ease', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ [direction]: '100%' }))], optional),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('600ms ease', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ [direction]: '0%' }))], optional),
        ]),
    ];
}


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _products_products_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./products/products.component */ "./src/app/products/products.component.ts");
/* harmony import */ var _shopping_cart_shopping_cart_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shopping-cart/shopping-cart.component */ "./src/app/shopping-cart/shopping-cart.component.ts");






const routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    {
        path: 'products',
        component: _products_products_component__WEBPACK_IMPORTED_MODULE_2__["ProductsComponent"],
        data: { animation: 'isLeft' },
    },
    {
        path: 'shopping-cart',
        component: _shopping_cart_shopping_cart_component__WEBPACK_IMPORTED_MODULE_3__["ShoppingCartComponent"],
        data: { animation: 'isRight' },
    },
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, { scrollPositionRestoration: 'disabled' }),
        ], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, { scrollPositionRestoration: 'disabled' }),
                ],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _app_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-animations */ "./src/app/app-animations.ts");
/* harmony import */ var _ShoppingCartService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShoppingCartService */ "./src/app/ShoppingCartService.ts");
/* harmony import */ var _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/data-storage.service */ "./src/app/shared/data-storage.service.ts");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/navbar/navbar.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");







class AppComponent {
    constructor(shoppingCartService, DataStoreService) {
        this.shoppingCartService = shoppingCartService;
        this.DataStoreService = DataStoreService;
        this.title = 'AngulartShopCart';
    }
    prepareRoute(outlet) {
        return (outlet &&
            outlet.activatedRouteData &&
            outlet.activatedRouteData['animation']);
    }
    scrollToShop() {
        this.main.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
    ngOnInit() {
        this.shoppingCartService.getProducts();
        this.main = document.getElementById('shop');
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ShoppingCartService__WEBPACK_IMPORTED_MODULE_2__["ShoppingCartService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_data_storage_service__WEBPACK_IMPORTED_MODULE_3__["DataStorageService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 11, vars: 1, consts: [[1, "header", "animate__slideInDown"], [1, "banner"], [1, "banner-title"], [1, "banner-btn", 3, "click"], ["id", "shop", 1, "content"], ["shops", ""], ["outlet", "outlet"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-navbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Great Courses!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_5_listener() { return ctx.scrollToShop(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Buy now and learn!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "main", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "router-outlet", null, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@routeAnimations", ctx.prepareRoute(_r1));
    } }, directives: [_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__["NavbarComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterOutlet"]], styles: [".header[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 60px);\n  background: url('courses.jpg') center/cover no-repeat;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.header[_ngcontent-%COMP%]   .banner[_ngcontent-%COMP%] {\n  text-align: center;\n  background: rgba(255, 255, 255, 0.8);\n  display: inline-block;\n  padding: 2rem;\n  border-radius: 8px;\n}\n.header[_ngcontent-%COMP%]   .banner-title[_ngcontent-%COMP%] {\n  font-size: 3.4rem;\n  text-transform: uppercase;\n  letter-spacing: var(--mainSpacing);\n  margin-bottom: 3rem;\n}\n.header[_ngcontent-%COMP%]   .banner-btn[_ngcontent-%COMP%] {\n  padding: 1rem 3rem;\n  text-transform: uppercase;\n  letter-spacing: var(--mainSpacing);\n  font-size: 1rem;\n  background: var(--primaryColor);\n  color: var(--mainWhite);\n  border: 1px solid var(--primaryColor);\n  transition: var(--mainTransition);\n  border-radius: 10px;\n  cursor: pointer;\n  outline: none;\n}\n.header[_ngcontent-%COMP%]   .banner-btn[_ngcontent-%COMP%]:hover {\n  background: transparent;\n  color: var(--primaryColor);\n  outline: none;\n  text-decoration: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsOEJBQUE7RUFDQSxxREFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBQ0Y7QUFDRTtFQUNFLGtCQUFBO0VBQ0Esb0NBQUE7RUFDQSxxQkFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtBQUNKO0FBQ0U7RUFDRSxpQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0NBQUE7RUFDQSxtQkFBQTtBQUNKO0FBQ0U7RUFDRSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0NBQUE7RUFDQSxlQUFBO0VBQ0EsK0JBQUE7RUFDQSx1QkFBQTtFQUNBLHFDQUFBO0VBQ0EsaUNBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0FBQ0o7QUFDRTtFQUNFLHVCQUFBO0VBQ0EsMEJBQUE7RUFDQSxhQUFBO0VBQ0EscUJBQUE7QUFDSiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oZWFkZXIge1xuICBtaW4taGVpZ2h0OiBjYWxjKDEwMHZoIC0gNjBweCk7XG4gIGJhY2tncm91bmQ6IHVybChcIi4uL2Fzc2V0cy9jb3Vyc2VzLmpwZ1wiKSBjZW50ZXIvY292ZXIgbm8tcmVwZWF0O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICAuYmFubmVyIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBwYWRkaW5nOiAycmVtO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgfVxuICAuYmFubmVyLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDMuNHJlbTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGxldHRlci1zcGFjaW5nOiB2YXIoLS1tYWluU3BhY2luZyk7XG4gICAgbWFyZ2luLWJvdHRvbTogM3JlbTtcbiAgfVxuICAuYmFubmVyLWJ0biB7XG4gICAgcGFkZGluZzogMXJlbSAzcmVtO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgbGV0dGVyLXNwYWNpbmc6IHZhcigtLW1haW5TcGFjaW5nKTtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgYmFja2dyb3VuZDogdmFyKC0tcHJpbWFyeUNvbG9yKTtcbiAgICBjb2xvcjogdmFyKC0tbWFpbldoaXRlKTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1wcmltYXJ5Q29sb3IpO1xuICAgIHRyYW5zaXRpb246IHZhcigtLW1haW5UcmFuc2l0aW9uKTtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBvdXRsaW5lOiBub25lO1xuICB9XG4gIC5iYW5uZXItYnRuOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBjb2xvcjogdmFyKC0tcHJpbWFyeUNvbG9yKTtcbiAgICBvdXRsaW5lOiBub25lO1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgfVxufVxuIl19 */"], data: { animation: [_app_animations__WEBPACK_IMPORTED_MODULE_1__["slider"]] } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss'],
                animations: [_app_animations__WEBPACK_IMPORTED_MODULE_1__["slider"]],
            }]
    }], function () { return [{ type: _ShoppingCartService__WEBPACK_IMPORTED_MODULE_2__["ShoppingCartService"] }, { type: _shared_data_storage_service__WEBPACK_IMPORTED_MODULE_3__["DataStorageService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/navbar/navbar.component.ts");
/* harmony import */ var _products_product_product_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./products/product/product.component */ "./src/app/products/product/product.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _products_products_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./products/products.component */ "./src/app/products/products.component.ts");
/* harmony import */ var _shopping_cart_shopping_cart_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shopping-cart/shopping-cart.component */ "./src/app/shopping-cart/shopping-cart.component.ts");
/* harmony import */ var _shopping_cart_shopping_cart_item_shopping_cart_item_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./shopping-cart/shopping-cart-item/shopping-cart-item.component */ "./src/app/shopping-cart/shopping-cart-item/shopping-cart-item.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");













class AppModule {
    constructor(router, viewportScroller) { }
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_11__["ViewportScroller"])); }, providers: [], imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__["NavbarComponent"],
        _products_product_product_component__WEBPACK_IMPORTED_MODULE_5__["ProductComponent"],
        _products_products_component__WEBPACK_IMPORTED_MODULE_7__["ProductsComponent"],
        _shopping_cart_shopping_cart_component__WEBPACK_IMPORTED_MODULE_8__["ShoppingCartComponent"],
        _shopping_cart_shopping_cart_item_shopping_cart_item_component__WEBPACK_IMPORTED_MODULE_9__["ShoppingCartItemComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__["NavbarComponent"],
                    _products_product_product_component__WEBPACK_IMPORTED_MODULE_5__["ProductComponent"],
                    _products_products_component__WEBPACK_IMPORTED_MODULE_7__["ProductsComponent"],
                    _shopping_cart_shopping_cart_component__WEBPACK_IMPORTED_MODULE_8__["ShoppingCartComponent"],
                    _shopping_cart_shopping_cart_item_shopping_cart_item_component__WEBPACK_IMPORTED_MODULE_9__["ShoppingCartItemComponent"],
                ],
                imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"]],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"] }, { type: _angular_common__WEBPACK_IMPORTED_MODULE_11__["ViewportScroller"] }]; }, null); })();


/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/*!********************************************!*\
  !*** ./src/app/navbar/navbar.component.ts ***!
  \********************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ShoppingCartService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ShoppingCartService */ "./src/app/ShoppingCartService.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




class NavbarComponent {
    constructor(ShoppingCartService) {
        this.ShoppingCartService = ShoppingCartService;
    }
    ngOnInit() {
        this.items = this.ShoppingCartService.getAmountsOfAllPricesAndItems().amountTotal;
        this.numberOfItemsSub = this.ShoppingCartService.numberOfItemsChanged.subscribe((data) => {
            this.items = data;
        });
    }
}
NavbarComponent.ɵfac = function NavbarComponent_Factory(t) { return new (t || NavbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ShoppingCartService__WEBPACK_IMPORTED_MODULE_1__["ShoppingCartService"])); };
NavbarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NavbarComponent, selectors: [["app-navbar"]], decls: 10, vars: 1, consts: [[1, "navbar"], [1, "navbar-center"], [1, "nav-icon"], [1, "fas", "fa-bars"], [1, "navbar__picture"], ["routerLink", "/shopping-cart", 1, "cart-btn"], [1, "fas", "fa-cart-plus"], [1, "cart-items"]], template: function NavbarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "i", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.items);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], styles: [".navbar[_ngcontent-%COMP%] {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  height: 60px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  background-color: var(--primaryColor);\n  z-index: 1;\n}\n.navbar-center[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 1170px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 1.5rem;\n}\n.navbar[_ngcontent-%COMP%]   .nav-icon[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n}\n.navbar[_ngcontent-%COMP%]   .cart-btn[_ngcontent-%COMP%] {\n  position: relative;\n  cursor: pointer;\n}\n.navbar[_ngcontent-%COMP%]   .cart-items[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -8px;\n  right: -8px;\n  background: var(--mainWhite);\n  padding: 0 5px;\n  border-radius: 30%;\n  color: var(--mainBlack);\n}\n.navbar__picture[_ngcontent-%COMP%] {\n  background: url('Logo_red.jpeg') no-repeat center;\n  width: 10rem;\n  height: 60px;\n  display: inline-block;\n}\n.navbar[_ngcontent-%COMP%]   .fa-bars[_ngcontent-%COMP%] {\n  color: var(--mainWhite);\n}\n.navbar[_ngcontent-%COMP%]   .fa-cart-plus[_ngcontent-%COMP%] {\n  color: var(--mainWhite);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbmF2YmFyL25hdmJhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxNQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQ0FBQTtFQUNBLFVBQUE7QUFDRjtBQUNFO0VBQ0UsV0FBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0EsaUJBQUE7QUFDSjtBQUNFO0VBQ0UsaUJBQUE7QUFDSjtBQUNFO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0FBQ0o7QUFDRTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSw0QkFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLHVCQUFBO0FBQ0o7QUFDRTtFQUNFLGlEQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtBQUNKO0FBRUU7RUFDRSx1QkFBQTtBQUFKO0FBRUU7RUFDRSx1QkFBQTtBQUFKIiwiZmlsZSI6InNyYy9hcHAvbmF2YmFyL25hdmJhci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5uYXZiYXIge1xuICBwb3NpdGlvbjogLXdlYmtpdC1zdGlja3k7XG4gIHBvc2l0aW9uOiBzdGlja3k7XG4gIHRvcDogMDtcbiAgaGVpZ2h0OiA2MHB4O1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJpbWFyeUNvbG9yKTtcbiAgei1pbmRleDogMTtcblxuICAmLWNlbnRlciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAxMTcwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBwYWRkaW5nOiAwIDEuNXJlbTtcbiAgfVxuICAubmF2LWljb24ge1xuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICB9XG4gIC5jYXJ0LWJ0biB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuICAuY2FydC1pdGVtcyB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogLThweDtcbiAgICByaWdodDogLThweDtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1tYWluV2hpdGUpO1xuICAgIHBhZGRpbmc6IDAgNXB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDMwJTtcbiAgICBjb2xvcjogdmFyKC0tbWFpbkJsYWNrKTtcbiAgfVxuICAmX19waWN0dXJlIHtcbiAgICBiYWNrZ3JvdW5kOiB1cmwoXCIuLi8uLi9hc3NldHMvTG9nb19yZWQuanBlZ1wiKSBuby1yZXBlYXQgY2VudGVyO1xuICAgIHdpZHRoOiAxMHJlbTtcbiAgICBoZWlnaHQ6IDYwcHg7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB9XG5cbiAgLmZhLWJhcnMge1xuICAgIGNvbG9yOiB2YXIoLS1tYWluV2hpdGUpO1xuICB9XG4gIC5mYS1jYXJ0LXBsdXMge1xuICAgIGNvbG9yOiB2YXIoLS1tYWluV2hpdGUpO1xuICB9XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NavbarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-navbar',
                templateUrl: './navbar.component.html',
                styleUrls: ['./navbar.component.scss'],
            }]
    }], function () { return [{ type: _ShoppingCartService__WEBPACK_IMPORTED_MODULE_1__["ShoppingCartService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/products/product/product.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/products/product/product.component.ts ***!
  \*******************************************************/
/*! exports provided: ProductComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductComponent", function() { return ProductComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ShoppingCartService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ShoppingCartService */ "./src/app/ShoppingCartService.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




class ProductComponent {
    constructor(ShoppingCartService) {
        this.ShoppingCartService = ShoppingCartService;
    }
    addItem(id) {
        this.ShoppingCartService.addProduct(id);
    }
    ngOnInit() { }
}
ProductComponent.ɵfac = function ProductComponent_Factory(t) { return new (t || ProductComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ShoppingCartService__WEBPACK_IMPORTED_MODULE_1__["ShoppingCartService"])); };
ProductComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProductComponent, selectors: [["app-product"]], inputs: { product: "product" }, decls: 12, vars: 5, consts: [[1, "product"], [1, "img-container"], ["alt", "product", 1, "product-img", 3, "src"], ["routerLink", "/shopping-cart", 1, "bag-btn", 3, "id", "click"], [1, "fas", "fa-shopping-cart"]], template: function ProductComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "article", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProductComponent_Template_button_click_3_listener() { return ctx.addItem(ctx.product.id); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "i", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Add to bag ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("src", ctx.product.image, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("id", ctx.product.id);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.product.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Price: $", ctx.product.price, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.product.label);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], styles: [".product[_ngcontent-%COMP%] {\n  background-color: var(--mainWhite);\n  padding: 1rem;\n  border-radius: 1rem;\n  box-shadow: 1.4rem 1.4rem 4rem rgba(255, 255, 255, 0.8);\n  transition: var(--mainTransition);\n}\n.product[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n  transform: scale(1.02);\n}\n.img-container[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n}\n.bag-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 70%;\n  right: 0;\n  background: var(--primaryColor);\n  border: none;\n  text-transform: uppercase;\n  padding: 0.5rem 0.75rem;\n  letter-spacing: var(--mainSpacing);\n  font-weight: bold;\n  transition: var(--mainTransition);\n  transform: translateX(101%);\n  cursor: pointer;\n}\n.bag-btn[_ngcontent-%COMP%]:hover {\n  color: var(--mainWhite);\n}\n.fa-shopping-cart[_ngcontent-%COMP%] {\n  margin-right: 0.5rem;\n}\n.img-container[_ngcontent-%COMP%]:hover   .bag-btn[_ngcontent-%COMP%] {\n  transform: translateX(0);\n}\n.product-img[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  min-height: 12rem;\n  height: 13rem;\n  transition: var(--mainTransition);\n}\n.img-container[_ngcontent-%COMP%]:hover   .product-img[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n.product[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  text-transform: capitalize;\n  font-size: 1.1rem;\n  margin-top: 1rem;\n  letter-spacing: var(--mainSpacing);\n  text-align: center;\n}\n.product[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin-top: 0.7rem;\n  letter-spacing: var(--mainSpacing);\n  color: var(--primaryColor);\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvZHVjdHMvcHJvZHVjdC9wcm9kdWN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0NBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1REFBQTtFQUNBLGlDQUFBO0FBQ0Y7QUFBRTtFQUNFLGVBQUE7RUFDQSxzQkFBQTtBQUVKO0FBRUE7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0FBQ0Y7QUFDQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFFBQUE7RUFDQSwrQkFBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0NBQUE7RUFDQSxpQkFBQTtFQUNBLGlDQUFBO0VBQ0EsMkJBQUE7RUFDQSxlQUFBO0FBRUY7QUFBQTtFQUNFLHVCQUFBO0FBR0Y7QUFEQTtFQUNFLG9CQUFBO0FBSUY7QUFGQTtFQUNFLHdCQUFBO0FBS0Y7QUFIQTtFQUNFLGNBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxhQUFBO0VBQ0EsaUNBQUE7QUFNRjtBQUpBO0VBQ0UsWUFBQTtBQU9GO0FBSkE7RUFDRSwwQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQ0FBQTtFQUNBLGtCQUFBO0FBT0Y7QUFKQTtFQUNFLGtCQUFBO0VBQ0Esa0NBQUE7RUFDQSwwQkFBQTtFQUNBLGtCQUFBO0FBT0YiLCJmaWxlIjoic3JjL2FwcC9wcm9kdWN0cy9wcm9kdWN0L3Byb2R1Y3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucHJvZHVjdCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1haW5XaGl0ZSk7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XG4gIGJveC1zaGFkb3c6IDEuNHJlbSAxLjRyZW0gNHJlbSByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOCk7XG4gIHRyYW5zaXRpb246IHZhcigtLW1haW5UcmFuc2l0aW9uKTtcbiAgJjpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wMik7XG4gIH1cbn1cblxuLmltZy1jb250YWluZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4uYmFnLWJ0biB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA3MCU7XG4gIHJpZ2h0OiAwO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1wcmltYXJ5Q29sb3IpO1xuICBib3JkZXI6IG5vbmU7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIHBhZGRpbmc6IDAuNXJlbSAwLjc1cmVtO1xuICBsZXR0ZXItc3BhY2luZzogdmFyKC0tbWFpblNwYWNpbmcpO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgdHJhbnNpdGlvbjogdmFyKC0tbWFpblRyYW5zaXRpb24pO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAxJSk7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5iYWctYnRuOmhvdmVyIHtcbiAgY29sb3I6IHZhcigtLW1haW5XaGl0ZSk7XG59XG4uZmEtc2hvcHBpbmctY2FydCB7XG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xufVxuLmltZy1jb250YWluZXI6aG92ZXIgLmJhZy1idG4ge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG59XG4ucHJvZHVjdC1pbWcge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDEycmVtO1xuICBoZWlnaHQ6IDEzcmVtO1xuICB0cmFuc2l0aW9uOiB2YXIoLS1tYWluVHJhbnNpdGlvbik7XG59XG4uaW1nLWNvbnRhaW5lcjpob3ZlciAucHJvZHVjdC1pbWcge1xuICBvcGFjaXR5OiAwLjU7XG59XG5cbi5wcm9kdWN0IGgzIHtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xuICBtYXJnaW4tdG9wOiAxcmVtO1xuICBsZXR0ZXItc3BhY2luZzogdmFyKC0tbWFpblNwYWNpbmcpO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5wcm9kdWN0IGg0IHtcbiAgbWFyZ2luLXRvcDogMC43cmVtO1xuICBsZXR0ZXItc3BhY2luZzogdmFyKC0tbWFpblNwYWNpbmcpO1xuICBjb2xvcjogdmFyKC0tcHJpbWFyeUNvbG9yKTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProductComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-product',
                templateUrl: './product.component.html',
                styleUrls: ['./product.component.scss'],
            }]
    }], function () { return [{ type: _ShoppingCartService__WEBPACK_IMPORTED_MODULE_1__["ShoppingCartService"] }]; }, { product: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/products/products.component.ts":
/*!************************************************!*\
  !*** ./src/app/products/products.component.ts ***!
  \************************************************/
/*! exports provided: ProductsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsComponent", function() { return ProductsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ShoppingCartService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ShoppingCartService */ "./src/app/ShoppingCartService.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _product_product_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./product/product.component */ "./src/app/products/product/product.component.ts");





function ProductsComponent_app_product_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-product", 4);
} if (rf & 2) {
    const product_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("product", product_r1);
} }
class ProductsComponent {
    constructor(ShoppingCartService) {
        this.ShoppingCartService = ShoppingCartService;
    }
    ngOnInit() {
        this.products = this.ShoppingCartService.getAllProducts();
    }
}
ProductsComponent.ɵfac = function ProductsComponent_Factory(t) { return new (t || ProductsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ShoppingCartService__WEBPACK_IMPORTED_MODULE_1__["ShoppingCartService"])); };
ProductsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProductsComponent, selectors: [["app-products"]], decls: 6, vars: 1, consts: [[1, "products"], [1, "section-title"], [1, "products-center"], [3, "product", 4, "ngFor", "ngForOf"], [3, "product"]], template: function ProductsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "our courses");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ProductsComponent_app_product_5_Template, 1, 1, "app-product", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.products);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _product_product_component__WEBPACK_IMPORTED_MODULE_3__["ProductComponent"]], styles: [".products[_ngcontent-%COMP%] {\n  padding: 4rem 0;\n  background-color: #fadadd;\n  min-height: 80vh;\n}\n\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 2.5rem;\n  margin-bottom: 5rem;\n  text-transform: capitalize;\n  letter-spacing: var(--mainSpacing);\n}\n\n.products-center[_ngcontent-%COMP%] {\n  width: 90vw;\n  margin: 0 auto;\n  max-width: 1170px;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  grid-column-gap: 3.5rem;\n  grid-row-gap: 2rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvZHVjdHMvcHJvZHVjdHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUNBO0VBQ0Usa0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMEJBQUE7RUFDQSxrQ0FBQTtBQUVGOztBQUFBO0VBQ0UsV0FBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7RUFDQSwyREFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7QUFHRiIsImZpbGUiOiJzcmMvYXBwL3Byb2R1Y3RzL3Byb2R1Y3RzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnByb2R1Y3RzIHtcbiAgcGFkZGluZzogNHJlbSAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFkYWRkO1xuICBtaW4taGVpZ2h0OiA4MHZoO1xufVxuLnNlY3Rpb24tdGl0bGUgaDIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMi41cmVtO1xuICBtYXJnaW4tYm90dG9tOiA1cmVtO1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgbGV0dGVyLXNwYWNpbmc6IHZhcigtLW1haW5TcGFjaW5nKTtcbn1cbi5wcm9kdWN0cy1jZW50ZXIge1xuICB3aWR0aDogOTB2dztcbiAgbWFyZ2luOiAwIGF1dG87XG4gIG1heC13aWR0aDogMTE3MHB4O1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDI2MHB4LCAxZnIpKTtcbiAgZ3JpZC1jb2x1bW4tZ2FwOiAzLjVyZW07XG4gIGdyaWQtcm93LWdhcDogMnJlbTtcbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProductsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-products',
                templateUrl: './products.component.html',
                styleUrls: ['./products.component.scss'],
            }]
    }], function () { return [{ type: _ShoppingCartService__WEBPACK_IMPORTED_MODULE_1__["ShoppingCartService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/shared/data-storage.service.ts":
/*!************************************************!*\
  !*** ./src/app/shared/data-storage.service.ts ***!
  \************************************************/
/*! exports provided: DataStorageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataStorageService", function() { return DataStorageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class DataStorageService {
    saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products));
    }
    getProducts() {
        return localStorage.getItem('products')
            ? JSON.parse(localStorage.getItem('products'))
            : [];
    }
    getProduct(id) {
        const products = JSON.parse(localStorage.getItem('products'));
        return products.find((product) => product.id === id);
    }
    saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    getCart() {
        return localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart'))
            : [];
    }
    saveAmounts(amounts) {
        localStorage.setItem('amounts', JSON.stringify(amounts));
    }
    getAmounts() {
        return localStorage.getItem('amounts')
            ? JSON.parse(localStorage.getItem('amounts'))
            : 0;
    }
}
DataStorageService.ɵfac = function DataStorageService_Factory(t) { return new (t || DataStorageService)(); };
DataStorageService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: DataStorageService, factory: DataStorageService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DataStorageService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/shopping-cart/shopping-cart-item/shopping-cart-item.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/shopping-cart/shopping-cart-item/shopping-cart-item.component.ts ***!
  \**********************************************************************************/
/*! exports provided: ShoppingCartItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShoppingCartItemComponent", function() { return ShoppingCartItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ShoppingCartService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ShoppingCartService */ "./src/app/ShoppingCartService.ts");



class ShoppingCartItemComponent {
    constructor(ShoppingCartService) {
        this.ShoppingCartService = ShoppingCartService;
    }
    increaseQuantity() {
        this.ShoppingCartService.addProduct(this.Item.id);
    }
    decreaseQuantity() {
        this.ShoppingCartService.deleteProduct(this.Item.id);
    }
    removeGroupOfItems() {
        this.ShoppingCartService.removeGroup(this.Item.id);
    }
    ngOnInit() { }
}
ShoppingCartItemComponent.ɵfac = function ShoppingCartItemComponent_Factory(t) { return new (t || ShoppingCartItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ShoppingCartService__WEBPACK_IMPORTED_MODULE_1__["ShoppingCartService"])); };
ShoppingCartItemComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ShoppingCartItemComponent, selectors: [["app-shopping-cart-item"]], inputs: { Item: "Item" }, decls: 19, vars: 5, consts: [[1, "cart-item"], [1, "cart-item--inside"], ["alt", "product", 3, "src"], [1, "description"], [1, "remove-item", 3, "click"], [1, "arrows"], [3, "click"], [1, "fas", "fa-chevron-up"], [1, "item-amount"], [1, "fas", "fa-chevron-down"]], template: function ShoppingCartItemComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ShoppingCartItemComponent_Template_span_click_10_listener() { return ctx.removeGroupOfItems(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "remove");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ShoppingCartItemComponent_Template_span_click_13_listener() { return ctx.increaseQuantity(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "i", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ShoppingCartItemComponent_Template_span_click_17_listener() { return ctx.decreaseQuantity(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "i", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("src", ctx.Item.image, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.Item.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("$", ctx.Item.price, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.Item.label);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.Item.amount);
    } }, styles: [".cart-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n}\n@media screen and (max-width: 600px) {\n  .cart-item[_ngcontent-%COMP%] {\n    margin-top: 2rem;\n    margin-bottom: 2rem;\n  }\n}\n.cart-item--inside[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 90%;\n  border-radius: 1rem;\n  background-color: #fff;\n}\n@media screen and (max-width: 600px) {\n  .cart-item--inside[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n.cart-item--inside[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 10rem;\n  height: 10rem;\n  border-top-left-radius: 1rem;\n  border-bottom-left-radius: 1rem;\n}\n@media screen and (max-width: 600px) {\n  .cart-item--inside[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    border-top-left-radius: 1rem;\n    border-top-right-radius: 1rem;\n    border-bottom-left-radius: 0;\n    width: 100%;\n    height: 15rem;\n  }\n}\n.cart-item--inside[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n.cart-item--inside[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  align-self: start;\n  font-size: 1.5rem;\n  text-transform: uppercase;\n  text-align: left;\n  margin: 0.2rem 0.2rem 0.2rem 2rem;\n}\n.cart-item--inside[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  align-self: start;\n  font-size: 1.4rem;\n  text-align: left;\n  margin: 0.2rem 0.2rem 0.2rem 2rem;\n}\n.cart-item--inside[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  margin: 0.2rem 0.2rem 0.2rem 2rem;\n  text-align: left;\n}\n.cart-item--inside[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  color: #ccc;\n}\n.cart-item--inside[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n}\n.cart-item--inside[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%] {\n  margin-right: 1rem;\n}\n@media screen and (max-width: 600px) {\n  .cart-item--inside[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%] {\n    display: flex;\n    margin-right: 0;\n    margin: 0.5rem 0;\n  }\n}\n.cart-item--inside[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   .fa-chevron-up[_ngcontent-%COMP%] {\n  margin: 0.5rem;\n  font-size: 1.5rem;\n}\n.cart-item--inside[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   .fa-chevron-up[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n}\n.cart-item--inside[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%]   .item-amount[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  margin: 0.5rem;\n}\n.cart-item--inside[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%]   .fa-chevron-down[_ngcontent-%COMP%] {\n  margin: 0.5rem;\n  font-size: 1.5rem;\n}\n.cart-item--inside[_ngcontent-%COMP%]   .arrows[_ngcontent-%COMP%]   .fa-chevron-down[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hvcHBpbmctY2FydC9zaG9wcGluZy1jYXJ0LWl0ZW0vc2hvcHBpbmctY2FydC1pdGVtLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFDRjtBQUNFO0VBUkY7SUFTSSxnQkFBQTtJQUNBLG1CQUFBO0VBRUY7QUFDRjtBQUFFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxVQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtBQUVKO0FBQUk7RUFSRjtJQVNJLHNCQUFBO0VBR0o7QUFDRjtBQURJO0VBQ0UsWUFBQTtFQUNBLGFBQUE7RUFDQSw0QkFBQTtFQUNBLCtCQUFBO0FBR047QUFETTtFQU5GO0lBT0ksNEJBQUE7SUFDQSw2QkFBQTtJQUNBLDRCQUFBO0lBQ0EsV0FBQTtJQUNBLGFBQUE7RUFJTjtBQUNGO0FBREk7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLHNCQUFBO0FBR047QUFGTTtFQUNFLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUNBQUE7QUFJUjtBQURNO0VBQ0UsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUNBQUE7QUFHUjtBQUFNO0VBQ0UsaUJBQUE7RUFDQSxpQ0FBQTtFQUNBLGdCQUFBO0FBRVI7QUFDTTtFQUNFLGlCQUFBO0VBQ0EsV0FBQTtBQUNSO0FBQVE7RUFDRSxlQUFBO0FBRVY7QUFHSTtFQUNFLGtCQUFBO0FBRE47QUFHTTtFQUhGO0lBSUksYUFBQTtJQUNBLGVBQUE7SUFDQSxnQkFBQTtFQUFOO0FBQ0Y7QUFHUTtFQUNFLGNBQUE7RUFDQSxpQkFBQTtBQURWO0FBRVU7RUFDRSxlQUFBO0FBQVo7QUFLTTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtBQUhSO0FBTU07RUFDRSxjQUFBO0VBQ0EsaUJBQUE7QUFKUjtBQUtRO0VBQ0UsZUFBQTtBQUhWIiwiZmlsZSI6InNyYy9hcHAvc2hvcHBpbmctY2FydC9zaG9wcGluZy1jYXJ0LWl0ZW0vc2hvcHBpbmctY2FydC1pdGVtLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcnQtaXRlbSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBtYXJnaW4tdG9wOiAxcmVtO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KXtcbiAgICBtYXJnaW4tdG9wOiAycmVtO1xuICAgIG1hcmdpbi1ib3R0b206IDJyZW07XG4gIH1cblxuICAmLS1pbnNpZGUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgd2lkdGg6IDkwJTtcbiAgICBib3JkZXItcmFkaXVzOiAxcmVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB9XG5cbiAgICBpbWcge1xuICAgICAgd2lkdGg6IDEwcmVtO1xuICAgICAgaGVpZ2h0OiAxMHJlbTtcbiAgICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDFyZW07XG4gICAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxcmVtO1xuXG4gICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xuICAgICAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxcmVtO1xuICAgICAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMXJlbTtcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTVyZW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmRlc2NyaXB0aW9uIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgaDQge1xuICAgICAgICBhbGlnbi1zZWxmOiBzdGFydDtcbiAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgIG1hcmdpbjogMC4ycmVtIDAuMnJlbSAwLjJyZW0gMnJlbTtcbiAgICAgIH1cblxuICAgICAgaDUge1xuICAgICAgICBhbGlnbi1zZWxmOiBzdGFydDtcbiAgICAgICAgZm9udC1zaXplOiAxLjRyZW07XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgIG1hcmdpbjogMC4ycmVtIDAuMnJlbSAwLjJyZW0gMnJlbTtcbiAgICAgIH1cblxuICAgICAgcCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICAgICAgICBtYXJnaW46IDAuMnJlbSAwLjJyZW0gMC4ycmVtIDJyZW07XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICB9XG5cbiAgICAgIHNwYW4ge1xuICAgICAgICBmb250LXNpemU6IDEuM3JlbTtcbiAgICAgICAgY29sb3I6ICNjY2M7XG4gICAgICAgICY6aG92ZXIge1xuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC5hcnJvd3Mge1xuICAgICAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xuXG4gICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgICAgIG1hcmdpbjogLjVyZW0gMDtcbiAgICAgIH1cblxuICAgICAgc3BhbiB7XG4gICAgICAgIC5mYS1jaGV2cm9uLXVwIHtcbiAgICAgICAgICBtYXJnaW46IC41cmVtO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgICAgICAgICY6aG92ZXIge1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAuaXRlbS1hbW91bnQge1xuICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICAgICAgbWFyZ2luOiAuNXJlbTtcbiAgICAgIH1cblxuICAgICAgLmZhLWNoZXZyb24tZG93biB7XG4gICAgICAgIG1hcmdpbjogLjVyZW07XG4gICAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ShoppingCartItemComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-shopping-cart-item',
                templateUrl: './shopping-cart-item.component.html',
                styleUrls: ['./shopping-cart-item.component.scss'],
            }]
    }], function () { return [{ type: _ShoppingCartService__WEBPACK_IMPORTED_MODULE_1__["ShoppingCartService"] }]; }, { Item: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/shopping-cart/shopping-cart.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/shopping-cart/shopping-cart.component.ts ***!
  \**********************************************************/
/*! exports provided: ShoppingCartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShoppingCartComponent", function() { return ShoppingCartComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ShoppingCartService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ShoppingCartService */ "./src/app/ShoppingCartService.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _shopping_cart_item_shopping_cart_item_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shopping-cart-item/shopping-cart-item.component */ "./src/app/shopping-cart/shopping-cart-item/shopping-cart-item.component.ts");






function ShoppingCartComponent_h2_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Your cart is empty!");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ShoppingCartComponent_app_shopping_cart_item_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-shopping-cart-item", 10);
} if (rf & 2) {
    const Item_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("Item", Item_r2);
} }
class ShoppingCartComponent {
    constructor(ShoppingCartService) {
        this.ShoppingCartService = ShoppingCartService;
    }
    deleteAll() {
        this.ShoppingCartService.removeAll();
    }
    ngOnInit() {
        this.price = this.ShoppingCartService.getAmountsOfAllPricesAndItems().priceTotal;
        this.changedItems = this.ShoppingCartService.getAllCart();
        this.itemsChangedSub = this.ShoppingCartService.addedItemsChanged.subscribe((data) => {
            this.changedItems = data;
        });
        this.amountChangedSub = this.ShoppingCartService.allPriceChanged.subscribe((num) => {
            this.price = num;
        });
    }
}
ShoppingCartComponent.ɵfac = function ShoppingCartComponent_Factory(t) { return new (t || ShoppingCartComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ShoppingCartService__WEBPACK_IMPORTED_MODULE_1__["ShoppingCartService"])); };
ShoppingCartComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ShoppingCartComponent, selectors: [["app-shopping-cart"]], decls: 15, vars: 3, consts: [[1, "shopping_cart"], ["routerLink", "/products", 1, "close-cart", 2, "margin-top", "1rem", "outline", "none"], [1, "fas", "fa-window-close"], [1, "cart-content"], ["style", "margin-top: 2rem; margin-bottom: 2rem; color: darkred", 4, "ngIf"], [3, "Item", 4, "ngFor", "ngForOf"], [1, "cart-footer"], [1, "cart-total"], [1, "clear-cart", "banner-btn", 3, "click"], [2, "margin-top", "2rem", "margin-bottom", "2rem", "color", "darkred"], [3, "Item"]], template: function ShoppingCartComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Your cart");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, ShoppingCartComponent_h2_6_Template, 2, 0, "h2", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, ShoppingCartComponent_app_shopping_cart_item_7_Template, 1, 1, "app-shopping-cart-item", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "your total : $ ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ShoppingCartComponent_Template_button_click_13_listener() { return ctx.deleteAll(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "clear cart");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.changedItems.length === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.changedItems);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.price);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _shopping_cart_item_shopping_cart_item_component__WEBPACK_IMPORTED_MODULE_4__["ShoppingCartItemComponent"]], styles: [".shopping_cart[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  background-color: #fadadd;\n  transition: var(--mainTransition);\n  min-height: 80vh;\n}\n.shopping_cart[_ngcontent-%COMP%]   .close-cart[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.shopping_cart[_ngcontent-%COMP%]   .close-cart[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  cursor: pointer;\n}\n.shopping_cart[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 3rem;\n}\n.shopping_cart-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.shopping_cart[_ngcontent-%COMP%]   .cart-footer[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.shopping_cart[_ngcontent-%COMP%]   .cart-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 20rem;\n  height: 3rem;\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  background-color: #eee;\n  color: rgba(0, 0, 0, 0.6);\n  outline: none;\n  border: none;\n  border-radius: 1rem;\n  text-transform: uppercase;\n  font-size: 1rem;\n  transition: var(--mainTransition);\n}\n.shopping_cart[_ngcontent-%COMP%]   .cart-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n  background-color: rgba(0, 0, 0, 0.6);\n  color: #eee;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hvcHBpbmctY2FydC9zaG9wcGluZy1jYXJ0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSx5QkFBQTtFQUNBLGlDQUFBO0VBQ0EsZ0JBQUE7QUFDRjtBQUNFO0VBQ0UsZUFBQTtBQUNKO0FBQ0k7RUFDRSxXQUFBO0VBQ0EsZUFBQTtBQUNOO0FBRUU7RUFDRSxlQUFBO0FBQUo7QUFHRTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0FBREo7QUFLSTtFQUNFLGVBQUE7QUFITjtBQU1JO0VBQ0UsWUFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSx5QkFBQTtFQUNBLGVBQUE7RUFDQSxpQ0FBQTtBQUpOO0FBS007RUFDRSxlQUFBO0VBQ0Esb0NBQUE7RUFDQSxXQUFBO0FBSFIiLCJmaWxlIjoic3JjL2FwcC9zaG9wcGluZy1jYXJ0L3Nob3BwaW5nLWNhcnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc2hvcHBpbmdfY2FydCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFkYWRkO1xuICB0cmFuc2l0aW9uOiB2YXIoLS1tYWluVHJhbnNpdGlvbik7XG4gIG1pbi1oZWlnaHQ6IDgwdmg7XG5cbiAgLmNsb3NlLWNhcnQge1xuICAgIGZvbnQtc2l6ZTogMnJlbTtcblxuICAgICY6aG92ZXIge1xuICAgICAgY29sb3I6ICNmZmY7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuICB9XG4gIGgyIHtcbiAgICBmb250LXNpemU6IDNyZW07XG4gIH1cblxuICAmLWNvbnRlbnQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG5cbiAgLmNhcnQtZm9vdGVyIHtcbiAgICBoMyB7XG4gICAgICBmb250LXNpemU6IDJyZW07XG4gICAgfVxuXG4gICAgYnV0dG9uIHtcbiAgICAgIHdpZHRoOiAyMHJlbTtcbiAgICAgIGhlaWdodDogM3JlbTtcbiAgICAgIG1hcmdpbi10b3A6IDFyZW07XG4gICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcbiAgICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNik7XG4gICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgYm9yZGVyLXJhZGl1czogMXJlbTtcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICB0cmFuc2l0aW9uOiB2YXIoLS1tYWluVHJhbnNpdGlvbik7XG4gICAgICAmOmhvdmVyIHtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNik7XG4gICAgICAgIGNvbG9yOiAjZWVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ShoppingCartComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-shopping-cart',
                templateUrl: './shopping-cart.component.html',
                styleUrls: ['./shopping-cart.component.scss'],
            }]
    }], function () { return [{ type: _ShoppingCartService__WEBPACK_IMPORTED_MODULE_1__["ShoppingCartService"] }]; }, null); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch((err) => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/nikitochka/Desktop/Projects/AngularShopCart/AngulartShopCart/src/main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** os (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map