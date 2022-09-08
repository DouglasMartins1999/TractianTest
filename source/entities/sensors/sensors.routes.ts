import Route from "../../interfaces/route.interface";
import sensorsServices from "./sensors.services";

const routes: Route[] = [
    {
        path: "company/:company/assets/:id/sensors",
        method: "POST",
        description: "Cadastro de Sensores",
        handledBy: sensorsServices.create,
    },
    {
        path: "company/:company/assets/:id/sensors",
        method: "GET",
        description: "Consulta de Sensores",
        handledBy: sensorsServices.fetch,
    },
    {
        path: "company/:company/assets/:id/sensors",
        method: "PATCH",
        description: "Atualização de Sensor",
        handledBy: sensorsServices.update,
    },
    {
        path: "company/:company/assets/:id/sensors",
        method: "DELETE",
        description: "Remoção de Sensor",
        handledBy: sensorsServices.remove,
    }
]

export default routes;