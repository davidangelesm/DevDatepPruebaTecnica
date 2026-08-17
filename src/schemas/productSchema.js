import {z} from 'zod';

export const productSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    category: z.string().min(1, 'La categoría es obligatoria'),
    price: z.coerce.number().min(0, 'El precio debe ser mayor a 0'),
    image: z.object({
        thumbnail: z.string().min(1, 'La URL de la imagen en miniatura es obligatoria'),
        mobile: z.string().min(1, 'La URL de la imagen en mobile es obligatoria'),
        tablet: z.string().min(1, 'La URL de la imagen en tablet es obligatoria'),
        desktop: z.string().min(1, 'La URL de la imagen en desktop es obligatoria'),
    })
})