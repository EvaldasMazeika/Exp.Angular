import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges, SimpleChange } from '@angular/core';
import { IProperty } from '../../models/IProperty.model';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { IDropDownOptions } from '../../models/IDropDownOptions.model';
import { ITransferProperty } from '../../models/ITransferProperty';
import { ExpensesService } from '../../services/expenses.service';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { IAutoCompleteList } from '../../models/IAutoCompleteList';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-item',
  templateUrl: './form-item.component.html'
})

export class FormItemComponent implements OnInit, OnChanges {
  @Input() property: ITransferProperty;

  @Output() addProperty = new EventEmitter<any>();
  @Output() updateProperty = new EventEmitter<any>();
  @Output() removeProperty = new EventEmitter<any>();

  selectList: IDropDownOptions[] = [];
  typeOfProperty: boolean;
  formId: string;
  keysOfProperties: any;
  propertyType = '';

  form = new FormGroup({});
  model: IProperty;
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
          return !this.typeOfProperty;
        }
      },
      validators: {
        name: {
          expression: (c) => !c.value || (this.typeOfProperty && this.keysOfProperties.find(x => x === c.value.trim()) == null),
          message: (error, field: FormlyFieldConfig) => `Key already exists`
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
          { label: 'Date', value: 'customDatePicker' },
          { label: 'Auto complete', value: 'autocomplete' },
          { label: 'File input', value: 'fileInput' }
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
      key: 'templateOptions.isTime',
      type: 'checkbox',
      templateOptions: {
        label: 'Include time select?',
        required: false
      },
      hideExpression: 'model.type != "customDatePicker"'
    },
    {
      key: 'templateOptions.dateFormat',
      type: 'input',
      templateOptions: {
        label: 'Date/time picker format'
      },
      hideExpression: (model: any, formState: any) => {
        if (model.type === 'customDatePicker') {
          this.model.templateOptions.dateFormat = 'dd-MM-yyyy';
          return false;
        } else {
          this.model.templateOptions.dateFormat = null;
          return true;
        }
      },
      expressionProperties: {
        'templateOptions.required': 'model.type === "customDatePicker"'
      }
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
      key: 'templateOptions.required',
      type: 'basicCheckbox',
      defaultValue: false,
      templateOptions: {
        label: 'Is required?'
      }
    },
    {
      key: 'templateOptions.isExportable',
      type: 'basicCheckbox',
      defaultValue: true,
      templateOptions: {
        label: 'Is exportable?'
      }
    }


  ];

  constructor(
    private service: ExpensesService,
    public iziToast: Ng2IzitoastService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const prop: SimpleChange = changes.property;
    if (!prop.isFirstChange()) {
      if (prop.currentValue != null) {
        this.model = prop.currentValue.model;
        this.typeOfProperty = prop.currentValue.isNew;
        this.formId = prop.currentValue.formId;
        this.keysOfProperties = prop.currentValue.keysOfProperties;
        if (!this.typeOfProperty) {
          this.propertyType = this.model.type.slice();
          if (this.model.type === 'selecListTags') {
            this.gatherSelectList();
          }
        }

      } else {
        this.model = null;
        this.typeOfProperty = null;
        this.formId = null;
        this.keysOfProperties = null;
        this.propertyType = null;
      }

    }
  }

  gatherSelectList() {
    this.service.GetSelectList(this.formId, this.model.key).subscribe((res) => {
      this.selectList = res;
    });
  }

  addOption(value: string) {
    value = value.trim();
    if (!value) {
      this.iziToast.info({ title: 'Specify correct value' });
    }

    const item = this.selectList.find(w => w.value === value);
    if (item != null) {
      this.iziToast.error({ title: 'Option alredy exists' });
    } else {
      const newOpt: IDropDownOptions = { value: value, label: value };
      this.selectList.push(newOpt);
    }
  }

  removeOption(option: string) {
    const index = this.selectList.findIndex(d => d.value === option);
    this.selectList.splice(index, 1);
  }

  submit() {
    switch (this.model.type) {
      case 'autocomplete':
        this.createAutoComplete();
        break;
      case 'selecListTags':
        this.createSelectList();
        break;
      default:
        break;
    }
    this.service.AddProperty(this.formId, this.model).subscribe((result) => {
      this.addProperty.emit(result);
    });
  }

  createAutoComplete() {
    this.model.templateOptions.formId = this.formId;
    const listOfAutos: IAutoCompleteList = { formId: this.formId, properties: [this.model.key] };
    this.service.AddAutoCompletes(listOfAutos).subscribe();
  }

  createSelectList() {
    this.service.AddSelectList(this.formId, this.model.key, this.selectList).subscribe();
  }

  updateSelectList() {
    this.service.UpdateSelectList(this.formId, this.model.key, this.selectList).subscribe();
  }

  onPropUpdate() {
    // todo: if type changes, remove resources form db
    if (this.propertyType !== 'autocomplete' && this.model.type === 'autocomplete') {
      this.createAutoComplete();
    } else if (this.propertyType !== 'selecListTags' && this.model.type === 'selecListTags') {
      this.createSelectList();
    } else if (this.propertyType === 'selecListTags' && this.model.type === 'selecListTags') {
      this.updateSelectList();
    }

    this.service.UpdateProperty(this.formId, this.model).subscribe((res) =>  {
      this.updateProperty.emit(this.model);
    });
  }

  onPropRemove() {
    this.service.DeleteProperty(this.formId, this.model.key).subscribe(() => {
      this.removeProperty.emit(this.model);
    });
  }
}
