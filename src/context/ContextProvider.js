import React, { createContext, useState, useContext } from 'react';
import axios from "axios";

let StateContext = createContext();
  
export let ContextProvider = ({ children }) => {
    let [categories, setCategories] = useState([])
    let [products, setProducts] = useState([])
    let [employees, setEmployees] = useState([])
    let [sales, setSales] = useState([])
    let [departments, setDepartments] = useState([])
    let [salesProducts, setSalesProducts] = useState([]);

    let refreshCategories = async () => {
        await axios.get("http://localhost:8080/categories").then(res => {
            res.data.map((item, index)=>{
                item.itemKey = index + '_' + item.categoryId;
                let count = 0;
                products.map((temp, index)=>{
                    count = temp.categoryId === item.categoryId ? count +=1 : count += 0;
                    return count;
                })
                item.products = count; 
                return item;
            })
            setCategories([...res.data])
            return true;
        }).catch((err)=>{
            console.log(`${err}`);
            return null;
        })
        return false;
        
    }

    let refreshDepartments = async () => {
        await axios.get("http://localhost:8080/departments").then(res => {
            res.data.map((item, index)=>{
                item.itemKey = index + '_' + item.deptId;
                return item;
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

    let refreshEmployees = async () => {
        await axios.get("http://localhost:8080/employees").then(res => {
            res.data.map((item, index)=>{
                item.itemKey = index + '_' + item.employeeId;
                return item;

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


    let refreshProducts = async () => {
        await axios.get("http://localhost:8080/products").then(res => {
            res.data.map((item, index)=>{
                item.itemKey = index + '_' + item.productId;
                categories.map((temp, index)=>{
                    if(temp.categoryId === item.categoryId){
                        item.category = temp.categoryName;
                    }
                    return temp;
                })
                return item;
            })
            setProducts([...res.data])
            return true;
        }).catch((err)=>{
            console.log(`${err}`);
            return null;
        })
        return false;
        
    }

    let refreshSalesProducts = async () => {

        await axios.get("http://localhost:8080/salesprods").then(res => {
            res.data.map((item, index)=>{
                item.itemKey = index + '_' + item.productId + item.saleId;
                return item;

            })
            setSalesProducts([...res.data])
            return true;
        }).catch((err)=>{
            console.log(`${err}`);
            return null;
        })
        return false;
        
    }


    let refreshSales = async () => {
        await axios.get("http://localhost:8080/sales").then(res => {
            res.data.map((item, index)=>{
                item.itemKey = index + '_' + item.saleId;
                item.saleDate = item.saleDate.slice(0, -9);
                return item;

            })
            setSales([...res.data])
            return true;
        }).catch((err)=>{
            console.log(`${err}`);
            return null;
        })
        return false;

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