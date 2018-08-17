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
        this.dataSource.next(data);
    }

}
