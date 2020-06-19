import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  VALIDATION_TYPE = 'validation'

  private errors = {
    validation: {
      required: 'Le champ est requis',
      maxlength: 'La valeur ne peut pas contenir plus de :requiredLength caractères',
      min: 'La valeur ne peut pas être inférieur à :min',
      max: 'La valeur ne peut pas être supérieur à :max',
      email: 'La valeur doit être une adresse e-mail valide',
    }
  }

  constructor() { }

  getErrorMsg(type: string, name: string, params: any = null) {
    let msg: string = this.errors[type][name]
    if (params instanceof Object) {
      for (let param in params) {
        msg = msg.replace(`:${param}`, params[param])
      }
    }
    return msg
  }
}
