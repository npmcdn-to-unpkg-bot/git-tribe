import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {RouteConfig, Router, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {CanActivate,OnActivate,ComponentInstruction } from '@angular/router-deprecated';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';

import { LoginComponent } from '../login/login.component';
import { RepoService } from '../../services/repo.service';
import { Coordinate } from '../../model/coordinate';
import { Repo } from '../../model/repo';
import { Branch } from '../../model/branch';
import { GitFlow } from '../../model/gitFlow';

declare var componentHandler;

@Component({
  templateUrl: './src/components/village/village.component.html',
  styleUrls: ['./src/components/village/village.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [RepoService, LoginComponent]
})
// @CanActivate(() => tokenNotExpired())
export class VillageComponent implements OnActivate, AfterViewChecked{
  gitFlow:GitFlow=new GitFlow();
  branchs: Branch[];
  displayVillage:boolean;
  constructor(private _repoService: RepoService, private _login: LoginComponent) {}

  routerOnActivate(curr: ComponentInstruction ): void {
    let branchName = curr.params['name'];
    this.gitFlow=new GitFlow();
    this.gitFlow.master=curr.params['default_branch'];
    this.gitFlow.hasMaster= this.gitFlow.master;
    this._repoService.loadBranch(this._login.profile.nickname,branchName).subscribe(branchs => {
      this.displayVillage=false;
      this.branchs = branchs;
    });
  }

  ngAfterViewChecked() {
    componentHandler.upgradeDom();
  }

  saveBranchs(){
    let self=this;
    this.branchs.forEach(function(branch) {
        if(branch){
        self.gitFlow.hasFeature=self.gitFlow.hasFeature?true:branch.name.indexOf(self.gitFlow.feature)>-1;
        self.gitFlow.hasRelease=self.gitFlow.hasRelease?true:branch.name.indexOf(self.gitFlow.release)>-1;
        self.gitFlow.hasDevelop=self.gitFlow.hasDevelop?true:branch.name.indexOf(self.gitFlow.develop)>-1;
        self.gitFlow.hasHotfix=self.gitFlow.hasHotfix?true:branch.name.indexOf(self.gitFlow.hotfix)>-1;
        
    });
    this.displayVillage=true;
  }

  validatGitFlow(){
    return this.gitFlow && this.gitFlow.develop;
  }
}