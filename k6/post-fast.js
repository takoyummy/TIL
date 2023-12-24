const http = require("k6/http");
import { sleep, check } from "k6";

export let options = {
  stages: [{ duration: "1m", target: 10 }],
};

const BASE_URL = "http://localhost:8080/api/v1/inventory";
const PRODUCT_UUID = "485a13bd-a273-11ee-8d40-0242ac120003"; // Replace with actual UUID

export default function () {
  // Redisson-based API request
  let redissonResponse = http.get(`${BASE_URL}/${PRODUCT_UUID}`);
  check(redissonResponse, {
    "status was 200 (redisson)": (r) => r.status === 200,
  });

  sleep(1);
}
