import {Component, Input} from '@angular/core';
import {LetterparserMail, LetterparserNode} from 'letterparser';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-display-mail',
  templateUrl: './display-mail.component.html',
  styleUrls: ['./display-mail.component.scss'],
})
export class DisplayMailComponent {

  htmlUrl?: SafeResourceUrl;

  mail!: LetterparserMail;
  raw!: LetterparserNode;

  constructor(private _sanitizer: DomSanitizer) {
  }

  @Input()
  set mailData(value: [LetterparserMail, LetterparserNode] | null) {
    if (value) {
      const [mail, raw] = value;
      this.mail = mail;
      this.raw = raw;
      this.htmlUrl = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(new Blob([this.mail.html ?? ''], {type: 'text/html; charset=utf-8'})));
    }
  }
}
