import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsernameValidatorDirective } from './directives/username-validator.directive';
import { NG_VALIDATORS } from '@angular/forms';


@NgModule({
  declarations: [
    UsernameValidatorDirective
  ],
  imports: [
    CommonModule
  ],  
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UsernameValidatorDirective),
      multi: true,
    }
  ]
})
export class SharedModule { }
