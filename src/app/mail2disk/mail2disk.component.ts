import {Component} from '@angular/core';
import {Mail2DiskService} from './mail2-disk.service';
import {Observable} from 'rxjs';
import {LetterparserMail, LetterparserNode} from 'letterparser';

@Component({
  selector: 'app-mail2disk',
  templateUrl: './mail2disk.component.html',
  styleUrls: ['./mail2disk.component.scss'],
})
export class Mail2diskComponent {

  $obs: Observable<[LetterparserMail, LetterparserNode]>;

  constructor(mailApi: Mail2DiskService) {
    this.$obs = mailApi.getLatestMail();
  }


}
