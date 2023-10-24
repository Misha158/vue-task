import { startCase } from "lodash";
import { Statuses } from "@/types";

export const statusOptions = [
  { value: Statuses.All, label: startCase(Statuses.All) },
  { value: Statuses.Completed, label: startCase(Statuses.Completed) },
  { value: Statuses.Uncompleted, label: startCase(Statuses.Uncompleted) },
  { value: Statuses.Favorites, label: startCase(Statuses.Favorites) },
];

export const priorityOptions = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

interface Option {
  value: string;
  label: string;
}

export interface FilterConfig {
  type: string;
  filterName: string;
  options?: Option[];
  getOptions?: Function;
}

const getOptions = async () => {
  return [{ label: "test", value: "test" }];
};

export const filterConfig: FilterConfig[] = [
  {
    type: "select",
    options: statusOptions,
    filterName: "status",
  },
  {
    type: "select",
    options: [],
    filterName: "userId",
    getOptions,
  },
  {
    type: "input",
    filterName: "title",
  },
];
