// export function currencyAmount(amount, currency, convert = true) {
//     if (currency) {
//       return `${currency.symbol ?? ""}${(convert? (amount * currency.rate): amount).toFixed(2)}${
//         !currency.symbol ? " " + currency.code : ""
//       }`;
//     } else {
//       return `${amount.toFixed(2)}`;
//     }
//     // return `${CURRENCIES[0].code}${(amount * CURRENCIES[0].rate).toFixed(2)}`;
//   }

//   const currencies = useSelector((state) => state.setting.currencies);

//   const initialState = {
//     lang:"en",
//     currency: "INR",
//     currencies:{},
//     theme:"light",
//     pageTitle:""
//  }

//  <Dropdown key="pay" menu={{
//     items: Object.keys(currencies??{}).map((key)=>{
//       return {
//         key:key,
//         //label:key,
//         label:<Space><ReactCountryFlag countryCode={currencies[key].countryCode} svg />{key}</Space>,
//         onClick:()=>{
//           //setSelectedCurrency(x);
//           dispatch(changeCurrency(key));
//         }
//       }
//     }) ,
//     onClick:(value)=>{
//       console.log("onCurrency Check:",value);
//     }
//   }}>
//   <Button>
//     <Space>
//     <ReactCountryFlag countryCode={currencies[selectedCurrency]?.countryCode??"IN"} svg />
//     {selectedCurrency}
//     <DownOutlined />
//     </Space>
//   </Button>
// </Dropdown>

// export const CURRENCIES_COUNTRY = {
//     INR: "IN",
//     USD: "US",
//     BRL: "BR",
//     MYR: "MY",
//     AED: "AE",
//     AUD: "AU",
//     CAD: "CA",
//     EUR: "FR",
//     GBP: "GB",
//     MXN: "MX",
//     SGD: "SG",
//     THB: "TH",
//     IDR: "ID",
//     ZAR: "ZA",
//   };
//   export const CURRENCIES_SYMBOL = {
//     INR: "₹",
//     USD: "$",
//     BRL: "R$",
//     MYR: "RM",
//     AED: "د.إ",
//     AUD: "A$",
//     CAD: "CA$",
//     EUR: "€",
//     GBP: "£",
//     MXN: "$",
//     SGD: "S$",
//     THB: "฿",
//     IDR: "Rp",
//     ZAR: "R",
//   };