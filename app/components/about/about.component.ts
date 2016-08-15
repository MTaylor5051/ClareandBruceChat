import { Component } from '@angular/core';
import { Router }           from '@angular/router';

@Component({
    selector: 'about-me',
    templateUrl: 'components/about/about.component.html'
})
export class AboutComponent {
    constructor( private router: Router){} 
 }
