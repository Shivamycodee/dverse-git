import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/prime";
import Table from "react-bootstrap/Table";

function DriveData() {


  const { getPostDate, contractData } = useGlobalContext();

  
  

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>No.</th>
            <th>File Name</th>
            <th>Upload Time</th>
            <th>CID</th>
          </tr>
        </thead>
        <tbody>
          {contractData
            ? contractData.map((elm, i) => {
              console.log("⚠️⚠️⚠️⚠️")
              console.log(elm)
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{elm.userName}</td>
              <td>{getPostDate(parseInt(elm.time*1000))}</td>
              <td>
                <a href={elm.cid} target="_blank" rel="noreferrer">
                  {elm.cid.slice(34,50)}...
                </a>
              </td>
            </tr>
          );
                }
              )
            : null}
        </tbody>
      </Table>
    </>
  );
}

export default DriveData;
