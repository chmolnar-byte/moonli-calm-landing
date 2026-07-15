import { listNewsDrafts } from "./lib/newsDrafts.js";

const approved = listNewsDrafts().filter((draft) => !draft.draft).length;
process.stdout.write(String(approved));
