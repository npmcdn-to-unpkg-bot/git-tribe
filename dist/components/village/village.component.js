System.register(['@angular/core', '@angular/router-deprecated', '../login/login.component', '../../services/repo.service', '../../model/gitFlow'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_deprecated_1, login_component_1, repo_service_1, gitFlow_1;
    var VillageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (repo_service_1_1) {
                repo_service_1 = repo_service_1_1;
            },
            function (gitFlow_1_1) {
                gitFlow_1 = gitFlow_1_1;
            }],
        execute: function() {
            VillageComponent = (function () {
                function VillageComponent(_repoService, _login) {
                    this._repoService = _repoService;
                    this._login = _login;
                    this.gitFlow = new gitFlow_1.GitFlow();
                }
                VillageComponent.prototype.routerOnActivate = function (curr) {
                    var _this = this;
                    var branchName = curr.params['name'];
                    this.gitFlow = new gitFlow_1.GitFlow();
                    this.gitFlow.master = curr.params['default_branch'];
                    this.gitFlow.hasMaster = this.gitFlow.master;
                    this._repoService.loadBranch(this._login.profile.nickname, branchName).subscribe(function (branchs) {
                        _this.displayVillage = false;
                        _this.branchs = branchs;
                    });
                };
                VillageComponent.prototype.ngAfterViewChecked = function () {
                    componentHandler.upgradeDom();
                };
                VillageComponent.prototype.saveBranchs = function () {
                    var self = this;
                    this.branchs.forEach(function (branch) {
                        if (branch) {
                            self.gitFlow.hasFeature = self.gitFlow.hasFeature ? true : branch.name.indexOf(self.gitFlow.feature) > -1;
                            self.gitFlow.hasRelease = self.gitFlow.hasRelease ? true : branch.name.indexOf(self.gitFlow.release) > -1;
                            self.gitFlow.hasDevelop = self.gitFlow.hasDevelop ? true : branch.name.indexOf(self.gitFlow.develop) > -1;
                            self.gitFlow.hasHotfix = self.gitFlow.hasHotfix ? true : branch.name.indexOf(self.gitFlow.hotfix) > -1;
                        }
                    });
                    this.displayVillage = true;
                };
                VillageComponent.prototype.validatGitFlow = function () {
                    return this.gitFlow && this.gitFlow.develop;
                };
                VillageComponent = __decorate([
                    core_1.Component({
                        templateUrl: './src/components/village/village.component.html',
                        styleUrls: ['./src/components/village/village.component.css'],
                        directives: [router_deprecated_1.ROUTER_DIRECTIVES],
                        providers: [repo_service_1.RepoService, login_component_1.LoginComponent]
                    }), 
                    __metadata('design:paramtypes', [repo_service_1.RepoService, login_component_1.LoginComponent])
                ], VillageComponent);
                return VillageComponent;
            }());
            exports_1("VillageComponent", VillageComponent);
        }
    }
});
