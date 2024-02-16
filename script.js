const product_title = document.querySelector(".product-title");
const product_vendor = document.querySelector(".product-vendor");
const price = document.querySelector(".price");
const compared_price = document.querySelector(".compared-price");
const colors = document.querySelector(".colors");
const size = document.querySelector(".sizes");
const product_desc = document.querySelector(".product-desc");
const thumbnail_image = document.querySelector(".thumbnail-image");
const product_image = document.querySelector(".product-image");
let product_name = "";
let mess_color = "";
let mess_size = "";
let images = "";

fetch(
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448"
)
  .then((res) => res.json())
  .then((data) => {
    product_name = data.product.title;
    product_vendor.innerHTML = data.product.vendor;
    product_title.innerHTML = data.product.title;
    price.innerHTML = data.product.price;
    compared_price.innerHTML = data.product.compare_at_price;

    let cal_price = parseInt(data.product.price.substring(1));
    let cal_compared_price = parseInt(
      data.product.compare_at_price.substring(1)
    );
    let off_val = Math.floor(
      ((cal_compared_price - cal_price) / cal_compared_price) * 100
    );

    document.querySelector(".percentage-off").innerHTML = `${off_val}% off`;

    data.product.options[0]?.values.map((color, index) => {
      const enteries = Object.entries(color);
      mess_color = enteries[0][0];
      const color_child = document.createElement("div");
      color_child.style.backgroundColor = enteries[0][1];
      colors.innerHTML += `
        <label for=${"color-check" + index} id=${"" + index}>
            <input type="radio" class="color-toggel" name="color-check" id=${
              "color-check" + index
            } value=${enteries[0][0]} checked>
            <div class="color" id=${index.toString()} style="background: ${
        enteries[0][1]
      }">
                <i class="fa fa-check hidden" aria-hidden="true"></i>
            </div>
        </label>
        `;
    });

    var color_toggel = document.querySelectorAll(".color-toggel");
    for (let i = 0; i < color_toggel.length; i++) {
      color_toggel[i].onchange = (src) => {
        mess_color = src.srcElement.value;
        console.log(mess_color);
      };
    }

    data.product.options[1]?.values.map((sizes) => {
      size.innerHTML += `
        <div class="size " + ${sizes + "-check-div"}>
            <label for= ${"size-radio-" + sizes} class="size-lable">
                <input type="radio" class="radio-check" name="size" id=${
                  "size-radio-" + sizes
                }  value=${sizes} checked>
                <span class="size-name">${sizes}</span>
            </label>
        </div>
        `;
    });

    var size_toggel = document.querySelectorAll(".radio-check");
    for (let i = 0; i < size_toggel.length; i++) {
      size_toggel[i].onchange = (src) => {
        mess_size = src.srcElement.value;
        console.log(mess_size);
      };
    }

    let images_src = [
      {
        src: "https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/p/x/w/m-mn23-shirt-fs-2pckt-lblu-che-maniac-original-imagum7gcxjheugf.jpeg?q=70&crop=false",
      },
      {
        src: "https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/h/u/q/m-mn23-shirt-fs-2pckt-lblu-che-maniac-original-imagum7gqt53bx2m.jpeg?q=70&crop=false",
      },
      {
        src: "https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/h/m/p/m-mn23-shirt-fs-2pckt-lblu-che-maniac-original-imagum7gcjhqzkbv.jpeg?q=70&crop=false",
      },
      {
        src: "https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/u/a/i/m-mn23-shirt-fs-2pckt-lblu-che-maniac-original-imagum7gahxfvgm6.jpeg?q=70&crop=false",
      },
    ];

    images_src.map((img, index) => {
      images = img.src;
      thumbnail_image.innerHTML += `
        <label for= ${"img-radio-" + index} class="img-lable">
            <input type="radio" name="image" checked id=${
              "img-radio-" + index
            } class="radio-img" value=${img.src}>
            <div class="thumbnail-image2 ">
                <img src=${img.src} alt="thumb-img" class="thum-img">
            </div>
        </label>
        `;
    });

    var img_toggel = document.querySelectorAll(".radio-img");
    for (let i = 0; i < img_toggel.length; i++) {
      img_toggel[i].onchange = (src) => {
        images = src.srcElement.value;
        product_image.innerHTML = `
            <img src=${images} alt="product image" class="product-image2">
            `;
      };
    }

    product_desc.innerHTML = `<p>${data.product.description}</p>`;
    product_image.innerHTML = `<img src=${images} alt="product image" class="product-image2">`;
  })
  .catch((error) => {
    console.log(error);
  });

document.querySelector(".dec-btn").onclick = () => {
  decrement();
};

function decrement() {
  let value = parseInt(document.querySelector(".text-input").value);
  if (value > 0) {
    value--;
  }
  document.querySelector(".text-input").value = value;
}

document.querySelector(".inc-btn").onclick = () => {
  increment();
};

function increment() {
  let value = parseInt(document.querySelector(".text-input").value);
  value++;
  document.querySelector(".text-input").value = value;
}

document.querySelector(".add-to-cart-btn").onclick = () => {
  document.querySelector(".cart-add-message").innerHTML = `
    <p>${product_name} with color ${mess_color} and size ${mess_size} added to cart</p>
    `;
};
