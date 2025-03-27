import bcrypt from "bcrypt";
import userRepository from "../repositories/userRepository.js";
import jwt from "jsonwebtoken";

async function hashingPassword(password) {
  return bcrypt.hash(password, 10);
}

async function createUserService(user) {
  const existedUser = await userRepository.findByEmail(user.email);

  if (existedUser) {
    const error = new Error("User already exists");
    error.code = 422;
    error.data = { email: user.email };
    throw error;
  }

  const hashedPassword = await hashingPassword(user.password);
  const createdUser = await userRepository.save({
    ...user,
    password: hashedPassword,
  });
  return filterSensitiveUserData(createdUser);
}

function filterSensitiveUserData(user) {
  const { password, ...rest } = user;
  return rest;
}

async function getUser(email, password) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const error = new Error("Unauthorized");
    error.code = 401;
    throw error;
  }

  verifyPassword(password, user.password);
  return filterSensitiveUserData(user);
}

async function verifyPassword(inPutPassword, savedPassword) {
  const isValid = await bcrypt.compare(inPutPassword, savedPassword);
  if (!isValid) {
    const error = new Error("Unauthorized");
    error.code = 401;
    throw error;
  }
}

function createToken(user) {
  const payload = { userId: user.id };
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

export default { createUserService, getUser, createToken, getUserInfoService };
