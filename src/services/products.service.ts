import { request, gql } from "graphql-request";
import constants from "../constants";

export const getProducts = async (numberOfProducts) => {
    try {
        const query = gql`
        {
            products(first: ${numberOfProducts}) {
            edges {
                node {
                id
                title
                description
                featuredImage {
                    id
                    url
                }
                variants(first: 3) {
                    edges {
                    node {
                        price {
                        amount
                        currencyCode
                        }
                    }
                    }
                }
                }
            }
            }
        }
        `;
        const response = await request(constants.API_URL, query);
        return response;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
        }
    }
}

export const getProductVariantId = async (productId:String) => {
    try {
        const query = gql`
        {
            product(id: "${productId}") {
            id
            title
            description
            featuredImage {
                id
                url
            }
            variants(first: 1) {
                edges {
                cursor
                node {
                    id
                    title
                    image {
                    url
                    }
                    price {
                    amount
                    currencyCode
                    }
                }
                }
            }
            }
        }
        `;
        const response:any = await request(constants.API_URL, query);
        const variantId = response.product.variants.edges[0].node.id;
        return variantId;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
        }
    }
}