import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {

  @ViewChild('dialogElement')
  dialogRef?: ElementRef;
  @Output() newShow = new EventEmitter<boolean>();

  constructor() {
  }

  get show(): boolean {
    return this.dialog !== undefined && this.dialog.hasAttribute('open');
  }

  @Input()
  set show(value: boolean) {
    this.newShow.emit(value);
    if (value) {
      this.dialog?.setAttribute('open', '');
    }
    else {
      this.dialog?.removeAttribute('open');
    }
  }

  get dialog(): HTMLDialogElement | undefined {
    return this.dialogRef?.nativeElement;
  }

}
