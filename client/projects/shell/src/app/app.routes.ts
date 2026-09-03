import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'sandbox',
    loadChildren: () =>
      loadRemoteModule('sandbox', './Routes').then(m => m.routes)
  },
  {
    path: 'files',
    loadChildren: () =>
      loadRemoteModule('shareFiles', './Routes').then(m => m.routes)
  },
  {
    path: '',
    loadChildren: () =>
      loadRemoteModule('portfolio', './Routes').then(m => m.routes)
  }
];
