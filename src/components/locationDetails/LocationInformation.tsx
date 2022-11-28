// import { t } from "i18next";
import * as React from "react";
import Hours from "../commons/hours";
import CustomMap from "./CustomMap";
// import map from "../images/map.jpg";
// import favorite from "../images/favorite.svg";
// import justeats from "../images/justeats.svg";
// import uber_eats from "../images/uber-eats.svg";
// import deliveroo from "../images/deliveroo.svg";
// import GetDirection from "../commons/GetDirection";
import Service from "./service";
import { Link, useAnalytics } from "@yext/pages/components";
import OpenClose from "../commons/openClose";
type props = {
  additionalHoursText: any;
  c_heading: any;
  prop: any;
  coords: any;
  address: any;
  phone: any;
  deliveryHours: any;
  service: any;
  name: any;
  c_ctabutton: any;
  timezone: any;

  // aboutdata:any;

};
var LOCATION: any = null;
var url: any = "";
var currentLatitude: any = 0.0;
var currentLongitude: any = 0.0;
const LocationInformation = (data: props) => {
  const [time, setTime] = React.useState({});
  const [delHours, setDelHours] = React.useState({});
  const [timezone, setTimeZone] = React.useState("");
  const [coordinates, setCoordinate] = React.useState({});
  const [closingTime, setClosingTime] = React.useState("");
  const [address_str, serAddress_str] = React.useState("");
  const [currentLocationLatLng, setCurrentLocationLatLng] =
    React.useState(null);

  // React.useEffect(() => {
  //   setTime(data.prop);
  //   setCoordinate(data.coords);
  //   setDelHours(data.deliveryHours);
  //   let key: any = Object.values(data.prop)[0];
  //   setClosingTime(key.openIntervals[0].end);

  //   // getCurrentLocationLatLng();
  // }, [setCurrentLocationLatLng]);
  // // const getCurrentLocationLatLng = () => {
  // //   navigator?.geolocation.getCurrentPosition(
  // //     ({ coords: { latitude: lat, longitude: lng } }) => {
  // //       const pos: any = { lat, lng };

  // //       setCurrentLocationLatLng(pos);
  // //       LOCATION = pos;
  // //     }
  // //   );
  // // };


  React.useEffect(() => {
    getString();
    setTime(data.prop);
    setCoordinate(data.coords);
    setDelHours(data.deliveryHours);
    let key: any = Object.values(data.prop)[0];
    if (typeof key.openIntervals != "undefined") {
      setClosingTime(key.openIntervals[0].end);
    }

    setTimeZone(data.timezone);
  })
  function getString() {
    let address_string = "";
    address_string =
      data.address.line1 +
      "," +
      data.address.line2 +
      "," +
      data.address.city +
      "," +
      data.address.region +
      "," +
      data.address.postalCode +
      "," +
      regionNames.of(data.address.countryCode);

    address_string = address_string.replace("undefined,", "");
    serAddress_str(address_string);
  }
  function getDirectionUrl() {
    var origin: any = null;
    if (data.address.city) {
      origin = data.address.city;
    } else if (data.address.region) {
      origin = data.address.region;
    } else {
      origin = data.address.country;
    }
    if (navigator.geolocation) {
      const error = (error: any) => {
        var getDirectionUrl =
          "https://www.google.com/maps/dir/?api=1&destination=" +
          data.coords.latitude +
          "," +
          data.coords.longitude +
          "&origin=" +
          origin
        window.open(getDirectionUrl, "_blank");
      };
      navigator.geolocation.getCurrentPosition(
        function (position) {
          currentLatitude = position.coords.latitude;
          currentLongitude = position.coords.longitude;

          var direction_url =
            "https://www.google.com/maps/dir/?api=1&destination=" +
            data.coords.latitude +
            "," +
            data.coords.longitude +
            "&origin=" +
            currentLatitude +
            "," +
            currentLongitude;
          window.open(direction_url, "_blank");
        },
        error,
        {
          timeout: 10000,
        }
      );
    }
    {console.log("fired conversion")}
  }
  const conversionDetails = {
    cid: "e1cd62c2-74f9-4d8a-ade1-b8e9001c4df4",
    cv: "1",
   
  };

  const conversionDetails_phone = {
    cid: "17620319-c59b-4719-9732-eaaf0ff35a3a",
    cv: "2",
  };
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return (
    <>
      <div className="location-information">
        <div className="container mx-auto">
          <div className="w-full text-center pb-4 lg:pb-5">
            {/* <h2 className="store-time-status">
              <strong>OPEN NOW</strong> - CLOSES AT
              <span style={{ marginLeft: "2px" }}>{closingTime}</span>
            </h2> */}
          </div>

          <div className="boxes">
            {/* {time ? (
                <>
                  <OpenClose
                    hours={time ? time : {}}
                    deliveryHours={delHours ? delHours : {}}
                    timezone={timezone ? timezone : {}}
                  />
                </>
              ) : (
                <></>
              )} */}
            <div className="location_details">
              <div className="box store-info">
                <div className="inner-box">
                  {/* <h4 className="font-semibold">{data.c_heading.storeInfo}</h4> */}
                  <div className="store-address">
                    <div className="icon-dtl">

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21.23"
                        height="30"
                        viewBox="0 0 21.23 30"
                      >
                        <g transform="translate(0 0)">
                          <path
                            d="M6.789,23.576c1.079,1.719,2.246,3.8,3.4,5.825.427.747.813.859,1.326-.027,1.113-1.931,2.207-3.931,3.359-5.8,3.5-5.661,9.223-11.181,4.67-18.8C15.5-1.987,4.5-1.265,1.216,5.034c-3.769,7.219,2.117,13.039,5.574,18.542Z"
                            fill="#cbb081"
                          // fill-rule="evenodd"
                          />
                          <path
                            d="M10.61,6.247a4.116,4.116,0,1,1-4.116,4.116A4.117,4.117,0,0,1,10.61,6.247Z"
                            fill="#fff"
                          // fill-rule="evenodd"
                          />
                        </g>
                      </svg>
                    </div>
                    <div className=" address-sec ">
                      <h2 className="heading">{data.name}</h2>
                      <p>
                        {data.address && data.address.line1}
                        <br /> {data.address && data.address.city},{" "}
                        {data.address && data.address.postalCode}
                        <br />
                        {regionNames.of(data.address.countryCode)}
                      </p>
                    </div>
                  </div>
                  {data.phone ? (
                    <>
                      <div className="store-phone">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="23.987"
                          height="23.987"
                          viewBox="0 0 23.987 23.987"
                        >
                          <path
                            d="M19.64,17.328c-.617,1.876-3.036,2.812-4.764,2.656A15.194,15.194,0,0,1,8,17.14,22.652,22.652,0,0,1,.885,8.652C-.22,6.3-.468,3.411,1.176,1.268A2.827,2.827,0,0,1,3.429,0C4.8-.063,4.992.721,5.463,1.943c.351.913.819,1.845,1.08,2.792C7.032,6.5,5.321,6.575,5.105,8.019c-.133.911.969,2.132,1.468,2.781A13.473,13.473,0,0,0,10.051,14c.76.479,1.984,1.341,2.853.865,1.339-.733,1.213-2.991,3.084-2.227a30.12,30.12,0,0,1,2.833,1.463c1.431.769,1.364,1.567.819,3.223h0"
                            transform="translate(4.5) rotate(13)"
                            fill="#cbb081"
                            fill-rule="#cbb081"
                          />
                        </svg>
                        <p>
                          <Link
                            data-ya-track="phone"
                            href={"tel:" + data.phone}
                            rel="noopener noreferrer"
                            eventName={`cta Click:phone"`}
                            conversionDetails={conversionDetails_phone}
                          >
                            {data.phone ? data.phone : ""}
                          </Link>
                        </p>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="store-link">
                    {/* {data.c_heading.getDirection ? */}
                      <Link
                        className="direction"
                        onClick={getDirectionUrl}
                        href="javascript:void(0);"
                        rel="noopener noreferrer"
                        conversionDetails={conversionDetails}
                      >
                        {" "}
                        {/* {data.c_heading.getDirection} */}Get direction
                      </Link>
                      {/* : "get direction"} */}
                  </div>

                </div>
              </div>

              <div className="box store-timing">
                <div className="inner-box">

                  <div className="hours mb-5">
                    <div className="time-row">
                      <div className="day"></div>

                    </div>

                    {/* {time?<>
                      <Hours hours={time} />
                    </>:<></>

                    } */}

                    {time || delHours ? (
                      <>
                        {/* <h2 className="font-bold">{data.c_heading.storeHours}</h2> */}
                        <Hours
                          hours={time ? time : {}}
                          deliveryHours={delHours ? delHours : {}}
                          timezone={timezone ? timezone : {}}
                          additionalHoursText={data.additionalHoursText}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  {data.c_ctabutton ? (
                    <>
                      {data.c_ctabutton.label && data.c_ctabutton.link ? (
                        <>

                          <a href={
                            data.c_ctabutton.linkType == "URL" ? `${data.c_ctabutton.link}` : data.c_ctabutton.link} className="border-2 text-white bg-[#cbb081] border-[#cbb081] p-2"
                            target={data.c_ctabutton.linkType == "URL" ? "_self" : data.c_ctabutton.link == "#" ? "_self" : "_blank"}>
                            {data.c_ctabutton ? data.c_ctabutton.label : ""}
                          </a>
                        </>
                      ) : (
                        <></>

                      )}
                    </>
                  ) : (
                    <></>
                  )}


                  {/* {data.c_ctabutton ? (
            <>
              {data.c_ctabutton.label && data.c_ctabutton.link ? (
                <div className="cta_btn">
                  <Link
                    rel="noopener noreferrer"
                    // conversionDetails={conversionDetails_primaryCTA}
                    href={
                      data.c_ctabutton.linkType == "PHONE"
                        ? `tel:${data.c_ctabutton.link}`
                        : data.c_ctabutton.link
                    }
                    className="button"
                    target={
                      data.c_ctabutton.linkType == "PHONE"
                        ? "_self"
                        : data.c_ctabutton.link == "#"
                        ? "_self"
                        : "_blank"
                    }
                  >
                    {data.c_ctabutton ? data.c_ctabutton.label : ""}
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}  */}


                  {/* <a href="#" className="border-2 bg-[#cbb081] p-2  text-white">{data.c_ctabutton.label}</a> */}
                </div>
              </div>
              <div className="box store-social">
                {/* <div className="inner-box"> */}
                {/* <h4>Stay Connected With US :</h4> */}
                {/* <ul className="social-links">
                    <li>
                      <a href="#" target="_blank">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M17.857,2.25H2.143A2.143,2.143,0,0,0,0,4.393V20.107A2.143,2.143,0,0,0,2.143,22.25H8.27v-6.8H5.458v-3.2H8.27V9.811C8.27,7.036,9.922,5.5,12.452,5.5a17.039,17.039,0,0,1,2.479.216V8.443h-1.4a1.6,1.6,0,0,0-1.8,1.729V12.25H14.8l-.491,3.2H11.73v6.8h6.127A2.143,2.143,0,0,0,20,20.107V4.393A2.143,2.143,0,0,0,17.857,2.25Z"
                            transform="translate(0 -2.25)"
                            fill="#fff"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <svg
                          //   xmlns="http://www.w3.org/2000/svg"
                          //   xmlns:xlink="http://www.w3.org/1999/xlink"
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                        >
                          <path
                            d="M22.962,10.98H20.7a7.986,7.986,0,1,1-15.448,0H2.994V21.962a1,1,0,0,0,1,1H21.962a1,1,0,0,0,1-1Zm0-6.988a1,1,0,0,0-1-1H18.968a1,1,0,0,0-1,1v3a1,1,0,0,0,1,1h2.994a1,1,0,0,0,1-1ZM12.978,7.986a4.992,4.992,0,1,0,4.992,4.991,4.991,4.991,0,0,0-4.992-4.991m9.984,17.97H2.994a3,3,0,0,1-2.994-3V2.994A2.994,2.994,0,0,1,2.994,0H22.962a2.994,2.994,0,0,1,2.994,2.994V22.959a3,3,0,0,1-2.994,3"
                            fill="#fff"
                            // fill-rule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="19.507"
                          viewBox="0 0 24 19.507"
                        >
                          <path
                            d="M23.953,4.57a10,10,0,0,1-2.825.775,4.958,4.958,0,0,0,2.163-2.723,10.163,10.163,0,0,1-3.127,1.184A4.92,4.92,0,0,0,11.78,8.288,13.938,13.938,0,0,1,1.64,3.162,4.822,4.822,0,0,0,.974,5.637a4.921,4.921,0,0,0,2.188,4.1A4.9,4.9,0,0,1,.934,9.117v.06A4.923,4.923,0,0,0,4.88,14a5,5,0,0,1-2.212.085,4.936,4.936,0,0,0,4.6,3.417,9.867,9.867,0,0,1-6.1,2.1A10.444,10.444,0,0,1,0,19.544a14,14,0,0,0,7.557,2.209,13.9,13.9,0,0,0,14-13.985c0-.21,0-.42-.015-.63A9.935,9.935,0,0,0,24,4.59Z"
                            transform="translate(0 -2.246)"
                            fill="#fff"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17.375"
                          height="20"
                          viewBox="0 0 17.375 20"
                        >
                          <path
                            d="M11.494.017C12.586,0,13.669.008,14.753,0a5.191,5.191,0,0,0,1.458,3.475,5.877,5.877,0,0,0,3.533,1.492V8.325a8.92,8.92,0,0,1-3.5-.808,10.3,10.3,0,0,1-1.35-.775c-.008,2.433.008,4.867-.017,7.292a6.365,6.365,0,0,1-1.125,3.283,6.208,6.208,0,0,1-4.925,2.675,6.076,6.076,0,0,1-3.4-.858,6.284,6.284,0,0,1-3.042-4.758c-.017-.417-.025-.833-.008-1.242A6.273,6.273,0,0,1,9.653,7.567c.017,1.233-.033,2.467-.033,3.7a2.859,2.859,0,0,0-3.65,1.767,3.306,3.306,0,0,0-.117,1.342,2.836,2.836,0,0,0,2.917,2.392,2.8,2.8,0,0,0,2.308-1.342,1.923,1.923,0,0,0,.342-.883c.083-1.492.05-2.975.058-4.467.008-3.358-.008-6.708.017-10.058Z"
                            transform="translate(-2.369)"
                            fill="#fff"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                
                </div> */}
              </div>
            </div>

            <div className="box map-info">
              <div className="inner-box">
                <CustomMap prop={coordinates} />
                {/* <img src={map} alt="map" /> */}
                {/* {{>mapdetail}} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LocationInformation;
