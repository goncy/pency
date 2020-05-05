export type Option = SingleOption | MultipleOption;

export interface SingleOption {
  type: "single";
  id: string;
  title: string;
  options: SingleOptionItem[];
  value?: SingleOptionItem;
}

export interface MultipleOption {
  type: "multiple";
  id: string;
  title: string;
  count: number;
  options: MultipleOptionItem[];
  value?: MultipleOptionItem[];
}

export interface SingleOptionItem {
  id: string;
  title: string;
  price?: number;
}

export interface MultipleOptionItem {
  id: string;
  title: string;
  price?: number;
}
