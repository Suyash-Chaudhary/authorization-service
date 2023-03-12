export class Logger {
  public static info(message: string) {
    console.log(message);
  }

  public static error(message: string, error: any) {
    const dateTime = new Date().toISOString();
    const str = `${dateTime} > ${message}: ${JSON.stringify(error)}`;
    console.log(str);
  }
}
