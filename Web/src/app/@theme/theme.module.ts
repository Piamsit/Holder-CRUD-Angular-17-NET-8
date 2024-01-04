import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DateInterceptor } from '@core/interceptor/date-interceptor';
import { TrimInterceptor } from '@core/interceptor/trim-interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

const PRIME_MODULES = [
  TableModule,
  MessagesModule,
  MessageModule,
  InputTextModule,
  CardModule,
  ButtonModule,
  ToastModule,
  DialogModule,
  AutoFocusModule,
  DynamicDialogModule,
  ConfirmDialogModule,
];

const MODULES = [CommonModule, HttpClientModule, FormsModule, RouterModule];

@NgModule({
  imports: [...MODULES, ...PRIME_MODULES],
  exports: [...MODULES, ...PRIME_MODULES],
  declarations: [],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DateInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TrimInterceptor,
      multi: true,
    },
  ],
  schemas: [],
})
export class ThemeModule {}
