const categories=["Electronics","Office","Grocery","Beverage","Home","Beauty","Clothing","Hardware","Stationery","Accessories"];
const prefixes=["Wireless","Premium","Classic","Smart","Eco","Pro","Digital","Essential","Modern","Compact"];
const nouns=["Keyboard","Mouse","Headset","Monitor","Notebook","Bottle","Lamp","Cable","Charger","Backpack","Speaker","Chair","Coffee","Tea","Soap","Towel","Shirt","Adapter","Camera","Desk"];
export function generateProducts(count=200){
 const products=[];
 for(let i=1;i<=count;i++){
   const category=categories[(i-1)%categories.length], name=`${prefixes[(i*3)%prefixes.length]} ${nouns[(i*7)%nouns.length]}`;
   const stock=(i*17)%121, price=+(5+((i*37)%950)/10).toFixed(2);
   products.push({id:i,name,sku:`SKU-${String(i).padStart(4,"0")}`,category,stock,price,status:stock===0?"out":stock<=15?"low":"in",updated:`2026-10-${String((i%28)+1).padStart(2,"0")}`});
 }
 return products;
}