import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResumeModel } from '~/app/utils/variables';

@Component({
  selector: 'ns-resume',
  templateUrl: './resume.component.html',
  moduleId: module.id
})
export class ResumeComponent implements OnInit {
  @Input()
  resume: ResumeModel;
  @Input()
  showResume = false;
  @Output()
  actionClick = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public action(btnClicked: string): void {
    this.actionClick.emit(btnClicked);
  }
}
