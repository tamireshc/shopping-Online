export async function getCategories() {
  const fetchApi = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const jsonApi = await fetchApi.json();
  return jsonApi;
}

export async function getProductsFromCategoryAndQuery(id, query) {
  const fetchApiCategoryAndQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}_ID&q=${query}`);
  const jsonApiCategoryAndQuery = await fetchApiCategoryAndQuery.json();
  return jsonApiCategoryAndQuery;
}

export async function getProductsFromCategory(id) {
  const fetchApiCategory = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}`);
  const jsonApiCategory = await fetchApiCategory.json();
  return jsonApiCategory;
}

export async function getProductsFromQuery(query) {
  const fetchApiQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const jsonApiQuery = await fetchApiQuery.json();
  return jsonApiQuery;
}

export async function getProductsDetails(id) {
  const fetchApiDetais = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const jsonApiDetais = await fetchApiDetais.json();
  return jsonApiDetais;
}
