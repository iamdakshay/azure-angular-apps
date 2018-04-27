import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyNotesComponent } from './components/my-notes/my-notes.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'all'
            },
            {
                path: 'all',
                component: MyNotesComponent
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class NotesRoutingModule { }
