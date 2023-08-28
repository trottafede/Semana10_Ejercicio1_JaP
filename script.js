let lista = [];
document.addEventListener("DOMContentLoaded", async () => {
  const url = "https://fakestoreapi.com/products";
  const response = await fetch(url);
  const products = await response.json();
  lista = products;
  document.getElementById("filterBtn").addEventListener("click", handleClick);
  showTable(lista);
});

//boton filtro
const handleClick = () => {
  const min = parseFloat(document.getElementById("minPrice").value) || 0;
  const max = parseFloat(document.getElementById("maxPrice").value) || Infinity;

  if (isNaN(min) && isNaN(max)) return showTable(lista);

   //filtro lista
  let result = lista.filter(
    (product) => product.price >= min && product.price <= max
  );

  //si no tengo nada
  if (result.length == 0) {
    result = [
      {
        id: 1,
        title: "Vacio",
        price: 0,
        description: "Vacio",
        category: "Vacio",
        image:
          "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000",
      },
    ];
  }
  // ya filtrado
  showTable(result);
};

//muestro data en table
function showTable(products) {
  let htmlContentToAppend = "";
  for (const product of products) {
    htmlContentToAppend += `
    <tr class="table-primary">
      <th scope="row">${product.id}</th>
      <td>${product.title}</td>
      <td>$${product.price}</td>
      <td>${product.description}</td>
      <td><img height="100px" width="100px" src="${product.image}" alt=""></td>
    </tr>`;
    document.getElementById("table_body").innerHTML = htmlContentToAppend;
  }
}
