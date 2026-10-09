const priceInput = document.getElementById("price");
const clearButton = document.getElementById("clearButton");
const copyButton = document.getElementById("copyButton");
const saveButton = document.getElementById("saveButton");
const loadButton = document.getElementById("loadButton");
const message = document.getElementById("message");
const copyMessage = document.getElementById("copyMessage");
const costInput = document.getElementById("cost");
const quantityInput = document.getElementById("quantity");
const taxRateInput = document.getElementById("taxRate");

const salesOutput = document.getElementById("sales");
const totalCostOutput = document.getElementById("totalCost");
const profitOutput = document.getElementById("profit");
const profitStatusOutput = document.getElementById("profitStatus");
const profitRateOutput = document.getElementById("profitRate");
const taxOutput = document.getElementById("tax");
const salesWithTaxOutput = document.getElementById("salesWithTax");
const salesWithTaxLabel = document.getElementById("salesWithTaxLabel");

function calculate() {
  const price = Number(priceInput.value);
  localStorage.setItem("price", priceInput.value);
  const cost = Number(costInput.value);
  localStorage.setItem("cost", costInput.value);
  const quantity = Number(quantityInput.value);
  localStorage.setItem("quantity", quantityInput.value);
  const taxRate = Number(taxRateInput.value);
  localStorage.setItem("taxRate", taxRateInput.value);

  const sales = price * quantity;
  const totalCost = cost * quantity;
  const profit = sales - totalCost;
  const tax = sales * taxRate;
  const salesWithTax = sales + tax;
  let profitRate = 0;

  if (sales > 0) {
    profitRate = (profit / sales) * 100;
  }

  salesOutput.textContent = sales.toLocaleString();
  totalCostOutput.textContent = totalCost.toLocaleString();
  profitOutput.textContent = profit.toLocaleString();
 if (profit < 0) {
  profitOutput.style.color = "red";
} else if (profit > 0) {
  profitOutput.style.color = "green";
} else {
  profitOutput.style.color = "black";
}
if (profit < 0) {

  profitStatusOutput.textContent = "赤字";
  profitStatusOutput.style.color = "red";

} else if (profit > 0) {

  profitStatusOutput.textContent = "黒字";
  profitStatusOutput.style.color = "green";

} else {

  profitStatusOutput.textContent = "損益なし";
  profitStatusOutput.style.color = "black";

}
  profitRateOutput.textContent = profitRate.toFixed(1);
  if (profitRate < 0) {
  profitRateOutput.style.color = "red";
} else if (profitRate > 0) {
  profitRateOutput.style.color = "green";
} else {
  profitRateOutput.style.color = "black";
}
  if (taxRate === 0) {
  taxOutput.textContent = "計算なし";
  salesWithTaxLabel.textContent = "売上";
  salesWithTaxOutput.textContent = sales.toLocaleString();
} else {
  salesWithTaxLabel.textContent = "税込売上";
  taxOutput.textContent = tax.toLocaleString() + " 円";
  salesWithTaxOutput.textContent = salesWithTax.toLocaleString();
}
}

priceInput.addEventListener("input", calculate);
costInput.addEventListener("input", calculate);
quantityInput.addEventListener("input", calculate);
taxRateInput.addEventListener("change", calculate);
clearButton.addEventListener("click", function() {

  priceInput.value = "";

  costInput.value = "";

  quantityInput.value = "";

  localStorage.removeItem("price");
  localStorage.removeItem("cost");
  localStorage.removeItem("quantity");
  localStorage.removeItem("taxRate");

  taxRateInput.value = "0.10";

  calculate();

  profitOutput.style.color = "black";

});

copyButton.addEventListener("click", function() {

  const resultText =
    "売上：" + salesOutput.textContent + " 円\n" +
    "原価：" + totalCostOutput.textContent + " 円\n" +
    "利益：" + profitOutput.textContent + " 円\n" +
    "判定：" + profitStatusOutput.textContent + "\n" +
    "利益率：" + profitRateOutput.textContent + " %\n" +
    "消費税：" + taxOutput.textContent + "\n" +
    salesWithTaxLabel.textContent + "：" + salesWithTaxOutput.textContent + " 円";

  navigator.clipboard.writeText(resultText).then(function() {

    copyMessage.textContent = "✓ コピーしました！";

    setTimeout(function() {
      copyMessage.textContent = "";
    }, 1500);

  });

});

priceInput.value = localStorage.getItem("price") || "";
costInput.value = localStorage.getItem("cost") || "";
quantityInput.value = localStorage.getItem("quantity") || "";
taxRateInput.value = localStorage.getItem("taxRate") || "0.10";
calculate();

saveButton.addEventListener("click", function() {

  const savedResult = {
    price: priceInput.value,
    cost: costInput.value,
    quantity: quantityInput.value,
    taxRate: taxRateInput.value
  };

  localStorage.setItem("savedResult", JSON.stringify(savedResult));

  message.textContent = "✓ 計算内容を保存しました！";

});


loadButton.addEventListener("click", function() {
  const savedData = localStorage.getItem("savedResult");

  if (!savedData) {
    message.textContent = "保存された計算はありません。";
    return;
  }

  const savedResult = JSON.parse(savedData);

  priceInput.value = savedResult.price;
  costInput.value = savedResult.cost;
  quantityInput.value = savedResult.quantity;
  taxRateInput.value = savedResult.taxRate;

  calculate();

  message.textContent = "✓ 保存した計算を読み込みました！";
});