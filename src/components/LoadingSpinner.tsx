import loading from "../../public/loading_Img.gif"

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center my-5 w-100">
      <img 
        src={loading} 
        alt="loading" 
        style={{ width: "60px", height: "60px" }}
      />
    </div>
  )
}

export default LoadingSpinner

//! update (if noting to show)
