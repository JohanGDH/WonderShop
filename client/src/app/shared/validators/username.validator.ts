import { AbstractControl, ValidatorFn } from "@angular/forms";

export function includes (usernames: string[]): ValidatorFn {
    return function (control: AbstractControl): {[key: string]: any} {
        if (control.value != null || typeof control.value === 'string' && control.value.length !== 0) {

            return usernames.includes(control.value.toLocaleLowerCase())
              ? { includes: true }
              : null;

        } else {
            return null;
        }
    }
}