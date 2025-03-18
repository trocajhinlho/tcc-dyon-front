enum cameraErrors {
    NotAllowedError = "A permissão de acesso à câmera do dispositivo não foi concedida, não será possível ler o QR Code",
    NotFoundError = "Seu dispositivo não possui uma câmera para uso",
    NotReadableError = "Ocorreu um erro inesperado, tente novamente"
}

export default Object.entries(cameraErrors);