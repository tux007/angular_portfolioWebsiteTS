import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BootComponent } from './pages/boot/boot.component';
import { DesktopComponent } from './pages/desktop/desktop.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
		{ path: 'boot', component: BootComponent, canActivate: [authGuard] },
		{ path: 'desktop', component: DesktopComponent, canActivate: [authGuard] },
	{ path: '**', redirectTo: 'login' },
];
