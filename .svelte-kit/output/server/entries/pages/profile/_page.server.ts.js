import { r as redirect } from "../../../chunks/index.js";
import { d as private_env } from "../../../chunks/shared.js";
const apiUrl = parseInt(private_env.PRODUCTION_ENV) == 1 ? private_env.PRIVATE_HONESTWORK_API : private_env.PRIVATE_LOCAL_HONESTWORK_API;
const load = async ({ cookies }) => {
  const userAddress = cookies.get("honestwork_address");
  const userSignature = cookies.get("honestwork_signature");
  if (userAddress && userSignature) {
    const callUrl = `${apiUrl}/verify/${userAddress}/${userSignature}`;
    let callResponse = await fetch(callUrl, {
      headers: new Headers({
        Authorization: "Basic " + btoa(`${private_env.PRIVATE_CLIENT_KEY}:${private_env.PRIVATE_CLIENT_PASSWORD}`),
        "Content-Type": "application/json"
      })
    });
    let calldata = await callResponse.json();
    if (calldata == "success") {
      let user = await getUser(userAddress);
      let skills = await getSkills(userAddress);
      let jobs = await getJobs(userAddress);
      user.address = userAddress;
      return { user, skills, jobs };
    } else {
      throw redirect(301, "/auth");
    }
  }
};
const getUser = async (address) => {
  const url = `${apiUrl}/users/${address}`;
  let response = await fetch(url, {
    headers: new Headers({
      Authorization: "Basic " + btoa(`${private_env.PRIVATE_CLIENT_KEY}:${private_env.PRIVATE_CLIENT_PASSWORD}`),
      "Content-Type": "application/json"
    })
  });
  if (response.ok) {
    let json = await response.json();
    return json;
  } else {
    console.log("HTTP-Error: " + response.status);
    return response.status;
  }
};
const getSkills = async (address) => {
  const url = `${apiUrl}/skills/${address}`;
  let response = await fetch(url, {
    headers: new Headers({
      Authorization: "Basic " + btoa(`${private_env.PRIVATE_CLIENT_KEY}:${private_env.PRIVATE_CLIENT_PASSWORD}`),
      "Content-Type": "application/json"
    })
  });
  if (response.ok) {
    let json = await response.json();
    return { json };
  } else {
    console.log("HTTP-Error: " + response.status);
    return response.status;
  }
};
const getJobs = async (address) => {
  const url = `${apiUrl}/jobs/${address}`;
  let response = await fetch(url, {
    headers: new Headers({
      Authorization: "Basic " + btoa(`${private_env.PRIVATE_CLIENT_KEY}:${private_env.PRIVATE_CLIENT_PASSWORD}`),
      "Content-Type": "application/json"
    })
  });
  if (response.ok) {
    let json = await response.json();
    return { json };
  } else {
    console.log("HTTP-Error: " + response.status);
    return response.status;
  }
};
const actions = {
  skills: async ({ cookies, request }) => {
    const userAddress = cookies.get("honestwork_address");
    const userSignature = cookies.get("honestwork_signature");
    const data = await request.formData();
    let cloud_url_0 = "";
    let cloud_url_1 = "";
    let cloud_url_2 = "";
    let cloud_url_3 = "";
    let cloud_url_4 = "";
    let cloud_url_5 = "";
    let cloud_url_6 = "";
    let cloud_url_7 = "";
    if (data.get("file_url_0") != "") {
      cloud_url_0 = `${private_env.PRIVATE_IMAGEKIT_URL}/${userAddress}/skill/${data.get(
        "skill_slot"
      )}/${data.get("image_slot_0")}/${data.get("file_url_0")}`;
    }
    if (data.get("file_url_1") != "") {
      cloud_url_1 = `${private_env.PRIVATE_IMAGEKIT_URL}/${userAddress}/skill/${data.get(
        "skill_slot"
      )}/${data.get("image_slot_1")}/${data.get("file_url_1")}`;
    }
    if (data.get("file_url_2") != "") {
      cloud_url_2 = `${private_env.PRIVATE_IMAGEKIT_URL}/${userAddress}/skill/${data.get(
        "skill_slot"
      )}/${data.get("image_slot_2")}/${data.get("file_url_2")}`;
    }
    if (data.get("file_url_3") != "") {
      cloud_url_3 = `${private_env.PRIVATE_IMAGEKIT_URL}/${userAddress}/skill/${data.get(
        "skill_slot"
      )}/${data.get("image_slot_3")}/${data.get("file_url_3")}`;
    }
    if (data.get("file_url_4") != "") {
      cloud_url_4 = `${private_env.PRIVATE_IMAGEKIT_URL}/${userAddress}/skill/${data.get(
        "skill_slot"
      )}/${data.get("image_slot_4")}/${data.get("file_url_4")}`;
    }
    if (data.get("file_url_5") != "") {
      cloud_url_5 = `${private_env.PRIVATE_IMAGEKIT_URL}/${userAddress}/skill/${data.get(
        "skill_slot"
      )}/${data.get("image_slot_5")}/${data.get("file_url_5")}`;
    }
    if (data.get("file_url_6") != "") {
      cloud_url_6 = `${private_env.PRIVATE_IMAGEKIT_URL}/${userAddress}/skill/${data.get(
        "skill_slot"
      )}/${data.get("image_slot_6")}/${data.get("file_url_6")}`;
    }
    if (data.get("file_url_7") != "") {
      cloud_url_7 = `${private_env.PRIVATE_IMAGEKIT_URL}/${userAddress}/skill/${data.get(
        "skill_slot"
      )}/${data.get("image_slot_7")}/${data.get("file_url_7")}`;
    }
    const body = {
      user_address: data.get("user_address"),
      title: data.get("title"),
      minimum_price: parseInt(data.get("minimum_price").toString()),
      links: [data.get("link-0"), data.get("link-1"), data.get("link-2")],
      image_urls: [
        cloud_url_0,
        cloud_url_1,
        cloud_url_2,
        cloud_url_3,
        cloud_url_4,
        cloud_url_5,
        cloud_url_6,
        cloud_url_7
      ],
      description: data.get("description"),
      publish: data.get("publish") == "on" ? true : false,
      created_at: Math.floor(new Date().getTime() / 1e3),
      tags: data.get("tags").toString().split(",")
    };
    if (data.get("skill_method") == "add") {
      const url = `${apiUrl}/skills/${userAddress}/${userSignature}`;
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({
          Authorization: "Basic " + btoa(`${private_env.PRIVATE_CLIENT_KEY}:${private_env.PRIVATE_CLIENT_PASSWORD}`),
          "Content-Type": "application/json"
        })
      });
    } else {
      const url = `${apiUrl}/skills/${userAddress}/${userSignature}/${data.get("skill_slot")}`;
      await fetch(url, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: new Headers({
          Authorization: "Basic " + btoa(`${private_env.PRIVATE_CLIENT_KEY}:${private_env.PRIVATE_CLIENT_PASSWORD}`),
          "Content-Type": "application/json"
        })
      });
    }
  }
};
export {
  actions,
  load
};
