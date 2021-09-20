import { Directive, Input } from '@angular/core';
import { AbstractControl, Validator } from '@angular/forms';
import { includes } from '../validators/username.validator';

@Directive({
  selector:
    '[includes][ngModel],[includes][formControl],[includes][formControlName]',
})
export class UsernameValidatorDirective implements Validator {
  
  @Input() usernames: string[] = [];

  validate(control: AbstractControl): { [key: string]: any } {
    if (
      control.value != null ||
      (typeof control.value === 'string' && control.value.length !== 0)
    ) {
      return includes(this.usernames)(control);
    } else {
      return null;
    }
  }
}




