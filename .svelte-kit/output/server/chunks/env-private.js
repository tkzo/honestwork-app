let env = {};
function set_private_env(environment) {
  env = environment;
}
export {
  env as e,
  set_private_env as s
};
