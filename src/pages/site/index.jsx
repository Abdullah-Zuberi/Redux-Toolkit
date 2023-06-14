import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { getSiteListingRequest } from "../../../store/reducers/siteReducer";
import { useRouter } from "next/router";

export default function Sitepage(props) {
  const dispatch = useDispatch();
  const sites = useSelector((state) => state.site);

  const router = useRouter();

  const [siteListing, setSiteListing] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  useEffect(() => {
    if (sites) {
      setSiteListing(sites.siteListing);
    }
  }, [sites]);

  const getSiteListing = (page = 1, pageSize = 10) => {
    try {
      dispatch(
        getSiteListingRequest({
          search: "",
          status: "",
          page,
          size: pageSize,
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
    getSiteListing(pagination.current, pagination.pageSize);
  }, [pagination]);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleView = (siteId) => {
    // Perform the navigation to the next page with the given siteId
    console.log("Navigating to site detail page with siteId:", siteId);
    router.push(`/site/detail/${siteId}`);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Unique_Id",
      dataIndex: "unique_id",
      key: "unique_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Company_Name",
      dataIndex: "company_name",
      key: "company_name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <button onClick={() => handleView(record.id)}>View</button>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={siteListing}
        columns={columns}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
}
