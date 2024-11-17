import fetch from "node-fetch";
import { OktaUser } from "types";

// here only for testing
import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

const oktaDomain = "demo-crimson-coral-79700-admin.okta.com";
const oktaToken = process.env.OKTA_TOKEN;

// list users from okta
export const fetchOktaUsers = async (): Promise<OktaUser[]> => {
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

  //Handle HTTP errors gracefully
  if (!response.ok) {
    throw new Error(`Failed to fetch okta users: ${response.statusText}`);
  }

  //parse and return the response
  const oktaUsers = (await response.json()) as OktaUser[];

  return oktaUsers;
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
  try {
    const query = new URLSearchParams({
      activate: "true",
      provider: "false",
      nextLogin: "changePassword",
    });
    const response = await fetch(`https://${oktaDomain}/api/v1/users${query}`, {
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

    if (!response.ok) {
      throw new Error(
        `Failed to onboard user ${email} to Okta : ${response.statusText}`
      );
    }
    console.log(`Onboaded ${firstName} ${lastName} to Okta`);
  } catch (error) {
    console.error(`Error onboarding user ${email} to Okta: ${error}`);
    throw error;
  }
};

// Delete user from Okta
export const removeFromOkta = async (userId: string) => {
  try {
    const response = await fetch(
      `https://${oktaDomain}/api/v1/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `SSWS ${oktaToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to remove user ${userId} from Okta : ${response.statusText}`
      );
    }

    console.log(`Remove user ${userId} from Okta`);
  } catch (error) {
    console.error(`Error removing user ${userId} from Okta : ${error}`);
    throw error;
  }
};
