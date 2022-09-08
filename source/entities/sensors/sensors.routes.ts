import Route from "../../interfaces/route.interface";
import sensorsServices from "./sensors.services";

const routes: Route[] = [
    {
        path: "/companies/:company/assets/:asset/sensors",
        method: "POST",
        description: "Cadastro de Sensores",
        handledBy: sensorsServices.create,
    },
    {
        path: "/companies/:company/assets/:asset/sensors",
        method: "GET",
        description: "Consulta de Sensores",
        handledBy: sensorsServices.fetch,
    },
    {
        path: "/companies/:company/assets/:asset/sensors",
        method: "PATCH",
        description: "Atualização de Sensor",
        handledBy: sensorsServices.update,
    },
    {
        path: "/companies/:company/assets/:asset/sensors",
        method: "DELETE",
        description: "Remoção de Sensor",
        handledBy: sensorsServices.remove,
    }
]

export default routes;