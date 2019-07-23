import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import PedidoAdd from "views/Typography/PedidoAdd.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import MateriaPrima from "views/MateriaPrima/MateriaPrima.jsx";
import MateriaPrimaAdd from "views/MateriaPrima/MateriaPrimaAdd.jsx";
import MateriaPrimaAdditional from "views/MateriaPrima/MateriaPrimaAdditional.jsx";
import DiscountMateria from "views/MateriaPrima/DiscountMateria.jsx";
import Users from "views/UserProfile/Users.jsx";
import UsersAdd from "views/UserProfile/UsersAdd.jsx";
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Envíos",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Inventario",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Pedidos",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Estadísticas",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Usuarios",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Users,
    layout: "/admin"
  }
  ,
  {
    path: "/materia",
    name: "Materia Prima",
    rtlName: "خرائط",
    icon: Notifications,
    component: MateriaPrima,
    layout: "/admin"
  },
  {
    path: "/materia_add",
    name: "Materia Prima",
    rtlName: "خرائط",
    icon: Unarchive,
    component: MateriaPrimaAdd,
    layout: "/admin",
    hide: true
  },
  {
    path: "/materia_additional",
    name: "Materia Prima",
    rtlName: "خرائط",
    icon: Unarchive,
    component: MateriaPrimaAdditional,
    layout: "/admin",
    hide: true
  },
  {
    path: "/materia_minus",
    name: "Materia Prima",
    rtlName: "خرائط",
    icon: Unarchive,
    component: DiscountMateria,
    layout: "/admin",
    hide: true
  },
  {
    path: "/users_add",
    name: "Usuarios",
    rtlName: "خرائط",
    icon: Unarchive,
    component: UsersAdd,
    layout: "/admin",
    hide: true
  },
  {
    path: "/pedido_add",
    name: "Pedidos",
    rtlName: "خرائط",
    icon: Unarchive,
    component: PedidoAdd,
    layout: "/admin",
    hide: true
  }
];

export default dashboardRoutes;
