export abstract class FileUploader {
  /**
   *
   * @param request request of petition (use for type like multerjs)
   * @param fileName name of file (uuid preferred)
   * @param destinationPath destination where file will be sa
   */
  public abstract upload(
    file: any,
    fileName: string,
    destinationPath: string
  ): Promise<any>;
}
