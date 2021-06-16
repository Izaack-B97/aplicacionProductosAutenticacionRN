import React,{ createContext, useState } from "react";
import { Producto } from '../interfaces/interfaces';

type ProductsContexProps = {
    products : Producto[],
    loadProducts: () => Promise<void>,
    addProduct: ( categoryId: string, productName: string ) => Promise<void>,
    updateProduct: ( categoryId: string, productName: string, productId: string ) => Promise<void>,
    deleteProduct: ( productId: string ) => Promise<void>,
    loadProductById: ( productId: string ) => Promise<Producto>,
    uploadImage: ( data: any, id: string ) => Promise<void>, // TODO: Cambiar el tipo any
}   

export const ProductsContext = createContext( {} as ProductsContexProps );



export const ProductProvider = ( { children } : any ) => {

    const [products, setProducts] = useState<Producto[]>([]);

    const loadProducts =  async () => { 

    };

    const addProduct = async ( categoryId: string, productName: string ) => { 

    };

    const updateProduct = async ( categoryId: string, productName: string, productId: string ) => { 

    };

    const deleteProduct = async ( productId: string ) => { 

    };

    const loadProductById = async ( productId: string ) => { 
        throw new Error('Not implemented');
    };

    // TODO: Cambiar el ANY
    const uploadImage = async ( data: any, id: string ) => { 

    };


    return (
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            loadProductById,
            uploadImage
        }}>
            { children }
        </ProductsContext.Provider>
    )
}