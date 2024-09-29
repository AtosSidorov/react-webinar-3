import StoreModule from '../module';

class Product extends StoreModule {
  initState() {
    return {
      product: null,
      loading: false,
      error: null,
    };
  }

  async loadProduct(id) {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();
      this.setState({ product: json.result || json, loading: false });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  }

  clearProduct() {
    this.setState({ product: null, loading: false, error: null });
  }
}

export default Product;
