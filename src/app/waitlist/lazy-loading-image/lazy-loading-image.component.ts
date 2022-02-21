import {AfterViewInit, Component, ElementRef, Input, NgZone, ViewChild} from '@angular/core';
import {ImageSizes} from './ImageSizes';

@Component({
  selector: 'app-lazy-loading-image',
  templateUrl: './lazy-loading-image.component.html',
  styleUrls: ['./lazy-loading-image.component.scss'],
})
export class LazyLoadingImageComponent implements AfterViewInit {

  calcWidth = -1;

  src: string | null = null;

  constructor(
    private zone: NgZone,
  ) {
  }

  @ViewChild('img') private _img!: ElementRef;

  // Available in AfterViewInit
  get img(): HTMLElement {
    return this._img.nativeElement;
  }

  private _alt!: string;

  get alt(): string {
    return this._alt;
  }

  @Input() set alt(alt: string) {
    this._alt = alt;
  }

  private _ratio!: number;

  get ratio() {
    return this._ratio;
  }

  @Input() set ratio(ratio: number) {
    this._ratio = ratio;
  }

  private _id!: string;

  get id(): string {
    return this._id;
  }

  @Input() set id(id: string) {
    this._id = id;
  }

  private _host = 'reisishot.pictures';

  get host() {
    return this._host;
  }

  @Input() set host(host: string) {
    this._host = host;
  }

  ngAfterViewInit(): void {
    const img = this.img;
    const observer = new IntersectionObserver(
      () => {
        new ResizeObserver(() => {
          this.zone.run(() => this.onResize(img));
        }).observe(img);
      }, {
        rootMargin: '540px 0px 0px 1620px',
      },
    );

    observer.observe(img);
  }


  onResize(img: HTMLElement): void {
    const w = img.offsetWidth;
    this.calcWidth = w;
    const matchingSize = ImageSizes.find(e => e.isLargerThan(w));
    const usedImageSize = matchingSize ?? ImageSizes[ImageSizes.length - 1];

    this.src = 'https://reisishot.pictures/images/' + this.id + '_' + usedImageSize.identifier + '.webp';

  }

}
