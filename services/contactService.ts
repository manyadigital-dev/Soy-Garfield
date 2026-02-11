import { client } from './sanity';

export interface ContactPageData {
    title: string;
    description: string;
    email: string;
    phone: string;
    location: string;
    seoTitle?: string;
    seoDescription?: string;
}

export const getContactPageData = async (): Promise<ContactPageData | null> => {
    const query = `*[_type == "contactPage"][0] {
        title,
        description,
        email,
        phone,
        location,
        seoTitle,
        seoDescription
    }`;
    return await client.fetch(query);
};
