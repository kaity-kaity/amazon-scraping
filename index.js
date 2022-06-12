const puppeteer = require("puppeteer");

(async () => {
  const options = {
    headless: false, // ヘッドレスをオフに
    slowMo: 100, // 動作を遅く
  };
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  const array = [
    "https://www.amazon.co.jp/%E3%82%A2%E3%83%BC%E3%83%86%E3%83%83%E3%82%AF-197871-%EF%BC%88Artec%EF%BC%89%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF-%E3%82%A2%E3%83%BC%E3%83%86%E3%83%83%E3%82%AF%E3%83%AD%E3%83%9C-T-REX/dp/B017F64VZ6/ref=asc_df_B017F64VZ6/?tag=jpgo-22&linkCode=df0&hvadid=342369770766&hvpos=&hvnetw=g&hvrand=13721834270396335211&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1009307&hvtargid=pla-799487268671&psc=1",
  ];
  for (let url of array) {
    await page.goto(url);
    let count = (
      await page.$$(
        "#productDetails_techSpec_section_1 > tbody:first-child > tr"
      )
    ).length;

    for (let i = 1; i < count + 1; i++) {
      let first_column_text = await page.evaluate(() =>
        Array.from(
          document.querySelectorAll(
            `#productDetails_techSpec_section_1 > tbody:nth-child(1)`
          ),
          (element) => element.textContent.trim()
        )
      );
      let first_column_value = await page.evaluate(() =>
        Array.from(
          document.querySelectorAll(
            `#productDetails_techSpec_section_1 > tbody:nth-child(1) > tr:nth-child(2)`
          ),
          (element) => element.textContent.trim()
        )
      );

      console.log(first_column_text);
      console.log(first_column_value);
    }
  }
})();
