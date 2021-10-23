import DoorModel from "../model/Door";

export function criarPortas(qtde: number, portaComPresente: number): DoorModel[] {
    return Array.from({ length: qtde }, (_, i) => {
        const number = i + 1
        const temPresente = number === portaComPresente
        return new DoorModel(number, temPresente)
    })
}

export function atualizarPortas(portas: DoorModel[], portaModificada: DoorModel): DoorModel[] {
    return portas.map(portaAtual => {
        const igualAModificada = portaAtual.number === portaModificada.number

        if(igualAModificada) {
            return portaModificada
        } else {
            return portaModificada.isOpened ? portaAtual : portaAtual.disselected()
        }
    })
}