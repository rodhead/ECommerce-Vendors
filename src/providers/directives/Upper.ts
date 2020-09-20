import { Directive, ElementRef, Input, HostListener } from "@angular/core";

@Directive({
  selector: "input[upper]",
})
export class UpperAndLowerCaseDirective {
  @Input() upper: boolean;
  lastValue: string;
  AllowedKeys: Array<number> = [8, 46, 37, 39, 9];
  constructor(private ref: ElementRef) {}

  @HostListener("keypress", ["$event"]) onKeyDown(event: KeyboardEvent) {
    let e = <KeyboardEvent>event;
    if (this.AllowedKeys.indexOf(e.which) !== -1) {
      return;
    } else {
      e.target["value"] += e.key.toUpperCase();
      e.preventDefault(); //stop propagation
      //must create a "input" event, if not, there are no change in your value
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("input", false, true);
      event.target.dispatchEvent(evt);
    }
  }
}
