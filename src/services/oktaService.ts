import fetch from "node-fetch";

// here only for testing
import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

const oktaDomain = "demo-crimson-coral-79700-admin.okta.com";
const oktaToken = process.env.OKTA_TOKEN;

// list users from okta
export const fetchOktaUsers = async () => {
  const query = new URLSearchParams({
    limit: "3",
  });
  const response = await fetch(`https://${oktaDomain}/api/v1/users?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `SSWS ${oktaToken}`,
    },
  });
  return await response.json();
};

//only for testing
(async () => {
  const users = await fetchOktaUsers();
  console.log(
    "fetched users fron okta ⬇️. If you want to fetch all the users, please remove the ${query} from the fetch URL"
  );
  console.log(users);
})();

const onboardTestUser = {
  firstName: "bob",
  lastName: "alex",
  email: "test@yashshrestha.net",
};

// Create user in okta
export const onboardToOkta = async (
  email: string,
  firstName: string,
  lastName: string
) => {
  const query = new URLSearchParams({
    activate: "true",
    provider: "false",
    nextLogin: "changePassword",
  });
  await fetch(`https://${oktaDomain}/api/v1/users${query}`, {
    method: "POST",
    headers: {
      "Content-Type": "applcation/json",
      Authorization: `SSWS ${oktaToken}`,
    },
    body: JSON.stringify({
      profile: {
        firstName,
        lastName,
        email,
        login: email,
      },
    }),
  });
  console.log(`Onboaded ${firstName} ${lastName} to Okta`);
};

// Delete user from Okta
export const removeFromOkta = async (userId: string) => {
  await fetch(`https://${oktaDomain}/api/v1/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `SSWS ${oktaToken}`,
      "Content-Type": "application/json",
    },
  });
  console.log(`Remove user ${userId} from OKTA`);
};
