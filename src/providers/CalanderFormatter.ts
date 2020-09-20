import { Injectable } from "@angular/core";
import {
  NgbDateParserFormatter,
  NgbDateStruct
} from "@ng-bootstrap/ng-bootstrap";
import { IsValidString } from "./common-service/common.service";

@Injectable()
export class CalanderFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
    if (value) {
      const dateParts = value.trim().split("/");
      if (dateParts.length === 1 && Number(dateParts[0])) {
        return { day: parseInt(dateParts[0]), month: null, year: null };
      } else if (
        dateParts.length === 2 &&
        Number(dateParts[0]) &&
        Number(dateParts[1])
      ) {
        return {
          day: parseInt(dateParts[0]),
          month: parseInt(dateParts[1]),
          year: null
        };
      } else if (
        dateParts.length === 3 &&
        Number(dateParts[0]) &&
        Number(dateParts[1]) &&
        Number(dateParts[2])
      ) {
        return {
          day: parseInt(dateParts[0]),
          month: parseInt(dateParts[1]),
          year: parseInt(dateParts[2])
        };
      }
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    if (date !== null)
      return new Date(date.year, date.month - 1, date.day).toLocaleDateString(
        "en-US",
        {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      );
    else return null;
  }
}
