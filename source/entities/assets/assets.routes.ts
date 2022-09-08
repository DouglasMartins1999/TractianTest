import Route from "../../interfaces/route.interface";
import assetsServices from "./assets.services";

const routes: Route[] = [
    {
        path: "/companies/:company/assets",
        method: "POST",
        description: "Cadastro de Máquinas",
        handledBy: assetsServices.create,
    },
    {
        path: "/companies/:company/assets",
        method: "GET",
        description: "Consulta de Máquinas",
        handledBy: assetsServices.fetch,
    },
    {
        path: "/companies/:company/assets/:id",
        method: "GET",
        description: "Consulta de Máquina",
        handledBy: assetsServices.fetch,
    },
    {
        path: "/companies/:company/assets/:id",
        method: "PATCH",
        description: "Atualização de Máquina",
        handledBy: assetsServices.update,
    },
    {
        path: "/companies/:company/assets/:id",
        method: "DELETE",
        description: "Remoção de Máquina",
        handledBy: assetsServices.remove,
    },
    {
        path: "/companies/:company/assets/:id/picture",
        method: "POST",
        description: "Cadastro de Imagem da Máquina",
        handledBy: assetsServices.attachPicture,
    },
    {
        path: "/companies/:company/assets/:id/picture",
        method: "GET",
        description: "Cadastro de Imagem da Máquina",
        handledBy: assetsServices.fetchPicture,
    },
]

export default routes;