export const cleanAndTransformBlocks = (blocksJSON) => {
  const blocks = JSON.parse(JSON.stringify(blocksJSON));

  const cleanBlock = (block) => {
    // Assurez-vous que classesTailwind est toujours une chaîne
    if (block.attributes && 'classesTailwind' in block.attributes) {
      block.attributes.classesTailwind = String(block.attributes.classesTailwind || '');
    }

    if (block.innerBlocks && Array.isArray(block.innerBlocks)) {
      block.innerBlocks = block.innerBlocks.map(cleanBlock);
    }

    return block;
  };

  return blocks.map(cleanBlock);
};