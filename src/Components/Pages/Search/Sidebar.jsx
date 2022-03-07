import React, { useState } from "react";
import "../../../Css/Search.css";
import { useDataLayerValue } from "../../../DataLayer";
import { useNavigate, useParams } from "react-router-dom";
function Sidebar() {
  const [{ categories, frameStyles, companyNames }] = useDataLayerValue();
  const navigation = useNavigate();
  const { product } = useParams();
  const { group } = useParams();
  const { category } = useParams();
  const [price, setPrice] = useState({ start: 0, end: 0 });
  const getFilterItems = (array) => {
    let item = "";
    //     console.log(array);
    for (let i = 0; i < array?.length; ++i) {
      let inputField = document.getElementsByName(array[i].data);
      item += inputField.item(0).checked == true ? array[i].data + "|" : "";
    }
    item = item.length !== 0 ? item.substring(0, item.length - 1) : "^";
    //     console.log(item);
    return item;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (group !== "^" && group !== undefined) {
      let arr = String(group).split("|");
      console.log(arr);
      for (let i = 0; i < arr.length; ++i) {
        document.getElementsByName(arr[i]).item(0).checked = true;
      }
    }

    if (category !== "^" && category !== undefined) {
      let arr = String(category).split("|");
      console.log(arr);
      for (let i = 0; i < arr.length; ++i) {
        document.getElementsByName(arr[i]).item(0).checked = true;
      }
    }
    let _category = getFilterItems(categories);

    let framestyle = getFilterItems(frameStyles);
    let companyname = getFilterItems(companyNames);
    let _group = getFilterItems([
      { data: "male" },
      { data: "female" },
      { data: "kids" },
    ]);
    let frameSize = getFilterItems([
      { data: "Large" },
      { data: "Medium" },
      { data: "Small" },
    ]);

    navigation(
      `/filterproducts/${product}/${_category}/${framestyle}/${companyname}/${_group}/${frameSize}/${price.start}/${price.end}`
    );
  };
  return (
    <div className="sidebar">
      <form onSubmit={handelSubmit}>
        <ul>
          <legend>Category</legend>
          {categories?.length !== 0 &&
            categories?.map((element, index) => {
              return (
                <section key={index}>
                  <span>{element?.data}</span>
                  <input type="checkbox" name={element?.data} />
                </section>
              );
            })}
        </ul>
        <ul>
          <legend>Frame Styles</legend>
          {frameStyles?.length !== 0 &&
            frameStyles?.map((element, index) => {
              return (
                <section key={index}>
                  <span>{element?.data}</span>
                  <input type="checkbox" name={element?.data} />
                </section>
              );
            })}
        </ul>

        <ul>
          <legend>Company Name</legend>
          {companyNames?.length !== 0 &&
            companyNames?.map((element, index) => {
              return (
                <section key={index}>
                  <span>{element?.data}</span>
                  <input type="checkbox" name={element?.data} />
                </section>
              );
            })}
        </ul>
        <ul>
          <legend>Group</legend>
          <section>
            <span>Male</span>
            <input type="checkbox" name="male" />
          </section>
          <section>
            <span>Female</span>
            <input type="checkbox" name="female" />
          </section>
          <section>
            <span>Kids</span>
            <input type="checkbox" name="kids" />
          </section>
        </ul>
        <ul>
          <legend>Frame Size</legend>
          <section>
            <span>Large</span>
            <input type="checkbox" name="Large" />
          </section>
          <section>
            <span>Medium</span>
            <input type="checkbox" name="Medium" />
          </section>
          <section>
            <span>Small</span>
            <input type="checkbox" name="Small" />
          </section>
        </ul>
        <ul>
          <legend>Price</legend>
          <section>
            <span>Default</span>
            <input
              type="radio"
              name="price"
              defaultChecked
              onClick={() => {
                setPrice({
                  start: 0,
                  end: 0,
                });
              }}
            />
          </section>
          <section>
            <span>₹0 - ₹500</span>
            <input
              type="radio"
              name="price"
              onClick={() => {
                setPrice({
                  start: 0,
                  end: 500,
                });
              }}
            />
          </section>
          <section>
            <span>₹500 - ₹1000</span>
            <input
              type="radio"
              name="price"
              onClick={() => {
                setPrice({
                  start: 500,
                  end: 1000,
                });
              }}
            />
          </section>
          <section>
            <span>₹1000 above</span>
            <input
              type="radio"
              name="price"
              onClick={() => {
                setPrice({
                  start: 1000,
                  end: 0,
                });
              }}
            />
          </section>
        </ul>
        <button type="submit" className="btn">
          Filter
        </button>
      </form>
    </div>
  );
}

export default Sidebar;
