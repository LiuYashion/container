import { json2string } from './storage';

export default async (_url = '', data = {}, _type = 'GET', method = 'fetch') => {
  let url = _url;
  const type = _type.toUpperCase();

  if (type === 'GET') {
    const attach = json2string(data);
    url = attach === '' ? url : `${url}?${attach}`;
  }
  if (window.fetch && method === 'fetch') {
    let requestConfig = {
      method: type,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      cache: 'force-cache',
    };

    if (type === 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data),
      });
    }

    if (type === 'GET') {
      requestConfig = {
        method: type,
        // mode: "cors",
        // credentials: 'include',
        // cache: "force-cache"
      };
    }

    if (type === 'FORM') {
      const form = new FormData();
      Object.keys(data).forEach((key) => {
        form.append(key, data[key]);
      });
      requestConfig.type = 'POST';
      Object.defineProperty(requestConfig, 'body', {
        value: form,
      });
    }

    try {
      const response = await fetch(url, requestConfig);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      throw new Error(error);
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      }

      let sendData = '';
      let ty = type;

      if (type === 'POST') {
        sendData = JSON.stringify(data);
      }
      if (type === 'FORM') {
        sendData = new FormData();
        Object.keys(data).forEach((key) => {
          sendData.append(key, data[key]);
        });
        ty = 'POST';
      }
      requestObj.open(ty, url, true);
      requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      requestObj.send(sendData);
      requestObj.onreadystatechange = () => {
        if (requestObj.readyState === 4) {
          if (requestObj.status === 200) {
            let obj = requestObj.response;
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            resolve(obj);
          } else {
            reject(requestObj);
          }
        }
      };
    });
  }
};
