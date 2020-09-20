import { Injectable } from "@angular/core";
import { CommonService, IsValidType } from "./common-service/common.service";
import { ClassDetail } from "src/app/app.component";

@Injectable()
export class ApplicationStorage {
  $master: any = {};
  CurrentUserDetail: any = null;
  MasterCacheName = "master";
  ClassDetail: Array<ClassDetail>;
  constructor(private commonService: CommonService) {}

  public GetClassDetail(): Array<ClassDetail> {
    if (!IsValidType(this.ClassDetail))
      this.ClassDetail = this.get(null, "Classes");
    return this.ClassDetail;
  }

  public GetClasses() {
    this.ClassDetail = this.get(null, "Classes");
    let Classes = [];
    let index = 0;
    while (index < this.ClassDetail.length) {
      if (
        Classes.filter(x => x === this.ClassDetail[index].Class).length === 0
      ) {
        Classes.push(this.ClassDetail[index].Class);
      }
      index++;
    }

    return Classes;
  }

  reinitMaster() {
    let flag = false;
    let LocalData = localStorage.getItem("master");
    if (LocalData != null && LocalData != "" && LocalData != "{}") {
      this.$master = JSON.parse(LocalData);
      flag = true;
    }
    return flag;
  }

  public GetCurrentUser() {
    if (this.CurrentUserDetail === null)
      this.CurrentUserDetail = this.get(null, "CurrentUser");
    return this.CurrentUserDetail;
  }

  set(Data: any, IsReplaceAll: boolean = false) {
    if (this.commonService.IsValid(Data)) {
      if (IsReplaceAll) {
        this.$master = null;
        this.$master = Data;
      } else {
        let LocalData = localStorage.getItem("master");
        if (LocalData != "" && LocalData !== null) {
          this.$master = JSON.parse(LocalData);
          let Fields = Object.keys(Data);
          let index = 0;
          while (index < Fields.length) {
            this.$master[Fields[index]] = Data[Fields[index]];
            index++;
          }
        } else {
          this.$master = null;
          this.$master = Data;
        }
      }

      localStorage.removeItem(this.MasterCacheName);
      if (
        typeof localStorage.removeItem("master") === "undefined" ||
        localStorage.getItem("master") === null
      ) {
        localStorage.setItem(
          this.MasterCacheName,
          JSON.stringify(this.$master)
        );
        this.commonService.ShowToast("Data initialized.");
      } else {
        this.commonService.ShowToast("Not able to re-load master data.");
      }
    }
  }

  clear() {
    localStorage.clear();
  }

  get(storageName: string = this.MasterCacheName, key: string) {
    let ResultingData = null;
    if (
      storageName === undefined ||
      storageName === null ||
      storageName === ""
    ) {
      storageName = this.MasterCacheName;
    }
    storageName = storageName.toLocaleLowerCase();
    let Data = localStorage.getItem(storageName);
    if (this.commonService.IsValid(Data)) {
      Data = JSON.parse(Data);
      let DataKeys = Object.keys(Data);
      if (DataKeys.length > 0) {
        let index = 0;
        while (index < DataKeys.length) {
          if (DataKeys[index].toLocaleLowerCase() === key.toLocaleLowerCase()) {
            ResultingData = Data[DataKeys[index]];
            break;
          }
          index++;
        }
      }
    }
    return ResultingData;
  }

  setByKey(Key: string, ModifiedData: any): boolean {
    let flag = false;
    let ResultingData = null;
    if (this.MasterCacheName != "" && Key != "") {
      this.MasterCacheName = this.MasterCacheName.toLocaleLowerCase();
      let Data = localStorage.getItem(this.MasterCacheName);
      if (this.commonService.IsValid(Data)) {
        Data = JSON.parse(Data);
        let DataKeys = Object.keys(Data);
        if (DataKeys.length > 0) {
          let index = 0;
          while (index < DataKeys.length) {
            if (
              DataKeys[index].toLocaleLowerCase() === Key.toLocaleLowerCase()
            ) {
              Data[DataKeys[index]] = ModifiedData;
              localStorage.setItem(this.MasterCacheName, JSON.stringify(Data));
              flag = true;
              break;
            }
            index++;
          }
        }
      }
    }
    return flag;
  }
}
