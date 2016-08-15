import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MainService } from './main.service';

@Component({
    directives: [ROUTER_DIRECTIVES],
    providers: [
    MainService
    ],
    selector: 'chat-app',
    template:
    `
    <div class="row">
        <div class="col-sm-12">
        <div class="main-nav">
            <div class="row">
                <div class="col-sm-6 text-left">
                    <div class="chat-nav-ring">
                        <a [routerLink]="['/home']"><img src="images/chat.png" class="show-nav-label"/></a>
                    </div>
                </div>
                <div class="col-sm-6 text-right">
                    <div class="about-nav-ring">
                        <a [routerLink]="['/about']"><img src="images/about.png" class="show-nav-label"/></a>
                    </div>                   
                </div>               
            </div>
            </div>
        </div>
    </div>
    <img src="images/chat_video_tv_filled_screen.png" style=" display: none;"/>
    <div class="row nav-spacer">
        <div class="col-sm-12">
            &nbsp;
        </div>
    </div>
    <router-outlet></router-outlet>
    `
})
export class AppComponent {

    constructor() {}
}
