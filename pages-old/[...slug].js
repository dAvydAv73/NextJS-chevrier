import { gql } from "@apollo/client";
import client from "client";
import { BlockRenderer } from "components/BlockRenderer";
import { getPageStaticProps } from "utils/getPageStaticProps";
import { Page } from "components/Page";

export default Page;

export const getStaticProps = getPageStaticProps;

export const getStaticPaths = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        query AllPagesQuery {
          pages {
            nodes {
              uri
            }
          }
        }
      `,
    });

    console.log('GraphQL query result:', JSON.stringify(data, null, 2));

    if (!data.pages || !data.pages.nodes || !data.properties || !data.properties.nodes) {
      console.error('Unexpected data structure:', data);
      return { paths: [], fallback: "blocking" };
    }

    const paths = [...data.pages.nodes, ...data.properties.nodes]
      .filter((page) => {
        if (typeof page.uri !== 'string') {
          console.warn('Invalid uri:', page.uri);
          return false;
        }
        return page.uri !== "/";
      })
      .map((page) => {
        console.log('Processing uri:', page.uri);
        if (typeof page.uri !== 'string') {
          console.error('Uri is not a string:', page.uri);
          return null;
        }
        const slug = page.uri.substring(1, page.uri.length - 1).split("/");
        console.log('Generated slug:', slug);
        return {
          params: { slug },
        };
      })
      .filter(Boolean); // Remove any null entries

    console.log('Generated paths:', paths);

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return { paths: [], fallback: "blocking" };
  }
};