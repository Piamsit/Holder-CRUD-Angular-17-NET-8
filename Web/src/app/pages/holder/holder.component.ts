import { Component, OnInit } from '@angular/core';
import { Holder } from '@core/models/master';
import { HolderService } from '@core/services/master';
import { PaginationService } from '@core/services/pagination.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LazyLoadEvent, Message } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { debounceTime, switchMap, tap } from 'rxjs';
import { HolderModalComponent } from './modal/holder-modal.component';

@UntilDestroy()
@Component({
  selector: 'app-holder',
  templateUrl: './holder.component.html',
})
export class HolderComponent implements OnInit {
  msgs: Message[] = [];

  dataSource: Holder[] = [];
  rowCount: number = 0;

  isLoading$ = this.paginationService.isLoading$;

  lazyEvent: LazyLoadEvent;

  ref: DynamicDialogRef;

  constructor(
    private holderService: HolderService,
    private paginationService: PaginationService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.paginationService.search
      .pipe(
        debounceTime(500),
        tap(() => this.paginationService.setLoading(true)),
        switchMap((search) => this.holderService.search(search)),
        untilDestroyed(this)
      )
      .subscribe({
        next: (paged) => {
          this.paginationService.setLoading(false);
          this.dataSource = paged.data;
          this.rowCount = paged.totalCount;
        },
        error: (error) => {
          this.paginationService.setLoading(false);
          this.msgs = [];
          error.messages.forEach((msg: any) => {
            this.msgs.push({
              severity: 'error',
              summary: 'Error',
              detail: msg,
            });
          });
        },
      });
  }

  loadData(event: LazyLoadEvent) {
    if (event) {
      this.lazyEvent = event;
    }

    this.paginationService.loadPage(this.lazyEvent);
  }

  openModal(data: Holder = {} as Holder) {
    this.ref = this.dialogService.open(HolderModalComponent, {
      header: !data.id ? 'สร้างเจ้าของ' : 'รายละเอียดเจ้าของ',
      width: '50vw',
      data: {
        data: { ...data },
      },
      dismissableMask: true,
      maximizable: true,
      modal: true,
      position: 'top',
    });

    this.ref.onClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData(null);
      }
    });
  }
}
