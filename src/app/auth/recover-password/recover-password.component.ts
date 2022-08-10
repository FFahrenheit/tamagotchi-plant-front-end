import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  @Output() public accept = new EventEmitter<void>();
  @Output() public cancel = new EventEmitter<void>();
  @Output() public reject = new EventEmitter<void>();
  @Output() public triggered = new EventEmitter<void>();

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content: any) {
    this.triggered.emit();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      switch (result) {
        case 'YES':
          this.accept.emit();
          break;
        case 'NO':
          this.reject.emit();
          break;
        default:
          this.cancel.emit();
          break;
      }
    }, (reason) => {
      this.cancel.emit();
    });
  }

}
