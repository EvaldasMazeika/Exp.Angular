import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Property } from '../models/Property';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DropDownOptions } from '../models/DropDownOptions';

@Component({
  selector: 'app-forms-item',
  templateUrl: './forms-item.component.html',
  styleUrls: ['./forms-item.component.css']
})
export class FormsItemComponent implements OnInit {
  @Input() model: Property;
  @Input() type: boolean;

  @Output() newItem = new EventEmitter<any>();
  @Output() removeItem = new EventEmitter<any>();

  form = new FormGroup({});
  optionss: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'key',
      type: 'input',
      templateOptions: {
        label: 'Key',
        required: true
      }
    },
    {
      key: 'type',
      type: 'select',
      templateOptions: {
        label: 'Type',
        required: true,
        options: [
          { label: 'Input', value: 'input' },
          { label: 'Checkbox', value: 'checkbox' },
          { label: 'Select', value: 'select' },
          { label: 'Textarea', value: 'textarea' }
        ]
      }
    },
    {
      key: 'templateOptions.type',
      type: 'select',
      templateOptions: {
        label: 'SubType',
        required: false,
        options: [
          { label: '', value: '' },
          { label: 'Number', value: 'number' },
          { label: 'Date', value: 'date' },
          { label: 'Password', value: 'password' }
        ]
      },
      hideExpression: 'model.type != "input"'
    },
    {
      key: 'templateOptions.label',
      type: 'input',
      templateOptions: {
        label: 'Label',
        required: true
      }
    },
    {
      key: 'templateOptions.placeholder',
      type: 'input',
      templateOptions: {
        label: 'Placeholder',
        required: false
      }
    },
    {
      key: 'hideExpression',
      type: 'input',
      templateOptions: {
        label: 'Hide expression',
        required: false
      }
    },
    {
      key: 'templateOptions.required',
      type: 'checkbox',
      templateOptions: {
        label: 'Is required?',
        required: true
      }
    }


  ];
  selectList: DropDownOptions[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  submit() {
    this.newItem.emit(this.model);
  }

  onPropRemove() {
    this.removeItem.emit(this.model);
  }

  addOption(title: string) {
    title = title.trim();
    if (!title) { return; }

    let max = 0;

    if (this.model.templateOptions.hasOwnProperty('options')) {
      max = Math.max.apply(Math, this.model.templateOptions.options.map(function (o) { return o.value; }));
    } else {
      this.model.templateOptions.options = [];
    }
    const newOpt: DropDownOptions = { value: max + 1, label: title };

    this.model.templateOptions.options.push(newOpt);
  }

}
