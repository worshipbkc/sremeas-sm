export function exportCSV(items){
 const headers=["ID","Product","SKU","Category","Stock","Price","Status","Updated"];
 const esc=v=>`"${String(v).replaceAll('"','""')}"`;
 const csv=[headers,...items.map(p=>[p.id,p.name,p.sku,p.category,p.stock,p.price,p.status,p.updated])].map(r=>r.map(esc).join(",")).join("\n");
 const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=url;a.download="stock-products.csv";a.click();URL.revokeObjectURL(url);
}