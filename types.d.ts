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

type Section = {
    sectionTitle?: string,
    images: [string]
}

export type ClientGallery = {
    _id?: string,
    clientGalleryTitle: string,
    userId: string,
    sections?: [Section]
}