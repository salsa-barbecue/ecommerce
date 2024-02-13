import {v4} from "uuid";

export const InitialImages = [
    {
        id: v4(),
        url: "img/carrefour.webp"
    },
    {
        id: v4(),
        url: "img/esselunga.jpg"
    },
    {
        id: v4(),
        url: "img/coop.jpg"
    },
    {
        id: v4(),
        url: "img/auchan.jpg"
    },
    {
        id: v4(),
        url: "img/test.png"
    }
]

export const InitialTypes = [
    {
        id: v4(),
        title: "Carrefour",
        description: "Buono utilizzabile nei punti vendita aderenti, solo per la pasta",

    },
    {
        id: v4(),
        title: "Esselunga",
        description: "Buono utilizzabile nei punti vendita aderenti",
    },
    {
        id: v4(),
        title: "Coop",
        description: "Buono ad uso esclusivo dei dipendenti Coop",
    },
    {
        id: v4(),
        title: "Auchan",
        description: "Buono utilizzabile nei punti vendita aderenti",
    },
]

export const InitialSizes = [
    {
        id: v4(),
        title: "Micro",
        value: 5
    },
    {
        id: v4(),
        title: "Mini",
        value: 10
    },
    {
        id: v4(),
        title: "Standard",
        value: 25
    },
    {
        id: v4(),
        title: "Maxi",
        value: 50
    },
    {
        id: v4(),
        title: "Jumbo",
        value: 100
    }
]

export const InitialTypeImageRelations = [
    {
        CouponTypeId: InitialTypes[0].id,
        ImageId: InitialImages[0].id
    },
    {
        CouponTypeId: InitialTypes[1].id,
        ImageId: InitialImages[1].id
    },
    {
        CouponTypeId: InitialTypes[2].id,
        ImageId: InitialImages[2].id
    },
    {
        CouponTypeId: InitialTypes[3].id,
        ImageId: InitialImages[3].id
    }
]

export const InitialTypeSizeRelations = [
    {
        CouponTypeId: InitialTypes[0].id,
        CouponSizeId: InitialSizes[0].id
    },
    {
        CouponTypeId: InitialTypes[0].id,
        CouponSizeId: InitialSizes[1].id
    },
    {
        CouponTypeId: InitialTypes[0].id,
        CouponSizeId: InitialSizes[2].id
    },
    {
        CouponTypeId: InitialTypes[1].id,
        CouponSizeId: InitialSizes[1].id
    },
    {
        CouponTypeId: InitialTypes[1].id,
        CouponSizeId: InitialSizes[2].id
    },
    {
        CouponTypeId: InitialTypes[1].id,
        CouponSizeId: InitialSizes[4].id
    },
    {
        CouponTypeId: InitialTypes[2].id,
        CouponSizeId: InitialSizes[0].id
    },
    {
        CouponTypeId: InitialTypes[2].id,
        CouponSizeId: InitialSizes[1].id
    },
    {
        CouponTypeId: InitialTypes[2].id,
        CouponSizeId: InitialSizes[2].id
    },
    {
        CouponTypeId: InitialTypes[2].id,
        CouponSizeId: InitialSizes[3].id
    },
    {
        CouponTypeId: InitialTypes[2].id,
        CouponSizeId: InitialSizes[4].id
    },
    {
        CouponTypeId: InitialTypes[3].id,
        CouponSizeId: InitialSizes[0].id
    },
    {
        CouponTypeId: InitialTypes[3].id,
        CouponSizeId: InitialSizes[1].id
    },
    {
        CouponTypeId: InitialTypes[3].id,
        CouponSizeId: InitialSizes[2].id
    },
    {
        CouponTypeId: InitialTypes[3].id,
        CouponSizeId: InitialSizes[3].id
    },
    {
        CouponTypeId: InitialTypes[3].id,
        CouponSizeId: InitialSizes[4].id
    },
]