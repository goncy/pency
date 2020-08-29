import decrypt from "~/utils/decrypt";

const SERVICE_ACCOUNTS = {
  get production() {
    return decrypt(``);
  },
  get development() {
    return decrypt(``);
  },
  get test() {
    return decrypt(``);
  },
};

export default SERVICE_ACCOUNTS;
