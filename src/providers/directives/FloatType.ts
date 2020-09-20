import { Directive, ElementRef, Input, HostListener } from "@angular/core";

@Directive({ selector: "input[FloatType]" })
export class FloatOnlyDirective {
  @Input() FloatType: boolean;
  AllowedKeys: Array<number> = [8, 46, 37, 39];
  constructor(private elemRef: ElementRef) {}

  @HostListener("keydown", ["$event"]) onKeyDown(event) {
    let e = <KeyboardEvent>event;
    if (this.FloatType) {
      if (this.AllowedKeys.indexOf(e.which) !== -1) {
        return;
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
