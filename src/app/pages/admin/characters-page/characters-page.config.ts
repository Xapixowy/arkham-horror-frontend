export const CHARACTERS_PAGE_CONFIG: {
  placeholderImageSize: string;
  allowedCharacterImageFormats: string[];
  maxCharacterImageFileSize: number;
} = {
  placeholderImageSize: '6rem',
  allowedCharacterImageFormats: ['.jpg', '.jpeg', '.png'],
  maxCharacterImageFileSize: 5 * 1024 * 1024,
};
