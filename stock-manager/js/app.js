import {generateProducts} from "./data.js";
import {renderTable} from "./components/Table.js";
import {Pagination} from "./components/Pagination.js";
import {openDialog} from "./components/Dialog.js";
import {Filters} from "./components/Filters.js";
import {exportCSV} from "./components/Export.js";

let products=generateProducts(200), page=1, perPage=10, filter={search:"",status:"all"};
const categories=[...new Set(products.map(p=>p.category))];
const save=()=>{localStorage.setItem("stock-manager-products",JSON.stringify(products));};
const load=()=>{try{const x=JSON.parse(localStorage.getItem("stock-manager-products"));if(Array.isArray(x)&&x.length)products=x}catch{}};
load();

function statusOf(stock){return stock===0?"out":stock<=15?"low":"in"}
function filtered(){const q=filter.search.trim().toLowerCase();return products.filter(p=>(filter.status==="all"||p.status===filter.status)&&(!q||[p.name,p.sku,p.category].join(" ").toLowerCase().includes(q)))}
function stats(){
 const total=products.reduce((a,p)=>a+p.stock,0),low=products.filter(p=>p.status==="low").length,out=products.filter(p=>p.status==="out").length,value=products.reduce((a,p)=>a+p.stock*p.price,0);
 document.querySelector("#stats").innerHTML=`<div class="stat"><div class="label">Total Products</div><div class="value">${products.length}</div><div class="hint">Active products</div></div><div class="stat"><div class="label">Units in Stock</div><div class="value">${total.toLocaleString()}</div><div class="hint">Across all products</div></div><div class="stat"><div class="label">Low Stock</div><div class="value">${low}</div><div class="hint">Needs attention</div></div><div class="stat"><div class="label">Inventory Value</div><div class="value">$${value.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</div><div class="hint">${out} products out of stock</div></div>`;
}
function render(){
 stats();const list=filtered(),pages=Math.max(1,Math.ceil(list.length/perPage));if(page>pages)page=pages;
 const slice=list.slice((page-1)*perPage,page*perPage);
 renderTable(slice,{onEdit:(id,patch)=>{const p=products.find(x=>x.id===id);Object.assign(p,patch,{status:statusOf(patch.stock),updated:new Date().toISOString().slice(0,10)});save();render()},onDelete:id=>{if(confirm("Delete this product?")){products=products.filter(p=>p.id!==id);save();render()}},onSelect:()=>{}});
 Pagination({page,totalPages:pages,onPage:p=>{page=p;render()}});
}
Filters({onChange:f=>{filter=f;page=1;render()},onExport:()=>exportCSV(filtered())});
document.querySelector("#addBtn").onclick=()=>openDialog(categories,data=>{const id=Math.max(0,...products.map(p=>p.id))+1;products.unshift({...data,id,status:statusOf(data.stock),updated:new Date().toISOString().slice(0,10)});save();page=1;render()});
document.querySelector("#selectAll").onchange=e=>document.querySelectorAll(".row-select").forEach(x=>x.checked=e.target.checked);
render();
