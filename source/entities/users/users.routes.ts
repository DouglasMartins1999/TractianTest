import Route from "../../interfaces/route.interface";
import usersServices from "./users.services";

const routes: Route[] = [
    {
        path: "/users",
        method: "POST",
        description: "Criação de Usuários",
        handledBy: usersServices.create,
    },
    {
        path: "/users",
        method: "GET",
        description: "Consulta de Usuários",
        handledBy: usersServices.fetch,
    },
    {
        path: "/users/:id",
        method: "GET",
        description: "Consulta de Usuário",
        handledBy: usersServices.fetch,
    },
    {
        path: "/users/:id",
        method: "PATCH",
        description: "Atualização de Usuário",
        handledBy: usersServices.update,
    },
    {
        path: "/users/:id",
        method: "DELETE",
        description: "Remoção de Usuário",
        handledBy: usersServices.remove,
    }
]

export default routes;