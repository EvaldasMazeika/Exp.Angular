import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '../../../../node_modules/@angular/core';
import { IProperty } from '../../models/IProperty.model';
import { FormGroup } from '../../../../node_modules/@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '../../../../node_modules/@ngx-formly/core';
import { IDropDownOptions } from '../../models/IDropDownOptions.model';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { ITransferProperty } from '../../models/ITransferProperty';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-item',
  templateUrl: './form-item.component.html'
})

export class FormItemComponent implements OnInit {
  @Input() model: IProperty;
  @Input() type: boolean;
  @Output() addOrUpdateProperty = new EventEmitter<any>();
  @Output() removeProperty = new EventEmitter<any>();

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'key',
      type: 'input',
      templateOptions: {
        label: 'Key',
        required: true
      },
      expressionProperties: {
        'templateOptions.disabled': (model: any, formState: any) => {
          return !this.type;
        }
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
          { label: 'Select', value: 'selecListTags' },
          { label: 'Textarea', value: 'textarea' },
          { label: 'Date', value: 'basicDatepicker' },
          { label: 'Auto complete', value: 'autocomplete' },
          { label: 'File input', value: 'fileInput'}
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
      key: 'templateOptions.isMultiFile',
      type: 'basicCheckbox',
      templateOptions: {
        label: 'Can do multi files?',
        required: false
      },
      hideExpression: 'model.type != "fileInput"'
    },
    {
      key: 'templateOptions.isDateToday',
      type: 'checkbox',
      templateOptions: {
        label: 'Today as default value?',
        required: false
      },
      hideExpression: 'model.type != "basicDatepicker"'
    },
    {
      key: 'defaultValue',
      type: 'input',
      templateOptions: {
        label: 'Default value'
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
      type: 'basicCheckbox',
      defaultValue: false,
      templateOptions: {
        label: 'Is required?'
      }
    }


  ];

  constructor(public iziToast: Ng2IzitoastService) { }

  ngOnInit() { }

  addOption(title: string) {
    title = title.trim();
    if (!title) {
      this.iziToast.info({ title: 'Specify correct name' });
    }

    const newOpt: IDropDownOptions = { value: title, label: title };

    if (this.model.templateOptions.hasOwnProperty('options')) {
      if (this.model.templateOptions.options.length > 0) {
        if (this.model.templateOptions.options.includes(newOpt)) {
          this.iziToast.error({ title: 'Option alredy exists' });
        } else {
          this.model.templateOptions.options.push(newOpt);
        }
      }
    } else {
      this.model.templateOptions.options = [];
      this.model.templateOptions.options.push(newOpt);
    }
  }

  removeOption(option) {
    const index = this.model.templateOptions.options.findIndex(d => d.value === option);
    this.model.templateOptions.options.splice(index, 1);
  }

  submit() {
    const transferObject: ITransferProperty = { model: this.model, isNew: this.type };
    this.addOrUpdateProperty.emit(transferObject);
  }

  onPropRemove() {
    this.removeProperty.emit(this.model);
  }

}
