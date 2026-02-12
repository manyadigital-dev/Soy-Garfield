import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'f3fmo00w',
    dataset: 'production',
    token: 'skD9yC7OfP6j42N9K8U67G6l8pY7W1e9G5W9N3M7p9L0p2N5L2p9L0p2N5L2p9L0p2N5L2p9L0p2N5L2p9L0p2N5L2p9L0p2N5L2p9L0p2N5L2p9L0p2N5L2p9L0p2N5L2p9L0p2N5L2p9L0p2N5L2p9L0p2N5L2', // Note: I don't have the token, I should use the local sanity command if possible or ask.
    useCdn: false,
    apiVersion: '2024-02-10',
});

// Actually, I'll use the Sanity CLI to create the document which is safer as it uses the local auth.
