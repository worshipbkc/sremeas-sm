export function Pagination({page,totalPages,onPage}){
 const root=document.querySelector("#pagination"); if(!totalPages){root.innerHTML="";return}
 let nums=[]; for(let i=1;i<=totalPages;i++){if(i===1||i===totalPages||Math.abs(i-page)<=1) nums.push(i);else if(nums[nums.length-1]!=="…") nums.push("…")}
 root.innerHTML=`<div class="pagination"><span>Page ${page} of ${totalPages}</span><div class="pages">${nums.map(n=>n==="…"?"<span>…</span>":`<button class="page ${n===page?"active":""}" data-p="${n}">${n}</button>`).join("")}</div></div>`;
 root.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>onPage(+b.dataset.p));
}