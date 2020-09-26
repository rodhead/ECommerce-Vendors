import { debounceTime } from 'rxjs/operators';
import { Input, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SelectorMatcher } from '@angular/compiler';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadExcelComponent } from './modals/upload-excel/upload-excel.component'

@Component({
  selector: 'app-ngbd-alert',
  templateUrl: 'alert.component.html',
  styles: [`
    :host >>> .alert-custom {
      color: #99004d;
      background-color: #f169b4;
      border-color: #800040;
    }
  `]
})
export class NgbdAlertBasicComponent implements OnInit {
  

  ngOnInit(): void {
    
  }
  constructor(private modalService: NgbModal) {}

  uploadExcelTemplate(){
    const modalRef = this.modalService.open(UploadExcelComponent,{ size: 'lg' });
    modalRef.componentInstance.name = 'World';
  }

  
 
}

