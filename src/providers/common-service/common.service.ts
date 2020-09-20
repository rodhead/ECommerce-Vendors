import { ExamResult, ManageExamDetail, ManageExam } from "./../constants";
import { Injectable } from "@angular/core";
import * as $ from "jquery";
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { MappedActionPage } from "./../MappedActionPage";

const AllowedKey = [8, 9, 46];
@Injectable({
  providedIn: "root",
})
export class CommonService {
  LoaderEnableByAjax: boolean = false;
  LoaderEnableByPageNavigator: boolean = false;
  private CurrentPageName: string;
  private IsLoginSuccess: boolean;
  private ApplicationMenu: any;
  private DefaultUserImagePath: string = "assets/img/user.jpg";
  private PageDetail: Array<MappedActionPage> = [];
  private BreadCrumbData: Array<string> = [];
  ErrorControlId: Array<string> = [];
  constructor() {
    this.IsLoginSuccess = false;
    this.CurrentPageName = "";
  }

  public SetLoginStatus(Status: boolean) {
    if (Status === true) {
      this.IsLoginSuccess = true;
    }
  }

  public UpdateBreadCrumb(PageRouteNames: string) {
    if (PageRouteNames !== null && PageRouteNames) {
      let Data: Array<string> = PageRouteNames.split("/");
      this.BreadCrumbData = [];
      let index = 0;
      while (index < Data.length) {
        if (Data[index] !== "") this.BreadCrumbData.push(Data[index]);
        index++;
      }
    }
  }

  public GetBreadCrumbRoute() {
    if (this.BreadCrumbData !== null && this.BreadCrumbData.length > 0) {
      return this.BreadCrumbData;
    } else {
      return [];
    }
  }

  public GetLoginStatus() {
    return this.IsLoginSuccess;
  }

  public SetCurrentPageName(Name: string) {
    if (IsValidString(Name)) {
      this.CurrentPageName = Name;
    }
    this.LoadMappingInitialData();
  }

  public IsValidResponse(Data: any) {
    let Flag = false;
    let DataType = typeof Data;
    let OriginalData = Data;
    if (DataType === "string") {
      OriginalData = JSON.parse(Data);
    }
    if (OriginalData !== null) {
      let Keys = Object.keys(OriginalData);
      if (Keys.length > 0 && Keys.indexOf("HttpStatusCode") !== -1) {
        if (Data["HttpStatusCode"] === 200) {
          Flag = true;
        }
      }
    }
    return Flag;
  }

  public SetApplicationMenu() {
    let key = "Menu";
    this.ApplicationMenu = null;
    let Data: any = localStorage.getItem("master");
    let ResultingData = null;
    if (this.IsValid(Data)) {
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
    if (this.IsValid(ResultingData) && ResultingData.length > 0) {
      // let MenuData = JSON.parse(ResultingData[0].Menu);
      // if (this.IsValid(MenuData)) {
      //   this.ApplicationMenu = MenuData;
      // }

      this.ApplicationMenu = ResultingData;
    }
  }

  public GetApplicationMenu(): any {
    this.SetApplicationMenu();
    return this.ApplicationMenu;
  }

  public GetCurrentPageName() {
    return this.CurrentPageName;
  }

  public DefaultUserImage(): string {
    return this.DefaultUserImagePath;
  }

  public IsValid(Value: any): boolean {
    let Flag: boolean = false;
    if (
      Value !== null &&
      Value !== undefined &&
      Value !== "" &&
      Value !== "{}"
    ) {
      let ValueDataType = typeof Value;
      if (ValueDataType !== "undefined") {
        if (ValueDataType === "string") {
          if (Value.trim().length > 0) {
            Flag = true;
          }
        } else if (ValueDataType === "object") {
          if (Array.isArray(Value)) {
            if (Value.length > 0) Flag = true;
          } else if (Value instanceof Date) {
            Flag = true;
          } else {
            if (Object.keys(Value).length > 0) Flag = true;
          }
        }
      }
    }
    return Flag;
  }

  public NumericOnly(e: any): boolean {
    let flag = false;
    if (e >= 48 && e <= 57) flag = true;
    return flag;
  }

  public IsValidField(Columns: any): boolean {
    let Data = Columns;
    let flag = false;
    if ((Data !== null && Data !== "" && Data !== undefined) || Data !== "{}") {
      let Type = typeof Data;
      if (Type === "string") {
        if (Data.trim().length > 0) flag = true;
      } else if (Type === "object") {
        if (Array.isArray(Data)) {
          if (Data.length > 0) flag = true;
        } else {
          if (Object.keys(Data).length > 0) flag = true;
        }
      }
    }
    return flag;
  }

  public IsMoney(value: any) {
    let flag = true;
    if (!this.IsNumeric(value)) {
      if (value != ".") {
        flag = false;
      }
    }
    return flag;
  }

  public IsValidDataSet(Dataset: string): boolean {
    let flag = false;
    if (Dataset !== null && Dataset !== "") {
      let Keys = Object.keys(Dataset);
      if (Keys.length > 0) {
        flag = true;
      }
    }
    return flag;
  }

  public IsValidFilterResponse(Dataset: string): boolean {
    let flag = false;
    if (Dataset !== null && Dataset !== "") {
      let Keys = Object.keys(Dataset);
      if (Keys.length === 2) {
        if (
          Keys.indexOf("Record") !== -1 &&
          Keys.indexOf("RecordCount") !== -1
        ) {
          flag = true;
        } else {
          this.ShowToast("Getting some error. Please contact admin.");
        }
      }
    }
    return flag;
  }

  public IsNumeric(data: any): boolean {
    let flag = false;
    try {
      let integerData = parseInt(data);
      if (!isNaN(integerData)) flag = true;
      else flag = false;
    } catch (e) {
      return false;
    }
    return flag;
  }

  public Scrollto(ToElement: any) {
    $("html, body").animate({ scrollTop: ToElement.position().top }, "slow");
  }

  public AlphaNumericOnly(event: any) {}

  public AlphaOnly(event: any) {}

  public DateFormat(event: any) {}

  public MobileNumberFormat(number: any, count: number) {
    let flag = true;

    if (number >= 48 && number <= 57) {
      if (count > 9) {
        flag = false;
      }
    } else {
      flag = false;
    }
    return flag;
  }

  /* -------------------------------- Enable side menu -----------------------------------*/

  DisableActiveLinkes() {
    let $li = $("#menu").find('li[name="item-header"]');
    if ($li !== null && $li.length > 0) {
      let index = 0;
      while (index < $li.length) {
        $($li[index]).removeClass("active");
        $($li[index]).find("a").removeClass("active");
        $($li[index])
          .find('li[type="action"]')
          .removeClass("active active-list");
        index++;
      }
    }
  }

  /* -------------------------------- End side menu -----------------------------------*/

  ShowLoaderByAjax() {
    if (!this.LoaderEnableByAjax) {
      let $elem = $("#fadeloadscreen");
      if ($elem.length === 1) {
        $("#fadeloadscreen").removeClass("d-none");
        this.LoaderEnableByAjax = true;
      }
    }
  }

  HideLoaderByAjax() {
    if (this.LoaderEnableByAjax) {
      let $elem = $("#fadeloadscreen");
      if ($elem.length > 0) {
        $("#fadeloadscreen").addClass("d-none");
        this.LoaderEnableByAjax = false;
      }
    }
  }

  ShowLoader() {
    if (!this.LoaderEnableByAjax) {
      let $elem = $("#fadeloadscreen");
      if ($elem.length === 1) {
        $("#fadeloadscreen").removeClass("d-none");
      }
    }
  }

  HideLoader() {
    if (!this.LoaderEnableByAjax) {
      let $elem = $("#fadeloadscreen");
      if ($elem.length > 0) {
        $("#fadeloadscreen").addClass("d-none");
        this.LoaderEnableByAjax = false;
      }
    }
  }

  ShowToast(Message: string, TimeSpan: number = 5) {
    let $Toast = document.getElementById("toast");
    if ($Toast !== null && $Toast !== undefined) {
      $("#toastmessage").text(Message);
      $Toast.classList.add("show-tag");
      setTimeout(() => {
        this.HideToast();
      }, TimeSpan * 998);
    }
  }

  HideToast() {
    let $Toast = document.getElementById("toast");
    if ($Toast !== null && $Toast !== undefined) {
      $Toast.classList.remove("show-tag");
    }
  }

  GerPagination(TotalRecords: any, PageIndex: any, PageSize: any): any {
    // PageIndex always be start from 1 and not 0
    let Indexer = [];
    if (
      TotalRecords !== "" &&
      TotalRecords !== null &&
      PageIndex !== "" &&
      PageIndex !== null &&
      PageSize !== "" &&
      PageSize !== null
    ) {
      let $TotalRecord = parseInt(TotalRecords);
      let $CurrentIndex = parseInt(PageIndex) + 1;
      let TotalSlice = $TotalRecord / parseInt(PageSize);
      TotalSlice = Math.floor(TotalSlice);
      let Reminder = $TotalRecord % parseInt(PageSize);
      if (Reminder > 0) {
        TotalSlice++;
        let ExtraCounter = Math.floor($CurrentIndex / 5);
        let index = 0;
        while (index < TotalSlice) {
          Indexer.push(index + 1 + ExtraCounter * 5);
          index++;
          if (index == 5) break;
        }
      }
    }
    return Indexer;
  }

  /* -------------------- Auto dropdown actions -------------------------*/

  public ReadAutoCompleteValue($AutofillObject: any): any {
    let Data = null;
    if ($AutofillObject !== null) {
      if ($AutofillObject.find('input[name="iautofill-textfield"]') !== null) {
        Data = $AutofillObject.find('input[name="iautofill-textfield"]').val();
      }
    }
    return Data;
  }

  public ResetDropdown($Current: any) {
    $Current.find('input[name="iautofill-textfield"]').val("");
    $Current.find('input[name="iautofill-textfield"]').attr("data", "");
    $Current.find('input[name="iautofill-textfield"]').val("");
    $Current.find('input[name="autocomplete"]').val("");
  }

  public ReadAutoCompleteObject($AutofillObject: any): any {
    let Data = null;
    if ($AutofillObject !== null) {
      if ($AutofillObject.find('input[name="iautofill-textfield"]') !== null) {
        let ParsedValue: any = {};
        let CurrentTypeData = $AutofillObject
          .find('input[name="iautofill-textfield"]')
          .attr("data");
        if (IsValidString(CurrentTypeData)) {
          ParsedValue["data"] = JSON.parse(CurrentTypeData);
          ParsedValue["value"] = $AutofillObject
            .find('input[name="iautofill-textfield"]')
            .val();
        }
        Data = ParsedValue;
      }
    }
    return Data;
  }

  SufixNumber(SufixStr: any): string {
    let SufixNumber = 0;
    if (!isNaN(Number(SufixStr))) {
      SufixNumber = parseInt(SufixStr);
      if (SufixNumber === 11 || SufixNumber === 12) {
        return SufixNumber + "th";
      } else {
        switch (SufixNumber % 10) {
          case 1:
            return SufixNumber + "st";
          case 2:
            return SufixNumber + "nd";
          case 3:
            return SufixNumber + "rd";
          default:
            return SufixNumber + "th";
        }
      }
    }
    return SufixNumber.toString();
  }

  //--------------------- Auto dropdown action ends ---------------------*/
  /*---------------------------------------------------------------------*/

  /* -----------------------  Map dynamic table information --------------------------- */

  LoadMappingInitialData() {
    this.PageDetail.push({
      Page: "",
      PostDeleteUrl: "",
      GetUrl: "",
      PostEditUrl: "",
      PrimaryId: "",
    });
  }

  /* --------------------------------- end ------------------------------------------ */
}

export function IsValidType(Value: any): boolean {
  let Flag: boolean = false;
  if (Value !== null && Value !== undefined && Value !== "" && Value !== "{}") {
    let ValueDataType = typeof Value;
    if (ValueDataType !== "undefined") {
      if (ValueDataType === "string") {
        if (Value.trim().length > 0) {
          Flag = true;
        }
      } else if (ValueDataType === "object") {
        if (Array.isArray(Value)) {
          if (Value.length > 0) Flag = true;
        } else if (Value instanceof Date) {
          Flag = true;
        } else {
          if (Object.keys(Value).length > 0) Flag = true;
        }
      } else if (ValueDataType === "number") {
        return Value >= 0;
      }
    }
  }
  return Flag;
}

export function IsValidResponse(res: any) {
  let flag = false;
  if (IsValidType(res.body)) {
    let response: IResponse = res.body;
    if (response !== null) {
      if (response.HttpStatusCode === 200) flag = true;
    }
  }
  return flag;
}

export function IsValidBoolean(data: any): boolean {
  let type = typeof data;
  if (type === "boolean") return data;
  return false;
}

export function IsValidTime(TimeOption: any): string | null {
  if (TimeOption === undefined || TimeOption === null || TimeOption === "")
    return null;
  else {
    let keys = Object.keys(TimeOption);
    if (keys.indexOf("hour") !== -1 && keys.indexOf("minute") !== -1)
      return `${TimeOption["hour"]}:${TimeOption["minute"]}`;
    else return null;
  }
}

export function IsValidString(Data: any): boolean {
  if (Data === undefined || Data === null || Data === "") return false;
  else if (Data.trim() === "") return false;
  else return true;
}

export function FormateDate(PassedDate: string, Formate: string) {
  let FormatedDate: string | null = null;
  if (IsValidString(PassedDate)) {
    FormatedDate = new Date(PassedDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return FormatedDate;
}

export function GroupBy(ItemList: Array<any>, Key: any) {
  return ItemList.reduce(function (rv, x) {
    (rv[x[Key]] = rv[x[Key]] || []).push(x);
    return rv;
  }, {});
}

export function UniqueItem(Items: Array<any>, Key: any): Array<any> {
  let index = 0;
  let i = 0;
  let UniqueItems = [];
  if (IsValidType(Items)) {
    while (index < Items.length) {
      i = UniqueItems.findIndex((x) => x[Key] === Items[index][Key]);
      if (i === -1) {
        UniqueItems.push(Items[index]);
      }
      index++;
    }
  }
  return UniqueItems;
}

export function ActualOrDefault(data: any, modal: any): any {
  if (
    data !== undefined &&
    data !== null &&
    modal !== undefined &&
    modal !== null
  ) {
    let keys = Object.keys(modal);
    let type = null;
    let value = null;
    let key = null;
    let valueType = null;
    let index = 0;
    while (index < keys.length) {
      key = keys[index];
      type = typeof modal[key];
      value = data[key];
      valueType = typeof data[key];
      switch (type) {
        case "string":
          if (valueType === "undefined" || value === null) data[key] = "";
          break;
        case "object":
          if (data[key] instanceof Array) {
            if (valueType === "undefined" || value === null) data[key] = [];
          } else {
            if (valueType === "undefined" || value === null) data[key] = {};
          }
          break;
        case "number":
          if (valueType === "undefined" || value === null) data[key] = 0;
          break;
        case "boolean":
          if (valueType === "undefined" || value === null) {
            if (valueType === "number") {
              if (value === 1) data[key] = true;
              else data[key] = false;
            } else {
              data[key] = false;
            }
          }
          break;
      }
      index++;
    }
  }
  return data;
}

export interface IResponse {
  ResponseBody: string;
  HttpStatusCode: number;
  HttpStatusMessage: string;
  AuthenticationToken: string;
}
