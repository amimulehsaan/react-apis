module.exports = (rootDir) => {
    global.__rootDir = rootDir;
    global.__production = process.env.NODE_ENV === "production";
};