class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message); // Parent Error ক্লাসের মেসেজ পাঠাই
    this.statusCode = statusCode;
    this.name = 'AppError'; // এররের নাম সেট করা
    Object.setPrototypeOf(this, AppError.prototype); // প্রোটোটাইপ ঠিক রাখার জন্য
  }
}
export default AppError;
