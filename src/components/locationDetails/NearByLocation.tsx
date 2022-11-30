import * as React from "react";
import { useEffect, useState } from "react";
import "@splidejs/react-splide/css";
import { Address } from "@yext/pages/components";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "@yext/pages/components";
// const metersToMiles = (meters: number) => {
//   const miles = meters * 0.000621371;
//   return miles.toFixed(2);
// }

const metersToMiles = (kilometers: number) => {
  const miles = kilometers * 0.62137119;
  return miles.toFixed(2);
}

type props = {
  prop: any;
  parents: any;
  baseUrl: any;
  coords: any;
  slug: any;
  c_heading: any;

};
const NearByLocation = (entities: props) => {
  const [data, setData] = useState([]);
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  useEffect(() => {
    console.log(entities.prop.response.entities, 'entities.prop')
    // console.log(entities.prop.response.distances,'entities.distances')
    let distance: any = []
    let arr: any = []
    entities.prop.response.distances.map((i: any) => {
      distance.push(i.distanceKilometers)
    })
    entities.prop.response.entities.map((i: any, index: any) => {
      arr.push({
        slug: i.slug,
        address: i.address,
        hours: i.hours,
        geocodedCoordinate: i.geocodedCoordinate,
        mainPhone: i.mainPhone,
        name: i.name,
        yextDisplayCoordinate: i.yextDisplayCoordinate,
        distance: distance[index],
        meta: i.meta.id,
        c_heading: i.c_heading

      })
    })


    console.log(arr, 'arr')
    setData(arr);
  }, [setData]);
  const conversionDetails = {
    cid: "e1cd62c2-74f9-4d8a-ade1-b8e9001c4df4",
    cv: "1",
  };
  const conversionDetails_phone = {
    cid: "de598c07-b53c-407a-89f8-adc289ae9d62",
    cv: "2",
  };
  function getDirectionUrl(entitiy: any) {
    var origin: any = null;
    if (entitiy.address.city) {
      origin = entitiy.address.city;
    } else if (entitiy.address.region) {
      origin = entitiy.address.region;
    } else {
      origin = entitiy.address.country;
    }
    if (navigator.geolocation) {
      const error = (error: any) => {
        // var message_string =
        //   "Unable to determine your location. please share your location";
        // if (confirm(message_string) != true) {
        //   var getDirectionUrl =
        //     "https://www.google.com/maps/dir/?api=1&destination=" +
        //     entitiy.yextDisplayCoordinate.latitude +
        //     "," +
        //     entitiy.yextDisplayCoordinate.longitude +
        //     "&origin=" +
        //     origin;

        //   window.open(getDirectionUrl, "_blank");
        // } else {
        //   return false;
        // }
        var getDirectionUrl =
          "https://www.google.com/maps/dir/?api=1&destination=" +
          entitiy.yextDisplayCoordinate.latitude +
          "," +
          entitiy.yextDisplayCoordinate.longitude +
          "&origin=" + origin;

        window.open(getDirectionUrl, "_blank");
      };
      navigator.geolocation.getCurrentPosition(
        function (position) {
          let currentLatitude = position.coords.latitude;
          let currentLongitude = position.coords.longitude;
          let getDirectionUrl =
            "https://www.google.com/maps/dir/?api=1&destination=" +
            entitiy.yextDisplayCoordinate.latitude +
            "," +
            entitiy.yextDisplayCoordinate.longitude +
            "&origin=" +
            currentLatitude +
            "," +
            currentLongitude;
          window.open(getDirectionUrl, "_blank");
        },
        error,
        {
          timeout: 10000,
        }
      );
    }
  }


  return (
    <>
      <div className="nearby-sec">
        <div className="container">
          <div className="w-full text-center">
            <h3 className="text-3xl pl-76 font-bold">NEARBY LOCATION'S</h3>
          </div>
          <Splide
            id="splide-nearby"
            options={{
              rewind: false,

              type: "slide",

              perPage: 3,
              perMove: 1,
              arrows: false,
              drag: false,
              pagination: false,
              lazyLoad: "nearby",
              breakpoints: {
                1279: {
                  perPage: 1,
                  drag: true,
                  pagination: true,
                  arrows: true,
                  type: "splide",
                },
                575: {
                  arrows: false,
                },
              },
            }}
          >
            {data &&
              data.map((e: any, index: any) => {

                var url = "";
                var name: any = e.name.toLowerCase();
                var string: any = name.toString();
                let removeSpecialCharacters = string.replace(
                  /[&\/\\#^+()$~%.'":*?<>{}!@]/g,
                  "");
                let result: any = removeSpecialCharacters.replaceAll(" ", "-");
                if (!e.slug) {
                  url = `${e.meta}-${result}.html`;
                } else {
                  url = `${e.slug.toString()}.html`;
                }

                // return url;

                // console.log(url,"raah")


                var origin: any = null;
                if (e.address.city) {
                  origin = e.address.city;
                } else if (e.address.region) {
                  origin = e.address.region;
                } else {
                  origin = e.address.country;
                }

                if (entities.slug != e.slug && e.closed != true) {

                  let addressString = "";
                  let addressLines = e.address?.line1 + ", " + e.address?.line2;

                  if (addressLines.length > 42) {
                    addressString += e.address?.line1 + "<br/>";
                    let addressLine = e.address?.line2 + e.address?.city + ", ";
                    if (addressLine.length > 42) {
                      addressString += e.address?.line2 + ", " + e.address?.city + "<br />";
                      addressString += e.address?.postalCode + ", " + regionNames.of(e.address?.countryCode);
                    } else {
                      addressString += e.address?.line2 + ", " + e.address?.city + ", " + e.address?.postalCode + "<br />";
                      addressString += regionNames.of(e.address?.countryCode);
                    }

                  } else {
                    let line2 = "";
                    if (e.address?.line2 != undefined) {
                      line2 = ", " + e.address?.line2 + ", ";
                    }
                    addressString += e.address?.line1 + ", " + line2 + "<br />";
                    addressString += e.address?.city + ", " + e.address?.postalCode + "<br />";
                    addressString += regionNames.of(e.address?.countryCode);
                  }

                  return (
                    <SplideSlide key={index}>
                      <div className="near-location">
                      <div className="flex flex-row">
                        <h4>
                          <a href={`/${url}`}>{e.name}</a>
                        </h4>
                      

                          <h4 className="pl-48">
                            {metersToMiles(e.distance)} mi
                          </h4>
                        </div>
                        <div className="store-address">
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
                                fill-rule="evenodd"
                              />
                              <path
                                d="M10.61,6.247a4.116,4.116,0,1,1-4.116,4.116A4.117,4.117,0,0,1,10.61,6.247Z"
                                fill="#fff"
                                fill-rule="evenodd"
                              />
                            </g>
                          </svg>
                          {/* <Address address={e.address} separator={","} lines={[['line1', 'line2', 'city', 'region','postalCode','localizedCountryName']]} ></Address>                           */}
                          <p dangerouslySetInnerHTML={{ __html: addressString }} />
                          {/* <p>
                            {e.address?.line1},  <br />
                            {e.address?.line2}, {e.address?.city}, <br />
                            {e.address?.postalCode}, {regionNames.of(e.address?.countryCode)}
                          </p> */}
                        </div>
            
                        {e.mainPhone ?
                          <div className="phone flex flex-row ">
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
                                fill-rule="evenodd"
                              />
                            </svg>
                            <p>

                              <Link
                                data-ya-track="phone"
                                href={`tel:${e.mainPhone}`}
                                rel="noopener noreferrer"
                                conversionDetails={conversionDetails_phone}
                              >
                                {e.mainPhone}
                              </Link>

                            </p>
                          </div>
                          : ""}
                        <div className="store-link flex flex-row">   
                        {/* {e.c_heading.getDirection ? */}
                          <Link
                            data-ya-track="directions"
                            className="direction"
                            onClick={() => getDirectionUrl(e)}
                            href="javascript:void(0);"
                            rel="noopener noreferrer"
                            conversionDetails={conversionDetails}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M0,0H24V24H0Z" fill="#3a356d" />
                              <path
                                d="M22.43,10.59,13.42,1.58a2.051,2.051,0,0,0-2.83,0l-9,9a1.992,1.992,0,0,0,0,2.82l9,9a2,2,0,0,0,2.82,0l8.99-8.99A1.992,1.992,0,0,0,22.43,10.59ZM12.01,20.99l-9-9,9-9,9,9ZM8,11v4h2V12h4v2.5L17.5,11,14,7.5V10H9A1,1,0,0,0,8,11Z"
                                fill="#fff"
                              />
                            </svg>{" "}
                            {/* Get Directions */}
                         
                              <h3>
                                {/* {e.c_heading.getDirection}    */}Get direction
                               </h3>
                          
                          </Link>
                          {/* : "get Direction"} */}
                          {/* {e.c_heading.viewDetails? */}
                          <a className="view-details" href={`/${url}`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22.403"
                              height="14"
                              viewBox="0 0 22.403 14"
                            >
                              <g transform="translate(-15.975 -106)">
                                <path
                                  d="M27.176,120a10.337,10.337,0,0,1-4.387-1.05,16.655,16.655,0,0,1-3.481-2.249,21.287,21.287,0,0,1-3.183-3.253.742.742,0,0,1,0-.9,21.288,21.288,0,0,1,3.183-3.253,16.655,16.655,0,0,1,3.481-2.249A10.337,10.337,0,0,1,27.176,106a10.337,10.337,0,0,1,4.387,1.05,16.655,16.655,0,0,1,3.481,2.249,21.023,21.023,0,0,1,3.183,3.253.742.742,0,0,1,0,.9,21.287,21.287,0,0,1-3.183,3.253,16.655,16.655,0,0,1-3.481,2.249A10.337,10.337,0,0,1,27.176,120Zm-9.492-7c1.171,1.386,5.04,5.507,9.492,5.507S35.5,114.386,36.669,113c-1.171-1.386-5.04-5.507-9.492-5.507S18.856,111.614,17.684,113Z"
                                  transform="translate(0 0)"
                                  fill="#fff"
                                />
                                <path
                                  d="M187.36,190.72a3.36,3.36,0,1,1,3.36-3.36A3.364,3.364,0,0,1,187.36,190.72Zm0-5.227a1.867,1.867,0,1,0,1.867,1.867A1.866,1.866,0,0,0,187.36,185.493Z"
                                  transform="translate(-160.184 -74.36)"
                                  fill="#fff"
                                />
                              </g>
                            </svg>{" "}
                            {/* View Details */}
{/*                           
                            {e.c_heading.viewDetails} */}
                            View details
                          </a>
                          {/* :"view details"} */}
                        </div>
                      </div>

                    </SplideSlide>
                  );
                }
              })}
          </Splide>
        </div>
      </div>
    </>
  );
};
export default NearByLocation;