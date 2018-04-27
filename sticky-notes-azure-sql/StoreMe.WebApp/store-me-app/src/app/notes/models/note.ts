export class Note {

    Id: string = null;
    Type: string = '1';
    Title: string = '';
    Description: string = '';
    CompletionDate: Date;
    IsCompleted: boolean = false;
    CreatedAt: Date;
    CreatedBy: string;
    _Tags: any=null;

    constructor(title, content, type = null) {

        this.Type = null == type ? "1" : type;
        this.Title = title;
        this.Description = content;
        this.CreatedAt = new Date();
     }
}