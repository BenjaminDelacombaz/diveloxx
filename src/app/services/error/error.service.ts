import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private translate: TranslateService) { }

  getInputValidationMsg(name: string, params: any = null): string {
    return this.translate.instant(`form.validation.${name}`, params)
  }
}
