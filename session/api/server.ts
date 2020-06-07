import {auth} from "~/firebase/admin";

export default {
  verify: (token: string) => auth.verifyIdToken(token),
};
