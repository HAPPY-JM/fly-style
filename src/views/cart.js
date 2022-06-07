const list = () => {
  return JSON.parse(window.localStorage.getItem("cart")) || [];
};

const save = (data) => {
  window.localStorage.setItem("cart", JSON.stringify(data));
};

export const clear = () => {
  window.localStorage.removeItem("cart");
};

export const get = (id) => list().find((product) => product._id === id);

export const exists = (id) => !!get(id);

export const add = (product, quantity) =>
  exists(product._id)
    ? update(product._id, "quantity", get(product._id).quantity + quantity)
    : save(list().concat({ ...product, quantity: quantity }));

export const remove = (id) =>
  save(list().filter((product) => product._id !== id));

export const update = (id, field, value) =>
  save(
    list().map((product) =>
      product._id === id ? { ...product, [field]: value } : product
    )
  );
