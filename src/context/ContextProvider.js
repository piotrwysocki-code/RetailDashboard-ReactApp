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

    let refreshCategories = async (filter) => {
        if(filter && filter.key !== -1 && filter.val !== -1){
            await axios.get("https://us-central1-dashboard-api-c543e.cloudfunctions.net/app/categories").then(res => {
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

                setCategories([...temp])
                return true;

            }).catch((err)=>{
                console.log(`${err}`);
                return null;
            })
            return false;
        }else{
            await axios.get("https://us-central1-dashboard-api-c543e.cloudfunctions.net/app/categories").then(res => {
                res.data.map((item, index)=>{
                    item.itemKey = index + '_' + item.categoryId;
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

    let refreshDepartments = async (filter) => {
        if(filter && filter.key !== -1 && filter.val !== -1){
            await axios.get("https://us-central1-dashboard-api-c543e.cloudfunctions.net/app/departments").then(res => {
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
            await axios.get("https://us-central1-dashboard-api-c543e.cloudfunctions.net/app/departments").then(res => {
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
            await axios.get("https://us-central1-dashboard-api-c543e.cloudfunctions.net/app/employees").then(res => {
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
            await axios.get("https://us-central1-dashboard-api-c543e.cloudfunctions.net/app/employees").then(res => {
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

    let refreshProducts = async (filter) => {
        if(filter && filter.key !== -1 && filter.val !== -1){
            await axios.get("https://us-central1-dashboard-api-c543e.cloudfunctions.net/app/products").then(res => {
                let temp = res.data.filter((item, index)=>{
                    if(filter.key === 'productId' && filter.val){
                        if(parseFloat(item[filter.key]) === parseFloat(filter.val)){
                            item.itemKey = index + '_' + item.productId;

                            return item;
                        }
                    }else if(filter.key === 'price' && filter.val){
                        if(parseFloat(item[filter.key]) === parseFloat(filter.val)){
                            item.itemKey = index + '_' + item.productId;

                            return item;

                        }
                    }else if(filter.key === 'categoryId' && filter.val){
                        if(parseFloat(item[filter.key]) === parseFloat(filter.val)){
                            item.itemKey = index + '_' + item.productId;

                            return item;

                        }
                    }else if(item[filter.key].toString().toUpperCase().includes(filter.val.toUpperCase())){
                        item.itemKey = index + '_' + item.productId;

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
            await axios.get("https://us-central1-dashboard-api-c543e.cloudfunctions.net/app/products").then(res => {
                res.data.map((item, index)=>{
                    item.itemKey = index + '_' + item.productId;

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


    let refreshSalesProducts = async (filter) => {
        if(filter && filter.key !== -1 && filter.val !== -1){
            await axios.get("https://us-central1-dashboard-api-c543e.cloudfunctions.net/app/salesprods").then(res => {
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
            await axios.get("https://us-central1-dashboard-api-c543e.cloudfunctions.net/app/salesprods").then(res => {
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

    let refreshSales = async (filter) => {
        if(filter && filter.key !== -1 && filter.val !== -1){
            await axios.get("https://us-central1-dashboard-api-c543e.cloudfunctions.net/app/sales").then(res => {
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
            await axios.get("https://us-central1-dashboard-api-c543e.cloudfunctions.net/app/sales").then(res => {
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