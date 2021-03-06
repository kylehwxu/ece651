"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var common_2 = require("@angular/common");
var app_component_1 = require("./app.component");
var login_component_1 = require("./login/login.component");
var signup_component_1 = require("./signup/signup.component");
var welcome_component_1 = require("./welcome/welcome.component");
var navbar_component_1 = require("./navbar/navbar.component");
var jobinfo_component_1 = require("./jobinfo/jobinfo.component");
var joblists_component_1 = require("./jobinfo/joblists/joblists.component");
var alert_component_1 = require("./alert/alert.component");
var user_component_1 = require("./user/user.component");
var jobdetail_component_1 = require("./jobdetail/jobdetail.component");
var postjob_component_1 = require("./postjob/postjob.component");
var chat_component_1 = require("./chat/chat.component");
var userview_component_1 = require("./userview/userview.component");
var editjob_component_1 = require("./editjob/editjob.component");
var login_service_1 = require("./login/login.service");
var signup_service_1 = require("./signup/signup.service");
var alert_service_1 = require("./alert/alert.service");
var user_service_1 = require("./user/user.service");
var navbar_service_1 = require("./navbar/navbar.service");
var jobinfo_service_1 = require("./jobinfo/jobinfo.service");
var jobdetail_service_1 = require("./jobdetail/jobdetail.service");
var joblists_service_1 = require("./jobinfo/joblists/joblists.service");
var postjob_service_1 = require("./postjob/postjob.service");
var appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'signup', component: signup_component_1.SignupComponent },
    { path: 'jobInfo', component: jobinfo_component_1.JobinfoComponent },
    { path: 'userprofile', component: user_component_1.UserComponent },
    { path: '', component: welcome_component_1.WelcomeComponent },
    { path: "jobdetail", component: jobdetail_component_1.JobdetailComponent },
    { path: "postjob", component: postjob_component_1.PostjobComponent },
    { path: "userview", component: userview_component_1.UserviewComponent },
    { path: "chattest", component: chat_component_1.ChatComponent },
    { path: "editjob", component: editjob_component_1.EditjobComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            common_1.CommonModule,
            router_1.RouterModule.forRoot(appRoutes)
        ],
        declarations: [
            app_component_1.AppComponent,
            login_component_1.LoginComponent,
            signup_component_1.SignupComponent,
            welcome_component_1.WelcomeComponent,
            navbar_component_1.NavbarComponent,
            jobinfo_component_1.JobinfoComponent,
            joblists_component_1.JoblistsComponent,
            jobdetail_component_1.JobdetailComponent,
            editjob_component_1.EditjobComponent,
            chat_component_1.ChatComponent,
            alert_component_1.AlertComponent,
            userview_component_1.UserviewComponent,
            user_component_1.UserComponent,
            postjob_component_1.PostjobComponent,
        ],
        providers: [
            login_service_1.LoginService,
            signup_service_1.SignupService,
            alert_service_1.AlertService,
            jobinfo_service_1.JobinfoService,
            jobdetail_service_1.JobdetailService,
            joblists_service_1.JoblistsService,
            user_service_1.UserService,
            navbar_service_1.NavbarService,
            joblists_service_1.JoblistsService,
            postjob_service_1.PostjobService,
            common_2.DatePipe
        ],
        bootstrap: [
            app_component_1.AppComponent
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map