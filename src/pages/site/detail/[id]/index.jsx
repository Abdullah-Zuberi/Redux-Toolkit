import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { getSiteDetailRequest } from "../../../../../store/reducers/siteReducer";
import { useRouter } from "next/router";

export default function Sitepage() {
  const dispatch = useDispatch();
  const sites = useSelector((state) => state.site);
  const router = useRouter();

  console.log();

  const [siteDetail, setSiteDetail] = useState({});

  useEffect(() => {
    if (sites) {
      setSiteDetail(sites.siteDetail);
    }
  }, [sites]);

  const getSiteDetail = (siteId) => {
    try {
      dispatch(
        getSiteDetailRequest({
          companyId: 10,
          siteId: siteId,
        })
      )
        .then(unwrapResult)
        .catch((error) => {
          console.log("ERROR IN API", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      getSiteDetail(parseInt(router.query.id));
    }
  }, [router.query]);

  console.log("CC", siteDetail);
  return (
    <div>
      <h1>Site Detail</h1>
      {siteDetail && (
        <>
          <p>ID: {siteDetail.id}</p>
          <p>Name: {siteDetail.name}</p>
          <p>Location: {siteDetail.location}</p>
          <p>Address: {siteDetail.address}</p>
          <p>No. of Employees: {siteDetail.employees}</p>
        </>
      )}
    </div>
  );
}
