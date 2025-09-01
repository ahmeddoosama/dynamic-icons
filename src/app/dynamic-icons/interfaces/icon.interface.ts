export interface IconData {
  svg: string;
}

export interface IconKey {
  [key: string]: IconData;
}

export type IconName = keyof IconKey;
