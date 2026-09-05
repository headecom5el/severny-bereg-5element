(function(root){
'use strict';
const cents=n=>Math.round(n*100);
const discount=p=>Math.round((1-p.price/p.regular)*100);
function bundleTotals(bundle,products){const list=bundle.items.map(id=>products.find(p=>p.id===id));const regular=list.reduce((s,p)=>s+cents(p.regular),0);const individual=list.reduce((s,p)=>s+cents(p.price),0);const price=Math.round(individual*.95);return{regular,individual,price,saving:regular-price,extra:individual-price,bonus:Math.round(price*.1)};}
function cartTotals(cart,products,bundles){let regular=0,price=0,count=0;for(const line of cart){const [kind,id]=line.key.split(':');const p=kind==='b'?bundles.find(b=>b.id===id):products.find(p=>p.id===id);if(!p)continue;const t=kind==='b'?bundleTotals(p,products):{regular:cents(p.regular),price:cents(p.price)};regular+=t.regular*line.qty;price+=t.price*line.qty;count+=(kind==='b'?p.items.length:1)*line.qty;}return{regular,price,saving:regular-price,bonus:Math.round(price*.1),count};}
const api={cents,discount,bundleTotals,cartTotals};if(typeof module==='object'&&module.exports)module.exports=api;else root.SHOP_MATH=api;
})(typeof window==='undefined'?this:window);
