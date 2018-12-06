import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'PimpoHeaderBar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css'],
  moduleId: module.id,
})
export class HeaderBarComponent implements OnInit {

  @Input() username:string;
  
  constructor() { }

  ngOnInit() {
  }

}
