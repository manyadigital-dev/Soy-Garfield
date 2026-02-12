import { client } from './sanity';

export interface HomePageData {
    heroTitle: string;
    newsletterTitle: string;
    newsletterDescription: string;
    seoTitle: string;
    seoDescription: string;
}

export const getHomePageData = async (): Promise<HomePageData | null> => {
    const query = `*[_type == "homePage"][0] {
    heroTitle,
    newsletterTitle,
    newsletterDescription,
    seoTitle,
    seoDescription
  }`;
    return client.fetch(query);
};
