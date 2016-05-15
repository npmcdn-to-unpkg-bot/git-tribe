import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {RouteConfig, Router, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {CanActivate} from '@angular/router-deprecated';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';

import { WorldHelper } from './world.helper';
import { WorldVillageComponent } from './world-village.component';
import { LoginComponent } from '../login/login.component';
import { RepoService } from '../../services/repo.service';
import { Coordinate } from '../../model/coordinate';
import { Repo } from '../../model/repo';

declare var componentHandler;

@Component({
  templateUrl: './src/components/world/world.component.html',
  styleUrls: ['./src/components/world/world.component.css'],
  directives: [ROUTER_DIRECTIVES, WorldVillageComponent],
  providers: [RepoService, LoginComponent]
})
// @CanActivate(() => tokenNotExpired())
export class WorldComponent implements OnInit, AfterViewChecked {

  mousex: number = 0;
  mousey: number = 0;

  worldtop: number = 0;
  worldleft: number = 0;

  rotationRadius: number;
  repos: Repo[];
  coordinates: Coordinate[];
  lakesCoordinates: Coordinate[];
  forestsCoordinates: Coordinate[];
  treesCoordinates: Coordinate[];
  stonesCoordinates: Coordinate[];

  constructor(private _repoService: RepoService, private _login: LoginComponent) {}

  ngOnInit() {
    this._repoService.loadRepoByUser(this._login.profile.nickname).subscribe(repos => {
      this.repos = repos;
      this.coordinates = WorldHelper.generateVillagesCoords(this.repos);
      this.worldtop = (600 - this.getDiameter()) / 2;
      this.worldleft = (600 - this.getDiameter()) / 2;

      this.lakesCoordinates = WorldHelper.generateLakesCoords(this.coordinates);
      this.forestsCoordinates = WorldHelper.generateForestsCoordinates(this.coordinates, this.lakesCoordinates);
      this.treesCoordinates = WorldHelper.generateTreesCoordinates(this.coordinates, this.lakesCoordinates, this.forestsCoordinates);
      this.stonesCoordinates = WorldHelper.generateStonesCoordinates(this.coordinates, this.lakesCoordinates, this.forestsCoordinates, this.treesCoordinates);
    });
  }

  ngAfterViewChecked() {
    componentHandler.upgradeDom();
  }

  floor(val: number) {
    return Math.floor(val);
  }

  getDiameter() {
    return (600 * (2 * Math.floor((WorldHelper.rotationRadius + 7) / 15) + 1));
  }

  getWorldRadius () {
    return this.getDiameter() / 2 + 20;
  }

  move(event) {

    if (event.buttons === 1) {
      if (this.mousex !== 0 && this.mousey !== 0) {
        this.worldtop += event.y - this.mousey;
        this.worldleft += event.x - this.mousex;

        if (this.worldtop < 600 - this.getDiameter()) {
          this.worldtop = 600 - this.getDiameter();
        }
        
        if (this.worldleft < 600 - this.getDiameter()) {
          this.worldleft = 600 - this.getDiameter();
        }

        if (this.worldtop > 0) {
          this.worldtop = 0;
        }
        
        if (this.worldleft > 0) {
          this.worldleft = 0;
        }
      }

      this.mousex = event.x;
      this.mousey = event.y;
    }
  }

  reset () {
    this.mousex = 0;
    this.mousey = 0;
  }

}