import fetch from "node-fetch";

async function run() {
  const query = new URLSearchParams({
    q: "string",
    after: "string",
    limit: "200",
    filter: "string",
    search: "string",
    sortBy: "string",
    sortOrder: "string",
  }).toString();

  const yourOktaDomain = "demo-crimson-coral-79700-admin.okta.com";
  const resp = await fetch(`https://${yourOktaDomain}/api/v1/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "SSWS 005GyuZarI-EWebbm6uBvDNINyh-2LxGYHqS0eOv7P",
    },
  });

  //log the http status
  console.log(`HTTP status: ${resp.status}`);

  if (!resp.ok) {
    console.error(`Error : ${resp.status} ${resp.statusText}`);
    const errorData = await resp.text();
    console.error("Error details: ", errorData);
    return;
  }

  const data = await resp.text();
  console.log(data);
}

run();
