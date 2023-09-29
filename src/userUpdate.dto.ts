export class UserUpdateDto{
    country: string;
    location: string;
    name: string;
    rating_scale: {
        rating_from: number;
        rating_to: number;
        description: string;
        emblem_graphic_name: string;
      };
}