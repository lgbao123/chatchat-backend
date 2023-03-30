import cloudinary, { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary'
export function uploads(
   file: string,
   public_id?: string,
   overwrite?: boolean,
   invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
   return new Promise((reslove) => {
      cloudinary.v2.uploader.upload(
         file,
         { public_id, overwrite, invalidate },
         (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (error) reslove(error)
            reslove(result)
         }

      )
   })
}