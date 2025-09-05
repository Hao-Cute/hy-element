import type { InjectionKey, Ref } from "vue";
export type NameType = number | string

export interface collapseProps {
  modelValue: NameType[];
  accordion?: boolean;
}

export interface CollapseItemProps {
  name: NameType;
  title?: string;
  disabled?: boolean;
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleItemClick: (item: NameType) => void;
}

export interface CollapseEmits {
  (e: 'update:modelValue', values: NameType[]): void;
  (e: 'change', values: NameType[]): void;
}

export const CollapseContextKey: InjectionKey<CollapseContext> = Symbol('CollapseContextKey')
