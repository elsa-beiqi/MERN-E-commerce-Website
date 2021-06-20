import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Product from "./screens/ProductView";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders user data", async () => {
    const fakeProduct = {
        "productSize": "Size 10",
        "productDescription": "Paint beautiful and precise strokes with ease using this Royal & Langnickel Zen brush!",
        "productStock": 20,
        "productPrice": 5.99,
        "productDiscount": 5,
        "productBestseller": true,
        "productNumofRatings": 12,
        "productDistributor": "Zen",
        "productBGcolor": "Peach",
        "productFlutterLink": "http://10.0.2.2:5000/product/image/606b0c26e8e7d76230b427c7",
        "_id": "123",
        "productName": "Zen™ Series 43 Long Handle Filbert Brush",
        "productCategory": "Brush",
        "productRating": 4.2,
        "__v": 0,
        "productImageLink": "http://localhost:5000/product/image/606b0c26e8e7d76230b427c7",
        "onlineImageLink": "https://cs308canvas.herokuapp.com/product/image/606b0c26e8e7d76230b427c7",
        "quantity": 2
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeProduct)
        })
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        render(<Product id="123" />, container);
    });

    expect(container.querySelector("summary").textContent).toBe(fakeProduct.name);
    expect(container.querySelector("strong").textContent).toBe(fakeProduct.age);
    expect(container.textContent).toContain(fakeProduct.address);

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});