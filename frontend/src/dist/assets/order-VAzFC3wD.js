import"./app-ukoE8fgy.js";import"./share-zDZSOXv8.js";import{f as t,A as n,a as i,b as l,s as a}from"./utils-UJ-EUY8v.js";import{a as u}from"./coursesAPIs-1jxUDFuP.js";let e=null;const m=document.querySelector("#course__buy-btn");d();async function d(){const r=new Proxy(new URLSearchParams(window.location.search),{get:(o,c)=>o.get(c)});if(t("loading"),e=await u(r.courseId),e===null){location.href="./course.html";return}y(),t("loaded")}function y(){const r=document.querySelector("#course__image"),o=document.querySelector("#course__title"),c=document.querySelector("#course__main-price"),s=document.querySelector("#course__payable-price");r.src=`${n}/${e.image}`,o.innerText=e.title,c.innerText=Number(e.price).toLocaleString(),s.innerText=Number(e.price).toLocaleString()}m.addEventListener("click",async()=>{t("loading");try{const r=await l.post("courses",{courseId:e.id},{headers:{Authorization:"Bearer "+i()}});location.replace("./success_buy_course.html")}catch(r){r.response.status===401?a("وارد شوید"):a("خرید دوره موفق نبود")}finally{t("loaded")}});
