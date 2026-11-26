const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const script = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

function createElement() {
    return {
        addEventListener() {},
        classList: { add() {}, remove() {} },
        innerHTML: "",
        reset() {},
        style: {},
        textContent: ""
    };
}

function loadStore() {
    const elements = new Map();
    const getElement = key => {
        if (!elements.has(key)) {
            elements.set(key, createElement());
        }
        return elements.get(key);
    };
    const document = {
        addEventListener(event, callback) {
            if (event === "DOMContentLoaded") {
                callback();
            }
        },
        createElement: createElement,
        getElementById: getElement,
        head: { appendChild() {} },
        body: { appendChild() {} },
        querySelector: getElement,
        querySelectorAll() {
            return [];
        }
    };
    const context = {
        document,
        localStorage: { getItem() { return null; }, setItem() {} },
        setTimeout() {},
        clearTimeout() {}
    };

    vm.runInNewContext(script, context);
    return { context, getElement };
}

test("product cards render licensed photo URLs with descriptive alt text", () => {
    const { getElement } = loadStore();
    const html = getElement("productsGrid").innerHTML;
    const images = [...html.matchAll(/<img src="([^"]+)" alt="([^"]+)" loading="lazy" decoding="async">/g)];

    assert.equal(images.length, 12);
    for (const [, src, alt] of images) {
        assert.match(src, /^https:\/\/images\.unsplash\.com\/photo-/);
        assert.ok(alt.trim().length > 0);
    }
});

test("cart items keep the product photo and its accessible description", () => {
    const { context, getElement } = loadStore();

    context.addToCart(1);

    const cartImage = getElement("cartItems").innerHTML;
    assert.match(cartImage, /<img class="cart-item-image" src="https:\/\/images\.unsplash\.com\/photo-/);
    assert.match(cartImage, /alt="Computadora portátil plateada"/);
});
