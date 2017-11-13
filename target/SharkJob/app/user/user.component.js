"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_service_1 = require("./user.service");
var alert_service_1 = require("../alert/alert.service");
var login_service_1 = require("../login/login.service");
var loginForm_1 = require("../Models/loginForm");
var password_1 = require("../Models/password");
var UserComponent = (function () {
    function UserComponent(userService, alertService, route, router, loginService) {
        this.userService = userService;
        this.alertService = alertService;
        this.route = route;
        this.router = router;
        this.loginService = loginService;
        this.dataLoaded = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this._password = new password_1.password("", "", "");
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.submitted = false;
        this.email_updated = false;
        this.email_changed = false;
        this.userName_updated = false;
        this.userName_changed = false;
        this.skills_updated = false;
        this.skills_changed = false;
        this.passwordSubmitted = false;
        this.userService
            .getUser(this.currentUser.userName)
            .subscribe(function (data) {
            _this.user = data;
            if (!_this.user.skills) {
                _this.user.skills = [];
            }
            _this.dataLoaded = true;
        }, function (error) {
            _this.alertService.error(error.text());
        });
    };
    UserComponent.prototype.check_update = function (user) {
        if (this.currentUser.userName != user.userName) {
            this.userName_changed = true;
        }
        // if (this.currentUser.skills != this.user.skills) {
        //     this.skills_changed = true;
        // }
        if (this.currentUser.email != user.email) {
            this.email_changed = true;
        }
        if (!this.currentUser.userType) {
            this.userType_changed = true;
        }
        if (!this.userName_changed && !this.email_changed) {
            this.alertService.error("Nothing to be updated", true);
        }
    };
    UserComponent.prototype.updateInfo = function (user) {
        var _this = this;
        if (this.email_changed) {
            this.userService
                .updateEmail(user, this.currentUser)
                .subscribe(function (info) {
                _this.email_updated = true;
                _this.show_info();
            }, function (error) {
                _this.alertService.error(error.text());
            });
        }
        if (this.userName_changed) {
            this.userService
                .updateUserName(user, this.currentUser)
                .subscribe(function (info) {
                _this.update_currentUser(user);
            }, function (error) {
                console.log('there ' + error);
                _this.alertService.error(error.text());
            });
        }
    };
    UserComponent.prototype.show_info = function () {
        if (this.email_updated || this.userName_updated) {
            this.alertService.success("Information Updated", true);
            location.reload();
        }
    };
    UserComponent.prototype.update_currentUser = function (user) {
        var _this = this;
        var _user_passwd = this.currentUser.password;
        this.loginService.logout();
        var form = new loginForm_1.loginForm("", "");
        form.info = user.userName;
        form.password = _user_passwd;
        this.loginService.login(form).subscribe(function (data) {
            _this.userName_updated = true;
            _this.show_info();
        }, function (error) {
            _this.alertService.error("Fail to update", true);
        });
    };
    UserComponent.prototype.check_password = function () {
        var _this = this;
        this.userService
            .check_password(this._password, this.currentUser)
            .subscribe(function (info) {
            _this.update_password();
        }, function (error) {
            _this.alertService.error(error.text());
        });
    };
    UserComponent.prototype.update_password = function () {
        var _this = this;
        this.userService
            .updatePassword(this._password, this.currentUser)
            .subscribe(function (info) {
            _this.alertService.success("Password Updated", true);
            _this.passwordSubmitted = false;
            _this._password = new password_1.password('', '', '');
        }, function (error) {
            _this.alertService.error(error.text());
        });
    };
    UserComponent.prototype.update_skills = function () {
        var _this = this;
        console.log("update_skills");
        this.userService
            .updateSkills(this.user)
            .subscribe(function (info) {
            _this.alertService.success("Skills Updated", true);
        }, function (error) {
            _this.alertService.error(error.text());
        });
    };
    UserComponent.prototype.add_skills = function (skill) {
        if (!this.user.skills.includes(skill)) {
            this.user.skills.push(skill);
        }
        this.skill = "";
    };
    UserComponent.prototype.remove_skills = function (skill) {
        this.user.skills = this.user.skills.filter(function (obj) { return obj !== skill; });
        console.log(this.user.skills);
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "user",
        templateUrl: "user.component.html",
        styleUrls: ["user.component.css"]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        alert_service_1.AlertService,
        router_1.ActivatedRoute,
        router_1.Router,
        login_service_1.LoginService])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map