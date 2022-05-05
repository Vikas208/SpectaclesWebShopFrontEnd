import React, { useState, useEffect } from "react";
import "../../../Css/Search.css";
import { useDataLayerValue } from "../../../DataLayer";
import { useNavigate, useParams } from "react-router-dom";
function Sidebar() {
  const [{ categories, frameStyles, companyNames }] = useDataLayerValue();
  const navigation = useNavigate();
  const { product } = useParams();
  const { _group } = useParams();
  const { _category } = useParams();
  const [price, setPrice] = useState({ start: 0, end: 0 });
  const [_categories, setCategories] = useState([]);
  const [_frameStyle, setFrameStyle] = useState([]);
  const [_companyname, setCompanyname] = useState([]);
  useEffect(() => {
    let data = [];
    categories &&
      typeof categories === "object" &&
      categories?.forEach((element, index) => {
        data.push(element?.data);
      });
    setCategories(data);
    data = [];
    frameStyles &&
      typeof frameStyles === "object" &&
      frameStyles?.forEach((element, index) => {
        data.push(element?.data);
      });
    setFrameStyle(data);
    data = [];
    companyNames &&
      typeof companyNames === "object" &&
      companyNames?.forEach((element, index) => {
        data.push(element?.data);
      });
    setCompanyname(data);

    return () => {
      setCategories([]);
      setFrameStyle([]);
      setCompanyname([]);
    };
  }, [categories, frameStyles, companyNames]);

  const handelSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let arr = [];
    for (let [key, value] of formData) {
      // //console.log(key + " : " + value);
      arr.push(key);
    }

    let category = "^",
      frameStyle = "^",
      companyName = "^",
      group = "^",
      frameSize = "^";

    //console.log(arr);
    //console.log(_categories);
    //console.log(_frameStyle);
    //console.log(_companyname);

    arr.forEach((element, index) => {
      //console.log(_categories.includes(element));
      if (_categories.includes(element)) {
        if (category === "^") {
          category = element;
        } else category += "|" + element;
      }
      if (_frameStyle.includes(element)) {
        if (frameStyle === "^") {
          frameStyle = element;
        } else frameStyle += "|" + element;
      }
      if (_companyname.includes(element)) {
        if (companyName === "^") {
          companyName = element;
        } else companyName += "|" + element;
      }
      if (["male", "female", "kids"].includes(element)) {
        if (group === "^") {
          group = element;
        } else group += "|" + element;
      }
      if (["Large", "Medium", "Small"].includes(element)) {
        if (frameSize === "^") {
          frameSize = element;
        } else frameSize += "|" + element;
      }
    });

    //console.log(
    //  category +
    //    "\n" +
    //   frameStyle +
    //  "\n" +
    //  companyName +
    //  "\n" +
    //  group +
    //  "\n" +
    //  frameSize
    // );
    navigation(
      `/filterproducts/${product}/${category}/${frameStyle}/${companyName}/${group}/${frameSize}/${price.start}/${price.end}`
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
