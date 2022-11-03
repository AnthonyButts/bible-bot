import type { $Request, $Response } from 'express';

export type Routes = {
  [key: string]: (req: $Request, res: $Response) => void;
}

export type Callbacks = {
  [key: string]: () => any;
}
