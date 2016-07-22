'use strict';

describe("test formatTags",function () {
    it("show barcodes",function () {
        let tags=['ITEM000001','ITEM000001-2'];
        let result=formatTags(tags);

        expect(result).toEqual([
            {
                "barcode": "ITEM000001",
                "amount": 1},
            {
                "barcode": "ITEM000001",
                "amount": 2}
            ]);
    })
})

describe("test mergeBarcodes",function () {
    it("show mergeBaarcodes",function () {
        let barcodes=[{
            barcode: 'ITEM000002',
            amount:1
        },{
            barcode: 'ITEM000001',
            amount:1
        },{
            barcode: 'ITEM000001',
            amount:1
        }];

        let result=mergeBarcodes(barcodes);

        expect(result).toEqual( [
            {
                barcode: 'ITEM000002',
                amount: 1
        },{
                barcode: 'ITEM000001',
                amount: 2
            }
        ])
    })
})

describe("test getCartItems",function () {
    it("show cartItemsCount",function () {
        let mergedBaarcodes=[
            {
                barcode: 'ITEM000002',
                amount: 1
            },{
                barcode: 'ITEM000001',
                amount: 2
            }
        ];
        let allItems=[{
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
            }];

        let result=getCartItems(mergedBaarcodes,allItems);

        expect(result).toEqual([
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                amount:1
            },{
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:2
            }
        ]);
    })
})

describe("test getDiscountSubtotal",function () {
    it("show saveSubtotal",function () {
        let cartItemsCount=[
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:3
            }
        ];
        let discountBarcodes=[
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
            }
        ];

        let result=getDiscountSubtotal(cartItemsCount,discountBarcodes);

        expect(result).toEqual([
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:3,
                discountSubtotalSum:6
            }
        ]);
    })
})

describe("test getSubtotal",function () {
    it("show cartItemsCount",function () {
        let cartItemsCount=[{
            amount:3,
            barcode: 'ITEM000001',
            name: '雪碧',
            price: 3.00,
            unit: '瓶'

        }
        ];
        let result=getSubtotal(cartItemsCount);
        expect(result).toEqual([
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:3,
                noDiscountSubtotal:9.00
            }
        ]);

    })

})


describe("test getSaveTotal",function () {
    it("show saveTotal",function () {
        let saveSubtotal=[
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:3,
                discountSubtotalSum:6
            }
        ];
            let subtotal=[
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:3,
                noDiscountSubtotal:9.00
            }
        ];

        let result=getSaveTotal(saveSubtotal,subtotal);
            expect(result).toEqual(3);
    })
})

describe("test getTotal",function () {
    it ("show total",function () {
        let saveSubtotal=[
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:3,
                discountSubtotalSum:6

        }];
        let subtotal=[
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:3,
                noDiscountSubtotal:9.00
            }
        ];
       
        let result=getSaveTotal(saveSubtotal,subtotal);
        expect(result).toEqual(3);
    })

})

// describe("test print",function () {
//     it("show receipt",function () {
//         let saveSubtotal=[
//             {
//                 barcode: 'ITEM000001',
//                 name: '雪碧',
//                 unit: '瓶',
//                 price: 3.00,
//                 amount:3,
//                 discountSubtotalSum:6
//
//             }];
//         let total=6;
//         let saveTotal=3;
//
//         let result=print(saveSubtotal,total,saveTotal);
//         let expected="商品：雪碧,单价：3元,件数：3,小计：6元" +
//             "节省：3元
//             "总价：6元";
//        
//         expect(result).toEqual(expected);
//
//     })
// })