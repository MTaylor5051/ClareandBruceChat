import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Clare } from './Clare';
import { Bruce } from './Bruce';
import { OnHold } from './OnHold';
import { Messages } from './Messages';
import { ConvoState } from './ConvoState'; 

@Injectable()
export class MainService {

  // URLs to web api
  private backendUrlConvoState = 'api/convoState';  
  private backendUrlMessages = 'api/messages';  

  constructor(private http: Http) { }

  //Get Convo State
  getConvoState() {
    return this.http.get(this.backendUrlConvoState)
               .toPromise()
               .then(response => response as any )
               .catch(this.handleError);
  }


  // Put Bruce Object
  putBruce(bruce: Bruce) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
               .put(this.backendUrlConvoState, JSON.stringify(bruce), {headers: headers})
               .toPromise()
               .then(() => bruce)
               .catch(this.handleError);
  }

  // Put Clare Object
  putClare(clare: Clare) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
               .put(this.backendUrlConvoState, JSON.stringify(clare), {headers: headers})
               .toPromise()
               .then(() => clare)
               .catch(this.handleError);
  }

  // Toggle on hold Object
  toggleOnHold(onHold: OnHold) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http
               .put(this.backendUrlConvoState, JSON.stringify(onHold), {headers: headers})
               .toPromise()
               .then(() => onHold)
               .catch(this.handleError);
  }

  // Get messages
  getMessages() {
    return this.http.get(this.backendUrlMessages)
               .toPromise()
               .then(response => response as any )
               .catch(this.handleError);
  }

  // Post message
  postMessage(message: Messages) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http
               .post(this.backendUrlMessages, JSON.stringify(message), {headers: headers})
               .toPromise()
               .then(() => message)
               .catch(this.handleError);
  }  

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}