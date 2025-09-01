export type Column<T> = {
  key: keyof T;
  header: string;
};

export type Row = {
  [key: string]: string | number;
};
