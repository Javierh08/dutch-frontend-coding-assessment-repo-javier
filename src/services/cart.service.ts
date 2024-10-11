import { request, gql } from "graphql-request";
import constants from "../constants";

export const createCart = async (id:string) => {
    try {
        const query = gql`
        mutation CartCreate {
          cartCreate(
            input: {
              lines: [
                {
                  quantity: 1
                  merchandiseId: "${id}"
                }
              ]
            }
          ) {
            cart {
              id
              createdAt
              updatedAt
              lines(first: 10) {
                edges {
                  node {
                    id
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        image {
                          id
                          url
                        }
                        price {
                          amount
                          currencyCode
                        }
                        product {
                          title
                        }
                      }
                    }
                    quantity
                  }
                }
              }
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
                subtotalAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      `;
      const response:any = await request(constants.API_URL, query);
      const cart = response.cartCreate.cart;
      return setCartInStorage(cart);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
        }
    }
}

const createLineItem = async (cart, productVariantId) => {
    try {
        const query = gql`
        mutation {
          cartLinesAdd(
            cartId: "${cart.id}"
            lines: [
              {
                quantity: 1
                merchandiseId: "${productVariantId}"
              }
            ]
          ) {
            cart {
              id
              createdAt
              updatedAt
              lines(first: 10) {
                edges {
                  node {
                    id
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        image {
                          id
                          url
                        }
                        price {
                          amount
                          currencyCode
                        }
                        product {
                          title
                        }
                      }
                    }
                    quantity
                  }
                }
              }
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
                subtotalAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      `;
      const response:any = await request(constants.API_URL, query);
      const updatedCart = response.cartLinesAdd.cart;
      return setCartInStorage(updatedCart);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
        }
    }
}

const updateLineItem = async (cart, cartLineItem, quantity) => {
    try {
        const query = gql`
        mutation {
          cartLinesUpdate(
            cartId: "${cart.id}"
            lines: [
              {
                id: "${cartLineItem.id}"
                quantity: ${quantity}
                merchandiseId: "${cartLineItem.merchandise.id}"
              }
            ]
          ) {
            cart {
                id
                createdAt
                updatedAt
                lines(first: 10) {
                  edges {
                    node {
                      id
                      merchandise {
                        ... on ProductVariant {
                          id
                          title
                          image {
                            id
                            url
                          }
                          price {
                            amount
                            currencyCode
                          }
                          product {
                            title
                          }
                        }
                      }
                      quantity
                    }
                  }
                }
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                }
              }
          }
        }
      `;
        const response:any = await request(constants.API_URL, query);
        const updatedCart = response.cartLinesUpdate.cart;
        console.log('cart', updatedCart);
        return setCartInStorage(updatedCart);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
        }
    }
}

export const removeLineItem = async (cart, cartLineItem) => {
    try {
      const query = gql`
      mutation {
        cartLinesRemove(
          cartId: "${cart.id}"
          lineIds: ["${cartLineItem.id}"]
        ) {
          cart {
              id
              createdAt
              updatedAt
              lines(first: 10) {
                edges {
                  node {
                    id
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        image {
                          id
                          url
                        }
                        price {
                          amount
                          currencyCode
                        }
                        product {
                          title
                        }
                      }
                    }
                    quantity
                  }
                }
              }
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
                subtotalAmount {
                  amount
                  currencyCode
                }
              }
            }
        }
      }
    `;
      const response:any = await request(constants.API_URL, query);
      const updatedCart = response.cartLinesRemove.cart;
      return setCartInStorage(updatedCart);
    } catch (error) {
        if (error instanceof Error) {
          console.error(error);
        }
    }
}

export const updateCart = (cart, productVariantId:string) => {
    let cartLineItem:Number|null = null;
    let quantity:Number = 0;
    cart.lines.edges.forEach(cartLine => {
        const item = cartLine.node;
        if (item.merchandise.id == productVariantId) {
            cartLineItem = cartLine.node;
            quantity = item.quantity + 1;
        };
    });
    return cartLineItem ? updateLineItem(cart, cartLineItem, quantity) : createLineItem(cart, productVariantId);
}

export const removeItemInCart = (cart, cartLineItem, quantity) => {
    return quantity > 0 ? updateLineItem(cart, cartLineItem, quantity) : removeLineItem(cart, cartLineItem);
}

export const getCartInStorage = () => {
    const cart:any = localStorage.getItem('cart') || '';
    return cart ? JSON.parse(cart) : null;
}

export const setCartInStorage = (cart:object) => {
    const storage = window.localStorage;
    storage.setItem('cart', JSON.stringify(cart));
    return window.dispatchEvent(new Event('storage'));
}


