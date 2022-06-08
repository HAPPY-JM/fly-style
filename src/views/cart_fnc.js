export const list = (key) => {
  return JSON.parse(window.localStorage.getItem(key)) || [];
};

const save = (data, key) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

export const clear = (key) => {
  window.localStorage.removeItem(key);
};

export const get = (id, key) => list(key).find((product) => product._id === id);

export const exists = (id, key) => !!get(id, key);

export const add = (product, quantity, key) =>
  exists(product._id, key)
    ? update(
        product._id,
        "quantity",
        get(product._id, key).quantity + quantity,
        key
      )
    : save(list(key).concat({ ...product, quantity: quantity }), key);

export const remove = (id, key) =>
  save(
    list(key).filter((product) => product._id !== id),
    key
  );

export const update = (id, field, value, key) =>
  save(
    list(key).map((product) =>
      product._id === id ? { ...product, [field]: value } : product
    ),
    key
  );
