import { Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { LabDetailsComponent } from './components/lab-details/lab-details.component';
import { LabsComponent } from './components/labs/labs.component';
import { OffersComponent } from './components/offers/offers.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TestsComponent } from './components/tests/tests.component';
import { routes as routePaths } from './constants/routes';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { AuthComponent } from './components/auth/auth.component';
export const routes: Routes = [
  { path: routePaths.home, component: HomeComponent },
  { path: 'auth', component: AuthComponent },
    { path:routePaths.searchresults, component: SearchResultsComponent },
  { path: routePaths.tests, component: TestsComponent },
  { path: routePaths.labs, component: LabsComponent },
  { path: 'labs/:id', component: LabDetailsComponent },  // ✅ use param here
  { path: routePaths.offers, component: OffersComponent },
  { path: routePaths.profile, component: ProfileComponent },
  { path: routePaths.checkout, component: CheckoutComponent },
 
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
