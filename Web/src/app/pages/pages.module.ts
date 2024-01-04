import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { HolderComponent } from './holder/holder.component';
import { HolderModalComponent } from './holder/modal/holder-modal.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [ThemeModule, PagesRoutingModule],
  declarations: [HolderComponent, HolderModalComponent],
})
export class PagesModule {}
