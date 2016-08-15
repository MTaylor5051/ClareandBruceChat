import { Component, OnInit} from '@angular/core';
import { Router }    from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Clare }         from '../../Clare';
import { Bruce }         from '../../Bruce';
import { OnHold }         from '../../OnHold';
import { ConvoState }    from '../../ConvoState';
import { Messages } from '../../Messages';
import { MainService } from '../../main.service';

@Component({
    selector: 'home-component',
    templateUrl: 'components/home/home.component.html'
})
export class HomeComponent implements OnInit {
    message = new Messages();
    selectedCharacter = false;
    selectedCharacterName = '';
    bothCharactersOnline = false;
    bruce = new Bruce();
    clare = new Clare();
    onHold = new OnHold();
    clareTimer: any;
    bruceTimer: any;
    onHoldTimer: any;
    messages: any;
    convoState = {};
    video = {
        waiting: false,
        bruce: false,
        clare: false,
        onHold: false
    }

    constructor( private router: Router, private mainService: MainService){ } 

    videoSelection(data: any){

        if((data.clareAvailable === false || data.bruceAvailable === false) && data.onHold === false){
            this.video.waiting = true;
            this.video.bruce = false;
            this.video.clare = false;
            this.video.onHold = false;
            this.onHold.onHold = false; 
            this.bothCharactersOnline = false;
            this.mainService.toggleOnHold(this.onHold);
        }

        if(data.clareAvailable === true && data.bruceAvailable === true
            && this.selectedCharacterName === 'Clare' && data.onHold === false){
            this.video.waiting = false;
            this.video.bruce = true;
            this.video.clare = false;
            this.video.onHold = false;
            this.bothCharactersOnline = true;
        }

        if(data.clareAvailable === true && data.bruceAvailable === true 
            && this.selectedCharacterName === 'Bruce' && data.onHold === false){
            this.video.waiting = false;
            this.video.bruce = false;
            this.video.clare = true;
            this.video.onHold = false;         
            this.bothCharactersOnline = true;       
        }

        if(data.clareAvailable === true && data.bruceAvailable === true && data.onHold === true){
            this.video.waiting = false;
            this.video.bruce = false;
            this.video.clare = false;
            this.video.onHold = true;  
            this.bothCharactersOnline = true;            
        }
    }

    ngOnInit(){
    let timerConvoState = Observable.timer(0, 2000);
        timerConvoState.subscribe(t => {
        this.mainService.getConvoState().then(data => {
            let json = JSON.parse(data._body);
             this.convoState = json[0]; 
             this.videoSelection(json[0]);
            }) 
        });

    let timerChatMessages = Observable.timer(0, 2000);
        timerChatMessages.subscribe(t => {
        this.mainService.getMessages().then(data => {
            let json = JSON.parse(data._body);
            this.messages = json.reverse();

            }) 
        });

        if(sessionStorage.getItem('convoState')){;  

              let cs = JSON.parse(sessionStorage.getItem('convoState'));
              if(cs.bruceAvailable){
                  this.selectBruce();
              }

              if(cs.clareAvailable){
                  this.selectClare();
              }
        }   
    }

    selectBruce(){      
        sessionStorage.setItem('convoState', JSON.stringify(this.bruce));
        this.selectedCharacter = true;
        this.selectedCharacterName = 'Bruce';  

        this.bruceTimer = Observable.timer(0, 2000);
        this.bruceTimer.subscribe(t => {

            if(sessionStorage.getItem('convoState')){

              let cs = JSON.parse(sessionStorage.getItem('convoState'));

              if(cs.bruceAvailable){

              this.mainService.putBruce(JSON.parse(sessionStorage.getItem('convoState')));

              }
            }
        });
    }

    selectClare(){
        sessionStorage.setItem('convoState', JSON.stringify(this.clare));
        this.selectedCharacter = true;
        this.selectedCharacterName = 'Clare';  

        this.clareTimer = Observable.timer(0, 2000);
        this.clareTimer.subscribe(t => {

            if(sessionStorage.getItem('convoState')){
              let cs = JSON.parse(sessionStorage.getItem('convoState'));

              if(cs.clareAvailable){

              this.mainService.putClare(JSON.parse(sessionStorage.getItem('convoState')));

              }
            }
        });
    }

    deselectBruce(){
        sessionStorage.removeItem('convoState');
        this.selectedCharacter = false;
        this.selectedCharacterName = '';  
        this.removeOnHold();
    }

    deselectClare(){
        sessionStorage.removeItem('convoState');
        this.selectedCharacter = false;
        this.selectedCharacterName = '';     
        this.removeOnHold();
    }

    placeOnHold(){
        if(this.bothCharactersOnline === true){
        this.onHold.onHold = true;        
        this.mainService.toggleOnHold(this.onHold);        
        }
    }

    removeOnHold(){
        this.onHold.onHold = false;       
        this.mainService.toggleOnHold(this.onHold);
    }

    submitMessage(){
        if(this.message.message.trim() !== ''){
             this.message.name = this.selectedCharacterName;
             this.mainService.postMessage(this.message);
             this.message.message = '';
        }
    }
 }
