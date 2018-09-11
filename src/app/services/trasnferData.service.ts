import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class TransferDataService {

    private dataSource = new BehaviorSubject<any>(null);
    currentData = this.dataSource.asObservable();

    constructor() { }

    transferData(data: any) {
        if (data != null) {
            this.dataSource.next(data);
        }
    }

}
