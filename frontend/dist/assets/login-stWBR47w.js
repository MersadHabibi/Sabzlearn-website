import"./app-BbCczviw.js";import{l as n}from"./usersAPIs-Q3VVH7n2.js";import{f as o}from"./utils-CiWJl2H0.js";import"./share-zDZSOXv8.js";import{r as i,g as t}from"./share-ohmdwDsv.js";i(t());const r=document,a=r.querySelector("#form__email-address"),s=r.querySelector("#form__password"),l=r.querySelector("form");l.addEventListener("submit",e=>{e.preventDefault(),a.value&&s.value&&m()});const m=async()=>{o("loading");const e=await n({email:a.value,password:s.value});o("loaded"),e.status===!0&&location.replace(t())};