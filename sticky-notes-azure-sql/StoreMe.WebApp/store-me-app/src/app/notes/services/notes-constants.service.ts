import { Injectable } from '@angular/core';

@Injectable()
export class NotesConstantsService {

  constructor() { }

public static APIURLS={

  getall : "api/notes/get",
create:"api/notes/create",
update: "api/notes/update",
delete: "api/notes/delete"
};

  

}
