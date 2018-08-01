import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Property } from '../models/Property';
import { ExpensesService } from '../services/expenses.service';
import { MyForm } from '../models/MyForm';

@Component({
  selector: 'app-forms-details',
  templateUrl: './forms-details.component.html',
  styleUrls: ['./forms-details.component.css']
})
export class FormsDetailsComponent implements OnInit {
  selectedProp: Property;
  selectedType: boolean;

  form: MyForm;

  getFormDetails(): void {
    const id = this.route.snapshot.paramMap.get('_id');
    this.service.getForm(id).subscribe(form => this.form = form);
  }

  constructor(private route: ActivatedRoute, private location: Location, private service: ExpensesService) { }

  ngOnInit() {
    this.getFormDetails();
  }

  onSelectProp(prop: Property, type: boolean) {
    this.selectedType = type;
    this.selectedProp = prop;
  }

  async onFormSubmit(form: any) {
    const isAdded: boolean = await this.service.UpdateForm(form).toPromise();

    if (isAdded) {
      alert('updated successfully');
    } else {
      alert('error');
    }
  }

  onAdded(prop: Property) {
    this.form.items.push(prop);
    this.selectedProp = null;
  }

  onRemoved(prop: any) {
    const index = this.form.items.findIndex(d => d.key === prop.key);
    this.form.items.splice(index, 1);
    this.selectedProp = null;
  }

}
