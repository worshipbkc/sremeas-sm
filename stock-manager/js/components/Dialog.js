export function openDialog(categories,onSave){
 const root=document.querySelector("#dialogRoot");
 root.innerHTML=`<div class="modal-backdrop"><div class="modal"><div class="modal-head"><h2>Add Product</h2><button class="close">×</button></div>
 <form id="productForm"><div class="form-grid">
 <div class="field"><label>Product name</label><input name="name" required placeholder="Product name"></div>
 <div class="field"><label>SKU</label><input name="sku" required placeholder="SKU-0201"></div>
 <div class="field"><label>Category</label><select name="category">${categories.map(c=>`<option>${c}</option>`).join("")}</select></div>
 <div class="field"><label>Stock</label><input name="stock" type="number" min="0" value="20"></div>
 <div class="field"><label>Price</label><input name="price" type="number" min="0" step=".01" value="10"></div>
 </div><div class="modal-actions"><button type="button" class="secondary close">Cancel</button><button class="primary">Add Product</button></div></form></div></div>`;
 root.querySelectorAll(".close").forEach(x=>x.onclick=()=>root.innerHTML="");
 root.querySelector("#productForm").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);onSave({name:f.get("name"),sku:f.get("sku"),category:f.get("category"),stock:+f.get("stock"),price:+f.get("price")});root.innerHTML=""};
}