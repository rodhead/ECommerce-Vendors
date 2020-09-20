import { Directive, Input, ElementRef, HostListener } from "@angular/core";

@Directive({ selector: "input[mobile]" })
export class MobileNumber {
  //@Input() IsMobileNo: boolean = false;
  AllowedKeys: Array<number> = [8, 46, 37, 39, 9];
  constructor(private elemRef: ElementRef) {}

  @HostListener("keydown", ["$event"]) onKeyDown(event) {
    let e = <KeyboardEvent>event;
    let len = event.currentTarget.value.length;
    if (this.AllowedKeys.indexOf(e.which) !== -1) {
      return;
    } else {
      if (len > 9) {
        e.preventDefault();
      } else {
        if (e.which === 190) {
          let textvalue = event.currentTarget.value;
          if (textvalue.indexOf(".") !== -1) e.preventDefault();
          else return;
        } else {
          if (e.which >= 48 && e.which <= 57) return;
          else e.preventDefault();
        }
      }
    }
  }
}
