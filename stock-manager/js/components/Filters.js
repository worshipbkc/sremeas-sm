export function Filters({onChange,onExport}){
 const root=document.querySelector("#filters");
 root.innerHTML=`<div class="filterbar"><div class="search-row"><div class="search"><span>⌕</span><input id="searchInput" placeholder="Search product, SKU, category..."></div><button class="export" id="exportBtn">⇩ Export CSV</button></div><div class="tabs"><button class="tab active" data-status="all">All</button><button class="tab" data-status="in">In Stock</button><button class="tab" data-status="low">Low Stock</button><button class="tab" data-status="out">Out of Stock</button></div></div>`;
 let status="all";
 root.querySelector("#searchInput").oninput=e=>onChange({search:e.target.value,status});
 root.querySelectorAll(".tab").forEach(btn=>btn.onclick=()=>{status=btn.dataset.status;root.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));btn.classList.add("active");onChange({search:root.querySelector("#searchInput").value,status})});
 root.querySelector("#exportBtn").onclick=onExport;
}