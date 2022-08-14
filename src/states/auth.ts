import { IUser, IWorkspace } from "../typings/db";
import { atom } from "recoil";

const user = atom<IUser>({
  key: "user",
  default: {
    id: -1,
    email: "",
    nickname: "",
    Workspaces: [],
  },
});

export default user;
