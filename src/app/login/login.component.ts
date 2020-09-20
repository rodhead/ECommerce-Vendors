import { Route } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AjaxService } from "providers/ajax.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private route: Router, private http: AjaxService) {}

  ngOnInit(): void {}

  doLogin() {
    // this.http.post("someurl", null).then(resonse => {

    // }).catch(err=> {

    // });
    this.route.navigate(["dashboard"]);
  }
}
