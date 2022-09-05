import Route from "../../interfaces/route.interface";
import usersServices from "./users.services";

const routes: Route[] = [
    {
        path: "/users",
        method: "GET",
        authNeeded: false,
        handleFiles: false,
        description: "Consulta de Usuários",
        handledBy: usersServices.fetch,
    }
]

export default routes;