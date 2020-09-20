import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "default" })
export class DefaultValue implements PipeTransform {
  transform(value: string, defaultValue: string): string {
    if (value === undefined || value === null) {
      return defaultValue;
    } else {
      if (value === "") {
        return defaultValue;
      } else {
        return value;
      }
    }
  }
}
