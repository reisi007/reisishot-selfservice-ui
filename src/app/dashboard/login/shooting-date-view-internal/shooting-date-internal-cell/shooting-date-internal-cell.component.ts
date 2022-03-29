import {Component, Input} from '@angular/core';
import {CalendarWeekAvailability} from '../../../../shooting-dates/CalendarWeekAvailability.model';

@Component({
  selector: 'app-shooting-date-internal-cell',
  templateUrl: './shooting-date-internal-cell.component.html',
  styleUrls: ['./shooting-date-internal-cell.component.scss'],
})
export class ShootingDateInternalCellComponent {

  private static _RAW_EMOJI_DATA: { [key: string]: string | Array<string> } = {
    '🌇': 'Sonnenuntergang',
    '🛋️': 'Indoor',
    '🏞️': 'Outdoor',
    '👙': 'Boudoir',
    '👧': ['Portrait', 'Porträt'],
    '🐶': 'Hund',
    '❓❓': '??',
  };

  private static EMOJI_CONFIG: Array<[string, Array<string>]> = Object.entries(ShootingDateInternalCellComponent._RAW_EMOJI_DATA)
                                                                      .map(data => {
                                                                        const [key, value] = data;
                                                                        if (typeof value == 'string') {
                                                                          return [key, [value.toLowerCase()]];
                                                                        }
                                                                        else {
                                                                          return [key, value.map(e => e.toLowerCase())];
                                                                        }
                                                                      });
  emoji = '';
  @Input()
  availability !: CalendarWeekAvailability;

  constructor() {
  }

  _text = '';

  get text(): string {
    return this._text;
  }

  @Input()
  set text(text: string) {
    if (text) {
      this._text = text.split('|')[0].trim();
      this.emoji = ShootingDateInternalCellComponent.calculateEmoji(text);
    }
  }

  get formattedText(): string {
    const text = this._text;
    return text ? '(' + text + ')' : '';
  }

  private static calculateEmoji(_text: string): string {
    const text = _text.toLowerCase();
    let emojis = '';
    for (const [key, value] of ShootingDateInternalCellComponent.EMOJI_CONFIG) {
      const includes = value.some(v => text.includes(v));
      if (includes) {
        emojis += key;
      }

    }
    return emojis;
  }

}
