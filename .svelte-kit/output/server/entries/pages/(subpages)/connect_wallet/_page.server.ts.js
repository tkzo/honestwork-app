const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    data.get("email");
    data.get("name");
  }
};
export {
  actions
};
