import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";

export async function getPage(uri) {
  console.log('========== getPage Start ==========');
  console.log('getPage called with uri:', uri);
  const locale = uri === '/home' ? 'en' : 'fr';
  const language = locale.toUpperCase();
  console.log('Locale:', locale, 'Language:', language);

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

  console.log('GraphQL query params:', JSON.stringify(params, null, 2));

  try {
    console.log('Fetching from:', process.env.WP_GRAPHQL_URL);
    const response = await fetch(process.env.WP_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    console.log('Response status:', response.status);

    const responseData = await response.json();
    console.log('Raw response data:', JSON.stringify(responseData, null, 2));

    const { data } = responseData;

    if (!data || !data.nodeByUri) {
      console.log('No data or nodeByUri found');
      return null;
    }

    console.log('nodeByUri data:', JSON.stringify(data.nodeByUri, null, 2));

    const blocks = cleanAndTransformBlocks(data.nodeByUri.blocks);
    console.log('Transformed blocks:', JSON.stringify(blocks, null, 2));

    console.log('========== getPage End ==========');
    return blocks;
  } catch (error) {
    console.error('Error in getPage:', error);
    console.log('========== getPage Error End ==========');
    throw error;
  }
}