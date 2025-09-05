import type { RuleItem, ValidateError, ValidateFieldsError } from "async-validator";
import type { InjectionKey } from "vue";

export interface FormItemProps {
  label: string;
  prop: string
}

export interface FormItemRule extends RuleItem {
  trigger?: string
}

export type FormRules = Record<string, FormItemRule[]>

export interface FormProps {
  model: Record<string, any>;
  rules: FormRules;
}

export interface FormContent extends FormProps {
  addField: (filed: FormItemContent) => void;
  removeField: (filed: FormItemContent) => void;
}
export interface ValidateStatusProp {
  state: 'init' | 'success' | 'error'
  errorMsg: string
  loading: boolean
}
export interface FormItemContent {
  prop: string;
  validate: (trigger?: string) => Promise<any>;
  resetField(): void;
  clearValidate(): void;
}

export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}

export interface FormInstance {
  validate: () => Promise<any>;
  resetFields: (props?: string[]) => void
  clearValidate: (props?: string[]) => void
}
export interface FormItemInstance {
  validateStatus: ValidateStatusProp
  validate: (trigger?: string) => Promise<any>
  resetField(): void
  clearValidate(): void
}
export const formContextKey: InjectionKey<FormContent> = Symbol('formContextKey')
export const formItemContextKey: InjectionKey<FormItemContent> = Symbol('formItemContextKey')
