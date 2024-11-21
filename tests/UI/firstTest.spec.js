const { test, expect } = require('@playwright/test');


test('todolist', async ({page}) => {
    await page.goto('https://todomvc.com/examples/react/dist/');
    await page.getByLabel("New Todo Input").fill("hi");
    await page.getByLabel("New Todo Input").press('Enter');
    await expect(page.getByTestId("todo-item-label")).toBeVisible();
    
});


test('SCENARIO: User should be able to see the completed tasks when “Completed”', async ({page}) => {
    await test.step('Given: The user has at least one completed item ', async () => {
        await page.goto('https://todomvc.com/examples/react/dist/');
        await page.getByLabel("New Todo Input").fill("hi");
        await page.getByLabel("New Todo Input").press('Enter');
        await page.getByTestId('todo-item-toggle').click();
        //await expect(page.getByTestId('todo-item-toggle')).toBeChecked()
      });

      await test.step('When: The user clicks on the "completed" filter icon', async () => {
        await page.getByRole('link', {name: 'Completed'}).click();
      });

      await test.step('Then: The user will see only the completed items ', async () => {
        await expect(page.getByTestId('todo-item-label')).toBeVisible;
      });
});





test('SCENARIO: Deleg a todo item', async ({page}) => {
    await test.step('Given: The user has at least one active item ', async () => {
        await page.goto('https://todomvc.com/examples/react/dist/');
      });

      await test.step('When: The user clicks on the x mark', async () => {
        await page.getByPlaceholder('Username').click();
      });

      await test.step('Then: The user cannot see the item anymnore', async () => {
        await expect(page.getByPlaceholder('Username')).toBeVisible;
      });
});

test("SCENARIO #1: User should be able to filter  'Active' items with desired results.", async ({page}) => {
    await test.step('Given: The user has at least one completed and one active items ', async () => {
        await page.goto('https://todomvc.com/examples/react/dist/');
        await page.getByLabel("New Todo Input").fill("Active item");
        await page.getByLabel("New Todo Input").press('Enter');
        await page.getByLabel("New Todo Input").fill("completed item");
        await page.getByLabel("New Todo Input").press('Enter');
      //  await page.getByTestId('todo-item-toggle').click();
      });

      await test.step('When: The user clicks on the "all" filter', async () => {
        await page.getByRole('link', {name: 'Active'}).click();
      });

      await test.step('Then: The user will see only 1 "active" ', async () => {
        await expect(page.getByTestId('todo-item-label')).toBeVisible;

      });
});

test("SCENARIO #2: User should be able to remove the completed todos.", async ({page}) => {
    await test.step('Given: The user has at least one completed and one active items ', async () => {
        await page.goto('https://todomvc.com/examples/react/dist/');
        await page.getByLabel("New Todo Input").fill("completed item");
        await page.getByLabel("New Todo Input").press('Enter');
        await page.getByTestId('todo-item-toggle').click(); //which to click
      });

      await test.step('When: The user clicks on the "Clear Completed" filter', async () => {
        await page.getByRole('button', { name: 'Clear completed' }).click();
        // await page.waitForTimeout(1500)
        //amend
      });

      await test.step('AND: The user moves to ', async () => {
        await page.getByRole('link', { name: 'Completed' }).click();
        //amend
      });


      await test.step('Then: The user will not see any items on the complete', async () => {
        await expect(page.getByTestId('todo-item-label')).toBeEmpty;
        //must say active 
      });
});

test("SCENARIO #3: User should be able to toggle multiple tasks as completed from complete all toggle.", async ({page}) => {
    await test.step('Given: The user has at least 2 "active" items ', async () => {
        await page.goto('https://todomvc.com/examples/react/dist/');
        await page.getByLabel("New Todo Input").fill("item1");
        await page.getByLabel("New Todo Input").press('Enter');
        await page.getByLabel("New Todo Input").fill("item2");
        await page.getByLabel("New Todo Input").press('Enter');
        
      });

      await test.step('When: The user clicks on the "input toggle all"', async () => {
        await page.getByTestId('toggle-all').click();
        
      });

      await test.step('Then: The user will see all items ticked', async () => {
        await expect(page.locator('div').filter({ hasText: 'item1' }).getByTestId('todo-item-toggle')).toBeChecked();
        await expect(page.locator('div').filter({ hasText: 'item2' }).getByTestId('todo-item-toggle')).toBeChecked()
      
      });
});

test("SCENARIO #4: User should be able to remove an added todo with x icon.", async ({page}) => {
    await test.step('Given: The user has at least 1 "active" item ', async () => {
        await page.goto('https://todomvc.com/examples/react/dist/');
        await page.getByLabel("New Todo Input").fill("this is item1");
        await page.getByLabel("New Todo Input").press('Enter');
        
        
      });

      await test.step('When: The user clicks on the x icon', async () => {
        await page.getByTestId('todo-item-label').hover();
        await page.getByRole('button', { name: '×' }).click();
        
      });

      await test.step('Then: The user will not be able to see the item anymore', async () => {
        await expect(page.getByTestId('todo-list')).toBeEmpty();
        
      });
});

test("SCENARIO #5: User should be able to uncheck a completed todo item from todo list that has multiple items.", async ({page}) => {
    await test.step('Given: The user has at least 2 "completed" items ', async () => {
        await page.goto('https://todomvc.com/examples/react/dist/');
        await page.getByLabel("New Todo Input").fill("completed item no1");
        await page.getByLabel("New Todo Input").press('Enter');
        await page.getByLabel("New Todo Input").fill("completed item no2");
        await page.getByLabel("New Todo Input").press('Enter');
        await page.getByTestId('toggle-all').click();
      });

      await test.step('When: The user clicks on the first toggle to uncheck ', async () => {
        await page.locator('div').filter({ hasText: 'completed item no1' }).getByTestId('todo-item-toggle').click();
        //amend
      });

      await test.step('Then: The user will see the item as active and not complete', async () => {
        await expect(page.locator('div').filter({ hasText: 'completed item no1' }).getByTestId('todo-item-toggle')).not.toBeChecked()
        //must say active 
      });
});

test("SCENARIO #6: User should be able to edit existing todo item and change the name to a new one.", async ({page}) => {
    await test.step('Given: The user has  1 "active" items ', async () => {
        await page.goto('https://todomvc.com/examples/react/dist/');
        await page.getByLabel("New Todo Input").fill("Changeme:");
        await page.getByLabel("New Todo Input").press('Enter');
      });

      await test.step('When: The user double click on the item ', async () => {
        await page.getByTestId('todo-item-label').dblclick();
        
      });

      await test.step('AND: The user enters the words"changed" ', async () => {
        await page.getByTestId('todo-item').getByTestId('text-input').fill("changed");
        await page.waitForTimeout(1500);
        
      });

      await test.step('AND: The user presses "Enter" ', async () => {
        await page.getByTestId('todo-item').getByTestId('text-input').press('Enter');
        
      });

      await test.step('Then: The user will see the item as ("change" )', async () => {
        await expect(page.getByTestId('todo-item-label')).toHaveText("changed");
        
      });
});




