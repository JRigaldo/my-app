import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthService} from '../../common/services/auth-service';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(AuthService, Router, EventAggregator)
export class Signup{

  constructor(AuthService, Router, EventAggregator){
    this.ea = EventAggregator;
    this.router = Router;
    this.authservice = AuthService;
    this.error = null;
  }

  signup(){
    this.error = null;
    this.authservice.signup(this.name).then(data => {
      this.ea.publish('user', data.name);
      this.router.navigateToRoute('home');
    }).catch(error => {
      this.error = error.message;
    })
  }

}
