import { Injectable } from '@angular/core';

// Category Interface
export interface ICategory {
  id: number,
  name: string,
  image: string,
}

// Product Interface
export interface IProduct {
  id: number,
  name: string,
  price: number,
  image: string,
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getCategories() {
    let categories = [];

    let cat1: ICategory = {
      id: 1,
      name: 'Carpinteria',
      image: '../../assets/categories/category-1.jpg'
    }
    let cat2: ICategory = {
      id: 2,
      name: 'Eletrónica',
      image: '../../assets/categories/category-2.jpg'
    }
    let cat3: ICategory = {
      id: 3,
      name: 'Mecánica',
      image: '../../assets/categories/category-3.jpg'
    }

    categories.push(cat1, cat2, cat3);

    return categories;
  }

  getFeaturedProducts() {
    let products = [];

    let prod1: IProduct = {
      id: 1,
      name: 'Carpinteria',
      price: 55,
      image: '../../assets/products/prod-1.jpg'
    }
    let prod2: IProduct = {
      id: 2,
      name: 'Mecánica avanzada',
      price: 34,
      image: '../../assets/products/prod-2.jpg'
    }
    let prod3: IProduct = {
      id: 1,
      name: 'Creación de Apps',
      price: 40,
      image: '../../assets/products/prod-3.jpg'
    }
 
    products.push(prod1, prod2, prod3);

    return products;
  }

  getBestSellProducts() {
    let products = [];

    let prod1: IProduct = {
      id: 1,
      name: 'Clases Online',
      price: 55,
      image: '../../assets/products/prod-4.png'
    }
    let prod2: IProduct = {
      id: 2,
      name: 'Direct TV',
      price: 34,
      image: '../../assets/products/prod-5.png'
    }
    let prod3: IProduct = {
      id: 1,
      name: 'Curso de belleza',
      price: 40,
      image: '../../assets/products/prod-6.jpg'
    }

    products.push(prod1, prod2, prod3);

    return products;
  }
}
