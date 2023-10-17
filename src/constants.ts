import { startCase } from "lodash";
import { Statuses } from "@/types";

export const statusOptions = [
  { value: Statuses.All, label: startCase(Statuses.All) },
  { value: Statuses.Completed, label: startCase(Statuses.Completed) },
  { value: Statuses.Uncompleted, label: startCase(Statuses.Uncompleted) },
  { value: Statuses.Favorites, label: startCase(Statuses.Favorites) },
];
