import faker from "faker"

function mount(el) {
  let products = ""
  console.log("mount被执行", el)
  for (let i = 1; i <= 5; i++) {
    products += `<div>${faker.commerce.productName()}</div>`
  }
  el.innerHTML = products
}

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#dev-products")
  if (el) mount(el)
}

export { mount }
