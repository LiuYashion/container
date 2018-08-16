export const getStore = (name) => {
  if (!name) return null;
  return window.localStorage.getItem(name);
};

export const setStore = (name, _content) => {
  if (!name) return;
  let content = _content;
  if (typeof _content !== 'string') {
    content = JSON.stringify(_content);
  }
  window.localStorage.setItem(name, content);
};

export const removeStore = (name) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

export const json2string = (json) => {
  let dataStr = '';
  Object.keys(json).forEach((key) => {
    dataStr += `${key}=${json[key]}&`;
  });
  return dataStr.substring(0, dataStr.length - 1);
};

