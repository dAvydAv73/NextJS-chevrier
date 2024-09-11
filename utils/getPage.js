import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";

export const getPage = async (uri) => {
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

  const response = await fetch(process.env.WP_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const { data } = await response.json();
  if (!data.nodeByUri) {
    return null;
  }
  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocks);
  return blocks;
};
