import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.scss']
})
export class UploadExcelComponent implements OnInit {
  model:any;
  @Input() name:any;;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }
  onFileChange(files: FileList) {
    console.log(files);
  }

}
