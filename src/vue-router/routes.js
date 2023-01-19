import Map from "@/pages/Map";
import NewVendor from "@/pages/NewVendor";

const routes = [
  { path: "/", redirect: { name: "map" } },
  { component: Map, name: "map", path: "/map" },
  { component: NewVendor, name: "new vendor", path: "/vendors/new" },
];

export default routes;
