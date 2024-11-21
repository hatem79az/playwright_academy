const { test, expect } = require('@playwright/test');


test.describe.only('myFirstApi', () =>{
    
    test("Task", async ({request}) =>{
        
        //Create a new Cart
        const response = await request.post("https://simple-grocery-store-api.glitch.me/carts")
        const responseBody = JSON.parse(await response.text());
        //console.log(responseBody);
        //console.log(responseBody.cartId)
        let myCartId = responseBody.cartId
        //console.log(myCartId)
        //validate the new cart
        await expect(responseBody.created).toBe(true);
        //console.log(myCartId)
        //console.log("https://simple-grocery-store-api.glitch.me/carts/" + myCartId)
        const response2 = await request.get("https://simple-grocery-store-api.glitch.me/carts/" + myCartId)
        const responseBody2 = JSON.parse(await response2.text());
        //assert
        await expect(responseBody2.items).toEqual([]);
        // add a new product to the cart- validate
        const response3 = await request.post("https://simple-grocery-store-api.glitch.me/carts/" + myCartId+ "/items",{
            data:{
                productId: 4643
            }
        })
        const responseBody3 = JSON.parse(await response3.text());
        //console.log(responseBody3)
        let myNewItem = responseBody3.itemId
        
        const response4 = await request.get("https://simple-grocery-store-api.glitch.me/carts/" + myCartId)
        const responseBody4 = JSON.parse(await response4.text());
        //console.log(responseBody4)
        //console.log(responseBody4.items[0].id)
        expect(responseBody4.items[0].id).toBe(myNewItem)
        expect(responseBody4.items[0].quantity).toBe(1)
        //await expect(responseBody4.items.id).toBe(myNewItem)
        //await expect(responseBody4.items)
        const response5 = await request.delete("https://simple-grocery-store-api.glitch.me/carts/" + myCartId+ "/items/" + myNewItem)
        //const responseBody5 = JSON.parse(await response5.text());
        //console.log(responseBody5) //ask question
        await expect(response5.status()).toBe(204);

        //validate
        const response6 = await request.get("https://simple-grocery-store-api.glitch.me/carts/" + myCartId)
        const responseBody6 = JSON.parse(await response6.text());
        //assert
        await expect(responseBody6.items).toEqual([]);

    });

});

