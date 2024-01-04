import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Holder } from '@core/models/master';
import { HolderService } from '@core/services/master';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@UntilDestroy()
@Component({
  selector: 'app-holder-modal',
  templateUrl: './holder-modal.component.html',
})
export class HolderModalComponent implements OnInit {
  msgs: Message[] = [];

  data: Holder;

  submitted = false;
  @ViewChild('f') f: NgForm;

  constructor(
    private holderService: HolderService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
  ) {}

  ngOnInit() {
    this.data = this.config.data.data;
  }

  onSubmit() {
    this.submitted = true;
    if (this.f.invalid) {
      return;
    }

    if (!this.data.id) {
      this.onCreate();
    } else {
      this.onUpdate();
    }
  }

  onCreate() {
    this.holderService
      .add(this.data)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'CreateSuccess',
            life: 3000,
          });
          this.ref.close(true);
        },
        error: (error: any) => {
          this.handleApiError(error);
        },
      });
  }

  onUpdate() {
    this.holderService
      .update(this.data)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'UpdateSuccess',
            life: 3000,
          });
          this.ref.close(true);
        },
        error: (error: any) => {
          this.handleApiError(error);
        },
      });
  }

  onDelete(data: Holder) {
    this.confirmationService.confirm({
      message: 'ยืนยันการลบเจ้าของ',
      header: 'ลบเจ้าของ',
      acceptLabel: 'ตกลง',
      rejectLabel: 'ยกเลิก',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.confirmDelete(data);
      },
    });
  }

  confirmDelete(data: Holder) {
    this.msgs = [];
    this.holderService
      .delete(data.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'DeleteSuccess',
            life: 3000,
          });
          this.ref.close(true);
        },
        error: (error: any) => {
          this.handleApiError(error);
        },
      });
  }

  onClose() {
    this.ref.close();
  }

  private handleApiError(error: any): void {
    this.msgs = [];

    if (
      error &&
      error.messages &&
      Array.isArray(error.messages) &&
      error.messages.length > 0
    ) {
      error.messages.forEach((msg: any) => {
        this.msgs.push({
          severity: 'error',
          summary: 'Error',
          detail: msg,
        });
      });
    } else if (error && error.exception) {
      this.msgs.push({
        severity: 'error',
        summary: 'Error',
        detail: error.exception,
      });
    }
  }
}
