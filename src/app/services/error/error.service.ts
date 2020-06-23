import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  VALIDATION_TYPE = 'validation'
  FORM_TYPE = 'form'
  AUTH_TYPE = 'auth'

  private errors = {
    validation: {
      required: 'Le champ est requis',
      minlength: 'La valeur ne peut pas contenir moins de :requiredLength caractères',
      maxlength: 'La valeur ne peut pas contenir plus de :requiredLength caractères',
      min: 'La valeur ne peut pas être inférieur à :min',
      max: 'La valeur ne peut pas être supérieur à :max',
      email: 'La valeur doit être une adresse e-mail valide',
    },
    form: {
      invalid: 'Le formulaire n\'est pas valide',
    },
    auth: {
      "auth/user-not-found": 'L\'email ou le mot de passe est erroné.',
      "auth/wrong-password": 'L\'email ou le mot de passe est erroné.',
    }
  }

  constructor(private toastController: ToastController) { }

  getErrorMsg(type: string, name: string, params: any = null): string {
    let msg: string = this.errors[type][name]
    if (params instanceof Object) {
      for (let param in params) {
        msg = msg.replace(`:${param}`, params[param])
      }
    }
    return msg
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
