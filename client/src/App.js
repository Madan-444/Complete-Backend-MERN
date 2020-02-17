import React from "react";
import Layout from "./core/Layout";

function App() {
  return (
    <>
      <Layout>
        <div>
          <h2>Hello from App </h2>
          <p>haha k vako</p>
          <div
            id="carouselExampleControls"
            class="carousel slide"
            data-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="..." class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="..." class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="..." class="d-block w-100" alt="..." />
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;
