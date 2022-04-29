import {Component, Input} from '@angular/core';
import {LetterparserMail, LetterparserNode} from 'letterparser';

@Component({
  selector: 'app-display-mail',
  templateUrl: './display-mail.component.html',
  styleUrls: ['./display-mail.component.scss'],
})
export class DisplayMailComponent {

  mail!: LetterparserMail;
  raw!: LetterparserNode;

  @Input()
  set mailData(value: [LetterparserMail, LetterparserNode] | null) {
    if (value) {
      const [mail, raw] = value;
      this.mail = mail;
      this.raw = raw;

    }
  }

}
