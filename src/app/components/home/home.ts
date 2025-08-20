import { Component } from '@angular/core';
import { Bubbles } from '../bubbles';

@Component({
  selector: 'app-home',
  imports: [Bubbles],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {}
