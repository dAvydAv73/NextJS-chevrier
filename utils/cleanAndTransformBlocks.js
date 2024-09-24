import { v4 as uuid } from "uuid";

export const cleanAndTransformBlocks = (blocksJSON) => {
  console.log('cleanAndTransformBlocks called with:', blocksJSON);
  let blocks;
  try {
    blocks = JSON.parse(JSON.stringify(blocksJSON));
  } catch (error) {
    console.error('Error parsing blocksJSON:', error);
    return [];
  }

  const assignId = (b) => {
    b.forEach((block) => {
      block.id = uuid();
      if (block.attributes?.url) {
        block.attributes.url = block.attributes.url.replace("https", "http");
      }
      if (block.attributes) {
        console.log('Block attributes:', block.attributes);
        if ('classesTailwind' in block.attributes) {
          console.log('classesTailwind:', block.attributes.classesTailwind);
        }
      }
      if (block.innerBlocks?.length) {
        assignId(block.innerBlocks);
      }
    });
  };

  assignId(blocks);
  console.log('Transformed blocks:', JSON.stringify(blocks, null, 2));
  return blocks;
};