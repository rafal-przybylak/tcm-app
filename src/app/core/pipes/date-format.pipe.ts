import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment-timezone';
import { TranslateService } from '@ngx-translate/core';
@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  private locale: string;
  private format: string;
  constructor(private translate: TranslateService) { }
  //constructor( private format: string, private locale: string) { }
  transform(value: any, format?: string, timezone?: string, locale?: string): string | null {
    this.locale = this.translate.currentLang;
    this.format = 'lll';
    return moment(value).lang(this.locale).format(this.format);
  }

}
