import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from '~/app/services/loading.service';

@Component({
  selector: 'ns-loading',
  template: `
    <StackLayout
      class="dimmer"
      visibility="{{ active ? 'visible' : 'collapsed' }}"
    ></StackLayout>
    <GridLayout
      columns="40,*"
      class="loading-container"
      rows="*"
      visibility="{{ active ? 'visible' : 'collapsed' }}"
    >
      <ActivityIndicator
        col="0"
        busy="true"
        verticalAlignment="center"
      ></ActivityIndicator>
      <Label
        class="font-weight-bold m-l-10"
        text="Aguarde..."
        col="1"
        verticalAlignment="center"
      ></Label>
    </GridLayout>
  `
})
export class LoadingComponent implements OnInit {
  @Input()
  active: boolean;

  constructor() {}

  ngOnInit() {}
}
