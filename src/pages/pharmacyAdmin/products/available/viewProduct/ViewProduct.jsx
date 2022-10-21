import React, { useContext } from "react";
import AppContext from "../../../../../context/AppContext";
import { CircleSpinner } from "../../../../../components/circleSpinner/CircleSpinner.Styles";

// styles
import { Wrapper, Content } from "./ViewProduct.Styles";

const ViewProduct = () => {
  const { loading, setLoading, editInventoryProduct, setEditInventoryProduct } =
    useContext(AppContext);

  console.log(
    "🚀 ~ file: ViewProduct.jsx ~ line 10 ~ ViewProduct ~ editInventoryProduct",
    editInventoryProduct
  );

  // onclick "cancel"
  const quitEditHandler = () => {
    setEditInventoryProduct({
      product: "",
      action: "",
    });
  };

  return (
    <>
      <Wrapper>
        <h5>View Product</h5>
        <Content>
          {loading ? (
            <CircleSpinner />
          ) : (
            <>
              <form className="text-center">
                <div className="pair">
                  <label>Name:</label>
                  <h3>{editInventoryProduct.product.name}</h3>
                </div>
                <div className="pair">
                  <label>Brand:</label>
                  <h4>{editInventoryProduct.product.brand}</h4>
                </div>
                <div className="pair">
                  <label>Supplier:</label>
                  <h4>{editInventoryProduct.product.supplier}</h4>
                </div>
                <div className="pair">
                  <label>Quantity:</label>
                  <h4>{editInventoryProduct.product.quantity}</h4>
                </div>
                <div className="pair">
                  <label>Cost Price:</label>
                  <h4>{editInventoryProduct.product.costPrice}</h4>
                </div>
                <div className="pair">
                  <label>Sell Price:</label>
                  <h4>{editInventoryProduct.product.sellPrice}</h4>
                </div>

                <div className="pair">
                  <label>Measuring Unit</label>
                  <h4>{editInventoryProduct.product.measuringUnit}</h4>
                </div>
                <div className="pair">
                  <label>Expiry Date:</label>
                  <h4>
                    {editInventoryProduct.product.expiryDate.split("T")[0]}
                  </h4>
                </div>
                <button onClick={quitEditHandler}>Cancel</button>
              </form>
            </>
          )}
        </Content>
      </Wrapper>
    </>
  );
};

export default ViewProduct;
