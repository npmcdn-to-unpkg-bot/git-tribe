import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { HTTP_PROVIDERS } from '@angular/http';

bootstrap(AppComponent, [ 
	HTTP_PROVIDERS,
	AUTH_PROVIDERS,
	ROUTER_PROVIDERS,
  	provide(LocationStrategy, { useClass: HashLocationStrategy }
]);
