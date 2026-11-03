const assert=require('node:assert/strict');const {calculate,cents}=require('../dist/math.js');const {parseReceipt}=require('../dist/receipt.js');
let n=0;function check(fn){fn();n++;}
check(()=>assert.equal(calculate('100','3',3,20).payment,4100));
check(()=>assert.equal(calculate('100','6.35',2,20).payment,6300));
check(()=>assert.equal(calculate('50','3',1,15).payment,6100));
check(()=>assert.equal(calculate('50','3',1,25).payment,6600));
check(()=>assert.equal(calculate('100','6',1,20,'18').payment,12600));
check(()=>assert.equal(calculate('100','6',1,20,'25').payment,13100));
check(()=>assert.equal(cents('1,234.50'),123450));
for(const x of ['-1','1.234','NaN'])check(()=>assert.throws(()=>cents(x)));
for(const x of [0,1.5,100])check(()=>assert.throws(()=>calculate('100','5',x,20)));
check(()=>assert.deepEqual(parseReceipt('SUBTOTAL $100.00\nSales Tax 6.35% $6.35\nTOTAL $106.35\nSuggested 20% $20.00'),{subtotal:100,tax:6.35,total:106.35,warnings:[]}));
check(()=>assert.equal(parseReceipt('TOTAL $90.00').subtotal,null));
check(()=>assert.ok(parseReceipt('Subtotal 100.00\nTax 6.35\nAuto Gratuity 20.00\nTotal 126.35').warnings.length));
for(let s=1;s<50000;s+=113)for(let parties=1;parties<10;parties++)for(const percent of [15,20,25]){const r=calculate((s/100).toFixed(2),'6.35',parties,percent);assert.ok(Math.abs(r.payment-r.before)<=50.000001);assert.equal(r.payment%100,0);assert.ok(Math.abs(r.finalTip+(r.subtotal+r.tax)/parties-r.payment)<1e-7);}
console.log(n+' focused checks and 11,961 rounding/split scenarios passed.');
