import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Branch}           from '../model/branch';
import {Repo}           from '../model/repo';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class RepoService {

  tokens = [
    '?client_id=98ba4579dcb39fd26bb5&client_secret=7ebe034ce9603613b32ed8577a58971d6f1227a4',
    '?client_id=4df4a2fb92ef347cfc04&client_secret=955c91f03a59c627ebcfb3fb3ef2add405f97ad6',
    '?client_id=7f09ad08af716db0ba1f&client_secret=4ff46cd97f2f2160ddef4794964fba8da25f26ac'
  ];

  constructor(private http: Http) {}

  loadRepoByUser(user: string) {
    if (localStorage.getItem('otheruser')) {
      user = localStorage.getItem('otheruser');
    }
    let urlRepos = 'https://api.github.com/users/' + user + '/repos' + this.tokens[Math.floor(Math.random() * 3)];
    // let urlRepos = 'https://api.github.com/users/johnpapa/repos' + this.tokens[Math.floor(Math.random() )];
    return this.http.get(urlRepos)
      .map(this.extractData)
      .catch(this.handleError);
  }

  load(url: string): Observable < any > {
    return this.http.get((url.indexOf('{') > -1 ? url.substr(0, url.indexOf('{')) : url) + this.tokens[Math.floor(Math.random() * 3)])
      .map(this.extractData)
      .catch(this.handleError);
  }

  checkUserExists (user: string) {
    return this.http.get( `https://api.github.com/users/${user}` + this.tokens[Math.floor(Math.random() * 3)] )
      .map( (reponse) => return reponse.status != 404 )
      .catch( () => return Observable.empty() );
  }

  loadBranch(user: string, repo: string): Observable < Branch[] > {
    if (localStorage.getItem('otheruser')) {
      user = localStorage.getItem('otheruser');
    }
    // user="johnpapa";
    let urlRepos = 'https://api.github.com/repos/' + user + '/' + repo + '/branches'+ this.tokens[Math.floor(Math.random() * 3)];
    return this.http.get(urlRepos)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    return res.json() || {};
  }

  private handleError(error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}