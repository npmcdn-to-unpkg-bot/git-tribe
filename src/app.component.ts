import {Component, bind} from '@angular/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, Router} from '@angular/router-deprecated';
import {Location} from '@angular/common';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import 'rxjs/Rx'; 

import {LoginComponent} from './components/login/login.component';
import {WorldComponent} from './components/world/world.component';

@Component({
    selector: 'git-tribe',
    template: `
    <div class="demo-layout mdl-layout mdl-layout--fixed-header mdl-js-layout mdl-color--grey-100">
      <header class="demo-header mdl-layout__header mdl-layout__header--scroll mdl-color--grey-100 mdl-color-text--grey-800">
        <div class="mdl-layout__header-row">
          <span class="mdl-layout-title">{{ title }}</span>
          <div class="mdl-layout-spacer"></div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">

          </div>
        </div>
      </header>
      <main class="demo-main mdl-layout__content">
        <div class="demo-container mdl-grid">
          <div class="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
          <div class="demo-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col">
            <router-outlet></router-outlet>
          </div>
        </div>
       
      </main>
    </div>
    `,
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/',      name: 'Login',  component: LoginComponent },
  { path: '/world', name: 'World',  component: WorldComponent }
])
export class AppComponent {

	title: string = 'Git Tribe Viewer';

}
