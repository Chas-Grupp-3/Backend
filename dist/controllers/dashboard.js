const selectDashboard = async (user) => {
    if (user.role === "admin") {
        adminDashboard(user);
    }
    else if (user.role === "driver") {
        driverDashboard(user);
    }
    else if (user.role === "user") {
        userDashboard(user);
    }
};
// call selectDashboard to user dashboard functions
const adminDashboard = async (user) => { };
const userDashboard = async (user) => { };
const driverDashboard = async (user) => { };
export {};
