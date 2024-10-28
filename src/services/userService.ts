import User from '../domain/models/User';

export const getUserById = async (id: string) => {
  return await User.findById(id);
};

export const updateUser = async (id: string, data: Partial<{ name: string; role: string }>) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};
