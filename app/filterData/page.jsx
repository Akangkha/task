import Data from "@/data/tableData.json";
import Filters from "@/component/Filters";
const page = () => {
  return (
    <>
    <section className="p-4">
      <Filters />
    </section>
    <div className="container grid place-content-center">
      <h1>Product List</h1>
      <table className="product-table w-[60vw] p-4">
        <thead className="text-left  p-4">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Brand</th>
          </tr>
        </thead>
        <tbody>
          {Data.products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.brand}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default page;
