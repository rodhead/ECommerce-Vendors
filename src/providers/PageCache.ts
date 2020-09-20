import { Injectable } from "@angular/core";
import { ApplicationStorage } from "src/providers/ApplicationStorage";

@Injectable()
export class PageCache {
  PageCachingData: any = {};
  constructor(private storage: ApplicationStorage) {}

  set(Data: any) {
    this.PageCachingData = Data;
  }

  get(Name: string) {
    if (
      this.PageCachingData == null ||
      Object.keys(this.PageCachingData).length === 0
    ) {
      let LocaleData = this.storage.get("master", Name);
      if (LocaleData !== null && LocaleData !== "") {
        this.PageCachingData = LocaleData;
      }
    }
    return this.PageCachingData;
  }

  clear() {
    this.PageCachingData = null;
  }

  SetData(Key: string, Data: any) {
    if (Key !== null && Key !== "") {
      localStorage.setItem(Key, JSON.stringify(Data));
    }
  }

  GetPreviousPageData(Key: string) {
    let Data = null;
    if (Key !== null && Key !== "") {
      Data = localStorage.getItem(Key);
      localStorage.removeItem(Key);
      if (Data !== null && Data !== "") {
        Data = JSON.parse(Data);
      }
    }
    return Data;
  }
}
