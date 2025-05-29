const url =
  "https://www.bilibili.com/video/BV1RK411Y7P1/?spm_id_from=333.337.search-card.all.click&vd_source=c9b5ad80f6fd3a92e98aa11ba4728918";

function getUrl(URL) {
  // 参数在传输时很可能会被编码 "Hello%20World%21"
  const decodeUrl = decodeURIComponent(URL);
  // const decodeUrl = URL;
  const index = URL.indexOf("?"); //* ?之后的是参数
  let url = decodeUrl.slice(index + 1);
  url = url.split("&"); //* 参数之间用&分隔

  const obj = {};
  for (let item of url) {
    //* 以=分隔key和value
    let key = item.split("=")[0];
    let value = item.split("=")[1];
    obj[key] = value;
  }
  return obj;
}

console.log(getUrl(url));
