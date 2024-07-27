const { Vkpl } = require("./src/Vkpl");
const { VkplAuth } = require("./src/VkplAuth");
const { VkplWH } = require("./src/VkplWH");

exports.VkplAuth = VkplAuth;
exports.VkplWH = VkplWH;
exports.Vkpl = Vkpl;

module.exports = {
  VkplAuth,
  VkplWH,
  Vkpl,
};

