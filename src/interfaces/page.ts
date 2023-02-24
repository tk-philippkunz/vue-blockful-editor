// Whole page
export interface BlockPage {
  meta?: any; // any meta data you need like title, author, etc.
  blocks: UniversalBlock[];
  style?: {
    // styles in CSS string format
    width?: string; // e.g. '100%'
    background?: string; // e.g. 'red'
    padding?: {
      top: string; // e.g. '10px'
      bottom: string; // e.g. '10px'
      left: string; // e.g. '10px'
      right: string; // e.g. '10px'
    };
  };
}

export interface BlockDefinitions {}

import type { BlockType } from 'src';

type Blocks = {
  [T in BlockType]: {
    type: T; // type name of the block
    data: BlockDefinitions[T]; // data depending on the type of the block
    style?: {
      // general style in the main view. no the type depending style
      spaceTop?: number;
      spaceBottom?: number;
    };
  };
};

// main definition of a block
export type UniversalBlock<T extends BlockType = BlockType> = Blocks[T];
