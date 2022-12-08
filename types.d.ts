export type User = {
    username: string,
    email: string,
    password: string,
    userImage?: string,
    initQuestionary: boolean,
}

export type Image = {
    imageTitle: string,
    userId: string,
    imageName: string,
    imageSize: number,
    imageType: string
}

type RenderImage = {
    imageUuid: string,
    imageName: string
    imageUrl: string
}