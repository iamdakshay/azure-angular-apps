import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { LandingPageComponent } from './shared/components/landing-page/landing-page.component';
// import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
    // {
    //     path: '',
    //     component: LoginComponent
    // },
    // {
    //     path: 'home',
    //     component: LandingPageComponent
    // },
    {
        path: 'notes',
        loadChildren: 'app/notes/notes.module#NotesModule'
    },
    // {
    //     path: '**',
    //     component: PageNotFoundComponent
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
