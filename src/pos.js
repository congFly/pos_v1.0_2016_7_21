'use strict';

let tags = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
];
function loadAllItems() {
    let items = [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
    return items;

}
function getDiscountInfo() {
    let discountBarcode = [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005']
        }, {
            type: 'OTHER',
            barcodes: [
                'ITEM000002',
                'ITEM000003',
                'ITEM000004']
        }];
    return discountBarcode;

}

function formatTags(tags) {
    let barcodes=tags.map(function(tag){
        let bar=tag.split("-");
        return {
            barcode:bar[0],
            amount:parseFloat(bar[1])||1
        }
    });
    return barcodes;
}

function mergeBarcodes(barcodes) {
    let mergeBaarcodes=[];
    for (let i=0;i<barcodes.length;i++){
        let existItem = mergeBaarcodes.find(
            function (item) {
                if (item.barcode===barcodes[i].barcode){
                    return item;
                }
            }
        );
        if (existItem){
            existItem.amount+=barcodes[i].amount;
        }else {
            mergeBaarcodes.push(Object.assign({},barcodes[i],{amount:barcodes[i].amount}));
        }
    }
    return mergeBaarcodes;
}


function getCartItems(mergedBaarcodes, allItems) {
    let cartItemsCount = [];
    for (let i = 0; i < mergedBaarcodes.length; i++) {
        for (let j = 0; j < allItems.length; j++) {
            if (mergedBaarcodes[i].barcode === allItems[j].barcode) {
                cartItemsCount.push(Object.assign({}, allItems[j], {amount: mergedBaarcodes[i].amount}));
            }
        }
    }
    
    return cartItemsCount;
}


function getDiscountSubtotal(cartItemsCount,discountBarcodes) {
    let saveSubtotal=[];
    let discountSubtotalSum=0;
    for(let i=0;i<cartItemsCount.length;i++){
        discountSubtotalSum=cartItemsCount[i].price*cartItemsCount[i].amount;
        for(let j=0;j<discountBarcodes[0].barcodes.length;j++){
            if(cartItemsCount[i].barcode===discountBarcodes[0].barcodes[j]) {
                //console.log(subCount[i].barcode);
                discountSubtotalSum -=cartItemsCount[i].price * (Math.floor(cartItemsCount[i].amount / 3));
            }
        }
        saveSubtotal.push(Object.assign({},cartItemsCount[i],{discountSubtotalSum:discountSubtotalSum}));
    }
    return saveSubtotal;
}

function getSubtotal(cartItemsCount) {
    let subtotal = [];
    let noDiscountSubtotal = 0;
    for (let i = 0; i < cartItemsCount.length; i++) {
        noDiscountSubtotal += cartItemsCount[i].price * cartItemsCount[i].amount;
        subtotal.push(Object.assign({},cartItemsCount[i],{noDiscountSubtotal:noDiscountSubtotal}));
    }

    return subtotal;
}


function getSaveTotal(saveSubtotal, subtotal) {
    let saveTotal = 0;

    for (let i = 0; i < subtotal.length; i++) {
        if (subtotal[i].barcode === saveSubtotal[i].barcode) {

            saveTotal += (subtotal[i].noDiscountSubtotal - saveSubtotal[i].discountSubtotalSum);
        }
    }
    return saveTotal;
}


function getTotal(saveSubtotal) {
    let total = 0;
    for (let i = 0; i < saveSubtotal.length; i++) {
        total += saveSubtotal[i].discountSubtotalSum;
    }
    return total;
}


function print(saveSubtotal, total, saveTotal) {
    for (let i = 0; i < saveSubtotal.length; i++) {
        console.log("商品：" + saveSubtotal[i].name + ",单价："
            + saveSubtotal[i].price + "元," + "件数："
            + "" + saveSubtotal[i].amount + ",小计：" + saveSubtotal[i].discountSubtotalSum + "元");
        console.log("节省：" + saveTotal + "元");
        console.log("总价：" + total + "元");
    }
}


function printReceipt(tags) {
    let allItems = loadAllItems();
    let discountBarcodes = getDiscountInfo();
    let barcodes = formatTags(tags);
    let mergeBaarcodes=mergeBarcodes(barcodes);
    let cartItemsCount = getCartItems(mergeBaarcodes, allItems);
    let saveSubtotal = getDiscountSubtotal(cartItemsCount, discountBarcodes);
    let subtotal = getSubtotal(cartItemsCount);
    let saveTotal = getSaveTotal(saveSubtotal, subtotal);
    let total = getTotal(saveSubtotal);
    print(saveSubtotal, total, saveTotal);
}
printReceipt(tags);
