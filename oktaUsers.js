import fetch from "node-fetch";

async function run() {
  const query = new URLSearchParams({ expand: "blocks" }).toString();

  const id = "YOUR_id_PARAMETER";
  const yourOktaDomain = "https://demo-crimson-coral-79700-admin.okta.com";
  const resp = await fetch(
    `https://${yourOktaDomain}/api/v1/users/${id}?${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "string",
        Authorization: "YOUR_API_KEY_HERE",
      },
    }
  );

  const data = await resp.text();
  console.log(data);
}

run();
