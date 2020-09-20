import { Directive, ElementRef, Input, HostListener } from "@angular/core";

@Directive({ selector: "input[number]" })
export class NumberDirective {
  @Input() number: number;
  AllowedKeys: Array<number> = [8, 46, 37, 39, 9];
  constructor(private elemRef: ElementRef) {}

  @HostListener("keydown", ["$event"]) onKeyDown(event) {
    let e = <KeyboardEvent>event;
    if (this.number) {
      if (this.AllowedKeys.indexOf(e.which) !== -1) {
        return;
      } else {
        if (
          e.which >= 48 &&
          e.which <= 57 &&
          event.currentTarget.value.length < this.number
        )
          return;
        else e.preventDefault();
      }
    }
  }
}
