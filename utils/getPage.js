import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";

export const getPage = async (uri) => {
  console.log('getPage called with uri:', uri);
  const locale = 'fr';
  const language = locale.toUpperCase();

  const params = {
    query: `
    query PageQuery($uri: String!,$language: LanguageCodeEnum!) {
      nodeByUri(uri: $uri) {
        ... on Page {
          blocks(postTemplate: false)
          translation(language: $language) {
              id
              title
              slug
              language {
                code
                slug
              }
            }
        }
      }
    }
  `,
    variables: {
      uri,
      language
    },
  };

  try {
    console.log('Sending GraphQL request with params:', JSON.stringify(params, null, 2));
    const response = await fetch(process.env.WP_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    console.log('Received GraphQL response:', JSON.stringify(data, null, 2));

    if (!data.nodeByUri) {
      console.log('No data found for uri:', uri);
      return null;
    }

    console.log('Raw blocks:', data.nodeByUri.blocks);
    const blocks = cleanAndTransformBlocks(data.nodeByUri.blocks);
    console.log('Transformed blocks:', JSON.stringify(blocks, null, 2));
    return blocks;
  } catch (error) {
    console.error('Error in getPage:', error);
    throw error;
  }
};
