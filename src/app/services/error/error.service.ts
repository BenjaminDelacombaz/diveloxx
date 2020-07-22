import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  VALIDATION_TYPE = 'validation'
  FORM_TYPE = 'form'
  AUTH_TYPE = 'auth'
  GUARD_TYPE = 'guard'

  constructor(private toastController: ToastController, private translate: TranslateService) { }

  getErrorMsg(type: string, name: string, params: any = null): string {
    return this.translate.instant(`errors.${type}.${name}`, params)
  }

  getErrorMsgToast(type: string, name: string, params: any = null): Promise<HTMLIonToastElement> {
    let msg = this.getErrorMsg(type, name, params)
    return this.toastController.create({
      message: msg,
      duration: 5000,
      color: 'danger',
    })
  }
}
