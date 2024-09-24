import { v4 as uuid } from "uuid";

export const cleanAndTransformBlocks = (blocksJSON) => {
  const blocks = JSON.parse(JSON.stringify(blocksJSON));

  const assignIdAndCleanAttributes = (b) => {
    b.forEach((block) => {
      block.id = uuid();
      
      // Préserver classesTailwind s'il existe
      if (block.attributes) {
        const { classesTailwind, ...otherAttributes } = block.attributes;
        block.attributes = {
          ...otherAttributes,
          classesTailwind: classesTailwind || '',
        };
      }

      if (block.attributes?.url) {
        console.log('classesTailwind in cleanAndTransformBlocks:', block.attributes.classesTailwind);

        block.attributes.url = block.attributes.url.replace("https", "http");
      }
      
      if (block.innerBlocks?.length) {
        assignIdAndCleanAttributes(block.innerBlocks);
      }
    });
  };

  assignIdAndCleanAttributes(blocks);

  return blocks;
};