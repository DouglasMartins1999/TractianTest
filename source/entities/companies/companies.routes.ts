import Route from "../../interfaces/route.interface";
import companiesServices from "./companies.services";

const routes: Route[] = [
    {
        path: "/companies",
        method: "POST",
        description: "Criação de Usuários",
        handledBy: companiesServices.create,
    },
    {
        path: "/companies",
        method: "GET",
        description: "Consulta de Usuários",
        handledBy: companiesServices.fetch,
    },
    {
        path: "/companies/:id",
        method: "GET",
        description: "Consulta de Usuário",
        handledBy: companiesServices.fetch,
    },
    {
        path: "/companies/:id",
        method: "PATCH",
        description: "Atualização de Usuário",
        handledBy: companiesServices.update,
    },
    {
        path: "/companies/:id",
        method: "DELETE",
        description: "Remoção de Usuário",
        handledBy: companiesServices.remove,
    }
]

export default routes;