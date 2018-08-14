import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '../../../../node_modules/@angular/core';
import { IProperty } from '../../models/IProperty.model';
import { FormGroup } from '../../../../node_modules/@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '../../../../node_modules/@ngx-formly/core';
import { IDropDownOptions } from '../../models/IDropDownOptions.model';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'form-item',
    templateUrl: './form-item.component.html'
  })

  export class FormItemComponent implements OnInit  {
    @Input() model: IProperty;
    @Input() type: boolean;
    @Output() removeItem = new EventEmitter<any>();
    @Output() newItem = new EventEmitter<any>();


    form = new FormGroup({});
    options: FormlyFormOptions = {
    };
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
            { label: 'Select', value: 'select' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Date', value: 'basicDatepicker' },
            { label: 'Auto complete', value: 'autocomplete'}
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

    ngOnInit() {
    }

    onPropRemove() {
      this.removeItem.emit(this.model);
    }

    submit() {
      this.newItem.emit(this.model);
    }

    // old
    // @Output() newItem = new EventEmitter<any>();
    // @Output() removeItem = new EventEmitter<any>();

    removeOption(optionId) {
      const index = this.model.templateOptions.options.findIndex(d => d.value === optionId);
      this.model.templateOptions.options.splice(index, 1);
    }


      addOption(title: string) {
        title = title.trim();
        if (!title) { return; }

        let max = 0;

        if (this.model.templateOptions.hasOwnProperty('options')) {
          if (this.model.templateOptions.options.length > 0) {
            max = Math.max.apply(Math, this.model.templateOptions.options.map(function (o) { return o.value; }));
          }
        } else {
          this.model.templateOptions.options = [];
        }
        const newOpt: IDropDownOptions = { value: max + 1, label: title };

        this.model.templateOptions.options.push(newOpt);
      }
  }
