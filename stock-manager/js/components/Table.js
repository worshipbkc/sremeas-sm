export function renderTable(items,{onEdit,onDelete,onSelect}={}){
 const body=document.querySelector("#tableBody");
 body.innerHTML=items.map(p=>`<tr data-id="${p.id}">
 <td><input type="checkbox" class="row-select" data-id="${p.id}"></td>
 <td><div class="product-cell"><div class="avatar">${p.name[0]}</div><div><div class="product-name">${p.name}</div><div class="muted">${p.sku}</div></div></div></td>
 <td>${p.sku}</td><td>${p.category}</td>
 <td><span class="stock">${p.stock}</span></td><td class="price">$${p.price.toFixed(2)}</td>
 <td><span class="badge ${p.status}">${p.status==="in"?"In Stock":p.status==="low"?"Low Stock":"Out of Stock"}</span></td><td>${p.updated}</td>
 <td><button class="icon-btn edit" title="Edit">✎</button><button class="icon-btn delete" title="Delete">⌫</button></td></tr>`).join("");
 body.querySelectorAll(".edit").forEach(btn=>btn.onclick=()=>editRow(btn.closest("tr"),items.find(x=>x.id==btn.closest("tr").dataset.id),onEdit));
 body.querySelectorAll(".delete").forEach(btn=>btn.onclick=()=>onDelete(+btn.closest("tr").dataset.id));
 body.querySelectorAll(".row-select").forEach(x=>x.onchange=()=>onSelect?.(+x.dataset.id,x.checked));
}
function editRow(row,p,onEdit){
 row.children[4].innerHTML=`<input class="edit-input" type="number" min="0" value="${p.stock}">`;
 row.children[5].innerHTML=`<input class="edit-input" type="number" min="0" step=".01" value="${p.price}">`;
 const btn=row.querySelector(".edit");btn.textContent="✓";btn.onclick=()=>{const stock=+row.children[4].querySelector("input").value,price=+row.children[5].querySelector("input").value;onEdit(p.id,{stock,price});};
}