export const list = (key) => {
  return JSON.parse(window.localStorage.getItem(key)) || [];
};

const save = (data, key) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

export const clear = (key) => {
  window.localStorage.removeItem(key);
};

export const get = (id, size, key) =>
  list(key).find((product) => product._id === id && product.size === size);

export const exists = (id, size, key) => !!get(id, size, key);

export const add = (product, size, quantity, key) =>
  exists(product._id, size, key)
    ? update(
        product._id,
        size,
        "quantity",
        get(product._id, size, key).quantity + quantity,
        key
      )
    : save(
        list(key).concat({ ...product, size: size, quantity: quantity }),
        key
      );

export const remove = (id, size, key) =>
  save(
    list(key).filter((product) => product._id !== id || product.size !== size),
    key
  );

export const update = (id, size, field, value, key) =>
  save(
    list(key).map((product) =>
      product._id === id && product.size === size
        ? { ...product, size, [field]: value }
        : product
    ),
    key
  );
