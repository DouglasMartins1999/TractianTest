import Route from "../../interfaces/route.interface";
import usersServices from "./users.services";

const routes: Route[] = [
    {
        path: "/companies/:company/users",
        method: "POST",
        description: "Cadastro de Usuários",
        handledBy: usersServices.create,
    },
    {
        path: "/companies/:company/users",
        method: "GET",
        description: "Consulta de Usuários",
        handledBy: usersServices.fetch,
    },
    {
        path: "/companies/:company/users/:id",
        method: "GET",
        description: "Consulta de Usuário",
        handledBy: usersServices.fetch,
    },
    {
        path: "/companies/:company/users/:id",
        method: "PATCH",
        description: "Atualização de Usuário",
        handledBy: usersServices.update,
    },
    {
        path: "/companies/:company/users/:id",
        method: "DELETE",
        description: "Remoção de Usuário",
        handledBy: usersServices.remove,
    }
]

export default routes;