import CartList from "./CartList";

export default function CartSection({cartData=[], onDelete, title, total, children}){
    return <section className="mt-5 container ">
    {/* Page Content Goes Here */}
    <h1 className="mb-6 display-5 fw-bold text-center">{title}</h1>
    <div className="row g-4 g-md-8">
      {/* Cart Items */}
      <div className="col-12 col-lg-6 col-xl-7">
        <CartList cartData={cartData} onDelete={onDelete} />
      </div>
      {/* /Cart Items */}
      <div className="col-12 col-lg-6 col-xl-5">
        <div className="bg-orange p-4 p-md-5 text-white">
          <h3 className="fs-3 fw-bold m-0 text-center">Order Summary</h3>
          <div className="py-3 border-bottom-white-opacity">
            <div className="d-flex justify-content-between align-items-center flex-column flex-sm-row">
              <div>
                <p className="m-0 fs-5 fw-bold">Grand Total</p>
              </div>
              <p className="mt-3 m-sm-0 fs-5 fw-bold">RM{total}</p>
            </div>
          </div>
          {children}
        </div>
      </div>
      {/* Cart Summary */}
      {/* /Cart Summary */}
    </div>
    {/* /Page Content */}
  </section>

}