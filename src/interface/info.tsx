export interface Info {
  status: string;
  data: Data[];
}

export interface Data {
  position: number;
  text: Text;
  emotion: Array<Emotion[]>;
  sentiment: Array<Emotion[]>;
}

export interface Emotion {
  label: string;
  score: number;
}

export interface Text {
  inputs: string;
}
