import {Component, NgZone} from '@angular/core';
import {RouteConfig, Router, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {CanActivate} from '@angular/router-deprecated';
import {tokenNotExpired, JwtHelper, AuthHttp} from 'angular2-jwt';

declare var Auth0Lock;

@Component({
  templateUrl: './src/components/login/login.component.html',
	directives: [ROUTER_DIRECTIVES]
})
//@CanActivate(() => tokenNotExpired())
export class LoginComponent {
	
	lock = new Auth0Lock('6VzIODFHRWvGU14nGK0rMTuDwXBqBNmt', 'gittribe.auth0.com');

	profile: any;

	constructor(private authHttp: AuthHttp, private _router: Router, private zoneImpl: NgZone) {
		this.profile = JSON.parse(localStorage.getItem('profile'));
	}

  login() {
    let self = this;
    this.lock.show((err: string, profile: string, id_token: string) => {
        if (err) {
          throw new Error(err);
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('id_token', id_token);
      	this.zoneImpl.run(() => this.profile = profile);

      	if (localStorage.getItem('otheruser')) {
      		localStorage.removeItem('otheruser');
      	}

        self.loggedIn();
      });
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.zoneImpl.run(() => this.profile = null);
    this.loggedIn();
    this._router.navigate(['Login']);
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
