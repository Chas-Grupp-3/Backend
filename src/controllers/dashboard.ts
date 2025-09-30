import { User } from "./../types/user.js";
const selectDashboard = async (user: User) => {
  if (user.role === "admin") {
    adminDashboard(user);
  } else if (user.role === "driver") {
    driverDashboard(user);
  } else if (user.role === "user") {
    userDashboard(user);
  }
};

// call selectDashboard to user dashboard functions

const adminDashboard = async (user: User) => { };

const userDashboard = async (user: User) => { };

const driverDashboard = async (user: User) => { };
