export class ImageSize {
  constructor(
    readonly identifier: string,
    readonly size: number,
  ) {
  }

  isLargerThan(requiredSize: number): boolean {
    return this.size > requiredSize;
  }
}

export const ImageSizes: Array<ImageSize> = [
  new ImageSize('embed', 400),
  new ImageSize('thumb', 700),
  new ImageSize('medium', 1200),
  new ImageSize('large', 2050),
];
