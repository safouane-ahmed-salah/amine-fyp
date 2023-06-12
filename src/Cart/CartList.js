import { Tag } from "antd";

export default function CartList({cartData = [], onDelete}){
    return <div className="table-responsive">
    <table className="table">
      <thead>
        <tr>
          <th className="d-none d-sm-table-cell" />
          <th className="ps-sm-3">Details</th>
          <th>Qty</th>
          <th />
        </tr>
      </thead>
      <tbody>
          {cartData.map((product, index)=> <tr>
          {/* image */}
          <td key={index} className="d-none d-sm-table-cell">
            <picture className="d-block bg-light p-3 f-w-20">
              <img className="img-fluid" src={product.image} alt="" />
            </picture>
          </td>
          {/* image */}
          {/* Details */}
          <td>
            <div className="ps-sm-3">
              <h6 className="mb-2 fw-bolder">
                {product.title}
              </h6>
              <small className="d-block text-muted">{product.category}/ <Tag color={product.color} style={{height: 20}} /> /{product.size}</small>
            </div>
          </td>
          {/* Details */}
          {/* Qty */}
          <td>
            <div className="px-3">
              <span className="small text-muted mt-1">{product.quantity} @ RM{product.price}</span>
            </div>
          </td>
          {/* /Qty */}
          {/* Actions */}
          <td className="f-h-0">
            <div className="d-flex justify-content-between flex-column align-items-end h-100">
              {onDelete && <i className="ri-close-circle-line ri-lg" onClick={() => onDelete(product.cartKey) } />}
              <p className="fw-bolder mt-3 m-sm-0">RM{product.quantity*product.price}</p>
            </div>
          </td>
          {/* /Actions */}
        </tr>)}
      </tbody>
    </table>
  </div>
}