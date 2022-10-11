import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from "axios";
import { FiLayers } from 'react-icons/fi';

let StateContext = createContext();
  
export let ContextProvider = ({ children }) => {

    let [categories, setCategories] = useState([])
    let [products, setProducts] = useState([])
    let [employees, setEmployees] = useState([])
    let [sales, setSales] = useState([])
    let [departments, setDepartments] = useState([])
    let [salesProducts, setSalesProducts] = useState([]);

 /*   let refreshCategories = async () => {
        await axios.get("http://localhost:8080/categories").then(res => {
            res.data.map((item, index)=>{
                item.itemKey = index + '_' + item.categoryId;
                let count = 0;
                products.map((temp, index)=>{
                    count = temp.categoryId === item.categoryId ? count +=1 : count += 0;
                })
                item.products = count;
            })
            setCategories([...res.data])
            return true;
        }).catch((err)=>{
            console.log(`${err}`);
            return null;
        })
        return false;
    } */
    
    let refreshCategories = async (filter) => {
        if(filter && filter.key !== -1 && filter.val !== -1){
            await axios.get("http://localhost:8080/categories").then(res => {
                let temp = res.data.filter((item, index)=>{
                    if(filter.key === 'categoryId' && filter.val){
                        if(parseFloat(item[filter.key]) === parseFloat(filter.val)){
                            item.itemKey = index + '_' + item.categoryId;
                            return item;
                        }
                    }else if(item[filter.key].toString().toUpperCase().includes(filter.val.toUpperCase())){
                        item.itemKey = index + '_' + item.categoryId;
                        return item;
                    }

                })
                temp.map((item, index)=>{
                    let count = 0;
                    products.map((x, index)=>{
                        count = x.categoryId === item.categoryId ? count +=1 : count += 0;
                    })
                    item.products = count;
                })
                setCategories([...temp])
                return true;

            }).catch((err)=>{
                console.log(`${err}`);
                return null;
            })
            return false;
        }else{
            await axios.get("http://localhost:8080/categories").then(res => {
                res.data.map((item, index)=>{
                    item.itemKey = index + '_' + item.categoryId;
                    let count = 0;
                    products.map((x, index)=>{
                        count = x.categoryId === item.categoryId ? count +=1 : count += 0;
                    })
                    
                    item.products = count;
                })
                console.log(res.data);
                setCategories([...res.data])
                return true;
            }).catch((err)=>{
                console.log(`${err}`);
                return null;
            })
            return false;
        }
    }

  /*  let refreshDepartments = async () => {
        await axios.get("http://localhost:8080/departments").then(res => {
            res.data.map((item, index)=>{
                item.itemKey = index + '_' + item.deptId;
            })
            console.log(res.data);

            setDepartments([...res.data])

            return true;
        }).catch((err)=>{
            console.log(`${err}`);
            return null;
        })
        return false;
    
    }*/

    let refreshDepartments = async (filter) => {
        if(filter && filter.key !== -1 && filter.val !== -1){
            await axios.get("http://localhost:8080/departments").then(res => {
                let temp = res.data.filter((item, index)=>{
                    if(filter.key === 'deptId' && filter.val){
                        if(parseFloat(item[filter.key]) === parseFloat(filter.val)){
                            item.itemKey = index + '_' + item.deptId;
                            return item;
                        }
                    }else if(item[filter.key].toString().toUpperCase().includes(filter.val.toUpperCase())){
                        item.itemKey = index + '_' + item.deptId;
                        return item;
                    }
                })
                console.log(temp);
                setDepartments([...temp])
                return true;
            }).catch((err)=>{
                console.log(`${err}`);
                return null;
            })
            return false;
        }else{
            await axios.get("http://localhost:8080/departments").then(res => {
                res.data.map((item, index)=>{
                    item.itemKey = index + '_' + item.deptId;
                })
                console.log(res.data);
                setDepartments([...res.data])
                return true;
            }).catch((err)=>{
                console.log(`${err}`);
                return null;
            })
            return false;
        }
    }

    let refreshEmployees = async (filter) => {
        if(filter && filter.key !== -1 && filter.val !== -1){
            await axios.get("http://localhost:8080/employees").then(res => {
                let temp = res.data.filter((item, index)=>{
                    if(filter.key === 'salary' && filter.val){
                        if(parseFloat(item[filter.key]) === parseFloat(filter.val)){
                            item.itemKey = index + '_' + item.employeeId;
                            return item;
                        }
                    }else if(filter.key === 'employeeId' && filter.val){
                        if(parseFloat(item[filter.key]) === parseFloat(filter.val)){
                            item.itemKey = index + '_' + item.employeeId;
                            return item;
                        }
                    }else if(filter.key === 'deptId' && filter.val){
                        if(parseFloat(item[filter.key]) === parseFloat(filter.val)){
                            item.itemKey = index + '_' + item.employeeId;
                            return item;
                        }
                    }else if(item[filter.key].toString().toUpperCase().includes(filter.val.toUpperCase())){
                        item.itemKey = index + '_' + item.employeeId;
                        return item;
                    }
                })
                console.log(temp);
                setEmployees([...temp])
                return true;
            }).catch((err)=>{
                console.log(`${err}`);
                return null;
            })
            return false;
        }else{
            await axios.get("http://localhost:8080/employees").then(res => {
                res.data.map((item, index)=>{
                    item.itemKey = index + '_' + item.employeeId;
                })
                console.log(res.data);
                setEmployees([...res.data])
                return true;
            }).catch((err)=>{
                console.log(`${err}`);
                return null;
            })
            return false;
        }
    }


   /* let refreshProducts = async () => {
        await axios.get("http://localhost:8080/products").then(res => {
            res.data.map((item, index)=>{
                item.itemKey = index + '_' + item.productId;
                categories.map((temp, index)=>{
                    if(temp.categoryId === item.categoryId){
                        item.category = temp.categoryName;
                    }
                })
            })
            setProducts([...res.data])
            return true;
        }).catch((err)=>{
            console.log(`${err}`);
            return null;
        })
        return false;
        
    } */

        
    let refreshProducts = async (filter) => {
        if(filter && filter.key !== -1 && filter.val !== -1){
            await axios.get("http://localhost:8080/products").then(res => {
                let temp = res.data.filter((item, index)=>{
                    if(filter.key === 'productId' && filter.val){
                        if(parseFloat(item[filter.key]) === parseFloat(filter.val)){
                            item.itemKey = index + '_' + item.productId;
                            categories.map((temp, index)=>{
                                if(temp.categoryId === item.categoryId){
                                    item.category = temp.categoryName;
                                }
                            })
                            return item;
                        }
                    }else if(filter.key === 'price' && filter.val){
                        if(parseFloat(item[filter.key]) === parseFloat(filter.val)){
                            item.itemKey = index + '_' + item.productId;
                            categories.map((temp, index)=>{
                                if(temp.categoryId === item.categoryId){
                                    item.category = temp.categoryName;
                                }
                            })
                            return item;

                        }
                    }else if(filter.key === 'categoryId' && filter.val){
                        if(parseFloat(item[filter.key]) === parseFloat(filter.val)){
                            item.itemKey = index + '_' + item.productId;
                            categories.map((temp, index)=>{
                                if(temp.categoryId === item.categoryId){
                                    item.category = temp.categoryName;
                                }
                            })
                            return item;

                        }
                    }else if(item[filter.key].toString().toUpperCase().includes(filter.val.toUpperCase())){
                        item.itemKey = index + '_' + item.productId;
                        categories.map((temp, index)=>{
                            if(temp.categoryId === item.categoryId){
                                item.category = temp.categoryName;
                            }
                        })
                        return item;
                    }

                })
                console.log(temp);
                setProducts([...temp])
                return true;
            }).catch((err)=>{
                console.log(`${err}`);
                return null;
            })
            return false;
        }else{
            await axios.get("http://localhost:8080/products").then(res => {
                res.data.map((item, index)=>{
                    item.itemKey = index + '_' + item.productId;
                    categories.map((temp, index)=>{
                        if(temp.categoryId === item.categoryId){
                            item.category = temp.categoryName;
                        }
                    })
                    return item;
                })
                console.log(res.data);
                setProducts([...res.data])
                return true;
            }).catch((err)=>{
                console.log(`${err}`);
                return null;
            })
            return false;
        }
    }

   /* let refreshSalesProducts = async () => {

        await axios.get("http://localhost:8080/salesprods").then(res => {
            res.data.map((item, index)=>{
                item.itemKey = index + '_' + item.productId + item.saleId;
            })
            setSalesProducts([...res.data])
            return true;
        }).catch((err)=>{
            console.log(`${err}`);
            return null;
        })
        return false;
        
    }*/

    let refreshSalesProducts = async (filter) => {
        if(filter && filter.key !== -1 && filter.val !== -1){
            await axios.get("http://localhost:8080/salesprods").then(res => {
                let temp = res.data.filter((item, index)=>{
                    if(filter.key === 'saleId' && filter.val){
                        if(parseFloat(item[filter.key]) === parseFloat(filter.val)){
                            item.itemKey = index + '_' + item.saleId + '_' + item.productId;
                            return item;
                        }
                    }else if(filter.key === 'productId' && filter.val){
                        if(parseFloat(item[filter.key]) === parseFloat(filter.val)){
                            item.itemKey = index + '_' + item.saleId + '_' + item.productId;
                            return item;
                        }
                    }else if(filter.key === 'quantity' && filter.val){
                        if(parseFloat(item[filter.key]) === parseFloat(filter.val)){
                            item.itemKey = index + '_' + item.saleId + '_' + item.productId;
                            return item;
                        }
                    }else if(item[filter.key].toString().toUpperCase().includes(filter.val.toUpperCase())){
                        item.itemKey = index + '_' + item.saleId + '_' + item.productId;

                        return item;
                    }
                })
                console.log(temp);
                setSalesProducts([...temp])
                return true;
            }).catch((err)=>{
                console.log(`${err}`);
                return null;
            })
            return false;
        }else{
            await axios.get("http://localhost:8080/salesprods").then(res => {
                res.data.map((item, index)=>{
                    item.itemKey = index + '_' + item.saleId + '_' + item.productId;
                })
                console.log(res.data);
                setSalesProducts([...res.data])
                return true;
            }).catch((err)=>{
                console.log(`${err}`);
                return null;
            })
            return false;
        }
    }


 /*   let refreshSales = async () => {
        await axios.get("http://localhost:8080/sales").then(res => {
            res.data.map((item, index)=>{
                item.itemKey = index + '_' + item.saleId;
                item.saleDate = item.saleDate.slice(0, -9);

            })
            setSales([...res.data])
            return true;
        }).catch((err)=>{
            console.log(`${err}`);
            return null;
        })
        return false;

    }*/

    let refreshSales = async (filter) => {
        if(filter && filter.key !== -1 && filter.val !== -1){
            await axios.get("http://localhost:8080/sales").then(res => {
                let temp = res.data.filter((item, index)=>{
                    if(filter.key === 'saleId' && filter.val){
                        if(parseFloat(item[filter.key]) === parseFloat(filter.val)){
                            item.itemKey = index + '_' + item.saleId;
                            item.saleDate = item.saleDate !== null ? item.saleDate.slice(0, -9) : 0;

                            return item;
                        }
                    }else if(filter.key === 'total' && filter.val){
                        if(parseFloat(item[filter.key]) === parseFloat(filter.val)){
                            item.itemKey = index + '_' + item.saleId;
                            item.saleDate = item.saleDate !== null ? item.saleDate.slice(0, -9) : 0;

                            return item;
                        }
                    }else if(filter.key === 'employeeId' && filter.val){
                        if(parseFloat(item[filter.key]) === parseFloat(filter.val)){
                            item.itemKey = index + '_' + item.saleId;
                            item.saleDate = item.saleDate !== null ? item.saleDate.slice(0, -9) : 0;

                            return item;
                        }
                    }else if(item[filter.key].toString().toUpperCase().includes(filter.val.toUpperCase())){
                        item.itemKey = index + '_' + item.saleId;
                        item.saleDate = item.saleDate !== null ? item.saleDate.slice(0, -9) : 0;

                        return item;
                    }
                })
                console.log(temp);
                setSales([...temp])
                return true;
            }).catch((err)=>{
                console.log(`${err}`);
                return null;
            })
            return false;
        }else{
            await axios.get("http://localhost:8080/sales").then(res => {
                res.data.map((item, index)=>{
                    item.itemKey = index + '_' + item.saleId;
                    item.saleDate = item.saleDate !== null ? item.saleDate.slice(0, -9) : 0;
                })
                console.log(res.data);
                setSales([...res.data])
                return true;
            }).catch((err)=>{
                console.log(`${err}`);
                return null;
            })
            return false;
        }
    }

    let refreshData = async () => {
        refreshProducts();
        refreshCategories();
        refreshSales();
        refreshSalesProducts();
        refreshEmployees();
        refreshDepartments();
    }

    let value = {
        categories,
        products,
        sales,
        employees,
        departments,
        salesProducts,
        refreshDepartments,
        refreshCategories,
        setCategories,
        refreshProducts,
        setProducts,
        refreshEmployees,
        setEmployees,
        refreshSales,
        refreshSalesProducts,
        setSales,
        setSalesProducts,
        setDepartments,
        refreshData,
    }

    return (
        <StateContext.Provider
            value={value}
        >
            {children}
        </StateContext.Provider>
    )
}

export let useStateContext = () => useContext(StateContext);