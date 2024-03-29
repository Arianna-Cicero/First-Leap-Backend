class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async findByEmail(email) {
    try {
      const user = await this.userModel.findOne({ email });
      return user;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('Failed to find user by email');
    }
  }

  async findById(id) {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw new Error('Failed to find user by ID');
    }
  }
}

export default { UserService };
