import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-mail-kv-display',
  templateUrl: './mail-kv-display.component.html',
  styleUrls: ['./mail-kv-display.component.scss'],
})
export class MailKVDisplayComponent {

  @Input()
  key!: string;
  @Input()
  value?: string;
}
